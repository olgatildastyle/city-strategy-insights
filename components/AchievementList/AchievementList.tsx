import type { Achievement, Decision } from "@/types/community";
import { categoryLabels } from "@/utils/categoryLabels";
import css from "./AchievementList.module.css";

type AchievementListProps = {
  achievements: Achievement[];
  decisions: Decision[];
};

export default function AchievementList({
  achievements,
  decisions,
}: AchievementListProps) {
  if (achievements.length === 0) {
    return <p className={css.empty}>Досягнень для цієї громади поки немає.</p>;
  }

  return (
    <ul className={css.list}>
      {achievements.map((achievement) => {
        const relatedDecision = decisions.find(
          (decision) => decision.id === achievement.decisionId,
        );

        return (
          <li key={achievement.id} className={css.item}>
            <div className={css.header}>
              <span className={css.category}>
                {categoryLabels[achievement.category]}
              </span>
              <span className={css.year}>{achievement.year}</span>
            </div>

            <h3 className={css.title}>{achievement.title}</h3>
            <p className={css.result}>{achievement.result}</p>

            {relatedDecision && (
              <p className={css.decision}>
                Згідно з рішенням {relatedDecision.number} від{" "}
                {new Date(relatedDecision.date).toLocaleDateString("uk-UA")}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
