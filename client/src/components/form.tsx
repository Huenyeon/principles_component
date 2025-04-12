import { useMutation, useQueryClient } from "@tanstack/react-query";
import formDetails from "../types/formDetails"
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";




function Form() {
    const queryClient = useQueryClient();
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [groupName, setgroupName] = useState("")
    const [role, setrole] = useState("")
    const [expectedSalary, setexpectedSalary] = useState(0)
    const [expectedDefense, setexpectedDefense] = useState(new Date())
    const mutation = useMutation({
        mutationFn: async({firstName, lastName, groupName, role,expectedDefense,expectedSalary }: formDetails)=> {
            const response = await fetch("http://localhost:5002/api/post/formDetails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({firstName, lastName,groupName,role,expectedSalary,expectedDefense})
            })
            if (! response.ok){
                throw new Error("Can't submit form")
            }


        },
        onSuccess: ()=>{   
            console.log("Form successfully added")
            toast.success("Details successfully added <3")
            queryClient.invalidateQueries({ queryKey: ["details"] } )
             
        }, 
        onError: ()=> {
            toast.error("Oh naur something went wrong")
        }
    })


    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault()
        if (!firstName|| !lastName||!groupName||!role||!expectedSalary||!expectedDefense){
            toast.error("Please provide complete details")
            console.log("something should happen")
            return;
        }

        mutation.mutate({
            firstName,
            lastName,
            groupName,
            role,
            expectedSalary,
            expectedDefense: expectedDefense, 
        });


        
    };
    return (
        <div className="flex justify-around flex-row p-4 bg-indigo-400 rounded-2xl ">
            <div className="flex flex-col py-2 px-4 m-3 ">

                <div className="my-3">
                    <h2 className="text-white font-semibold"> First Name</h2>
                    <input onChange= {(e)=> {setfirstName(e.target.value)}} placeholder="First Name" className="bg-yellow-50 rounded-lg py-1 px-3 border-1 border-rose-400"></input>
                </div>
                <div className="my-3">
                    <h2 className="text-white font-semibold">Last Name</h2>
                    <input onChange= {(e)=> {setlastName(e.target.value)}} placeholder="Last Name" className="bg-yellow-50 rounded-lg py-1 px-3 border-1 border-rose-400"></input>
                </div>
                <div className="my-3">  
                    <h2 className="text-white font-semibold">Group Name</h2>
                    <input onChange= {(e)=> {setgroupName(e.target.value)}} placeholder="Group Name" className="bg-yellow-50 rounded-lg py-1 px-3 border-1 border-rose-400"></input>
                </div>
            </div>

            <div className="flex flex-col py-2 px-4 m-3 ">

                <div className="my-3">
                    <h2 className="text-white font-semibold">Role</h2>
                    <input onChange= {(e)=> {setrole(e.target.value)}} placeholder="Role" className="bg-yellow-50 rounded-lg py-1 px-3 border-1 border-rose-400"></input>
                </div>
                <div className="my-3">
                    <h2 className="text-white font-semibold">Expected Salary</h2>
                    <input type="number" onChange= {(e)=> {setexpectedSalary(e.target.value === "" ? 0 : parseFloat(e.target.value))}} placeholder="Expected Salary" className="bg-yellow-50 rounded-lg py-1 px-3 border-1 border-rose-400"></input>
                </div>
                <div className="my-3">
                    <h2 className="text-white font-semibold">Expected Date of Defense</h2>
                    <input onChange={(e)=> {setexpectedDefense(new Date(e.target.value))}} placeholder="Expected Date of Defense" className="bg-fuchsia-700 rounded-lg py-1 px-3 border-1 border-b-pink-950" type="date"></input>
                </div>
            </div>

            <div className="flex justify-end items-end mt-10">
                <button onClick={(e) => {handleSubmit(e)}} className=" text-white border-2 border-fuchsia-950 rounded-lg hover:bg-fuchsia-950 transition duration-7000 ease-in-out">Submit</button>
            </div>
            <ToastContainer /> 

            


        </div>

     );
}

export default Form;