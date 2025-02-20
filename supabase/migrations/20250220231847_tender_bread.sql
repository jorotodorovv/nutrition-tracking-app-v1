/*
  # Update RLS policies for food categories and foods

  1. Changes
    - Add insert policies for food_categories and foods tables
    - Add update policies for food_categories and foods tables
    - Add delete policies for food_categories and foods tables

  2. Security
    - Policies allow public access for all operations
    - This is suitable for a demo app, but in production you'd want to restrict to authenticated users
*/

-- Update food_categories policies
CREATE POLICY "Allow public insert access to food categories"
  ON food_categories
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access to food categories"
  ON food_categories
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to food categories"
  ON food_categories
  FOR DELETE
  TO public
  USING (true);

-- Update foods policies
CREATE POLICY "Allow public insert access to foods"
  ON foods
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access to foods"
  ON foods
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to foods"
  ON foods
  FOR DELETE
  TO public
  USING (true);