import css from "./SectionTitle.module.css";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionTitle({
  title,
  subtitle,
  align = "left",
}: SectionTitleProps) {
  return (
    <div className={`${css.wrapper} ${align === "center" ? css.center : ""}`}>
      <h2 className={css.title}>{title}</h2>
      {subtitle && <p className={css.subtitle}>{subtitle}</p>}
    </div>
  );
}
