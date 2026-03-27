export type LanguageTokenName =
  | "HTML"
  | "CSS"
  | "JavaScript"
  | "React"
  | "TypeScript"
  | "Node.js"
  | "Python"
  | "Ruby"
  | "Assembly";

export interface LanguageConfig {
  bgToken: string;
  name: LanguageTokenName;
  textToken: string;
}

const LANGUAGES: LanguageConfig[] = [
  {
    name: "HTML",
    bgToken: "orange.700",
    textToken: "white",
  },
  {
    name: "CSS",
    bgToken: "blue.500",
    textToken: "white",
  },
  {
    name: "JavaScript",
    bgToken: "yellow.200",
    textToken: "neutral.900",
  },
  {
    name: "React",
    bgToken: "cyan.400",
    textToken: "neutral.900",
  },
  {
    name: "TypeScript",
    bgToken: "blue.600",
    textToken: "white",
  },
  {
    name: "Node.js",
    bgToken: "green.700",
    textToken: "white",
  },
  {
    name: "Python",
    bgToken: "lime.400",
    textToken: "neutral.900",
  },
  {
    name: "Ruby",
    bgToken: "red.600",
    textToken: "white",
  },
  {
    name: "Assembly",
    bgToken: "indigo.700",
    textToken: "white",
  },
];

export default LANGUAGES;
