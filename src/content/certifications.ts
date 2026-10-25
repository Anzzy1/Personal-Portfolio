// ------------------------------------------------------------------
// Certifications, awards, and completed courses
// Leave `href` empty if there's no public verification link, and
// `date` empty if you'd rather not show one.
// ------------------------------------------------------------------

export type CertificationKind = "Certification" | "Award" | "Course";

export type Certification = {
  title: string;
  issuer: string;
  date: string; // e.g. "Mar 2026" or "2026"
  kind: CertificationKind;
  skills: string[];
  credentialId?: string;
  href?: string;
};

export const certifications: Certification[] = [
  {
    title: "3rd Place — Vibe Coding Competition",
    issuer: "ICCT Colleges",
    date: "", // TODO: add the month/year of the competition
    kind: "Award",
    skills: ["AI-assisted development", "Rapid prototyping", "Building under pressure"],
    href: "",
  },
  {
    title: "Full Stack Developer Certification",
    issuer: "freeCodeCamp",
    date: "", // TODO: add the date you earned it
    kind: "Certification",
    skills: ["HTML & CSS", "JavaScript", "React", "Node.js", "Databases"],
    href: "", // TODO: paste your freeCodeCamp certificate link to show a "Verify" button
  },
];
