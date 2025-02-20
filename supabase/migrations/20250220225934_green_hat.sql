/*
  # Update food emojis

  1. Changes
    - Update image_url column in foods table to contain emoji strings instead of URLs
    
  2. Notes
    - This migration replaces the image URLs with appropriate food emojis
    - The emojis are chosen to match the food items more closely
*/

UPDATE foods
SET image_url = CASE name
  WHEN 'Raw Carrot' THEN '🥕'
  WHEN 'Raw Apple' THEN '🍎'
  WHEN 'Raw Spinach' THEN '🥬'
  WHEN 'Steamed Rice' THEN '🍚'
  WHEN 'Boiled Chicken Breast' THEN '🍗'
  WHEN 'Steamed Broccoli' THEN '🥦'
  WHEN 'French Fries' THEN '🍟'
  WHEN 'Fried Chicken' THEN '🍗'
  WHEN 'Fried Fish' THEN '🐟'
  WHEN 'Whole Wheat Bread' THEN '🍞'
  WHEN 'Baked Salmon' THEN '🐟'
  WHEN 'Baked Sweet Potato' THEN '🍠'
  WHEN 'Granola Bar' THEN '🍫'
  WHEN 'Protein Shake' THEN '🥤'
  WHEN 'Canned Tuna' THEN '🐟'
END;