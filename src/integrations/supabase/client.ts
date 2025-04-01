
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tknousjzmfaoucblieox.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrbm91c2p6bWZhb3VjYmxpZW94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwOTUxMjcsImV4cCI6MjA1ODY3MTEyN30.sh66ZX6eV6-69xE22BQ5Oj8O0ngrlBvojB1RVFT2Mj4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Helper function to convert between database and frontend formats
export const transformOffenderFromDB = (offenderRecord: any): any => {
  if (!offenderRecord) return null;
  
  return {
    id: offenderRecord.id,
    name: offenderRecord.name,
    offenseType: offenderRecord.offense_type,
    registrationStatus: offenderRecord.registration_status,
    convictionDate: offenderRecord.conviction_date,
    lastKnownAddress: offenderRecord.last_known_address,
    longitude: offenderRecord.longitude,
    latitude: offenderRecord.latitude,
    crimeDetails: offenderRecord.crime_details || '',
    lastUpdate: offenderRecord.last_update
  };
};

export const transformOffenderToDB = (offender: any) => {
  return {
    name: offender.name,
    offense_type: offender.offenseType,
    registration_status: offender.registrationStatus,
    conviction_date: offender.convictionDate,
    last_known_address: offender.lastKnownAddress,
    longitude: offender.longitude,
    latitude: offender.latitude,
    crime_details: offender.crimeDetails,
    last_update: new Date().toISOString()
  };
};

// Helper function to insert demo data (for development only)
export const insertDemoOffenders = async () => {
  try {
    // Generate 20 random offenders
    const offenders = Array(20).fill(null).map((_, index) => {
      // Generate random coordinates in The Bahamas area
      const longitude = -77.3 + (Math.random() - 0.5) * 0.5;
      const latitude = 25.0 + (Math.random() - 0.5) * 0.5;
      
      // Random offense types
      const offenseTypes = [
        "Sexual assault",
        "Child endangerment",
        "Indecent exposure", 
        "Statutory offense",
        "Possession of illegal material"
      ];
      
      // Random status - explicitly typed as a union type
      const statuses: ("active" | "pending" | "expired")[] = ["active", "pending", "expired"];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)] as "active" | "pending" | "expired";
      
      // Random addresses
      const streets = ["Pine St", "Ocean Dr", "Palm Ave", "Harbor Rd", "Bahama Way", "Coral St"];
      const cities = ["Nassau", "Freeport", "Marsh Harbor", "Governor's Harbor"];
      
      return {
        name: `Demo Offender ${index + 1}`,
        offense_type: offenseTypes[Math.floor(Math.random() * offenseTypes.length)],
        last_known_address: `${Math.floor(Math.random() * 999) + 1} ${
          streets[Math.floor(Math.random() * streets.length)]
        }, ${cities[Math.floor(Math.random() * cities.length)]}`,
        longitude,
        latitude,
        conviction_date: new Date(Date.now() - Math.random() * 5 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        registration_status: randomStatus,
        crime_details: '',
      };
    });
    
    const { error } = await supabase.from('offenders').insert(offenders);
    
    if (error) {
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error inserting demo data:", error);
    return { success: false, error };
  }
};
