import { Router } from 'express';
import { supabase } from '../supabaseclient';

const router = Router();

router.post('/menu', async (req, res) => {
  try {
    const { name, ingredients, calory, price } = req.body;

    if (!name || !ingredients || !calory || !price) {
      res.status(400).json({ error: 'All fields are required' });
    }

    const { data, error } = await supabase
      .from('menu')
      .insert([{ name, ingredients, calory, price }]);

    if (error) {
      res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: 'Menu item added!', data });
  } catch (err) {
    console.error("Unexpected Error:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
