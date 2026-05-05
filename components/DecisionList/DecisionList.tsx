import type { Decision } from "@/types/community";
import { categoryLabels } from "@/utils/categoryLabels";
import css from "./DecisionList.module.css";

type DecisionListProps = {
  decisions: Decision[];
};

export default function DecisionList({ decisions }: DecisionListProps) {
  if (decisions.length === 0) {
    return <p className={css.empty}>Рішень для цієї громади поки немає.</p>;
  }

  return (
    <ul className={css.list}>
      {decisions.map((decision) => (
        <li key={decision.id} className={css.item}>
          <div className={css.header}>
            <span className={css.number}>{decision.number}</span>

            <span className={css.category}>
              {categoryLabels[decision.category]}
            </span>

            <time className={css.date} dateTime={decision.date}>
              {new Date(decision.date).toLocaleDateString("uk-UA")}
            </time>
          </div>

          <h3 className={css.title}>{decision.title}</h3>
          <p className={css.summary}>{decision.summary}</p>

          <p className={css.budget}>
            Бюджет:{" "}
            <strong>{decision.budget.toLocaleString("uk-UA")} грн</strong>
          </p>
        </li>
      ))}
    </ul>
  );
}
