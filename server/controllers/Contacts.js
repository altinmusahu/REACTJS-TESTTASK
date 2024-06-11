const db = require('../database').getDb;

exports.createContact=async(req,res,next)=>{

    const {name,lastname, address, city, country, emails, phoneNumbers}=req.body;

    const result =await db().collection("Contacts").insertOne({name,lastname, address, city, country,emails, phoneNumbers})
    
    return res.status(201).json({message:"created"});
}

exports.fetchContacts = async (req, res, next) => {
    try {
      
      const contacts = await db().collection("Contacts").find().toArray();
  
      res.status(200).json({ contacts });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Error fetching contacts" });
    }
  };