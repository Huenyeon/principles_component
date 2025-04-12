// Employee type to be used in both components
type Employee = {
    name: string;
    salary: number;
  };
  
  // Tabular component to display all employees in tables
  type TableProps = {
    employees: Employee[];
    filter?: 'senior' | 'entry' | null;
  };
  
  export default function Tabular({ employees, filter }: TableProps) {
    // Filter employees based on salary if filter is applied
    const seniorEmployees = employees.filter(emp => emp.salary >= 50000);
    const entryEmployees = employees.filter(emp => emp.salary < 50000);
  
    return (
      <div className="flex flex-row gap-10 p-6">
        {/* Show Senior table only if no filter or filter is 'senior' */}
        {(filter === null || filter === 'senior') && (
          <div>
            <h3 className="text-white pb-4 text-xl font-bold">SENIOR LEVEL</h3>
            <table className="text-white border-collapse border border-gray-500">
              <thead>
                <tr>
                  <th className="border border-gray-500 p-2">Name</th>
                  <th className="border border-gray-500 p-2">Salary</th>
                </tr>
              </thead>
              <tbody>
                {seniorEmployees.map((emp, index) => (
                  <tr key={index}>
                    <td className="border border-gray-500 p-2">{emp.name}</td>
                    <td className="border border-gray-500 p-2">${emp.salary.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
  
        {/* Show Entry table only if no filter or filter is 'entry' */}
        {(filter === null || filter === 'entry') && (
          <div>
            <h3 className="text-white pb-4 text-xl font-bold">ENTRY LEVEL</h3>
            <table className="text-white border-collapse border border-gray-500">
              <thead>
                <tr>
                  <th className="border border-gray-500 p-2">Name</th>
                  <th className="border border-gray-500 p-2">Salary</th>
                </tr>
              </thead>
              <tbody>
                {entryEmployees.map((emp, index) => (
                  <tr key={index}>
                    <td className="border border-gray-500 p-2">{emp.name}</td>
                    <td className="border border-gray-500 p-2">${emp.salary.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }