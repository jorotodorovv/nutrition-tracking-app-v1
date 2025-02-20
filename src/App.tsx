import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { Food, FoodCategory } from './types/food';
import { FoodCard } from './components/FoodCard';
import { NutrientSummary } from './components/NutrientSummary';
import { ImportButton } from './components/ImportButton';
import { Search, Filter, Calendar, Bell, User } from 'lucide-react';

function App() {
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);
  const [hoveredFood, setHoveredFood] = useState<Food | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data: categoriesData } = await supabase
        .from('food_categories')
        .select('*');
      
      if (categoriesData) {
        setCategories(categoriesData);
      }

      const { data: foodsData } = await supabase
        .from('foods')
        .select('*');
      
      if (foodsData) {
        setFoods(foodsData);
      }
    }

    fetchData();
  }, []);

  const filteredFoods = foods.filter(food => {
    const matchesCategory = !selectedCategory || food.category_id === selectedCategory;
    const matchesSearch = !searchQuery || 
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleFoodSelect = (food: Food) => {
    setSelectedFoods(prev => [...prev, food]);
  };

  const handleRemoveFood = (foodToRemove: Food) => {
    setSelectedFoods(prev => prev.filter((food, index) => 
      !(food.id === foodToRemove.id && index === prev.findIndex(f => f.id === foodToRemove.id))
    ));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#86C649] rounded-lg"></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hello, User 🍀</h1>
              <p className="text-sm text-gray-500">Let's start living healthy from now on</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Bell className="w-6 h-6 text-gray-400" />
            <Calendar className="w-6 h-6 text-gray-400" />
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <NutrientSummary 
            selectedFoods={selectedFoods} 
            onRemoveFood={handleRemoveFood}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search foods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-[#86C649] focus:border-[#86C649] transition-all"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="border border-gray-200 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-[#86C649] focus:border-[#86C649] transition-all"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <ImportButton />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Meals today</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredFoods.map(food => (
              <FoodCard
                key={food.id}
                food={food}
                onSelect={handleFoodSelect}
                onHover={setHoveredFood}
              />
            ))}
          </div>
        </div>

        {hoveredFood && (
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg p-6 w-96">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-[#F8F9FA] rounded-2xl flex items-center justify-center">
                  <span className="text-4xl">{hoveredFood.image_url}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{hoveredFood.name}</h3>
                  <p className="text-gray-500">{hoveredFood.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Nutrition</h4>
                  <div className="space-y-1 text-sm">
                    <p>Calories: {hoveredFood.calories} kcal</p>
                    <p>Protein: {hoveredFood.protein}g</p>
                    <p>Carbs: {hoveredFood.carbs}g</p>
                    <p>Fat: {hoveredFood.fat}g</p>
                    <p>Fiber: {hoveredFood.fiber}g</p>
                    <p>Sugar: {hoveredFood.sugar}g</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Minerals & Vitamins</h4>
                  <div className="space-y-1 text-sm">
                    <p>Sodium: {hoveredFood.sodium}mg</p>
                    <p>Potassium: {hoveredFood.potassium}mg</p>
                    <p>Vitamin A: {hoveredFood.vitamin_a}IU</p>
                    <p>Vitamin C: {hoveredFood.vitamin_c}mg</p>
                    <p>Calcium: {hoveredFood.calcium}mg</p>
                    <p>Iron: {hoveredFood.iron}mg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;