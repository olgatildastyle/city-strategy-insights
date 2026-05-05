import { communities } from "@/data/communities";
import CommunityCard from "@/components/CommunityCard/CommunityCard";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import css from "./page.module.css";

export default function CommunitiesPage() {
  return (
    <main className={css.page}>
      <SectionTitle
        title="Громади"
        subtitle="Оберіть громаду, щоб переглянути стратегії, рішення та досягнення."
        align="center"
      />

      <div className={css.grid}>
        {communities.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>
    </main>
  );
}
