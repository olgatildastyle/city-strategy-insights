import Link from "next/link";
import type { Community } from "@/types/community";
import css from "./CommunityCard.module.css";

type CommunityCardProps = {
  community: Community;
};

export default function CommunityCard({ community }: CommunityCardProps) {
  return (
    <article className={css.card}>
      <div>
        <p className={css.region}>{community.region}</p>
        <h3 className={css.title}>{community.name}</h3>
        <p className={css.description}>{community.description}</p>
      </div>

      <div className={css.footer}>
        <span className={css.population}>
          Населення: {community.population.toLocaleString("uk-UA")}
        </span>

        <Link className={css.link} href={`/communities/${community.id}`}>
          Переглянути
        </Link>
      </div>
    </article>
  );
}
