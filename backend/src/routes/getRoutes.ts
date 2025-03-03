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

export default router;
