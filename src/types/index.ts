// ============================================
// Astro Playground – Shared Types
// ============================================

export interface Planet {
  name: string;
  gravity: number; // m/s²
  radius: number; // km
  mass: number; // kg
  orbitalPeriod: number; // Earth days
  distanceFromSun: number; // AU
  color: string;
  icon: string; // path to /public asset (e.g. "/planets/mercury.png")
  escapeVelocity: number; // km/s
  type: "rocky" | "gas" | "ice" | "dwarf";
}

export interface Moon {
  name: string;
  gravity: number;
  parentPlanet: string;
  icon: string;
}

export interface Constellation {
  name: string;
  latinName: string;
  stars: number;
  season: "spring" | "summer" | "autumn" | "winter";
  description: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: "constellation" | "planet" | "general" | "physics";
  difficulty: "easy" | "medium" | "hard";
}

export interface MeteorShower {
  name: string;
  peak: string; // "Aug 12-13"
  constellation: string;
  zhr: number; // Zenith Hourly Rate
  speed: number; // km/s
  description: string;
}

export interface UserProfile {
  username: string;
  level: number;
  xp: number;
  xpToNext: number;
  quizzesCompleted: number;
  toolsUsed: number;
  explorationTime: string;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

export interface ActivityItem {
  id: string;
  type: "calculation" | "quiz" | "exploration";
  title: string;
  result: string;
  timestamp: string;
  icon: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  section?: string;
}

export interface StatItem {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}
