import express from "express";
import cors from "cors"
import UserRoutes from "./routes/UserRoutes.js";

const app = express();

/* add middleware */
app.use(cors());
app.use(express.json());

/* add routes */
app.use(UserRoutes);

app.listen('2000', () => console.log('Server up and running'));