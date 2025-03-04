import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import getRoutes from './routes/getRoutes';
import postRoutes from './routes/postRoutes';
import putRoutes from './routes/putRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Server is running!");
});


app.use("/api/post", postRoutes);
app.use("/api/get", getRoutes);
app.use("/api/put", putRoutes);




app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
