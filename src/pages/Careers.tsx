
import React, { useState } from "react";
import { Briefcase, Users, CheckCheck, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Careers = () => {
  const [filter, setFilter] = useState("all");
  
  const departments = ["Engineering", "Data Science", "Customer Support", "Marketing", "Legal"];
  
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Frontend Engineer",
      department: "Engineering",
      location: "Seattle, WA",
      type: "Full-time",
      remote: true,
      description: "Join our team to build user interfaces that keep communities safe through intuitive design and accessibility.",
      requirements: [
        "5+ years of experience with modern JS frameworks (React preferred)",
        "Experience with TypeScript and state management",
        "Understanding of accessibility standards",
        "Background in data visualization is a plus"
      ]
    },
    {
      id: 2,
      title: "Backend Engineer",
      department: "Engineering",
      location: "Seattle, WA",
      type: "Full-time",
      remote: true,
      description: "Help build secure, scalable APIs and database systems to power our registry platform.",
      requirements: [
        "3+ years of experience with backend technologies",
        "Strong knowledge of database design and optimization",
        "Experience with secure data handling protocols",
        "Background in Node.js, Python or similar technologies"
      ]
    },
    {
      id: 3,
      title: "Data Privacy Officer",
      department: "Legal",
      location: "Seattle, WA",
      type: "Full-time",
      remote: false,
      description: "Ensure our platform maintains the highest standards of data privacy and compliance.",
      requirements: [
        "5+ years of experience in data privacy or legal compliance",
        "Knowledge of relevant data protection regulations",
        "Experience in the public safety or government sector preferred",
        "Strong communication skills"
      ]
    },
    {
      id: 4,
      title: "Community Support Specialist",
      department: "Customer Support",
      location: "Multiple Locations",
      type: "Full-time",
      remote: true,
      description: "Be the front line of our support team, helping community members navigate our registry system effectively.",
      requirements: [
        "2+ years of customer support experience",
        "Excellent communication and empathy skills",
        "Ability to explain technical concepts clearly",
        "Experience with helpdesk or support ticket systems"
      ]
    },
    {
      id: 5,
      title: "Data Scientist",
      department: "Data Science",
      location: "Remote",
      type: "Full-time",
      remote: true,
      description: "Analyze patterns and develop insights to help communities better understand and utilize registry data.",
      requirements: [
        "Master's degree in Data Science, Statistics, or related field",
        "3+ years experience with data analysis and visualization",
        "Experience with machine learning algorithms",
        "Knowledge of Python and R"
      ]
    },
    {
      id: 6,
      title: "Community Outreach Coordinator",
      department: "Marketing",
      location: "Multiple Locations",
      type: "Part-time",
      remote: false,
      description: "Develop and implement community education programs about registry use and safety awareness.",
      requirements: [
        "Background in community outreach or public education",
        "Strong presentation and communication skills",
        "Experience organizing community events",
        "Passion for public safety initiatives"
      ]
    }
  ];
  
  const filteredJobs = filter === "all" ? 
    jobOpenings : 
    jobOpenings.filter(job => job.department === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium text-primary bg-primary/10 rounded-full">
              <Briefcase size={14} className="mr-1" /> Join Our Team
            </div>
            <h1 className="text-4xl font-bold mb-3">Careers at SafeguardRegistry</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Help us build technology that makes communities safer.
            </p>
          </div>

          <Separator className="my-8" />
          
          <div className="space-y-12">
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Why Work With Us</h2>
                  <p className="text-muted-foreground mb-4">
                    At SafeguardRegistry, we're passionate about building technology that has a meaningful 
                    impact on community safety. Our team combines technical expertise with a deep commitment 
                    to public service.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    We offer a collaborative environment where innovative ideas are encouraged and 
                    the work you do directly contributes to safer neighborhoods across the country.
                  </p>
                  
                  <ul className="space-y-2 mt-6">
                    <li className="flex items-start">
                      <CheckCheck className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <span>Meaningful work with direct community impact</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCheck className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <span>Competitive salaries and comprehensive benefits</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCheck className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <span>Flexible remote and hybrid work options</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCheck className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <span>Professional development and growth opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCheck className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <span>Collaborative and inclusive company culture</span>
                    </li>
                  </ul>
                </div>
                
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 text-primary mr-2" />
                      Our Team Culture
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      "SafeguardRegistry has given me the opportunity to use my technical skills for something 
                      that truly matters. The collaborative environment and focus on impact makes this the most 
                      rewarding role I've had in my career."
                    </p>
                    <div>
                      <p className="font-medium">David Park</p>
                      <p className="text-sm text-muted-foreground">Lead Developer, 3 years at SafeguardRegistry</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-6">Current Openings</h2>
              
              <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All Departments</TabsTrigger>
                  {departments.map(dept => (
                    <TabsTrigger key={dept} value={dept}>{dept}</TabsTrigger>
                  ))}
                </TabsList>
                
                <TabsContent value={filter}>
                  {filteredJobs.length > 0 ? (
                    <div className="space-y-4">
                      {filteredJobs.map((job) => (
                        <Card key={job.id} className="overflow-hidden">
                          <CardHeader>
                            <div className="flex flex-wrap justify-between items-start gap-2">
                              <div>
                                <CardTitle>{job.title}</CardTitle>
                                <CardDescription className="mt-1">{job.department} • {job.location}</CardDescription>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline">{job.type}</Badge>
                                {job.remote && <Badge variant="secondary">Remote eligible</Badge>}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground mb-4">{job.description}</p>
                            <div>
                              <h4 className="font-medium mb-2">Requirements:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                {job.requirements.map((req, i) => (
                                  <li key={i}>{req}</li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                          <CardFooter className="bg-muted/20">
                            <Button>Apply Now</Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="text-center p-12">
                      <CardContent>
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                          <Briefcase className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold">No open positions</h3>
                        <p className="text-muted-foreground mt-2 mb-4">
                          We don't have any open positions in this department right now.
                        </p>
                        <Button variant="outline" onClick={() => setFilter("all")}>
                          View All Departments
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </section>
            
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 text-primary mr-2" />
                    Our Commitment to Diversity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    SafeguardRegistry is an equal opportunity employer. We celebrate diversity and are committed to 
                    creating an inclusive environment for all employees. We believe that diverse perspectives 
                    strengthen our team and improve the solutions we provide to communities.
                  </p>
                </CardContent>
              </Card>
            </section>
            
            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Don't See a Perfect Match?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're always looking for talented individuals who are passionate about community safety and 
                innovative technology. Submit your resume for future opportunities.
              </p>
              <Button>Submit General Application</Button>
            </section>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-muted/30 py-8 border-t">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SafeguardRegistry. All rights reserved.</p>
          <p className="mt-1">This is a demo application. No real data is used.</p>
        </div>
      </footer>
    </div>
  );
};

export default Careers;
