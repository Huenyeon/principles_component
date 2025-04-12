import { useQuery } from '@tanstack/react-query';

type Employee = {
  id: number;
  name: string;
  role: string;
  salary: number;
};

export const useEmployees = () => {
  return useQuery({
    queryKey: ['employees'],
    queryFn: async (): Promise<Employee[]> => {
      const response = await fetch("http://localhost:5003/api/get/employees");
      if (!response.ok) throw new Error("Failed to fetch employees");
      return await response.json();
    },
  });
};
