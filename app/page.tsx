import Link from "next/link";
import { communities } from "@/data/communities";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import StatsCard from "@/components/StatsCard/StatsCard";
import CommunityCard from "@/components/CommunityCard/CommunityCard";
import css from "./page.module.css";

export default function HomePage() {
  return (
    <main className={css.page}>
      <section className={css.hero}>
        <h1 className={css.title}>Стратегії та рішення громад</h1>
        <p className={css.text}>
          Аналітичний дашборд для порівняння рішень місцевих рад, стратегій
          розвитку, новин та досягнень громад.
        </p>

        <Link className={css.heroLink} href="/compare">
          Порівняти громади
        </Link>
      </section>

      <section className={css.statsGrid}>
        <StatsCard label="Громади" value={communities.length} />
        <StatsCard
          label="Напрямки"
          value="5"
          description="Бізнес, ЖКГ, освіта, транспорт, цифровізація"
        />
        <StatsCard
          label="Фокус"
          value="Аналітика"
          description="Зв’язок рішень, стратегій і досягнень"
        />
      </section>

      <section>
        <SectionTitle
          title="Громади для аналізу"
          subtitle="Починаємо з двох громад, щоб побудувати порівняння."
          align="center"
        />

        <div className={css.communityGrid}>
          {communities.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      </section>
    </main>
  );
}
