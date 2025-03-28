
import { supabase } from "@/integrations/supabase/client";
import { Offender } from "./types";

export const insertMockOffenders = async () => {
  // Check if offenders already exist to avoid duplicates
  const { count } = await supabase
    .from('offenders')
    .select('*', { count: 'exact', head: true });

  if (count && count > 0) {
    console.log('Mock offenders already exist, skipping insertion');
    return;
  }

  console.log('Inserting mock offenders...');

  // Define mock offender data
  const mockOffenders = [
    {
      name: "John Doe",
      offense_type: "Sexual Assault",
      registration_status: "active" as const,
      conviction_date: "2019-05-12",
      last_known_address: "123 Main St, New York, NY",
      location: `POINT(-73.9712 40.7831)`, // New York
      crime_details: "Convicted of assault against an adult",
      last_update: new Date().toISOString()
    },
    {
      name: "Richard Smith",
      offense_type: "Child Abuse",
      registration_status: "active" as const,
      conviction_date: "2020-07-22",
      last_known_address: "456 Pine Ave, Los Angeles, CA",
      location: `POINT(-118.2437 34.0522)`, // Los Angeles
      crime_details: "Convicted of abuse against a minor",
      last_update: new Date().toISOString()
    },
    {
      name: "Michael Johnson",
      offense_type: "Indecent Exposure",
      registration_status: "expired" as const,
      conviction_date: "2018-02-10",
      last_known_address: "789 Oak Dr, Chicago, IL",
      location: `POINT(-87.6298 41.8781)`, // Chicago
      crime_details: "Convicted of indecent exposure in a public space",
      last_update: new Date().toISOString()
    },
    {
      name: "David Wilson",
      offense_type: "Sexual Assault",
      registration_status: "active" as const,
      conviction_date: "2021-11-15",
      last_known_address: "101 Elm St, Houston, TX",
      location: `POINT(-95.3698 29.7604)`, // Houston
      crime_details: "Convicted of assault against an adult",
      last_update: new Date().toISOString()
    },
    {
      name: "Thomas Brown",
      offense_type: "Child Pornography",
      registration_status: "active" as const,
      conviction_date: "2022-01-30",
      last_known_address: "202 Maple Rd, Phoenix, AZ",
      location: `POINT(-112.0740 33.4484)`, // Phoenix
      crime_details: "Possession and distribution of explicit material involving minors",
      last_update: new Date().toISOString()
    },
    {
      name: "Christopher Davis",
      offense_type: "Stalking",
      registration_status: "pending" as const,
      conviction_date: "2022-09-18",
      last_known_address: "303 Cedar Ln, Philadelphia, PA",
      location: `POINT(-75.1652 39.9526)`, // Philadelphia
      crime_details: "Convicted of stalking and harassment",
      last_update: new Date().toISOString()
    },
    {
      name: "James Miller",
      offense_type: "Sexual Harassment",
      registration_status: "active" as const,
      conviction_date: "2020-03-25",
      last_known_address: "404 Birch Blvd, San Antonio, TX",
      location: `POINT(-98.4936 29.4241)`, // San Antonio
      crime_details: "Workplace sexual harassment with multiple victims",
      last_update: new Date().toISOString()
    },
    {
      name: "Robert Taylor",
      offense_type: "Sexual Assault",
      registration_status: "active" as const,
      conviction_date: "2021-06-07",
      last_known_address: "505 Walnut Way, San Diego, CA",
      location: `POINT(-117.1611 32.7157)`, // San Diego
      crime_details: "Convicted of assault against multiple adults",
      last_update: new Date().toISOString()
    },
    {
      name: "William Martin",
      offense_type: "Child Abuse",
      registration_status: "expired" as const,
      conviction_date: "2017-12-12",
      last_known_address: "606 Pineapple Pl, Dallas, TX",
      location: `POINT(-96.7970 32.7767)`, // Dallas
      crime_details: "Physical abuse of a minor",
      last_update: new Date().toISOString()
    },
    {
      name: "Daniel Anderson",
      offense_type: "Rape",
      registration_status: "active" as const,
      conviction_date: "2022-04-19",
      last_known_address: "707 Apple Ave, San Jose, CA",
      location: `POINT(-121.8863 37.3382)`, // San Jose
      crime_details: "Convicted of assault with force",
      last_update: new Date().toISOString()
    },
  ];

  // Insert mock data using the Supabase client
  for (const offender of mockOffenders) {
    const { error } = await supabase
      .from('offenders')
      .insert(offender);

    if (error) {
      console.error('Error inserting mock offender:', error);
    }
  }

  console.log('Mock offenders inserted successfully');
};

