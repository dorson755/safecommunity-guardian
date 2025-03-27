
// User roles
export type UserRole = "public" | "lawEnforcement" | "admin";

// User type
export type User = {
  id: string;
  username: string;
  email: string;
  role: UserRole;
};

// Offender type
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

// HeatMap point for visualization
export type HeatMapPoint = {
  coordinates: [number, number];
  intensity: number;
};

// Notification type
export type Notification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

// Alert area for geofencing notifications
export type AlertArea = {
  id: string;
  userId: string;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  radius: number; // in meters
  createdAt: string;
};

// Search filters type
export type SearchFilters = {
  offenseType: string;
  status: string;
  radius: number;
};

// Search log type
export type SearchLog = {
  id: string;
  userId?: string;
  searchQuery: string;
  filters?: SearchFilters;
  searchDate: string;
  ipAddress?: string;
};
