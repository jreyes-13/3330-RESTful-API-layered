// 1: Create a routes folder
// 2: Create a games.js inside the routes folder
import express from "express"


const app = express();
const port = 3000;

// 8. since the other file exported the router, 
// now we can use it in this file
import gamesRouter from "./routes/games.js";

app.use(express.json());
// now we can map requests to the router
app.use("/api/games", gamesRouter);


app.get("/", (req, res) => {
    res.send("<h1>Request received!</h1><h2>Hello from server app</h2>");
});
app.post("/", (req, res)=>{
    res.send("3330: Post success");
});


app.listen(port, ()=> {
    console.log(`Server started listening on port ${port}`);
});

