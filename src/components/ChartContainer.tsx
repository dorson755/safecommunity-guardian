
import React, { ReactElement } from "react";

export interface ChartConfig {
  height: number;
  width?: number | string;
}

interface ChartContainerProps {
  config: ChartConfig;
  children: ReactElement;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ config, children }) => {
  return (
    <div className="w-full overflow-hidden" style={{ height: config.height, width: config.width || "100%" }}>
      {children}
    </div>
  );
};

export default ChartContainer;
