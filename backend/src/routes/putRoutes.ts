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

export default router;
