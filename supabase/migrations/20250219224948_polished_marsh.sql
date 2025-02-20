/*
  # Food Database Schema

  1. New Tables
    - `food_categories`
      - `id` (uuid, primary key)
      - `name` (text) - Category name (e.g., Raw, Cooked, Fried)
      - `description` (text) - Category description
      - `created_at` (timestamp)
    
    - `foods`
      - `id` (uuid, primary key)
      - `category_id` (uuid, foreign key)
      - `name` (text) - Food name
      - `description` (text)
      - `serving_size` (integer) - in grams
      - `calories` (integer)
      - `protein` (float) - in grams
      - `carbs` (float) - in grams
      - `fat` (float) - in grams
      - `fiber` (float) - in grams
      - `sugar` (float) - in grams
      - `sodium` (float) - in mg
      - `potassium` (float) - in mg
      - `vitamin_a` (float) - in IU
      - `vitamin_c` (float) - in mg
      - `calcium` (float) - in mg
      - `iron` (float) - in mg
      - `image_url` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to read data
*/

-- Create food categories table
CREATE TABLE food_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create foods table
CREATE TABLE foods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES food_categories(id),
  name text NOT NULL,
  description text,
  serving_size integer NOT NULL,
  calories integer NOT NULL,
  protein float NOT NULL,
  carbs float NOT NULL,
  fat float NOT NULL,
  fiber float NOT NULL,
  sugar float NOT NULL,
  sodium float NOT NULL,
  potassium float NOT NULL,
  vitamin_a float NOT NULL,
  vitamin_c float NOT NULL,
  calcium float NOT NULL,
  iron float NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE food_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE foods ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to food categories"
  ON food_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to foods"
  ON foods
  FOR SELECT
  TO public
  USING (true);