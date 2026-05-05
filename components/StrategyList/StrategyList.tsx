import type { Strategy } from "@/types/community";
import { categoryLabels } from "@/utils/categoryLabels";
import css from "./StrategyList.module.css";

type StrategyListProps = {
  strategies: Strategy[];
};

export default function StrategyList({ strategies }: StrategyListProps) {
  if (strategies.length === 0) {
    return <p className={css.empty}>Стратегій для цієї громади поки немає.</p>;
  }

  return (
    <ul className={css.list}>
      {strategies.map((strategy) => (
        <li key={strategy.id} className={css.item}>
          <div className={css.header}>
            <span className={css.category}>
              {categoryLabels[strategy.category]}
            </span>
            <span className={css.period}>{strategy.period}</span>
          </div>

          <h3 className={css.title}>{strategy.title}</h3>

          <ul className={css.goals}>
            {strategy.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
