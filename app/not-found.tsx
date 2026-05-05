import css from "./page.module.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Сторінку не знайдено | Стратегії громад",
  description: "Сторінка, яку ви шукаєте, не існує або була переміщена.",
};

export default function NotFound() {
  return (
    <main className={css.page}>
      <h1 className={css.title}>404</h1>

      <p className={css.subtitle}>Сторінку не знайдено</p>

      <p className={css.description}>
        Можливо, вона була видалена або ви перейшли за неправильним посиланням.
      </p>

      <Link href="/" className={css.link}>
        Повернутися на головну
      </Link>
    </main>
  );
}
