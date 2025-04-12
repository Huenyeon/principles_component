// Filter component with three options
type FilterProps = {
    onFilterChange: (filter: 'senior' | 'entry' | null) => void;
    currentFilter: 'senior' | 'entry' | null;
  };
  
  export default function FilterSalary({ onFilterChange, currentFilter }: FilterProps) {
    return (
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => onFilterChange(null)}
          className={`font-bold py-2 px-4 rounded ${
            currentFilter === null
              ? 'bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-700 text-white'
          }`}
        >
          Show All
        </button>
        <button
          onClick={() => onFilterChange('senior')}
          className={`font-bold py-2 px-4 rounded ${
            currentFilter === 'senior'
              ? 'bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-700 text-white'
          }`}
        >
          Senior Only
        </button>
        <button
          onClick={() => onFilterChange('entry')}
          className={`font-bold py-2 px-4 rounded ${
            currentFilter === 'entry'
              ? 'bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-700 text-white'
          }`}
        >
          Entry Only
        </button>
      </div>
    );
  }