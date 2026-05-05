"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Category, Decision } from "@/types/community";
import { categoryLabels } from "@/utils/categoryLabels";
import css from "./CommunityCharts.module.css";

type CommunityChartsProps = {
  decisions: Decision[];
};

const categories: Category[] = [
  "business",
  "housing",
  "education",
  "transport",
  "digitalization",
];

const baseColor = "#4f46e5";

const getOpacity = (index: number, total: number) => {
  if (total <= 1) return 0.85;

  const min = 0.35;
  const max = 0.95;

  return max - (index / (total - 1)) * (max - min);
};

export default function CommunityCharts({ decisions }: CommunityChartsProps) {
  const chartData = categories.map((category) => {
    const categoryDecisions = decisions.filter(
      (decision) => decision.category === category,
    );

    return {
      category,
      name: categoryLabels[category],
      count: categoryDecisions.length,
      budget: categoryDecisions.reduce(
        (sum, decision) => sum + decision.budget,
        0,
      ),
    };
  });

  const budgetData = chartData
    .filter((item) => item.budget > 0)
    .sort((a, b) => b.budget - a.budget);

  const countData = chartData
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <div className={css.grid}>
      <article className={css.card}>
        <h3 className={css.title}>Розподіл бюджету за напрямками</h3>

        <div className={css.chart}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={budgetData}
                dataKey="budget"
                nameKey="name"
                outerRadius={100}
                labelLine={false}
              >
                {budgetData.map((entry, index) => (
                  <Cell
                    key={entry.category}
                    fill={baseColor}
                    fillOpacity={getOpacity(index, budgetData.length)}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  backgroundColor: "#ffffff",
                }}
                formatter={(value) => {
                  const numberValue =
                    typeof value === "number" ? value : Number(value);

                  return `${numberValue.toLocaleString("uk-UA")} грн`;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className={css.card}>
        <h3 className={css.title}>Кількість рішень за напрямками</h3>

        <div className={css.chart}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={countData}>
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  backgroundColor: "#ffffff",
                }}
              />

              <Bar
                dataKey="count"
                name="Кількість рішень"
                radius={[8, 8, 0, 0]}
              >
                {countData.map((entry, index) => (
                  <Cell
                    key={entry.category}
                    fill={baseColor}
                    fillOpacity={getOpacity(index, countData.length)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>
    </div>
  );
}
