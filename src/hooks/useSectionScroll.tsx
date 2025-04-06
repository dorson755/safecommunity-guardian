
import { useRef, useEffect } from "react";

interface SectionRef {
  [key: string]: React.RefObject<HTMLElement>;
}

export const useSectionScroll = () => {
  const sectionRefs: SectionRef = {};
  
  const registerSection = (sectionName: string) => {
    if (!sectionRefs[sectionName]) {
      sectionRefs[sectionName] = useRef<HTMLElement>(null);
    }
    return sectionRefs[sectionName];
  };
  
  const scrollToSection = (sectionName: string) => {
    if (sectionRefs[sectionName]?.current) {
      sectionRefs[sectionName].current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  return {
    registerSection,
    scrollToSection
  };
};
