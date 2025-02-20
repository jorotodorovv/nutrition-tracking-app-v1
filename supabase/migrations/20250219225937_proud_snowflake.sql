/*
  # Seed Initial Food Data

  1. Data Population
    - Adds food categories:
      - Raw Foods
      - Cooked Foods
      - Fried Foods
      - Baked Foods
      - Processed Foods
    
    - Adds initial food items for each category with complete nutritional data
*/

-- Insert food categories
INSERT INTO food_categories (id, name, description) VALUES
  ('c1f6f7d4-b112-4fc0-a2d3-f0a3f5c7e8b9', 'Raw Foods', 'Fresh, unprocessed fruits, vegetables, and other raw ingredients'),
  ('d2e7e8f5-c223-5fd1-b3e4-01b4a6d8f9c0', 'Cooked Foods', 'Foods prepared through boiling, steaming, or other cooking methods'),
  ('e3f8f9a6-d334-6ae2-c4f5-02c5b7e9a0d1', 'Fried Foods', 'Foods prepared through frying methods'),
  ('f4a9a0b7-e445-7bf3-d5a6-03d6c8f0b1e2', 'Baked Foods', 'Foods prepared through baking methods'),
  ('a5b0b1c8-f556-8ca4-e6b7-04e7d9a1c2f3', 'Processed Foods', 'Packaged and processed food products');

-- Insert foods
INSERT INTO foods (category_id, name, description, serving_size, calories, protein, carbs, fat, fiber, sugar, sodium, potassium, vitamin_a, vitamin_c, calcium, iron, image_url) VALUES
  -- Raw Foods
  ('c1f6f7d4-b112-4fc0-a2d3-f0a3f5c7e8b9', 'Raw Carrot', 'Fresh, raw carrot', 100, 41, 0.9, 9.6, 0.2, 2.8, 4.7, 69, 320, 16706, 5.9, 33, 0.3, 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37'),
  ('c1f6f7d4-b112-4fc0-a2d3-f0a3f5c7e8b9', 'Raw Apple', 'Fresh apple with skin', 100, 52, 0.3, 14, 0.2, 2.4, 10.4, 1, 107, 54, 4.6, 6, 0.1, 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2'),
  ('c1f6f7d4-b112-4fc0-a2d3-f0a3f5c7e8b9', 'Raw Spinach', 'Fresh spinach leaves', 100, 23, 2.9, 3.6, 0.4, 2.2, 0.4, 79, 558, 9377, 28.1, 99, 2.7, 'https://images.unsplash.com/photo-1576045057995-568f588f82fb'),
  
  -- Cooked Foods
  ('d2e7e8f5-c223-5fd1-b3e4-01b4a6d8f9c0', 'Steamed Rice', 'Plain steamed white rice', 100, 130, 2.7, 28, 0.3, 0.4, 0.1, 1, 35, 0, 0, 10, 0.2, 'https://images.unsplash.com/photo-1516684732162-798a0062be99'),
  ('d2e7e8f5-c223-5fd1-b3e4-01b4a6d8f9c0', 'Boiled Chicken Breast', 'Plain boiled chicken breast', 100, 165, 31, 0, 3.6, 0, 0, 74, 256, 0, 0, 15, 1.0, 'https://images.unsplash.com/photo-1604503468506-a8da5d2b3a8e'),
  ('d2e7e8f5-c223-5fd1-b3e4-01b4a6d8f9c0', 'Steamed Broccoli', 'Steamed broccoli florets', 100, 35, 2.4, 7.2, 0.4, 3.3, 1.4, 41, 293, 623, 89.2, 47, 0.7, 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee'),
  
  -- Fried Foods
  ('e3f8f9a6-d334-6ae2-c4f5-02c5b7e9a0d1', 'French Fries', 'Deep-fried potato strips', 100, 312, 3.4, 41, 15, 3.8, 0.3, 210, 579, 0, 4.7, 19, 0.8, 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d'),
  ('e3f8f9a6-d334-6ae2-c4f5-02c5b7e9a0d1', 'Fried Chicken', 'Deep-fried breaded chicken', 100, 290, 32, 8.1, 16, 0.9, 0, 870, 223, 51, 0.3, 15, 1.5, 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58'),
  ('e3f8f9a6-d334-6ae2-c4f5-02c5b7e9a0d1', 'Fried Fish', 'Deep-fried battered fish', 100, 290, 25, 18, 14, 0.8, 0, 430, 380, 47, 0, 25, 1.2, 'https://images.unsplash.com/photo-1524324463413-57e3d8392df1'),
  
  -- Baked Foods
  ('f4a9a0b7-e445-7bf3-d5a6-03d6c8f0b1e2', 'Whole Wheat Bread', 'Baked whole wheat bread', 100, 247, 13, 41, 3.4, 7, 6, 400, 250, 0, 0, 170, 3.6, 'https://images.unsplash.com/photo-1509440159596-0249088772ff'),
  ('f4a9a0b7-e445-7bf3-d5a6-03d6c8f0b1e2', 'Baked Salmon', 'Oven-baked salmon fillet', 100, 208, 22, 0, 13, 0, 0, 50, 366, 58, 0, 12, 0.8, 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369'),
  ('f4a9a0b7-e445-7bf3-d5a6-03d6c8f0b1e2', 'Baked Sweet Potato', 'Oven-baked sweet potato', 100, 90, 2, 21, 0.2, 3.3, 6.5, 36, 475, 19218, 19.6, 38, 0.7, 'https://images.unsplash.com/photo-1596097558019-947c7c7e266e'),
  
  -- Processed Foods
  ('a5b0b1c8-f556-8ca4-e6b7-04e7d9a1c2f3', 'Granola Bar', 'Oat and honey granola bar', 100, 471, 8.2, 64, 21, 7, 29, 167, 221, 0, 0, 51, 2.4, 'https://images.unsplash.com/photo-1551746920-6ea09dff7937'),
  ('a5b0b1c8-f556-8ca4-e6b7-04e7d9a1c2f3', 'Protein Shake', 'Vanilla protein shake powder', 100, 380, 80, 7.5, 3.5, 1, 3, 300, 400, 0, 0, 300, 1.5, 'https://images.unsplash.com/photo-1622485831129-a080d8a3d8f5'),
  ('a5b0b1c8-f556-8ca4-e6b7-04e7d9a1c2f3', 'Canned Tuna', 'Tuna in water', 100, 116, 26, 0, 1, 0, 0, 320, 230, 32, 0, 10, 1.4, 'https://images.unsplash.com/photo-1614119075118-9cef9f9e61b9');