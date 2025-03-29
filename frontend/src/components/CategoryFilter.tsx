import React from 'react';

type Props = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

const categories = ['All', 'Biography', 'Self-Help', 'Science', 'Fiction', 'Non-Fiction'];

const CategoryFilter: React.FC<Props> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-3">
      <label className="form-label">Filter by Category:</label>
      <select
        className="form-select"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
