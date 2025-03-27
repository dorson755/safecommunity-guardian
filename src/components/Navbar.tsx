
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Shield, Search, Map, Info, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
          <Shield className="w-8 h-8 text-primary" />
          <span className="font-semibold text-xl">SafeguardRegistry</span>
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
              <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md p-4 flex flex-col space-y-2 animate-fade-in">
                <Button variant="ghost" className="justify-start">
                  <Search className="mr-2 h-4 w-4" /> Search Registry
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Map className="mr-2 h-4 w-4" /> View Map
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Info className="mr-2 h-4 w-4" /> Safety Resources
                </Button>
                <Button className="w-full mt-2">Sign In</Button>
              </div>
            )}
          </>
        ) : (
          <div className="hidden lg:flex items-center space-x-6">
            <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
              <Search className="mr-2 h-4 w-4" /> Search Registry
            </Button>
            <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
              <Map className="mr-2 h-4 w-4" /> View Map
            </Button>
            <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
              <Info className="mr-2 h-4 w-4" /> Safety Resources
            </Button>
            <Button>Sign In</Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
