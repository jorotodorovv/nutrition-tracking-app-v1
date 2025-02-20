import { supabase } from './supabase';
import type { Food, FoodCategory } from '../types/food';

interface ImportData {
  categories: FoodCategory[];
  foods: Omit<Food, 'id'>[];
}

export async function importFoodsFromJson(jsonData: ImportData) {
  try {
    // Validate the JSON structure
    if (!jsonData.categories || !Array.isArray(jsonData.categories)) {
      throw new Error('Invalid JSON format: categories must be an array');
    }
    if (!jsonData.foods || !Array.isArray(jsonData.foods)) {
      throw new Error('Invalid JSON format: foods must be an array');
    }

    // First, insert categories and get their new IDs
    const categoryMap = new Map<string, string>();
    
    for (const category of jsonData.categories) {
      const { data: newCategory, error: categoryError } = await supabase
        .from('food_categories')
        .insert({
          name: category.name,
          description: category.description
        })
        .select()
        .single();

      if (categoryError) {
        console.error('Error inserting category:', categoryError);
        throw new Error(`Failed to insert category ${category.name}: ${categoryError.message}`);
      }
      
      if (newCategory) {
        categoryMap.set(category.id, newCategory.id);
      }
    }

    // Then, insert foods with mapped category IDs
    const foodsToInsert = jsonData.foods.map(food => ({
      ...food,
      category_id: categoryMap.get(food.category_id) || food.category_id
    }));

    const { error: foodError } = await supabase
      .from('foods')
      .insert(foodsToInsert);

    if (foodError) {
      console.error('Error inserting foods:', foodError);
      throw new Error(`Failed to insert foods: ${foodError.message}`);
    }

    return { 
      success: true, 
      message: `Successfully imported ${jsonData.categories.length} categories and ${jsonData.foods.length} foods` 
    };
  } catch (error) {
    console.error('Error importing foods:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'An unexpected error occurred while importing foods' 
    };
  }
}