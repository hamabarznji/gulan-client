import * as React from "react";
import Chip from "@mui/material/Chip";

interface ChipsProps {
  label: number;
}
export default function Chips({ label }: ChipsProps) {
  let color = "default";

  if (label >= 100 && label < 300) {
    color = "warning";
  } else if (label >= 300 && label < 500) {
    color = "secondary";
  } else if (label >= 500) {
    color = "error";
  }

  return <Chip color={color} label={label} />;
}
