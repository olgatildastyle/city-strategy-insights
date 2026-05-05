export type Category =
  | "business"
  | "housing"
  | "education"
  | "transport"
  | "digitalization";

export type Community = {
  id: string;
  name: string;
  region: string;
  population: number;
  description: string;
  focusAreas: Category[];
};

export type Decision = {
  id: string;
  communityId: string;
  number: string;
  title: string;
  category: Category;
  date: string;
  budget: number;
  summary: string;
};

export type Strategy = {
  id: string;
  communityId: string;
  title: string;
  category: Category;
  period: string;
  goals: string[];
};

export type Achievement = {
  id: string;
  communityId: string;
  decisionId: string;
  title: string;
  category: Category;
  year: number;
  result: string;
};

export type NewsItem = {
  id: string;
  communityId: string;
  title: string;
  category: Category;
  date: string;
  summary: string;
};
