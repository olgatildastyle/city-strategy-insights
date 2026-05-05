"use client";

import { useState } from "react";
import type { Achievement, Category, Decision } from "@/types/community";
import { categoryLabels } from "@/utils/categoryLabels";
import AchievementList from "@/components/AchievementList/AchievementList";
import css from "./AchievementFilter.module.css";

type FilterValue = Category | "all";

type AchievementFilterProps = {
  achievements: Achievement[];
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

export default function AchievementFilter({
  achievements,
  decisions,
}: AchievementFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<FilterValue>("all");

  const filteredAchievements =
    selectedCategory === "all"
      ? achievements
      : achievements.filter(
          (achievement) => achievement.category === selectedCategory,
        );

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

      <AchievementList
        achievements={filteredAchievements}
        decisions={decisions}
      />
    </div>
  );
}
