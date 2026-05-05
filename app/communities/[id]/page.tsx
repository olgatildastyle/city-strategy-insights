import Link from "next/link";
import { notFound } from "next/navigation";
import { communities } from "@/data/communities";
import { categoryLabels } from "@/utils/categoryLabels";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import StatsCard from "@/components/StatsCard/StatsCard";
import { decisions } from "@/data/decisions";
import { strategies } from "@/data/strategies";
import StrategyList from "@/components/StrategyList/StrategyList";
import { achievements } from "@/data/achievements";
import DecisionInsights from "@/components/DecisionInsights/DecisionInsights";
import DecisionFilter from "@/components/DecisionFilter/DecisionFilter";
import AchievementFilter from "@/components/AchievementFilter/AchievementFilter";
import CommunityAnalytics from "@/components/CommunityAnalytics/CommunityAnalytics";
import CommunityCharts from "@/components/CommunityCharts/CommunityCharts";
import css from "./page.module.css";

type CommunityPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CommunityPage({ params }: CommunityPageProps) {
  const { id } = await params;

  const community = communities.find((item) => item.id === id);

  if (!community) {
    notFound();
  }

  const communityDecisions = decisions.filter(
    (decision) => decision.communityId === community.id,
  );

  const communityStrategies = strategies.filter(
    (strategy) => strategy.communityId === community.id,
  );

  const communityAchievements = achievements.filter(
    (achievement) => achievement.communityId === community.id,
  );

  return (
    <main className={css.page}>
      <Link className={css.backLink} href="/">
        ← Назад на головну
      </Link>

      <section className={css.hero}>
        <p className={css.region}>{community.region}</p>
        <h1 className={css.title}>{community.name}</h1>
        <p className={css.description}>{community.description}</p>
      </section>

      <section className={css.statsGrid}>
        <StatsCard
          label="Населення"
          value={community.population.toLocaleString("uk-UA")}
        />

        <StatsCard
          label="Кількість напрямків"
          value={community.focusAreas.length}
        />

        <StatsCard
          label="Основний фокус"
          value={categoryLabels[community.focusAreas[0]]}
        />
      </section>

      <section className={css.section}>
        <SectionTitle
          title="Напрямки розвитку"
          subtitle="Ключові сфери, які громада розвиває у межах стратегії."
        />

        <ul className={css.focusList}>
          {community.focusAreas.map((area) => (
            <li key={area} className={css.focusItem}>
              {categoryLabels[area]}
            </li>
          ))}
        </ul>
      </section>

      <section className={css.section}>
        <SectionTitle
          title="Стратегії розвитку"
          subtitle="Плани та цілі, які визначають довгостроковий розвиток громади."
        />

        <StrategyList strategies={communityStrategies} />
      </section>

      <section className={css.section}>
        <CommunityAnalytics
          decisions={communityDecisions}
          achievements={communityAchievements}
        />
      </section>

      <section className={css.section}>
        <SectionTitle
          title="Візуалізація даних"
          subtitle="Графіки показують розподіл бюджету та активність рішень за напрямками."
        />

        <CommunityCharts decisions={communityDecisions} />
      </section>

      <section className={css.section}>
        <SectionTitle
          title="Рішення місцевої ради"
          subtitle="Ключові рішення, пов’язані з напрямками розвитку громади."
        />

        <DecisionFilter decisions={communityDecisions} />
      </section>

      <section className={css.section}>
        <SectionTitle
          title="Досягнення громади"
          subtitle="Практичні результати, які демонструють вплив рішень і стратегій."
        />
        <AchievementFilter
          achievements={communityAchievements}
          decisions={communityDecisions}
        />
      </section>

      <section className={css.section}>
        <SectionTitle
          title="Зв’язок рішень і досягнень"
          subtitle="Оберіть рішення, щоб побачити результати, які з ним пов’язані."
        />

        <DecisionInsights
          decisions={communityDecisions}
          achievements={communityAchievements}
        />
      </section>
    </main>
  );
}
