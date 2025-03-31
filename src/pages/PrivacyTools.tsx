
import React from "react";
import { Lock, Shield, Eye, UserCheck, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PrivacyTools = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-10">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium text-primary bg-primary/10 rounded-full">
              <Lock size={14} className="mr-1" /> Privacy Resources
            </div>
            <h1 className="text-4xl font-bold mb-3">Privacy Tools</h1>
            <p className="text-xl text-muted-foreground">
              Resources to protect your personal information while using our registry services.
            </p>
          </div>

          <Separator className="my-8" />
          
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="personal">Personal Privacy</TabsTrigger>
              <TabsTrigger value="family">Family Protection</TabsTrigger>
              <TabsTrigger value="online">Online Safety</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Protecting Your Information</h2>
                  <p className="mb-6 text-muted-foreground">
                    When using our registry services, we take multiple steps to ensure your personal information remains secure.
                  </p>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <EyeOff className="mr-2 h-5 w-5 text-primary" />
                          Anonymous Searching
                        </CardTitle>
                        <CardDescription>Search without revealing your identity</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          Our system allows you to search the registry without creating an account. No personal
                          information is required for basic searches.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          Enable Anonymous Mode
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Lock className="mr-2 h-5 w-5 text-primary" />
                          Search Privacy
                        </CardTitle>
                        <CardDescription>Control your search history</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          Manage or delete your search history at any time. Your search history is encrypted
                          and only visible to you.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          Manage Search History
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Privacy Controls</h2>
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Account Privacy Settings</CardTitle>
                      <CardDescription>
                        Customize how your information is used within our system
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        <li className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Profile Visibility</h3>
                            <p className="text-sm text-muted-foreground">Control who can see your profile</p>
                          </div>
                          <Button variant="outline" size="sm">Manage</Button>
                        </li>
                        <Separator />
                        <li className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Notification Privacy</h3>
                            <p className="text-sm text-muted-foreground">Control how you receive alerts</p>
                          </div>
                          <Button variant="outline" size="sm">Configure</Button>
                        </li>
                        <Separator />
                        <li className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Location Data</h3>
                            <p className="text-sm text-muted-foreground">Manage location tracking preferences</p>
                          </div>
                          <Button variant="outline" size="sm">Settings</Button>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </section>
              </div>
            </TabsContent>
            
            <TabsContent value="family">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Family Privacy Protection</h2>
                  <p className="mb-6 text-muted-foreground">
                    Tools designed to protect your family's information while using our services.
                  </p>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <UserCheck className="mr-2 h-5 w-5 text-primary" />
                        Family Safety Controls
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium">Household Privacy</h3>
                          <p className="text-muted-foreground mb-3">
                            Set up protected profiles for family members to ensure their data remains private.
                          </p>
                          <Button variant="outline" size="sm">Setup Family Profiles</Button>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="font-medium">Address Protection</h3>
                          <p className="text-muted-foreground mb-3">
                            When you set up alerts for your home address, we encrypt your location data to 
                            ensure it cannot be linked back to your identity.
                          </p>
                          <Button variant="outline" size="sm">Configure Address Privacy</Button>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="font-medium">School Zone Monitoring</h3>
                          <p className="text-muted-foreground mb-3">
                            Monitor school zones without revealing your children's specific school information.
                          </p>
                          <Button variant="outline" size="sm">Setup School Zone Alerts</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              </div>
            </TabsContent>
            
            <TabsContent value="online">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Online Safety Tools</h2>
                  <p className="mb-6 text-muted-foreground">
                    Digital tools to enhance your privacy and security online.
                  </p>
                  
                  <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Eye className="mr-2 h-5 w-5 text-primary" />
                          Secure Browsing
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          Our secure browsing option encrypts your connection to our registry services.
                        </p>
                        <Button variant="outline" size="sm" className="w-full">Enable</Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Lock className="mr-2 h-5 w-5 text-primary" />
                          Data Deletion
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          Request permanent deletion of your account data from our systems.
                        </p>
                        <Button variant="outline" size="sm" className="w-full">Request</Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Shield className="mr-2 h-5 w-5 text-primary" />
                          Privacy Audit
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          Request a report of all data we hold about your account.
                        </p>
                        <Button variant="outline" size="sm" className="w-full">Generate Report</Button>
                      </CardContent>
                    </Card>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Digital Privacy Best Practices</h2>
                  <Card>
                    <CardHeader>
                      <CardTitle>Protecting Your Digital Footprint</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>Use unique, strong passwords for all online accounts</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>Enable two-factor authentication wherever possible</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>Regularly check privacy settings on social media accounts</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>Be cautious about sharing location data on public platforms</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>Use a virtual private network (VPN) for additional privacy</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </section>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 p-6 border border-primary/20 rounded-lg bg-primary/5">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Our Privacy Commitment
            </h3>
            <p className="text-muted-foreground">
              At SafeguardRegistry, we are committed to balancing public safety with the privacy rights of all users. 
              Our tools are designed to provide critical safety information while respecting personal privacy.
            </p>
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

export default PrivacyTools;
