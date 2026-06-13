import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { AnimatedCounter } from "../Animated Freamer Motion/AnimatedCounter";

export function ProgressCircle({
  value = 65,
  size = 160,

}) {
  const data = [
    { name: "progress", value },
    { name: "remaining", value: 100 - value },
  ];
const COLORS = ["#437FF7", "#E5ECED"];

  return (
    <div className="relative flex items-center justify-center">
      <PieChart width={size} height={size}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          // innerRadius={size / 2 - strokeWidth}
          outerRadius={size / 2}
          startAngle={90}
          endAngle={-270}
          paddingAngle={0}
          dataKey="value"
          stroke="none"
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>

      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-xl font-semibold text-gray-800">
         <AnimatedCounter value={value} duration={2.1} />%
        </span>
      </div>
      
    </div>
    
  );
}