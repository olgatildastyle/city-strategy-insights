"use client";

import { useState } from "react";
import type { Category, Decision } from "@/types/community";
import { categoryLabels } from "@/utils/categoryLabels";
import DecisionList from "@/components/DecisionList/DecisionList";
import css from "./DecisionFilter.module.css";

type FilterValue = Category | "all";

type DecisionFilterProps = {
  decisions: Decision[];
};

const filterOptions: FilterValue[] = [
  "all",
  "business",
  "housing",
  "education",
  "transport",
  "digitalization",
];

export default function DecisionFilter({ decisions }: DecisionFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<FilterValue>("all");

  const filteredDecisions =
    selectedCategory === "all"
      ? decisions
      : decisions.filter((decision) => decision.category === selectedCategory);

  return (
    <div>
      <div className={css.filters}>
        {filterOptions.map((option) => (
          <button
            key={option}
            type="button"
            className={`${css.button} ${
              selectedCategory === option ? css.active : ""
            }`}
            onClick={() => setSelectedCategory(option)}
          >
            {option === "all" ? "Усі" : categoryLabels[option]}
          </button>
        ))}
      </div>

      <DecisionList decisions={filteredDecisions} />
    </div>
  );
}
