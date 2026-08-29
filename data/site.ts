export const siteConfig = {
  name: "BitCode",
  businessName: "BitCode Technologies",
  founder: "Shubham Shah",
  email: "bitcode.work@gmail.com",
  phoneDisplay: "+91 9226797391",
  phoneRaw: "919226797391",
  description:
    "Mentor-led coding for beginners, school learners, and college learners—built around clear fundamentals, active practice, and guided projects.",
};

export const defaultWhatsappMessage =
  "Hi BitCode, I would like help choosing the right coding path.";

export const whatsappUrl = (message = defaultWhatsappMessage) =>
  `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(message)}`;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/teaching-method", label: "Method" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerItems = [
  ...navItems,
  { href: "/testimonials", label: "Outcomes" },
  { href: "/links", label: "All links" },
] as const;

export type LearningPath = {
  title: string;
  subtitle: string;
  points: readonly [string, string, string, string];
};

export const learningPathTitles = [
  "Coding for Absolute Beginners",
  "Coding Programs for Schools",
  "Web Development & Creative Coding",
  "Logic Building & Problem Solving",
  "College Coding Support",
  "Project & Side-Project Mentorship",
] as const;

export const learningPaths: LearningPath[] = [
  {
    title: learningPathTitles[0],
    subtitle: "Build the logic first, then learn to use syntax with purpose.",
    points: [
      "Start from zero with clear, step-by-step explanations",
      "Learn variables, conditions, loops, and basic problem solving",
      "Practise through small tasks during every session",
      "Build confidence before moving into larger projects",
    ],
  },
  {
    title: learningPathTitles[1],
    subtitle:
      "Structured workshops and batches where students participate, reason, and create.",
    points: [
      "Age-aware coding programs for school learners",
      "Creative logic and participation-based activities",
      "Clear sessions planned for workshops or regular batches",
      "Small outputs that make progress visible",
    ],
  },
  {
    title: learningPathTitles[2],
    subtitle:
      "Learn HTML, CSS, and JavaScript by building responsive, interactive pages.",
    points: [
      "Structure pages with semantic HTML",
      "Create responsive layouts with modern CSS",
      "Add interaction with JavaScript",
      "Build and explain practical mini-projects",
    ],
  },
  {
    title: learningPathTitles[3],
    subtitle:
      "Break problems into steps, trace code, spot errors, and improve solutions.",
    points: [
      "Reason through conditions, loops, and patterns",
      "Break larger problems into smaller decisions",
      "Use dry runs to understand program flow",
      "Debug with a reason instead of guessing",
    ],
  },
  {
    title: learningPathTitles[4],
    subtitle:
      "Strengthen the concepts behind labs, practicals, assignments, and project work—without blind copying.",
    points: [
      "Clarify programming concepts behind coursework",
      "Understand practical and assignment logic",
      "Rebuild weak fundamentals at the right pace",
      "Prepare work the learner can explain",
    ],
  },
  {
    title: learningPathTitles[5],
    subtitle:
      "Take an idea from rough scope to working demo through planning, coding, debugging, and presentation.",
    points: [
      "Plan a realistic first version",
      "Break features into clear implementation steps",
      "Debug and improve the build with guidance",
      "Present the result and explain key decisions",
    ],
  },
];

export const teachingSteps = [
  {
    number: "01",
    cue: "{ }",
    title: "Make it clear",
    text: "We break the concept into simple steps and connect it to something familiar.",
  },
  {
    number: "02",
    cue: "( )",
    title: "Code it together",
    text: "The mentor demonstrates the idea while explaining each decision.",
  },
  {
    number: "03",
    cue: "< >",
    title: "Try it independently",
    text: "The learner applies the concept through a focused task of their own.",
  },
  {
    number: "04",
    cue: "//",
    title: "Debug the thinking",
    text: "Mistakes are traced calmly so the learner understands what went wrong and why.",
  },
  {
    number: "05",
    cue: "++",
    title: "Review and level up",
    text: "The learner explains the result, improves it, and leaves with a useful next step.",
  },
];

export const projectPlaceholders = [
  {
    tag: "Web",
    title: "First responsive website",
    text: "Reserved for a future learner’s website, including what they built and the concepts they used.",
  },
  {
    tag: "Creative coding",
    title: "Interactive browser project",
    text: "Reserved for a future quiz, game, or useful browser interaction built by a learner.",
  },
  {
    tag: "Projects",
    title: "Guided project demo",
    text: "Reserved for a learner’s working demo and a clear explanation of how it was built.",
  },
];
