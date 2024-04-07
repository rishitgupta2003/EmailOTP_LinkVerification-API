import { app } from "./app.js";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";


dotenv.config({
    path: "./.env"
});

connectDB().then(() => {
    app.listen(process.env.PORT || 3000 , () => {
        console.log(`App Working on PORT -> ${process.env.PORT}`);
    })
}).catch((err) => {
    console.log(`Error Occured -> ${err.message}`);
})