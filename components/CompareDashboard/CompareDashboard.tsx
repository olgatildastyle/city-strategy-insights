"use client";

import { useState } from "react";
import type { Achievement, Community, Decision } from "@/types/community";
import { categoryLabels } from "@/utils/categoryLabels";
import CommunityAnalytics from "@/components/CommunityAnalytics/CommunityAnalytics";
import CommunityCharts from "@/components/CommunityCharts/CommunityCharts";
import css from "./CompareDashboard.module.css";

type CompareDashboardProps = {
  communities: Community[];
  decisions: Decision[];
  achievements: Achievement[];
};

export default function CompareDashboard({
  communities,
  decisions,
  achievements,
}: CompareDashboardProps) {
  const [firstCommunityId, setFirstCommunityId] = useState(communities[0]?.id);
  const [secondCommunityId, setSecondCommunityId] = useState(
    communities[1]?.id,
  );

  const firstCommunity = communities.find(
    (community) => community.id === firstCommunityId,
  );

  const secondCommunity = communities.find(
    (community) => community.id === secondCommunityId,
  );

  if (!firstCommunity || !secondCommunity) {
    return <p>Оберіть громади для порівняння.</p>;
  }

  const firstDecisions = decisions.filter(
    (decision) => decision.communityId === firstCommunity.id,
  );

  const secondDecisions = decisions.filter(
    (decision) => decision.communityId === secondCommunity.id,
  );

  const firstAchievements = achievements.filter(
    (achievement) => achievement.communityId === firstCommunity.id,
  );

  const secondAchievements = achievements.filter(
    (achievement) => achievement.communityId === secondCommunity.id,
  );

  const firstBudget = firstDecisions.reduce(
    (sum, decision) => sum + decision.budget,
    0,
  );

  const secondBudget = secondDecisions.reduce(
    (sum, decision) => sum + decision.budget,
    0,
  );

  return (
    <div>
      <section className={css.selectorCard}>
        <h2 className={css.selectorTitle}>Оберіть громади для порівняння</h2>

        <div className={css.selectGrid}>
          <label className={css.label}>
            Перша громада
            <select
              className={css.select}
              value={firstCommunityId}
              onChange={(event) => setFirstCommunityId(event.target.value)}
            >
              {communities.map((community) => (
                <option key={community.id} value={community.id}>
                  {community.name}
                </option>
              ))}
            </select>
          </label>

          <label className={css.label}>
            Друга громада
            <select
              className={css.select}
              value={secondCommunityId}
              onChange={(event) => setSecondCommunityId(event.target.value)}
            >
              {communities.map((community) => (
                <option key={community.id} value={community.id}>
                  {community.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {firstCommunityId === secondCommunityId && (
          <p className={css.warning}>
            Ви обрали одну й ту саму громаду. Для змістовного порівняння краще
            вибрати різні громади.
          </p>
        )}
      </section>

      <section className={css.summaryGrid}>
        <article className={css.summaryCard}>
          <h2>{firstCommunity.name}</h2>
          <p>
            Загальний бюджет рішень:{" "}
            <strong>{firstBudget.toLocaleString("uk-UA")} грн</strong>
          </p>
        </article>

        <article className={css.summaryCard}>
          <h2>{secondCommunity.name}</h2>
          <p>
            Загальний бюджет рішень:{" "}
            <strong>{secondBudget.toLocaleString("uk-UA")} грн</strong>
          </p>
        </article>
      </section>

      <section className={css.section}>
        <h2 className={css.sectionTitle}>Аналітичні висновки</h2>

        <div className={css.compareGrid}>
          <CommunityAnalytics
            decisions={firstDecisions}
            achievements={firstAchievements}
          />

          <CommunityAnalytics
            decisions={secondDecisions}
            achievements={secondAchievements}
          />
        </div>
      </section>

      <section className={css.section}>
        <h2 className={css.sectionTitle}>Візуалізація даних</h2>

        <div className={css.compareGrid}>
          <article>
            <h3 className={css.communityTitle}>{firstCommunity.name}</h3>
            <CommunityCharts decisions={firstDecisions} />
          </article>

          <article>
            <h3 className={css.communityTitle}>{secondCommunity.name}</h3>
            <CommunityCharts decisions={secondDecisions} />
          </article>
        </div>
      </section>

      <section className={css.section}>
        <h2 className={css.sectionTitle}>Таблиця порівняння</h2>

        <div className={css.tableWrapper}>
          <table className={css.table}>
            <thead>
              <tr>
                <th>Напрямок</th>
                <th>{firstCommunity.name}</th>
                <th>{secondCommunity.name}</th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(categoryLabels).map(([category, label]) => {
                const firstCategoryDecisions = firstDecisions.filter(
                  (decision) => decision.category === category,
                );

                const secondCategoryDecisions = secondDecisions.filter(
                  (decision) => decision.category === category,
                );

                const firstCategoryBudget = firstCategoryDecisions.reduce(
                  (sum, decision) => sum + decision.budget,
                  0,
                );

                const secondCategoryBudget = secondCategoryDecisions.reduce(
                  (sum, decision) => sum + decision.budget,
                  0,
                );

                return (
                  <tr key={category}>
                    <td>{label}</td>
                    <td>
                      {firstCategoryDecisions.length} ріш.
                      <br />
                      <span>
                        {firstCategoryBudget.toLocaleString("uk-UA")} грн
                      </span>
                    </td>
                    <td>
                      {secondCategoryDecisions.length} ріш.
                      <br />
                      <span>
                        {secondCategoryBudget.toLocaleString("uk-UA")} грн
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
