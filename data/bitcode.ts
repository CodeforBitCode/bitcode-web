import { learningPaths, siteConfig, whatsappUrl } from "./site";

export type BitCodeLearningPath = {
  id: string;
  title: string;
  subtitle: string;
  whoFor: string;
  recommendedLevel: string;
  learns: string[];
  builds: string[];
  expectedOutcome: string;
  cta: string;
};

export const bitcodeLearningPaths: BitCodeLearningPath[] = [
  {
    id: "coding-for-beginners",
    title: learningPaths[0].title,
    subtitle: learningPaths[0].subtitle,
    whoFor:
      "Absolute beginners, school students, college students, and learners who feel coding is confusing.",
    recommendedLevel:
      "Start from zero. Suitable for learners who need calm, step-by-step basics before projects.",
    learns: [
      "Basic syntax",
      "Logic building",
      "Variables, conditions, and loops",
      "Small problem-solving habits",
    ],
    builds: [
      "Small coding tasks",
      "Simple logic exercises",
      "Beginner practice outputs",
      "Confidence before projects",
    ],
    expectedOutcome:
      "The learner understands simple code, solves basic tasks, and feels ready for the next learning path.",
    cta: "Ask BitCode for a beginner-friendly starting plan.",
  },
  {
    id: "coding-for-schools",
    title: learningPaths[1].title,
    subtitle: learningPaths[1].subtitle,
    whoFor:
      "Parents, schools, school batches, and young learners who need structured coding exposure.",
    recommendedLevel:
      "Age and grade-aware. Can be planned for school workshops or regular beginner batches.",
    learns: [
      "Creative logic",
      "Beginner coding ideas",
      "Participation-based activities",
      "Clear coding habits",
    ],
    builds: [
      "Logic activities",
      "Simple creative outputs",
      "Mini web or browser tasks",
      "Workshop-ready practice work",
    ],
    expectedOutcome:
      "Students build curiosity, confidence, and basic coding thinking without the sessions feeling childish.",
    cta: "Ask BitCode about a school batch or workshop format.",
  },
  {
    id: "web-development-creative-coding",
    title: learningPaths[2].title,
    subtitle: learningPaths[2].subtitle,
    whoFor:
      "Students and beginners who want to build real websites and interactive browser pages.",
    recommendedLevel:
      "Beginner to beginner-plus. Works best after basic logic, but can start from HTML/CSS basics.",
    learns: [
      "HTML structure",
      "CSS layout and responsive design",
      "JavaScript basics",
      "Frontend logic and UI interaction",
    ],
    builds: [
      "Simple websites",
      "Interactive pages",
      "Forms and UI components",
      "Practical mini-projects",
    ],
    expectedOutcome:
      "The learner can build a simple website and explain how structure, styling, and interaction work together.",
    cta: "Ask BitCode for web development path guidance.",
  },
  {
    id: "logic-building-problem-solving",
    title: learningPaths[3].title,
    subtitle: learningPaths[3].subtitle,
    whoFor:
      "Learners who know some syntax but struggle to think through problems independently.",
    recommendedLevel:
      "Useful for school students, college students, and beginners before or alongside any language.",
    learns: [
      "Conditions and loops",
      "Pattern thinking",
      "Problem breakdown",
      "Debugging and dry runs",
    ],
    builds: [
      "Practice problems",
      "Trace-based solutions",
      "Small algorithms",
      "Cleaner solution attempts",
    ],
    expectedOutcome:
      "Coding feels less confusing because the learner can break problems into smaller steps.",
    cta: "Ask BitCode for logic-building support.",
  },
  {
    id: "college-coding-support",
    title: learningPaths[4].title,
    subtitle: learningPaths[4].subtitle,
    whoFor:
      "College students who need help with programming subjects, practicals, labs, assignments, or weak fundamentals.",
    recommendedLevel:
      "Best for first-year students or any college learner rebuilding basics.",
    learns: [
      "Subject concepts",
      "Assignment logic",
      "Lab/practical understanding",
      "Debugging and explanation skills",
    ],
    builds: [
      "Practical programs",
      "Assignment-ready logic",
      "Small subject demos",
      "Clearer submissions",
    ],
    expectedOutcome:
      "The learner handles practical work with better understanding and less rote dependence.",
    cta: "Ask BitCode for college coding support.",
  },
  {
    id: "project-side-project-mentorship",
    title: learningPaths[5].title,
    subtitle: learningPaths[5].subtitle,
    whoFor:
      "Students building mini projects, side projects, portfolio work, or college project demos.",
    recommendedLevel:
      "Best when the learner has some basics or a clear idea to build with guidance.",
    learns: [
      "Project planning",
      "Feature breakdown",
      "Debugging",
      "Structure and presentation",
    ],
    builds: [
      "Mini projects",
      "College project prototypes",
      "Portfolio demos",
      "Personal side-project features",
    ],
    expectedOutcome:
      "The learner can turn an idea into a working demo and explain the build process clearly.",
    cta: "Ask BitCode for project mentorship.",
  },
];

