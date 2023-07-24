import * as React from "react";
import Chip from "@mui/material/Chip";

interface ChipsProps {
  label: string;
}

export default function Chips({ label }: ChipsProps) {
  let color:string = "default";
  const colorMap = new Map([
    ["small", "default"],
    ["medium", "secondary"],
    ["large", "error"],
    ["Xl", "warning"],
  ]);

  color = colorMap.get(label?.toString()?.toLowerCase()) || "warning";

  if (label?.toString()?.toLowerCase() !== "xl") {
    label = label?.toString()?.toUpperCase()?.charAt(0);
  } else {
    label = label?.toString()?.toUpperCase();
  }

  return <Chip color={color} label={label?label:""} />;
}
