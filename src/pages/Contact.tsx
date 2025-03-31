
import React from "react";
import { Mail, Phone, MapPin, Clock, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the form data to a server
    toast({
      title: "Message sent",
      description: "Thank you for contacting us. We'll respond soon.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium text-primary bg-primary/10 rounded-full">
              <Mail size={14} className="mr-1" /> Get In Touch
            </div>
            <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions or feedback? Our team is here to help.
            </p>
          </div>

          <Separator className="my-8" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-primary mt-0.5 mr-3" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-muted-foreground">support@safeguardregistry.com</p>
                        <p className="text-muted-foreground">info@safeguardregistry.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-primary mt-0.5 mr-3" />
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-muted-foreground">(555) 123-4567 (Main)</p>
                        <p className="text-muted-foreground">(555) 987-6543 (Support)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3" />
                      <div>
                        <h3 className="font-medium">Address</h3>
                        <p className="text-muted-foreground">
                          123 Safety Street<br />
                          Suite 405<br />
                          Seattle, WA 98101
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-primary mt-0.5 mr-3" />
                      <div>
                        <h3 className="font-medium">Hours</h3>
                        <p className="text-muted-foreground">
                          Monday - Friday: 9am - 5pm PST<br />
                          Saturday: 10am - 2pm PST<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                    <h3 className="font-medium">Emergency Notice</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    This is not an emergency reporting system. If you have an emergency or need to report a crime in progress, please call 911 immediately.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your full name" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your.email@example.com" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help?" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Inquiry Type</Label>
                      <RadioGroup defaultValue="general">
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="general" id="general" />
                            <Label htmlFor="general">General Question</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="technical" id="technical" />
                            <Label htmlFor="technical">Technical Support</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="feedback" id="feedback" />
                            <Label htmlFor="feedback">Feedback</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Please provide details about your inquiry..." 
                        className="min-h-[150px]" 
                        required 
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">Send Message</Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this form, you agree to our privacy policy and terms of service.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
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

export default Contact;