export const sampleGuidedProjects = [
  {
    title: "Personal portfolio website",
    difficulty: "Beginner",
    skillsUsed: ["HTML", "CSS", "Responsive layout"],
    learningOutcome:
      "Understand page structure, sections, styling, spacing, and mobile-friendly layout.",
    finalOutput: "A simple personal website.",
  },
  {
    title: "JavaScript quiz app",
    difficulty: "Beginner+",
    skillsUsed: ["JavaScript", "DOM", "Events"],
    learningOutcome:
      "Learn user interaction, score logic, condition checks, and result display.",
    finalOutput: "An interactive quiz with results.",
  },
  {
    title: "Calculator",
    difficulty: "Beginner+",
    skillsUsed: ["JavaScript", "Logic", "UI"],
    learningOutcome:
      "Practise input handling, operators, conditions, and debugging.",
    finalOutput: "A working browser calculator.",
  },
  {
    title: "Landing page",
    difficulty: "Beginner",
    skillsUsed: ["HTML", "CSS", "Design basics"],
    learningOutcome:
      "Learn hero sections, calls to action, visual hierarchy, and responsive spacing.",
    finalOutput: "A polished one-page website.",
  },
  {
    title: "Mini game",
    difficulty: "Intermediate",
    skillsUsed: ["Logic", "Loops", "JavaScript"],
    learningOutcome:
      "Understand rules, scoring, condition handling, and simple game interaction.",
    finalOutput: "A small playable browser game.",
  },
  {
    title: "College project prototype",
    difficulty: "Intermediate",
    skillsUsed: ["Planning", "Frontend", "Presentation"],
    learningOutcome:
      "Learn feature breakdown, demo flow, debugging, and practical presentation.",
    finalOutput: "A presentable project demo.",
  },
  {
    title: "Python logic exercises",
    difficulty: "Beginner",
    skillsUsed: ["Python", "Loops", "Problem solving"],
    learningOutcome:
      "Practise syntax, dry runs, patterns, loops, and basic program flow.",
    finalOutput: "A set of solved beginner practice tasks.",
  },
  {
    title: "Form validation project",
    difficulty: "Beginner+",
    skillsUsed: ["HTML", "CSS", "JavaScript"],
    learningOutcome:
      "Learn validation rules, error messages, and user-friendly form handling.",
    finalOutput: "A form that checks user input before submission.",
  },
];

export const teachingMethod = {
  flow: [
    "Concept explanation",
    "Guided coding",
    "Student task",
    "Debugging",
    "Review",
    "Progress tracking",
    "Parent/student updates",
  ],
  details: [
    "We explain one concept with simple examples before moving into syntax.",
    "The learner codes with guidance and sees how the logic works.",
    "A small task checks whether the learner can apply the idea.",
    "Mistakes are reviewed calmly so debugging becomes part of learning.",
    "Progress is reviewed through what the learner can explain and build.",
    "Next steps are based on current level, confidence, and project readiness.",
    "Parents or students can receive simple updates about covered topics, practice, and next goals.",
  ],
  roadmap: [
    "Start from zero",
    "Understand logic",
    "Practise syntax",
    "Build mini tasks",
    "Create projects",
    "Review and improve",
    "Present confidently",
  ],
};

