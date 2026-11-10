// 
// 3. instantiate a router in the games.js
// 
import express from "express"

const router = express.Router();

// 
// 4. move all of the game endpoints to this file, including the JSON object and helper functions
// 5. replace all "app" with "router" 
// 6. replace all "/api/games" with "/"... the remvoed path will be defined in the index.js
// 
function isGoodStringParam(param){
  return  typeof param === "string" && param.trim().length > 0;
}

function isGoodNumericParam(param){
  return  typeof param === "number" && Number.isFinite(param);
}

const games = [
  {
    id: 1,
    title: "The Legend of Zelda: Breath of the Wild",
    publisher: "Nintendo",
    releaseYear: 2017,
    ageRating: "E10+",    
    price: 59.99,
    imageUrl: "https://placehold.co/300x400?text=Breath+of+the+Wild"
  },
  {
    id: 2,
    title: "God of War Ragnarök",
    publisher: "Sony Interactive Entertainment",
    releaseYear: 2022,
    ageRating: "M",
    price: 69.99,
    imageUrl: "https://placehold.co/300x400?text=God+of+War+Ragnarok"
  },
  {
    id: 3,
    title: "Halo Infinite",
    publisher: "Xbox Game Studios",
    releaseYear: 2021,
    ageRating: "T",
    price: 59.99,
    imageUrl: "https://placehold.co/300x400?text=Halo+Infinite"
  },
  {
    id: 4,
    title: "Minecraft",
    publisher: "Mojang Studios",
    releaseYear: 2011,
    ageRating: "E10+",
    price: 29.99,
    imageUrl: "https://placehold.co/300x400?text=Minecraft"
  },
  {
    id: 5,
    title: "Super Mario Odyssey",
    publisher: "Nintendo",
    releaseYear: 2017,
    ageRating: "E",
    price: 59.99,
    imageUrl: "https://placehold.co/300x400?text=Super+Mario+Odyssey"
  }
];

// Get all games
// Test: GET http://localhost:3000/api/games
router.get("/", (req, res)=>{
  res.status(200).json(games);
});



// Get a single game by ID
// Test: GET http://localhost:3000/3
router.get("/:id", (req, res)=>{
  const id = Number(req.params.id);
  const game = games.find((game) => game.id === id);

  if(!game){
    res.status(400).json({message: "Game not found!"});
  }
  res.status(200).json(game);
});


// POST: Create a new game
//Test: POST http://localhost:3000/
// plus JSON object as params
router.post("/", (req, res)=>{
    const { title, price } = req.body;
    // validate Params
    if ( !isGoodStringParam(title) || !isGoodNumericParam(price) ){
        return res.status(400).json({
          message: "Game title and price are required fields"
        });
    }
    // If params are good ... 
    const newGame = {
      //id: games.length ? games.length + 1 : 1, // boolean any non-zero = 1, so length is true when array isn't empty. If it's empty, it will initialize the id to 1.
      
      // map creates a new array by extracting the id 
      // and the ... is the spread operator, passes ids as individual values, from max(...[1,2,3]) to max(1,2,3)
      id: games.length ? Math.max(...games.map( (game) => game.id )) + 1 : 1, 
      title: title.trim(),
      price: price
    };

    games.push(newGame);
    res.status(201).json(newGame);
});

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const game = games.find( (game) => game.id === id);

    if(!game){
      return res.status(404).json({ message: "Game not found!" });
    }
    const { title, price } = req.body;
    // validate Params
    if ( !isGoodStringParam(title) || !isGoodNumericParam(price) ){
        return res.status(400).json({
          message: "Game title and price are required fields"
        });
    }

    game.title = title.trim();
    game.price = price;

    res.status(200).json(game);

});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const gameIx = games.findIndex( (game) => game.id === id);

    if(gameIx  === -1){
        return res.status(404).json({ message: "User not found" });
    }
    games.splice(gameIx, 1); //splice first param is the index affected, second param when 0 means add when 1 means replace with 
                            // in this case there's no third param, so it means replace with nothing (otherwise, remove it)
    res.status(204).send();
});

//
// 7. export this router file so another file  (index.js) can import it and use it.
//
export default router;