


type FilterEmployeeSalary = {

    onClick: () => void;
};

export function FilterSalary ({onClick}: FilterEmployeeSalary)  {
    
    return (
        <div>
            <button onClick={onClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Filter by Salary</button>
           
        </div>
        
    )
}