export const publicFaqs = [
  {
    question: "Who can join BitCode?",
    answer:
      "School students, college students, and absolute beginners can join. BitCode suggests the right starting point after understanding the learner's current level and goal.",
  },
  {
    question: "Is prior coding knowledge required?",
    answer:
      "No. The beginner path starts from zero with simple explanations, guided practice, and small coding tasks.",
  },
  {
    question: "What age or grade is ideal to start?",
    answer:
      "The ideal starting point depends on curiosity, attention span, and goals. School learners can begin with age-appropriate logic and creative coding activities.",
  },
  {
    question: "Are classes online or offline?",
    answer:
      "Class format can be discussed during enquiry. BitCode keeps the guidance process simple and direct.",
  },
  {
    question: "Is a laptop required?",
    answer:
      "A laptop or desktop is recommended for regular coding practice, especially for web development, Python, and project work.",
  },
  {
    question: "How are classes structured?",
    answer:
      "A class usually includes explanation, guided coding, a learner task, debugging, review, and a clear next step.",
  },
  {
    question: "Will students build projects?",
    answer:
      "Yes. Projects are introduced when the learner has enough basics to understand and explain what they are building.",
  },
  {
    question: "Do you help with school or college practicals?",
    answer:
      "Yes. BitCode can support practical understanding, assignments, lab logic, and project planning without encouraging blind copying.",
  },
  {
    question: "Is there a demo or guidance call?",
    answer:
      "Students or parents can send an enquiry to ask for the most suitable starting point.",
  },
  {
    question: "How do I choose the right learning path?",
    answer:
      "Share the learner's age or year, current coding level, and goal. BitCode will suggest a practical starting point.",
  },
];

export function getLearningPathByIdOrName(pathIdOrName: string) {
  const query = pathIdOrName.trim().toLowerCase();
  return bitcodeLearningPaths.find(
    (path) => path.id === query || path.title.toLowerCase() === query,
  );
}

export function prepareBitCodeEnquiry(input: {
  studentName?: string;
  parentOrStudentContact?: string;
  ageOrGrade?: string;
  currentLevel?: string;
  goal?: string;
  preferredLearningPath?: string;
  preferredTiming?: string;
  message?: string;
}) {
  const summaryLines = [
    input.studentName ? `Student name: ${input.studentName}` : undefined,
    input.parentOrStudentContact
      ? `Contact: ${input.parentOrStudentContact}`
      : undefined,
    input.ageOrGrade ? `Age/grade/year: ${input.ageOrGrade}` : undefined,
    input.currentLevel
      ? `Current coding level: ${input.currentLevel}`
      : undefined,
    input.goal ? `Goal: ${input.goal}` : undefined,
    input.preferredLearningPath
      ? `Preferred learning path: ${input.preferredLearningPath}`
      : undefined,
    input.preferredTiming
      ? `Preferred timing: ${input.preferredTiming}`
      : undefined,
    input.message ? `Message: ${input.message}` : undefined,
  ].filter(Boolean);

  const enquirySummary = summaryLines.length
    ? summaryLines.join("\n")
    : "No learner details were provided yet. Ask the student or parent for age/grade, current level, goal, and preferred timing.";

  const whatsappMessage = `Hi Shubham, I'm interested in BitCode classes. Please share the details.\n\n${enquirySummary}`;

  return {
    enquirySummary,
    whatsappMessage,
    whatsappUrl: whatsappUrl(whatsappMessage),
    emailFallback: {
      email: siteConfig.email,
      subject: "BitCode class enquiry",
      mailtoUrl: `mailto:${siteConfig.email}?subject=${encodeURIComponent("BitCode class enquiry")}&body=${encodeURIComponent(whatsappMessage)}`,
    },
    note: "This only prepares an enquiry message. It does not save or send private data.",
  };
}
