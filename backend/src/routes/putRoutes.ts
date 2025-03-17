import express from "express";
import { supabase } from "../supabaseclient"; 

const router = express.Router();


router.put("/menu/:id", async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, calory, price } = req.body; 

    try {
        const { data, error } = await supabase
            .from("menu")
            .update({ name, ingredients, calory, price })
            .eq("id", id)
            .select();

        if (error) throw error;

        res.json({ message: "Menu item updated successfully", data });
    } catch (err) {
        res.status(500).json({ error: "Failed to update menu item" });
    }
});

router.put("/dataCard/:lastName/:firstName", async (req, res) => {
    const { lastName, firstName } = req.params;
    const updatedData = req.body;

    console.log("Received PUT request:");
    console.log("Params:", { lastName, firstName });
    console.log("Body:", updatedData);


    if (!lastName || !firstName) {
        console.error("Missing lastName or firstName in URL");
        res.status(400).json({ error: "Missing lastName or firstName in URL" });
        return
    }


    if (!updatedData || Object.keys(updatedData).length === 0) {
        console.error("Missing or empty body in PUT request");
        res.status(400).json({ error: "Missing or empty request body" });
        return
    }

    if (updatedData.expectedDefense) {
        updatedData.expectedDefense = new Date(updatedData.expectedDefense).toISOString();
    }


    const { data, error } = await supabase
        .from("FORM")
        .update(updatedData) 
        .match({ lastName, firstName });

    if (error) {
        console.error("Update Error:", error);
        res.status(400).json({ error: error.message });
        return
    }

    console.log("Update successful:", data);
    res.json({ message: "Update successful", data });
});



// router.put("/cardDetails", async(req,res)=> {
//     const {groupName}
// })

export default router;
