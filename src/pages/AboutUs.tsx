
import React from "react";
import { Shield, Users, Clock, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AboutUs = () => {
  const teamMembers = [
    { 
      name: "Alexandra Chen", 
      role: "Founder & CEO", 
      bio: "Former law enforcement officer with 15 years of experience in public safety systems.",
      image: "/placeholder.svg"
    },
    { 
      name: "Marcus Johnson", 
      role: "Chief Technology Officer", 
      bio: "Data security expert with background in government database systems.",
      image: "/placeholder.svg"
    },
    { 
      name: "Sophia Williams", 
      role: "Director of Community Outreach", 
      bio: "Child safety advocate with extensive experience in community education programs.",
      image: "/placeholder.svg"
    },
    { 
      name: "David Park", 
      role: "Lead Developer", 
      bio: "Full-stack engineer specializing in secure database architecture and privacy-first design.",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium text-primary bg-primary/10 rounded-full">
              <Shield size={14} className="mr-1" /> Our Story
            </div>
            <h1 className="text-4xl font-bold mb-3">About SafeguardRegistry</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Building a safer community through transparent information and innovative technology.
            </p>
          </div>

          <Separator className="my-8" />
          
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-center">Our Mission</h2>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
                <p className="text-lg italic">
                  "To empower communities with accessible, accurate information that enhances public safety 
                  while respecting the privacy and dignity of all individuals."
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <Card>
                  <CardHeader className="text-center">
                    <Shield className="w-10 h-10 text-primary mx-auto mb-2" />
                    <CardTitle>Safety First</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">
                      We believe that community safety starts with reliable, accessible information that 
                      helps individuals make informed decisions.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="text-center">
                    <Users className="w-10 h-10 text-primary mx-auto mb-2" />
                    <CardTitle>Community Focus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">
                      Our platform is designed with communities in mind, providing tools that foster 
                      neighborhood awareness and cooperation.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="text-center">
                    <FileText className="w-10 h-10 text-primary mx-auto mb-2" />
                    <CardTitle>Ethical Data Use</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">
                      We commit to responsible data management, providing necessary information while 
                      preventing misuse or harassment.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-center">Our Story</h2>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/2">
                  <p className="text-muted-foreground mb-4">
                    SafeguardRegistry was founded in 2019 by Alexandra Chen, a former law enforcement officer 
                    who recognized the need for more accessible and user-friendly sex offender registry systems.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    After witnessing firsthand the challenges communities faced in accessing and understanding registry 
                    information, Alexandra assembled a team of technology and safety experts to create a modern, 
                    cloud-based solution.
                  </p>
                  <p className="text-muted-foreground">
                    Today, SafeguardRegistry serves communities across the nation, continually evolving our 
                    platform based on user feedback, technological advancements, and best practices in both 
                    public safety and data privacy.
                  </p>
                </div>
                <div className="w-full md:w-1/2 bg-muted/30 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Clock className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-medium">Our Timeline</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex">
                      <div className="mr-3 font-bold">2019</div>
                      <div className="text-muted-foreground">Company founded by Alexandra Chen</div>
                    </li>
                    <li className="flex">
                      <div className="mr-3 font-bold">2020</div>
                      <div className="text-muted-foreground">Launch of first registry dashboard</div>
                    </li>
                    <li className="flex">
                      <div className="mr-3 font-bold">2021</div>
                      <div className="text-muted-foreground">Added real-time notification system</div>
                    </li>
                    <li className="flex">
                      <div className="mr-3 font-bold">2022</div>
                      <div className="text-muted-foreground">Expanded to 25 states nationwide</div>
                    </li>
                    <li className="flex">
                      <div className="mr-3 font-bold">2023</div>
                      <div className="text-muted-foreground">Introduced interactive mapping features</div>
                    </li>
                    <li className="flex">
                      <div className="mr-3 font-bold">2024</div>
                      <div className="text-muted-foreground">Complete platform redesign with enhanced privacy controls</div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-center">Our Team</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our dedicated team brings together expertise in law enforcement, technology, 
                data privacy, and community advocacy.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="p-6">
                      <Avatar className="h-20 w-20 mx-auto mb-4">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <h3 className="font-semibold text-lg">{member.name}</h3>
                        <p className="text-primary text-sm mb-3">{member.role}</p>
                        <p className="text-muted-foreground text-sm">{member.bio}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-center">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Transparency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We believe in clear, honest communication about how our platform works, 
                      how data is collected and used, and the limitations of registry information.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Accessibility</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Critical safety information should be available to all community members, 
                      regardless of technical skill or background.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Innovation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We continuously explore new technologies to improve how registry 
                      information is delivered, visualized, and updated.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Respect</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      While providing public safety information, we maintain respect for the 
                      dignity of all individuals and work to prevent misuse of registry data.
                    </p>
                  </CardContent>
                </Card>
              </div>
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

export default AboutUs;
