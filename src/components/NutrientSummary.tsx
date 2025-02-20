import React, { useState, useEffect } from 'react';
import { Food } from '../types/food';
import { Sunrise, Sun, Moon, X, Info } from 'lucide-react';
import { cn } from '../lib/utils';

interface NutrientSummaryProps {
  selectedFoods: Food[];
  onRemoveFood: (food: Food) => void;
}

interface MealTime {
  start: number;
  end: number;
}

interface Notification {
  id: string;
  food: Food;
  progress: number;
}

const mealTimes: Record<string, MealTime> = {
  breakfast: { start: 5, end: 11 },
  lunch: { start: 11, end: 16 },
  dinner: { start: 16, end: 23 },
};

function getMealType(hour: number): string {
  if (hour >= mealTimes.breakfast.start && hour < mealTimes.breakfast.end) return 'breakfast';
  if (hour >= mealTimes.lunch.start && hour < mealTimes.lunch.end) return 'lunch';
  if (hour >= mealTimes.dinner.start && hour < mealTimes.dinner.end) return 'dinner';
  return 'breakfast';
}

export function NutrientSummary({ selectedFoods, onRemoveFood }: NutrientSummaryProps) {
  const [showSelectedFoods, setShowSelectedFoods] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const totals = selectedFoods.reduce((acc, food) => ({
    calories: acc.calories + food.calories,
    protein: acc.protein + food.protein,
    carbs: acc.carbs + food.carbs,
    fat: acc.fat + food.fat,
    fiber: acc.fiber + food.fiber,
    sugar: acc.sugar + food.sugar,
    sodium: acc.sodium + food.sodium,
    potassium: acc.potassium + food.potassium,
    vitamin_a: acc.vitamin_a + food.vitamin_a,
    vitamin_c: acc.vitamin_c + food.vitamin_c,
    calcium: acc.calcium + food.calcium,
    iron: acc.iron + food.iron,
  }), {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
    potassium: 0,
    vitamin_a: 0,
    vitamin_c: 0,
    calcium: 0,
    iron: 0,
  });

  useEffect(() => {
    // Add notification for newly added food
    if (selectedFoods.length > 0) {
      const lastFood = selectedFoods[selectedFoods.length - 1];
      const newNotification = {
        id: `${lastFood.id}-${Date.now()}`,
        food: lastFood,
        progress: 100,
      };
      setNotifications(prev => [...prev, newNotification]);
    }
  }, [selectedFoods.length]);

  useEffect(() => {
    // Update notification progress
    const interval = setInterval(() => {
      setNotifications(prev => 
        prev.map(notif => ({
          ...notif,
          progress: Math.max(0, notif.progress - 2),
        })).filter(notif => notif.progress > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const mealGroups = selectedFoods.reduce((acc, food) => {
    const hour = new Date().getHours();
    const mealType = getMealType(hour);
    if (!acc[mealType]) acc[mealType] = [];
    acc[mealType].push(food);
    return acc;
  }, {} as Record<string, Food[]>);

  const meals = [
    {
      name: 'Breakfast',
      time: '05:00 - 11:00',
      calories: mealGroups.breakfast?.reduce((sum, food) => sum + food.calories, 0) || 0,
      icon: Sunrise,
      color: 'bg-amber-100',
      iconColor: 'text-amber-500',
      type: 'breakfast',
      foods: mealGroups.breakfast || []
    },
    {
      name: 'Lunch',
      time: '11:00 - 16:00',
      calories: mealGroups.lunch?.reduce((sum, food) => sum + food.calories, 0) || 0,
      icon: Sun,
      color: 'bg-orange-100',
      iconColor: 'text-orange-500',
      type: 'lunch',
      foods: mealGroups.lunch || []
    },
    {
      name: 'Dinner',
      time: '16:00 - 23:00',
      calories: mealGroups.dinner?.reduce((sum, food) => sum + food.calories, 0) || 0,
      icon: Moon,
      color: 'bg-blue-100',
      iconColor: 'text-blue-500',
      type: 'dinner',
      foods: mealGroups.dinner || []
    }
  ];

  const caloriePercentage = (totals.calories / 2000) * 100;
  const getProgressColor = (percentage: number) => {
    if (percentage <= 80) return 'bg-[#86C649]';
    if (percentage <= 100) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
      {/* Notifications */}
      <div className="fixed top-24 left-6 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className="bg-white rounded-lg shadow-lg p-4 w-64 relative overflow-hidden"
            style={{
              opacity: notification.progress / 100,
              transform: `translateY(${(100 - notification.progress) * 0.2}px)`,
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F8F9FA] rounded-xl flex items-center justify-center">
                <span className="text-2xl">{notification.food.image_url}</span>
              </div>
              <div>
                <div className="font-medium">{notification.food.name}</div>
                <div className="text-sm text-gray-500">{notification.food.calories} kcal</div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-1 bg-[#86C649]" style={{ width: `${notification.progress}%` }} />
          </div>
        ))}
      </div>

      <div className="md:col-span-3 bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Nutrient Summary</h2>
          <button 
            onClick={() => setShowSelectedFoods(!showSelectedFoods)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            View Selected Foods
          </button>
        </div>

        {showSelectedFoods && (
          <div className="absolute top-20 right-6 w-80 bg-white rounded-xl shadow-lg z-10 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Selected Foods</h3>
              <button 
                onClick={() => setShowSelectedFoods(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {selectedFoods.map((food, index) => (
                <div key={`${food.id}-${index}`} className="flex items-center justify-between py-2 border-b">
                  <div>
                    <div className="font-medium">{food.name}</div>
                    <div className="text-sm text-gray-500">{food.calories} kcal</div>
                  </div>
                  <button 
                    onClick={() => onRemoveFood(food)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 mb-8">
          <div className="h-3 flex-1 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full transition-all duration-300",
                getProgressColor(caloriePercentage)
              )}
              style={{ width: `${Math.min(caloriePercentage, 100)}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-500">
            {totals.calories.toFixed(0)} / 2000 kcal
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="p-4 bg-[#86C649]/10 rounded-xl">
            <div className="text-sm font-medium text-gray-500 mb-1">Protein</div>
            <div className="text-xl font-semibold text-gray-900">{totals.protein.toFixed(1)}g</div>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl">
            <div className="text-sm font-medium text-gray-500 mb-1">Carbs</div>
            <div className="text-xl font-semibold text-gray-900">{totals.carbs.toFixed(1)}g</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl">
            <div className="text-sm font-medium text-gray-500 mb-1">Fat</div>
            <div className="text-xl font-semibold text-gray-900">{totals.fat.toFixed(1)}g</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl">
            <div className="text-sm font-medium text-gray-500 mb-1">Fiber</div>
            <div className="text-xl font-semibold text-gray-900">{totals.fiber.toFixed(1)}g</div>
          </div>
          <div className="p-4 bg-pink-50 rounded-xl">
            <div className="text-sm font-medium text-gray-500 mb-1">Sugar</div>
            <div className="text-xl font-semibold text-gray-900">{totals.sugar.toFixed(1)}g</div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-xl">
            <div className="text-sm font-medium text-gray-500 mb-1">Sodium</div>
            <div className="text-xl font-semibold text-gray-900">{totals.sodium.toFixed(0)}mg</div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 bg-emerald-50 rounded-xl">
            <div className="text-sm font-medium text-gray-500 mb-1">Potassium</div>
            <div className="text-xl font-semibold text-gray-900">{totals.potassium.toFixed(0)}mg</div>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl">
            <div className="text-sm font-medium text-gray-500 mb-1">Vitamin A</div>
            <div className="text-xl font-semibold text-gray-900">{totals.vitamin_a.toFixed(0)}IU</div>
          </div>
          <div className="p-4 bg-lime-50 rounded-xl">
            <div className="text-sm font-medium text-gray-500 mb-1">Vitamin C</div>
            <div className="text-xl font-semibold text-gray-900">{totals.vitamin_c.toFixed(1)}mg</div>
          </div>
          <div className="p-4 bg-cyan-50 rounded-xl">
            <div className="text-sm font-medium text-gray-500 mb-1">Calcium</div>
            <div className="text-xl font-semibold text-gray-900">{totals.calcium.toFixed(0)}mg</div>
          </div>
          <div className="p-4 bg-red-50 rounded-xl">
            <div className="text-sm font-medium text-gray-500 mb-1">Iron</div>
            <div className="text-xl font-semibold text-gray-900">{totals.iron.toFixed(1)}mg</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Today's Meals</h2>
        <div className="space-y-4">
          {meals.map(meal => (
            <div 
              key={meal.name} 
              className="flex items-center gap-3 relative group"
              onMouseEnter={() => setHoveredStat(meal.type)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div className={`w-10 h-10 ${meal.color} rounded-xl flex items-center justify-center`}>
                <meal.icon className={`w-5 h-5 ${meal.iconColor}`} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{meal.name}</div>
                <div className="text-xs text-gray-500">{meal.time}</div>
              </div>
              <div className="text-sm font-medium text-gray-900">{meal.calories}kcal</div>
              
              {hoveredStat === meal.type && meal.foods.length > 0 && (
                <div className="absolute left-full ml-2 top-0 w-64 p-3 bg-white rounded-lg shadow-lg z-20">
                  <div className="font-medium mb-2">{meal.name} Details</div>
                  <div className="space-y-2">
                    {meal.foods.map((food, index) => (
                      <div key={index} className="text-sm text-gray-600 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{food.image_url}</span>
                          <span>{food.name}</span>
                        </div>
                        <span>{food.calories} kcal</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}