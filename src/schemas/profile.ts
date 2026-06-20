export default interface Profile {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
  bannerUrl?: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    [key: string]: string | undefined; // Allow for additional social links
  };
  score?: number; // Optional score field
  achievements?: string[]; // Optional achievements field
  preferences?: {
    theme?: "light" | "dark";
    language?: string;
    [key: string]: any; // Allow for additional preferences
  };
  experienceLevel?: "beginner" | "intermediate" | "advanced"; // Optional experience level
  lastLogin?: Date; // Optional last login date
  isActive?: boolean; // Optional active status
  roles?: string[]; // Optional roles field
}