import React from "react";
import { GridCard as GridCardType } from "@/lib/types";
import GridCard from "./ui/GridCard";

export interface GridCardsProps {
  cards?: GridCardType[];
  children?: React.ReactNode;
  className?: string;
  cslp?: Record<string, any>;
}

export default function GridCards({
  cards,
  children,
  className = "",
  cslp,
}: GridCardsProps) {
  return (
    <div
      {...cslp}
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 ${className}`}
    >
      {cards && cards.length > 0
        ? cards.map((card, idx) => (
            <GridCard
              key={card._metadata?.uid || `card-${idx}`}
              card={card}
            />
          ))
        : children}
    </div>
  );
}
