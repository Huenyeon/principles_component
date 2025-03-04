import { useState } from 'react';
import Tabular from './components/tabular';
import { FilterSalary } from './components/filter';


function EMS() {

    const employees= [
        {
            id:1,
            name: 'Alhena Tuden',
            role: "Product Owner",
            salary: 20000
        },
        {
            id:2,
            name: 'Regine Teresa',
            role: "Developer",
            salary: 50000
        },
        {
            id:3,
            name: 'Cass Hadeyn',
            role: "Data Analyst",
            salary: 90000
        },
        {
            id:4,
            name: 'Xiaotong Krys',
            role: "DevOp",
            salary: 10000
        },
        {
            id:5,
            name: 'Elmore Sly',
            role: "Data Engineer",
            salary: 100000
        },
        {
            id:6,
            name: 'Roafter Juan',
            role: "Data Engineer",
            salary: 100000
        }
    ] 

    const [seniorLevelEmployees, setSeniorLevelEmployees] = useState<string[]>([])
    const [juniorLevelEmployees, setJuniorLevelEmployees] = useState<string[]>([])

    const filterEmployeeSalary = async() => {
        const seniorEmployees: string[] = [];
        const juniorEmployees: string[] = [];

        employees.forEach((employee) => {
            if (employee.salary > 50000) {
                seniorEmployees.push(employee.name);
            } else if (employee.salary < 50000) {
                juniorEmployees.push(employee.name);
            }
        });

        setSeniorLevelEmployees(seniorEmployees);
        setJuniorLevelEmployees(juniorEmployees);

        const response = await fetch("http://localhost:5000/api/get/all", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ seniorEmployees, juniorEmployees }),
        });

        if (!response.ok) {
            const { error } = await response.json();
            console.log(error);
        }
    }

    
    return (
        <div className='flex flex-col items-center justify-center h-screen '>
            <div className='flex flex-col items-center justify-center h-screen '>
                <div>
                    <h1 className="text-9xl font-serif text-white"> EMPLOYEES </h1>
                </div>
                <div>
                    <Tabular senior={seniorLevelEmployees} junior={juniorLevelEmployees} />
                </div>
            </div>
            <div>
                <FilterSalary onClick= {()=> {filterEmployeeSalary()}}/>
            </div>
            
        </div>
    );
    
}
export default EMS;