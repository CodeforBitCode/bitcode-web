import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import * as z from "zod/v4";
import {
  bitcodeLearningPaths,
  getLearningPathByIdOrName,
  prepareBitCodeEnquiry,
  publicFaqs,
  sampleGuidedProjects,
  teachingMethod,
} from "@/data/bitcode";
import { siteConfig } from "@/data/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const maxRequestBytes = 64 * 1024;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, mcp-session-id, Last-Event-ID, mcp-protocol-version",
  "Access-Control-Expose-Headers": "mcp-session-id, mcp-protocol-version",
  "Cache-Control": "no-store",
};

const serverInstructions = [
  "BitCode Technologies is a beginner-friendly coding education brand for school students, college students, and first-time learners.",
  "Use get_learning_paths for public course discovery.",
  "Use get_learning_path_details when a learner asks about one specific path.",
  "Use recommend_learning_path to guide students or parents based on age/grade, current level, and goal.",
  "Use get_sample_projects to explain realistic guided projects; do not present them as completed student work.",
  "Use get_teaching_method to explain how BitCode teaches and tracks progress.",
  "Use get_faqs for public questions about joining, prerequisites, projects, and class structure.",
  "Use prepare_enquiry only to prepare a WhatsApp/email-ready enquiry. Do not claim the enquiry was saved or sent.",
].join("\n");

const pathLookupSchema = z
  .object({
    pathId: z.string().trim().min(1).max(120).optional(),
    pathName: z.string().trim().min(1).max(160).optional(),
  })
  .strict()
  .refine((value) => value.pathId || value.pathName, {
    message: "Provide either pathId or pathName.",
  });

const recommendSchema = z
  .object({
    studentAgeOrGrade: z.string().trim().min(1).max(120),
    currentLevel: z.string().trim().min(1).max(200),
    goal: z.string().trim().min(1).max(300),
    preferredFormat: z.string().trim().max(160).optional(),
  })
  .strict();

const prepareEnquirySchema = z
  .object({
    studentName: z.string().trim().max(120).optional(),
    parentOrStudentContact: z.string().trim().max(160).optional(),
    ageOrGrade: z.string().trim().max(120).optional(),
    currentLevel: z.string().trim().max(200).optional(),
    goal: z.string().trim().max(300).optional(),
    preferredLearningPath: z.string().trim().max(160).optional(),
    preferredTiming: z.string().trim().max(160).optional(),
    message: z.string().trim().max(1000).optional(),
  })
  .strict();

function textResult(structuredContent: Record<string, unknown>) {
  return {
    structuredContent,
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(structuredContent, null, 2),
      },
    ],
  };
}

function scorePath(input: {
  studentAgeOrGrade: string;
  currentLevel: string;
  goal: string;
  preferredFormat?: string;
}) {
  const context =
    `${input.studentAgeOrGrade} ${input.currentLevel} ${input.preferredFormat ?? ""}`.toLowerCase();
  const goal = input.goal.toLowerCase();
  const scores: Record<string, number> = {};
  for (const path of bitcodeLearningPaths) scores[path.id] = 0;

  const add = (id: string, score: number) => {
    scores[id] += score;
  };
  const includesAny = (text: string, words: readonly string[]) =>
    words.some((word) => text.includes(word));

  if (
    includesAny(context, [
      "zero",
      "beginner",
      "first",
      "start",
      "basic",
      "confusing",
      "new",
    ])
  )
    add("coding-for-beginners", 4);
  if (
    includesAny(context, [
      "school",
      "class",
      "grade",
      "workshop",
      "batch",
      "young",
      "kid",
    ])
  )
    add("coding-for-schools", 3);
  if (
    includesAny(context, [
      "college",
      "assignment",
      "lab",
      "practical",
      "subject",
      "submission",
      "year",
    ])
  )
    add("college-coding-support", 4);

  if (includesAny(goal, ["zero", "beginner", "first", "start", "basic", "new"]))
    add("coding-for-beginners", 6);
  if (
    includesAny(goal, [
      "html",
      "css",
      "javascript",
      "website",
      "web",
      "frontend",
      "landing",
      "portfolio",
    ])
  )
    add("web-development-creative-coding", 7);
  if (
    includesAny(goal, [
      "logic",
      "problem",
      "loop",
      "pattern",
      "condition",
      "debug",
      "thinking",
    ])
  )
    add("logic-building-problem-solving", 7);
  if (
    includesAny(goal, [
      "assignment",
      "lab",
      "practical",
      "subject",
      "submission",
    ])
  )
    add("college-coding-support", 7);
  if (
    includesAny(goal, [
      "project",
      "mini",
      "side",
      "prototype",
      "demo",
      "idea",
      "present",
    ])
  )
    add("project-side-project-mentorship", 7);

  let selected = bitcodeLearningPaths[0];
  for (const path of bitcodeLearningPaths) {
    if (scores[path.id] > scores[selected.id]) selected = path;
  }
  return selected;
}

