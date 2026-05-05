import type { Achievement, Decision } from "@/types/community";
import { categoryLabels } from "@/utils/categoryLabels";
import css from "./CommunityAnalytics.module.css";

type CommunityAnalyticsProps = {
  decisions: Decision[];
  achievements: Achievement[];
};

export default function CommunityAnalytics({
  decisions,
  achievements,
}: CommunityAnalyticsProps) {
  const totalDecisions = decisions.length;
  const totalAchievements = achievements.length;

  const totalBudget = decisions.reduce(
    (sum, decision) => sum + decision.budget,
    0,
  );

  const decisionsWithoutAchievements = decisions.filter(
    (decision) =>
      !achievements.some(
        (achievement) => achievement.decisionId === decision.id,
      ),
  );

  const categoryStats = decisions.map((decision) => decision.category);

  const topCategory = categoryStats.reduce<Record<string, number>>(
    (acc, category) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {},
  );

  const mostActiveCategory = Object.entries(topCategory).sort(
    (a, b) => b[1] - a[1],
  )[0];

  return (
    <div className={css.card}>
      <h2 className={css.title}>Аналітичні висновки</h2>

      <ul className={css.list}>
        <li>
          У громаді проаналізовано <strong>{totalDecisions}</strong> рішень.
        </li>

        <li>
          Загальний бюджет рішень становить{" "}
          <strong>{totalBudget.toLocaleString("uk-UA")} грн</strong>.
        </li>

        <li>
          Пов’язаних досягнень: <strong>{totalAchievements}</strong>.
        </li>

        {mostActiveCategory && (
          <li>
            Найактивніший напрямок —{" "}
            <strong>
              {
                categoryLabels[
                  mostActiveCategory[0] as keyof typeof categoryLabels
                ]
              }
            </strong>
            , кількість рішень: <strong>{mostActiveCategory[1]}</strong>.
          </li>
        )}

        <li>
          Рішень без пов’язаних досягнень:{" "}
          <strong>{decisionsWithoutAchievements.length}</strong>.
        </li>
      </ul>
    </div>
  );
}
