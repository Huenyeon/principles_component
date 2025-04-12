import { useState } from 'react';
import { useEmployees } from './hooks/useEmployees';
import Tabular from './components/Tabular';
import FilterSalary from './components/Filter';

export default function EMS() {
  const { data: employees = [], isLoading, error } = useEmployees();
  const [currentFilter, setCurrentFilter] = useState<'senior' | 'entry' | null>(null);

  if (isLoading) return <p className="text-white">Loading employees...</p>;
  if (error) return <p className="text-red-500">Error fetching employees</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-5xl font-serif text-white mb-6">EMPLOYEES</h1>
      
      <FilterSalary 
        onFilterChange={setCurrentFilter} 
        currentFilter={currentFilter} 
      />
      <Tabular 
        employees={employees} 
        filter={currentFilter} 
      />
    </div>
  );
}