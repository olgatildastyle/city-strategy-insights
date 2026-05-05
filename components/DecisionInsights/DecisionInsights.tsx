"use client";

import { useState } from "react";
import type { Achievement, Category, Decision } from "@/types/community";
import { categoryLabels } from "@/utils/categoryLabels";
import css from "./DecisionInsights.module.css";

type DecisionInsightsProps = {
  decisions: Decision[];
  achievements: Achievement[];
};

type FilterValue = Category | "all";

const filterOptions: FilterValue[] = [
  "all",
  "business",
  "housing",
  "education",
  "transport",
  "digitalization",
];

export default function DecisionInsights({
  decisions,
  achievements,
}: DecisionInsightsProps) {
  const [selectedCategory, setSelectedCategory] = useState<FilterValue>("all");
  const [selectedDecisionId, setSelectedDecisionId] = useState<string | null>(
    decisions[0]?.id ?? null,
  );

  const filteredDecisions =
    selectedCategory === "all"
      ? decisions
      : decisions.filter((decision) => decision.category === selectedCategory);

  const selectedDecision = decisions.find(
    (decision) => decision.id === selectedDecisionId,
  );

  const relatedAchievements = achievements.filter(
    (achievement) => achievement.decisionId === selectedDecisionId,
  );

  const handleCategoryChange = (category: FilterValue) => {
    setSelectedCategory(category);

    const nextDecisions =
      category === "all"
        ? decisions
        : decisions.filter((decision) => decision.category === category);

    setSelectedDecisionId(nextDecisions[0]?.id ?? null);
  };

  return (
    <div>
      <div className={css.filters}>
        {filterOptions.map((option) => (
          <button
            key={option}
            type="button"
            className={`${css.filterButton} ${
              selectedCategory === option ? css.activeFilter : ""
            }`}
            onClick={() => handleCategoryChange(option)}
          >
            {option === "all" ? "Усі" : categoryLabels[option]}
          </button>
        ))}
      </div>

      <div className={css.wrapper}>
        <ul className={css.decisionList}>
          {filteredDecisions.map((decision) => {
            const achievementsCount = achievements.filter(
              (achievement) => achievement.decisionId === decision.id,
            ).length;

            const hasAchievements = achievementsCount > 0;

            return (
              <li key={decision.id}>
                <button
                  className={`${css.decisionButton} ${
                    selectedDecisionId === decision.id ? css.active : ""
                  } ${
                    hasAchievements ? css.hasAchievements : css.noAchievements
                  }`}
                  type="button"
                  onClick={() => setSelectedDecisionId(decision.id)}
                >
                  <span className={css.number}>{decision.number}</span>
                  <span>{decision.title}</span>

                  <span className={css.metaRow}>
                    <span className={css.category}>
                      {categoryLabels[decision.category]}
                    </span>

                    {hasAchievements ? (
                      <span className={css.achievementBadge}>
                        Є досягнення: {achievementsCount}
                      </span>
                    ) : (
                      <span className={css.problemBadge}>Без досягнень</span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className={css.resultBox}>
          {selectedDecision ? (
            <>
              <h3 className={css.resultTitle}>
                Досягнення за рішенням {selectedDecision.number}
              </h3>

              {relatedAchievements.length > 0 ? (
                <ul className={css.achievementList}>
                  {relatedAchievements.map((achievement) => (
                    <li key={achievement.id} className={css.achievementItem}>
                      <p className={css.achievementYear}>{achievement.year}</p>
                      <h4>{achievement.title}</h4>
                      <p>{achievement.result}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={css.empty}>
                  Для цього рішення поки немає пов’язаних досягнень.
                </p>
              )}
            </>
          ) : (
            <p className={css.empty}>Оберіть рішення зі списку.</p>
          )}
        </div>
      </div>
    </div>
  );
}
