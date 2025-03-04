type TableProps = {
    senior?: any;
    junior?: any,


}

// type Employee = {
//     id: number,
//     name: string,
//     role: string,
//     salary: number,
// }
function Tabular({senior, junior}: TableProps){
    return(
        <div className="flex flex-row p-10">
            <div className="px-10">
                <h3 className="text-white pb-10"> SENIOR LEVEL</h3>
                <ul>
                    {senior.map((employee: any) => (
                        <li  className="text-white flex justify-center" key={employee.id}>{employee}</li>
                    ))}
                </ul>
            </div>
            <div className="px-10">
                <h3 className="text-white pb-10"> ENTRY LEVEL</h3>
                <ul key={junior.id}>
                    {junior.map((employee: any) => (
                        <li className="text-white flex justify-center" key={employee.id}>{employee}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default Tabular;