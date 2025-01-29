export interface Recipe {
  _id: number | string;
  title: string;
  description: string;
  image: string;
  category?: string;
  difficulty: number;
  date?: string;
  published: boolean;
  createdAt?: string | Date;
}
