const express = require("express");
const app = express();

const contactRoutes=require("./routes/Contacts");


const cors=require("cors");
const bodyParser=require("body-parser")

const mongoconnect =require("./database").mongoConnect

app.use(express.json());

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5173"], credentials: true }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(contactRoutes)


mongoconnect(() => {
    app.listen(4000,()=>console.log('listening'))
})