// Export the same data as static mock data for use in components
export const mockOffenders: Offender[] = [
  {
    id: "1",
    name: "John Doe",
    offenseType: "Sexual Assault",
    registrationStatus: "active",
    convictionDate: "2019-05-12",
    lastKnownAddress: "123 Main St, New York, NY",
    coordinates: [-73.9712, 40.7831], // New York
    crimeDetails: "Convicted of assault against an adult",
    lastUpdate: "2023-01-15",
  },
  {
    id: "2",
    name: "Richard Smith",
    offenseType: "Child Abuse",
    registrationStatus: "active",
    convictionDate: "2020-07-22",
    lastKnownAddress: "456 Pine Ave, Los Angeles, CA",
    coordinates: [-118.2437, 34.0522], // Los Angeles
    crimeDetails: "Convicted of abuse against a minor",
    lastUpdate: "2023-03-20",
  },
  {
    id: "3",
    name: "Michael Johnson",
    offenseType: "Indecent Exposure",
    registrationStatus: "expired",
    convictionDate: "2018-02-10",
    lastKnownAddress: "789 Oak Dr, Chicago, IL",
    coordinates: [-87.6298, 41.8781], // Chicago
    crimeDetails: "Convicted of indecent exposure in a public space",
    lastUpdate: "2022-11-05",
  },
  {
    id: "4",
    name: "David Wilson",
    offenseType: "Sexual Assault",
    registrationStatus: "active",
    convictionDate: "2021-11-15",
    lastKnownAddress: "101 Elm St, Houston, TX",
    coordinates: [-95.3698, 29.7604], // Houston
    crimeDetails: "Convicted of assault against an adult",
    lastUpdate: "2023-05-07",
  },
  {
    id: "5",
    name: "Thomas Brown",
    offenseType: "Child Pornography",
    registrationStatus: "active",
    convictionDate: "2022-01-30",
    lastKnownAddress: "202 Maple Rd, Phoenix, AZ",
    coordinates: [-112.0740, 33.4484], // Phoenix
    crimeDetails: "Possession and distribution of explicit material involving minors",
    lastUpdate: "2023-06-12",
  },
  {
    id: "6",
    name: "Christopher Davis",
    offenseType: "Stalking",
    registrationStatus: "pending",
    convictionDate: "2022-09-18",
    lastKnownAddress: "303 Cedar Ln, Philadelphia, PA",
    coordinates: [-75.1652, 39.9526], // Philadelphia
    crimeDetails: "Convicted of stalking and harassment",
    lastUpdate: "2023-04-29",
  },
  {
    id: "7",
    name: "James Miller",
    offenseType: "Sexual Harassment",
    registrationStatus: "active",
    convictionDate: "2020-03-25",
    lastKnownAddress: "404 Birch Blvd, San Antonio, TX",
    coordinates: [-98.4936, 29.4241], // San Antonio
    crimeDetails: "Workplace sexual harassment with multiple victims",
    lastUpdate: "2023-02-18",
  },
  {
    id: "8",
    name: "Robert Taylor",
    offenseType: "Sexual Assault",
    registrationStatus: "active",
    convictionDate: "2021-06-07",
    lastKnownAddress: "505 Walnut Way, San Diego, CA",
    coordinates: [-117.1611, 32.7157], // San Diego
    crimeDetails: "Convicted of assault against multiple adults",
    lastUpdate: "2023-07-01",
  },
  {
    id: "9",
    name: "William Martin",
    offenseType: "Child Abuse",
    registrationStatus: "expired",
    convictionDate: "2017-12-12",
    lastKnownAddress: "606 Pineapple Pl, Dallas, TX",
    coordinates: [-96.7970, 32.7767], // Dallas
    crimeDetails: "Physical abuse of a minor",
    lastUpdate: "2022-10-10",
  },
  {
    id: "10",
    name: "Daniel Anderson",
    offenseType: "Rape",
    registrationStatus: "active",
    convictionDate: "2022-04-19",
    lastKnownAddress: "707 Apple Ave, San Jose, CA",
    coordinates: [-121.8863, 37.3382], // San Jose
    crimeDetails: "Convicted of assault with force",
    lastUpdate: "2023-08-05",
  },
];

// Add helper functions to generate data for the heatmap from the mock data
export const generateHeatMapPoints = () => {
  return mockOffenders
    .filter(offender => offender.registrationStatus === "active")
    .map(offender => ({
      coordinates: offender.coordinates,
      intensity: Math.random() * 0.5 + 0.5, // Random intensity between 0.5 and 1
    }));
};

export const getOffendersByType = (type: string) => {
  if (type === "all") return mockOffenders;
  return mockOffenders.filter(offender => offender.offenseType.toLowerCase().includes(type.toLowerCase()));
};

export const getOffendersByStatus = (status: string) => {
  if (status === "all") return mockOffenders;
  return mockOffenders.filter(offender => offender.registrationStatus === status);
};

export const searchOffenders = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return mockOffenders.filter(
    offender =>
      offender.name.toLowerCase().includes(lowerQuery) ||
      offender.offenseType.toLowerCase().includes(lowerQuery) ||
      offender.lastKnownAddress.toLowerCase().includes(lowerQuery)
  );
};
