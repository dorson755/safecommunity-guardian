
import React from "react";
import { Shield, AlertTriangle, CheckCheck, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SafetyGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-10">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium text-primary bg-primary/10 rounded-full">
              <Shield size={14} className="mr-1" /> Safety Resources
            </div>
            <h1 className="text-4xl font-bold mb-3">Community Safety Guide</h1>
            <p className="text-xl text-muted-foreground">
              Practical guidance to help keep you and your loved ones safe.
            </p>
          </div>

          <Separator className="my-8" />
          
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Understanding the Registry</h2>
              <p className="mb-4 text-muted-foreground">
                The sex offender registry is designed to provide communities with information about convicted 
                sex offenders. This knowledge helps residents make informed decisions about their safety.
              </p>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="mr-2 h-5 w-5 text-primary" />
                    Registry Facts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium">What information is available?</h3>
                    <p className="text-muted-foreground">
                      The registry typically includes the offender's name, photograph, address, offense details, 
                      and risk level assessment.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">How often is it updated?</h3>
                    <p className="text-muted-foreground">
                      Registries are updated as information changes, including when offenders move or change employment.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Safety Strategies</h2>
              <p className="mb-6 text-muted-foreground">
                Knowledge is the first step in prevention. Consider these practical strategies to enhance 
                your family's safety:
              </p>
              
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCheck className="mr-2 h-5 w-5 text-green-600" />
                      For Children
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                        <span>Teach children about personal boundaries</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                        <span>Establish clear communication channels</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                        <span>Supervise online activities</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                        <span>Create a family safety plan</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCheck className="mr-2 h-5 w-5 text-green-600" />
                      For Adults
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                        <span>Be aware of your surroundings</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                        <span>Regularly check registry updates for your area</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                        <span>Use the notification system for updates</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                        <span>Report suspicious behavior to authorities</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Warning Signs</h2>
              <p className="mb-6 text-muted-foreground">
                Understanding potential warning signs can help identify concerning behavior. Be alert for:
              </p>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                    Concerning Behaviors
                  </CardTitle>
                  <CardDescription>These may indicate potential risk factors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                        <span>Excessive interest in spending time with children</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                        <span>Ignoring children's physical boundaries</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                        <span>Insisting on physical affection</span>
                      </li>
                    </ul>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                        <span>Taking excessive photographs of children</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                        <span>Exposing children to adult content</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                        <span>Secretive behavior around children</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
          
          <div className="mt-12 p-6 border border-primary/20 rounded-lg bg-primary/5">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Remember
            </h3>
            <p className="text-muted-foreground">
              The registry is one tool among many for community safety. It's important to use this information 
              responsibly and avoid vigilante behavior. If you have concerns, contact local law enforcement.
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

export default SafetyGuide;
