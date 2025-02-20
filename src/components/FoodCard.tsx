import React from 'react';
import { Food } from '../types/food';
import { MoreVertical } from 'lucide-react';

interface FoodCardProps {
  food: Food;
  onSelect: (food: Food) => void;
  onHover: (food: Food | null) => void;
}

export function FoodCard({ food, onSelect, onHover }: FoodCardProps) {
  const [hoverPosition, setHoverPosition] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setHoverPosition({
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY
      });
    }
    onHover(food);
  };

  return (
    <div
      ref={cardRef}
      onClick={() => onSelect(food)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => onHover(null)}
      className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer transition-all hover:shadow-md relative"
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="w-16 h-16 bg-[#F8F9FA] rounded-2xl flex items-center justify-center">
            <div className="w-12 h-12 relative">
              <div className="w-full h-full rounded-full bg-[#86C649]/10 flex items-center justify-center">
                <span className="text-2xl">{food.image_url}</span>
              </div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">{food.name}</h3>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-orange-400"></div>
              <span className="text-gray-500">{food.calories}kcal</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#86C649]"></div>
              <span className="text-gray-500">{food.serving_size}g</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Details */}
      <div
        className="fixed z-50 pointer-events-none"
        style={{
          left: `${hoverPosition.x}px`,
          top: `${hoverPosition.y - 10}px`,
          transform: 'translateY(-100%)',
          display: food ? 'block' : 'none'
        }}
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 w-96">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-[#F8F9FA] rounded-2xl flex items-center justify-center">
              <span className="text-4xl">{food.image_url}</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold">{food.name}</h3>
              <p className="text-gray-500">{food.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Nutrition</h4>
              <div className="space-y-1 text-sm">
                <p>Calories: {food.calories} kcal</p>
                <p>Protein: {food.protein}g</p>
                <p>Carbs: {food.carbs}g</p>
                <p>Fat: {food.fat}g</p>
                <p>Fiber: {food.fiber}g</p>
                <p>Sugar: {food.sugar}g</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Minerals & Vitamins</h4>
              <div className="space-y-1 text-sm">
                <p>Sodium: {food.sodium}mg</p>
                <p>Potassium: {food.potassium}mg</p>
                <p>Vitamin A: {food.vitamin_a}IU</p>
                <p>Vitamin C: {food.vitamin_c}mg</p>
                <p>Calcium: {food.calcium}mg</p>
                <p>Iron: {food.iron}mg</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}