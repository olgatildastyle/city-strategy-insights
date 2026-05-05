import type { Community } from "@/types/community";

export const communities: Community[] = [
  {
    id: "lviv",
    name: "Львівська громада",
    region: "Львівська область",
    population: 717000,
    description:
      "Громада з фокусом на розвиток бізнесу, освіти, туризму, цифрових сервісів та міської інфраструктури.",
    focusAreas: ["business", "education", "digitalization", "transport"],
  },
  {
    id: "vinnytsia",
    name: "Вінницька громада",
    region: "Вінницька область",
    population: 370000,
    description:
      "Громада з фокусом на транспорт, ЖКГ, енергоефективність, благоустрій та якість міського управління.",
    focusAreas: ["housing", "transport", "education", "digitalization"],
  },
];
