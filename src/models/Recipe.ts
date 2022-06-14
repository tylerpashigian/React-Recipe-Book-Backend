import { Ingredient } from './Ingredient';

export interface Recipe {
  description?: string;
  name: string;
  _id: number;
  ingredients: Ingredient[];
  instructions?: string;
}
