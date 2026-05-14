import http from "http"
import {config} from "dotenv"
import App from "./app.js"
import connectDB from "./common/config/db.js";


config()


const server = http.createServer(App);

const PORT = process.env.PORT||5000

const start = async()=>{
    try {
        await connectDB();
        server.listen(PORT,()=>{
            console.log(`Server is listing at http://localhost:${PORT}`);
            
         })
    } catch (error) {
        console.log("Error from start...");
        
    }
}
start()

 