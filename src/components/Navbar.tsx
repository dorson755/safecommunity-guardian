
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Shield, Search, Map, Info, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Function to scroll to map section
  const scrollToMap = () => {
    const mapSection = document.querySelector('section:has(#map-section)');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="font-semibold text-xl">SafeguardRegistry</span>
          </Link>
        </div>

        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="lg:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>

            {isMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md p-4 flex flex-col space-y-2 animate-fade-in max-h-[80vh] overflow-y-auto">
                <Button variant="ghost" className="justify-start" asChild>
                  <Link to="/search" onClick={() => setIsMenuOpen(false)}>
                    <Search className="mr-2 h-4 w-4" /> Search Registry
                  </Link>
                </Button>
                <Button variant="ghost" className="justify-start" onClick={scrollToMap}>
                  <Map className="mr-2 h-4 w-4" /> View Map
                </Button>
                
                <Button variant="ghost" className="justify-start font-medium" disabled>
                  Resources
                </Button>
                
                <Button variant="ghost" className="justify-start pl-6" asChild>
                  <Link to="/safety-guide" onClick={() => setIsMenuOpen(false)}>Safety Guide</Link>
                </Button>
                <Button variant="ghost" className="justify-start pl-6" asChild>
                  <Link to="/legal-information" onClick={() => setIsMenuOpen(false)}>Legal Information</Link>
                </Button>
                <Button variant="ghost" className="justify-start pl-6" asChild>
                  <Link to="/privacy-tools" onClick={() => setIsMenuOpen(false)}>Privacy Tools</Link>
                </Button>
                
                <Button variant="ghost" className="justify-start font-medium" disabled>
                  Company
                </Button>
                
                <Button variant="ghost" className="justify-start pl-6" asChild>
                  <Link to="/about-us" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                </Button>
                <Button variant="ghost" className="justify-start pl-6" asChild>
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                </Button>
                <Button variant="ghost" className="justify-start pl-6" asChild>
                  <Link to="/careers" onClick={() => setIsMenuOpen(false)}>Careers</Link>
                </Button>
                
                <Button variant="ghost" className="justify-start font-medium" disabled>
                  Legal
                </Button>
                
                <Button variant="ghost" className="justify-start pl-6" asChild>
                  <Link to="/privacy-policy" onClick={() => setIsMenuOpen(false)}>Privacy Policy</Link>
                </Button>
                <Button variant="ghost" className="justify-start pl-6" asChild>
                  <Link to="/terms-of-service" onClick={() => setIsMenuOpen(false)}>Terms of Service</Link>
                </Button>
                <Button variant="ghost" className="justify-start pl-6" asChild>
                  <Link to="/compliance" onClick={() => setIsMenuOpen(false)}>Compliance</Link>
                </Button>
                
                <Button className="w-full mt-2">Sign In</Button>
              </div>
            )}
          </>
        ) : (
          <div className="hidden lg:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/search">
                    <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
                      <Search className="mr-2 h-4 w-4" /> Search Registry
                    </Button>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Button variant="ghost" className="text-foreground/80 hover:text-foreground" onClick={scrollToMap}>
                    <Map className="mr-2 h-4 w-4" /> View Map
                  </Button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground/80 hover:text-foreground">
                    <Info className="mr-2 h-4 w-4" /> Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] grid-cols-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/safety-guide" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                            <div className="font-medium">Safety Guide</div>
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                              Practical guidance to help keep you and your loved ones safe.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/legal-information" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                            <div className="font-medium">Legal Information</div>
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                              Understanding the legal framework behind sex offender registries.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li className="col-span-2">
                        <NavigationMenuLink asChild>
                          <Link to="/privacy-tools" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                            <div className="font-medium">Privacy Tools</div>
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                              Resources to protect your personal information while using our registry services.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground/80 hover:text-foreground">
                    Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] grid-cols-1">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/about-us" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                            <div className="font-medium">About Us</div>
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                              Learn about our mission to build safer communities.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/contact" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                            <div className="font-medium">Contact</div>
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                              Get in touch with our team for questions or support.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/careers" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                            <div className="font-medium">Careers</div>
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                              Join our team in making communities safer.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Button>Sign In</Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
