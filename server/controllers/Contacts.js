const db = require('../database').getDb;

exports.createContact=async(req,res,next)=>{

    const {name,email,password}=req.body;
    const contact=await db().collection("contacts").findOne({email})

    if(contact){
        return res.status(409).json({message:"contact already exists"})
    }

    const result =await db().collection("contacts").insertOne({name,lastname, address, city, country,email:[email1, email2, email3], phoneNumber:[phoneNumber1, phoneNumber2, phoneNumber3]})
    
    return res.status(201).json({message:"created"});
}
