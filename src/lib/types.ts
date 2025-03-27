
export type Offender = {
  id: string;
  name: string;
  offenseType: string;
  registrationStatus: "active" | "pending" | "expired";
  convictionDate: string;
  lastKnownAddress: string;
  coordinates: [number, number]; // [longitude, latitude]
  crimeDetails: string;
  lastUpdate: string;
};

export type HeatMapPoint = {
  coordinates: [number, number];
  intensity: number;
};

export type UserRole = "public" | "lawEnforcement" | "admin";

export type User = {
  id: string;
  username: string;
  email: string;
  role: UserRole;
};
