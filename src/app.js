import express from "express";

const app = express();

app.use(express.json());

app.get('/', async(req, res) => {
    res.status(200).send("Working");
})

import userRoutes from "./routes/user.routes.js"

app.use("/api/v1/users", userRoutes);

export { app };