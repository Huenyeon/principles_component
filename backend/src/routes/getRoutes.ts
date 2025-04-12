import express from "express";
import { supabase } from "../supabaseclient";

const router = express.Router();

router.get("/menu", async (req, res) => {
    try {
        const { data, error } = await supabase.from("menu").select("*");
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch menu" });
    }
});

router.get("/all", async (req, res) => {
    try {
        const data= [
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
            },
        ] 
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch menu" });
    }
});

router.get("/formDetails", async(req,res)=> {
    try{
        const {data, error} = await supabase.from("FORM").select("*") 
        if (error){
            throw error
        }
        res.json(data)

    }catch(error){
        console.error(error)
        res.status(500).json({error: "Failed to fetch details"})
    }
})

export default router;
