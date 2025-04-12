import Form from "./components/form";
import DataCard from "./components/dataCard";

function Activity() {
    return ( 
        <div className="flex flex-row items-center justify-around min-h-screen min-w-screen">

            <Form />
            <DataCard/>
        </div>
    );
}

export default Activity;
