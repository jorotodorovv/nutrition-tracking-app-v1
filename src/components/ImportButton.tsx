import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { importFoodsFromJson } from '../lib/importFoods';

export function ImportButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Validate file type
      if (!file.name.toLowerCase().endsWith('.json')) {
        throw new Error('Please select a JSON file');
      }

      const content = await file.text();
      let jsonData;
      
      try {
        jsonData = JSON.parse(content);
      } catch (e) {
        throw new Error('Invalid JSON file format');
      }

      const result = await importFoodsFromJson(jsonData);
      
      if (result.success) {
        alert(result.message);
        // Reload the page to refresh the data
        window.location.reload();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error importing foods:', error);
      alert(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileSelect}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2 bg-[#86C649] text-white rounded-xl hover:bg-[#78b340] transition-colors"
      >
        <Upload className="w-4 h-4" />
        Import Foods
      </button>
    </div>
  );
}