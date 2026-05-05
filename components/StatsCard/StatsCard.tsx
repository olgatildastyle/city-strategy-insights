import css from "./StatsCard.module.css";

type StatsCardProps = {
  label: string;
  value: string | number;
  description?: string;
};

export default function StatsCard({
  label,
  value,
  description,
}: StatsCardProps) {
  return (
    <article className={css.card}>
      <p className={css.label}>{label}</p>
      <strong className={css.value}>{value}</strong>
      {description && <p className={css.description}>{description}</p>}
    </article>
  );
}
