
import React, { ReactElement } from "react";

export interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

interface ChartContainerProps {
  config: ChartConfig;
  className?: string;
  children: ReactElement;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ config, className, children }) => {
  return (
    <div className={`w-full h-full flex items-center justify-center overflow-hidden ${className || ""}`}>
      {children}
    </div>
  );
};

export const ChartTooltip = ({ content }: { content: React.ReactNode }) => {
  return content;
};

export const ChartTooltipContent = ({ 
  active, 
  payload, 
  label,
  labelFormatter,
  valueFormatter 
}: { 
  active?: boolean;
  payload?: any[];
  label?: string;
  labelFormatter?: (value: any) => string;
  valueFormatter?: (value: any) => string;
}) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="bg-background border rounded-md shadow-md p-2 text-xs">
      <div className="font-medium mb-1">
        {labelFormatter ? labelFormatter(label) : label}
      </div>
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center">
            <span
              className="h-2 w-2 rounded-full mr-1"
              style={{ backgroundColor: entry.color }}
            />
            <span className="mr-1">{entry.name}:</span>
            <span className="font-medium">{valueFormatter ? valueFormatter(entry.value) : entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartContainer;
