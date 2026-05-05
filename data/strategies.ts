import type { Strategy } from "@/types/community";

export const strategies: Strategy[] = [
  {
    id: "lviv-strategy-business",
    communityId: "lviv",
    title: "Розвиток підприємництва та локальної економіки",
    category: "business",
    period: "2025–2027",
    goals: [
      "Підтримати малий і середній бізнес",
      "Розвивати туристичну та креативну економіку",
      "Залучати інвестиції у громаду",
    ],
  },
  {
    id: "lviv-strategy-education",
    communityId: "lviv",
    title: "Якісна та безпечна освіта",
    category: "education",
    period: "2025–2027",
    goals: [
      "Модернізувати освітню інфраструктуру",
      "Покращити безпеку закладів освіти",
      "Розвивати цифрові інструменти навчання",
    ],
  },
  {
    id: "vinnytsia-strategy-housing",
    communityId: "vinnytsia",
    title: "Енергоефективне ЖКГ",
    category: "housing",
    period: "2025–2027",
    goals: [
      "Модернізувати системи теплопостачання",
      "Зменшити втрати енергоресурсів",
      "Покращити якість комунальних послуг",
    ],
  },
  {
    id: "vinnytsia-strategy-transport",
    communityId: "vinnytsia",
    title: "Сталий міський транспорт",
    category: "transport",
    period: "2025–2027",
    goals: [
      "Оновити муніципальний транспорт",
      "Покращити транспортну доступність",
      "Розвивати екологічні види мобільності",
    ],
  },
];
