import express from "express";
import { supabase } from "../supabaseclient";


const router = express.Router();

router.delete("/dataCard/:lastName/:firstName", async(req,res) => {
    try{
        const {lastName, firstName}= req.params
        const {error} = await supabase.from("FORM").delete().eq("lastName", lastName).eq("firstName",firstName)

        if(error){
            throw error
        }
        res.status(200).json("Data successfully deleted")

    }
    catch (error){
        console.error
        res.status(500).json({error:"Error"})
    }
})

export default router;