function createBitCodeMcpServer() {
  const server = new McpServer(
    { name: "bitcode-technologies", version: "1.0.0" },
    { instructions: serverInstructions },
  );

  server.registerTool(
    "get_learning_paths",
    {
      title: "Get BitCode learning paths",
      description:
        "Return all public BitCode learning paths for coding education discovery.",
      annotations: { readOnlyHint: true },
    },
    async () =>
      textResult({
        brand: siteConfig.businessName,
        learningPaths: bitcodeLearningPaths.map((path) => ({
          title: path.title,
          whoItIsFor: path.whoFor,
          recommendedLevelAgeGrade: path.recommendedLevel,
          whatStudentsLearn: path.learns,
          whatStudentsBuild: path.builds,
          expectedOutcome: path.expectedOutcome,
          cta: path.cta,
        })),
      }),
  );

  server.registerTool(
    "get_learning_path_details",
    {
      title: "Get learning path details",
      description:
        "Return detailed public information for one BitCode learning path by pathId or pathName.",
      inputSchema: pathLookupSchema,
      annotations: { readOnlyHint: true },
    },
    async ({ pathId, pathName }) => {
      const path = getLearningPathByIdOrName(pathId ?? pathName ?? "");
      if (!path) {
        return textResult({
          error: "Learning path not found.",
          availablePaths: bitcodeLearningPaths.map(({ id, title }) => ({
            id,
            title,
          })),
        });
      }
      return textResult({ learningPath: path });
    },
  );

  server.registerTool(
    "recommend_learning_path",
    {
      title: "Recommend a BitCode learning path",
      description:
        "Recommend the best matching BitCode path based on learner age/grade, current level, goal, and preferred format.",
      inputSchema: recommendSchema,
      annotations: { readOnlyHint: true },
    },
    async (input) => {
      const path = scorePath(input);
      return textResult({
        recommendedPath: path,
        explanation: `Based on the learner's current level (${input.currentLevel}) and goal (${input.goal}), ${path.title} is the most practical starting point. ${path.expectedOutcome}`,
        nextStep: path.cta,
      });
    },
  );

  server.registerTool(
    "get_sample_projects",
    {
      title: "Get sample guided projects",
      description:
        "Return sample guided projects students can build at BitCode. These are examples, not fake completed student work.",
      annotations: { readOnlyHint: true },
    },
    async () =>
      textResult({
        disclaimer:
          "These are sample guided project examples. They are not claimed as completed student projects unless real student work is later shared with permission.",
        projects: sampleGuidedProjects.map((project) => ({
          title: project.title,
          difficulty: project.difficulty,
          skillsUsed: project.skillsUsed,
          learningOutcome: project.learningOutcome,
          finalOutput: project.finalOutput,
        })),
      }),
  );

  server.registerTool(
    "get_teaching_method",
    {
      title: "Get BitCode teaching method",
      description:
        "Return BitCode's teaching flow, progress approach, and roadmap.",
      annotations: { readOnlyHint: true },
    },
    async () =>
      textResult({
        teachingFlow: teachingMethod.flow,
        flowDetails: teachingMethod.details,
        roadmap: teachingMethod.roadmap,
      }),
  );

  server.registerTool(
    "get_faqs",
    {
      title: "Get public BitCode FAQs",
      description:
        "Return public FAQs about BitCode coding classes, learners, class structure, projects, and guidance.",
      annotations: { readOnlyHint: true },
    },
    async () => textResult({ faqs: publicFaqs }),
  );

  server.registerTool(
    "prepare_enquiry",
    {
      title: "Prepare BitCode enquiry",
      description:
        "Prepare a structured BitCode enquiry summary plus WhatsApp and email fallback links. This does not save or send data.",
      inputSchema: prepareEnquirySchema,
      annotations: { readOnlyHint: true },
    },
    async (input) => textResult(prepareBitCodeEnquiry(input)),
  );

  return server;
}

function logMcpFailure(error: unknown) {
  const details =
    error instanceof Error
      ? { errorName: error.name, errorMessage: error.message }
      : { errorName: "UnknownError", errorMessage: "Non-error value thrown" };

  console.error(
    JSON.stringify({
      level: "error",
      service: "bitcode-mcp",
      event: "request_failed",
      ...details,
    }),
  );
}

async function handleMcpRequest(request: Request) {
  const transport = new WebStandardStreamableHTTPServerTransport({
    enableJsonResponse: true,
  });
  const server = createBitCodeMcpServer();

  try {
    await server.connect(transport);
    const response = await transport.handleRequest(request);
    const headers = new Headers(response.headers);
    Object.entries(corsHeaders).forEach(([key, value]) =>
      headers.set(key, value),
    );
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  } catch (error) {
    logMcpFailure(error);
    return Response.json(
      { error: "The BitCode MCP request could not be completed." },
      { status: 500, headers: corsHeaders },
    );
  } finally {
    await server.close();
    await transport.close();
  }
}

async function limitRequestBody(request: Request) {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > maxRequestBytes)
    return null;
  if (!request.body) return request;

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > maxRequestBytes) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new Request(request.url, {
    method: request.method,
    headers: request.headers,
    body,
    signal: request.signal,
  });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.has("health")) {
    return Response.json(
      {
        status: "ok",
        service: "BitCode MCP server",
        endpoint: "/mcp",
        tools: [
          "get_learning_paths",
          "get_learning_path_details",
          "recommend_learning_path",
          "get_sample_projects",
          "get_teaching_method",
          "get_faqs",
          "prepare_enquiry",
        ],
      },
      {
        headers: {
          ...corsHeaders,
          "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
        },
      },
    );
  }

  return handleMcpRequest(request);
}

export async function POST(request: Request) {
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  ) {
    return Response.json(
      { error: "Content-Type must be application/json." },
      { status: 415, headers: corsHeaders },
    );
  }
  const limitedRequest = await limitRequestBody(request);
  if (!limitedRequest) {
    return Response.json(
      { error: "Request body is too large." },
      { status: 413, headers: corsHeaders },
    );
  }
  return handleMcpRequest(limitedRequest);
}

export async function DELETE(request: Request) {
  const limitedRequest = await limitRequestBody(request);
  if (!limitedRequest) {
    return Response.json(
      { error: "Request body is too large." },
      { status: 413, headers: corsHeaders },
    );
  }
  return handleMcpRequest(limitedRequest);
}
