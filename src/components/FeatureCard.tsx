
import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className,
}: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-xl",
        className
      )}
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      
      <div className="absolute -bottom-1 -right-1 h-20 w-20 rounded-full bg-primary/5 opacity-0 transition-all duration-500 group-hover:opacity-100"></div>
    </div>
  );
};

export default FeatureCard;
