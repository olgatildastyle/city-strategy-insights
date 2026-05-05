import Link from "next/link";
import { communities } from "@/data/communities";
import { decisions } from "@/data/decisions";
import { achievements } from "@/data/achievements";
import CompareDashboard from "@/components/CompareDashboard/CompareDashboard";
import css from "./page.module.css";

export default function ComparePage() {
  return (
    <main className={css.page}>
      <Link className={css.backLink} href="/">
        ← Назад на головну
      </Link>

      <section className={css.hero}>
        <h1 className={css.title}>Порівняння громад</h1>
        <p className={css.description}>
          Оберіть дві громади, щоб порівняти рішення, бюджети, досягнення та
          стратегічні напрямки розвитку.
        </p>
      </section>

      <CompareDashboard
        communities={communities}
        decisions={decisions}
        achievements={achievements}
      />
    </main>
  );
}
