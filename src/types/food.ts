export interface FoodCategory {
  id: string;
  name: string;
  description: string | null;
}

export interface Food {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  serving_size: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  potassium: number;
  vitamin_a: number;
  vitamin_c: number;
  calcium: number;
  iron: number;
  image_url: string | null;
}