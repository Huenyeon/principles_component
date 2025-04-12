import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import formDetails from "../types/formDetails";
import { Trash2, Pencil } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import EditModal from "../components/Modal";

function DataCard() {
    const queryClient = useQueryClient();
    const [editing, setEditing] = useState<null | formDetails>(null);
    const [formData, setFormData] = useState<Partial<formDetails>>({});

    const fetchDetails = async () => {
        const response = await fetch(`http://localhost:5003/api/get/formDetails`);
        if (!response.ok) throw new Error("Failed to fetch data");
        return await response.json();
    };

    const editDataCard = useMutation({
        mutationFn: async (data: Partial<formDetails>) => {
            console.log("Editing data:", data);
        
            if (!data.lastName || !data.firstName) {
                console.error("Error: Missing lastName or firstName", data);
                toast.error("Error: Missing lastName or firstName");
                return;
            }
        
            const url = `http://localhost:5003/api/put/dataCard/${data.lastName}/${data.firstName}`;
        
            console.log(`Request URL: ${url}`);
            console.log("Request Body:", JSON.stringify(data));
        
            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
        
            const responseText = await response.text(); 
            console.log("Server Response:", responseText);
        
            if (!response.ok) {
                throw new Error(`Server Error: ${responseText}`);
            }
        
            return JSON.parse(responseText);
        }
        ,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["details"] });
            toast.success("Edited successfully!");
            setEditing(null);
        },
        
        onError: () => {
            toast.error("Failed to edit data.");
        },
    });

    const deleteDataCard = useMutation({
        mutationFn: async ({ lastName, firstName }: { lastName: string; firstName: string }) => {
            const response = await fetch(`http://localhost:5003/api/delete/dataCard/${lastName}/${firstName}`, {
                method: "DELETE"
            });
            if (!response.ok) throw new Error("Failed to delete data");
            return response.json();
        },
        onSuccess: () => {
            toast.success("Card deleted");
            queryClient.invalidateQueries({ queryKey: ["details"] });
        },
        onError: () => {
            toast.error("Oh no! Something went wrong");
        }
    });

    const { data, error, isLoading } = useQuery({
        queryFn: fetchDetails,
        queryKey: ["details"],
    });
    
    console.log("Fetched data:", data); 

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong</p>;

    const handleDelete = (lastName: string, firstName: string) => {
        deleteDataCard.mutate({ lastName, firstName });
    };

    const handleEditClick = (d: formDetails) => {
        setEditing(d);
        setFormData(d);
    };

    const handleSave = () => {
        editDataCard.mutate(formData);
    };

    return (
        <div className="space-y-4 p-4">
            {data.map((d: formDetails) => (
                <div key={d.groupName} className="bg-cyan-400 p-4 rounded-lg shadow-md min-h-[100px]">
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-md flex-1 overflow-hidden text-ellipsis whitespace-nowrap pr-4">
                            {d.groupName}
                        </h2>
                        <div className="flex space-x-2">
                            <Pencil onClick={() => handleEditClick(d)} className="cursor-pointer text-blue-600 hover:text-blue-800 transition w-5 h-5" />
                            <Trash2
                                onClick={() => handleDelete(d.lastName, d.firstName)}
                                className="cursor-pointer text-red-600 hover:text-red-800 transition w-5 h-5"
                            />
                        </div>
                    </div>

                    <div className="text-gray-700">
                        <h4 className="text-md">{d.lastName}, {d.firstName}</h4>
                        <h3 className="text-sm">{d.role}</h3>
                    </div>

                    <div className="flex justify-between mt-2 text-gray-900 font-semibold">
                        <h3 className="text-lg pr-10">Salary: ${d.expectedSalary}</h3>
                        <h2 className="text-md">{new Date(d.expectedDefense).toDateString()}</h2>
                    </div>
                </div>
            ))}

            {/* Reusable Edit Modal */}
            <EditModal
                isOpen={!!editing}
                onClose={() => setEditing(null)}
                formData={formData}
                setFormData={setFormData}
                onSave={handleSave}
            />

            <ToastContainer />
        </div>
    );
}

export default DataCard;
