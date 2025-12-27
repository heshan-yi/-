
export type ContentItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags?: string[];
};

export type Section = {
  id: string;
  name: string;
  icon: string;
  items: ContentItem[];
};

export type ThemeMode = 'light' | 'dark';

export interface ApothecaryData {
  light: Section[];
  dark: Section[];
}
