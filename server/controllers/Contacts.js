const objId  = require('mongodb').ObjectId;
const db = require('../database').getDb;

exports.createContact = async (req, res, next) => {
    const { name, lastname, address, city, country, emails, phoneNumbers } = req.body;

    try {
        const result = await db().collection("Contacts").insertOne({ name, lastname, address, city, country, emails, phoneNumbers });
        return res.status(201).json({ message: "created" });
    } catch (error) {
        console.error("Error creating contact:", error);
        return res.status(500).json({ message: "Error creating contact" });
    }
};

exports.fetchContacts = async (req, res, next) => {
    try {
        const contacts = await db().collection("Contacts").find().toArray();
        res.status(200).json({ contacts });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ message: "Error fetching contacts" });
    }
};

exports.deleteContact = async (req, res, next) => {
    const { contactId } = req.params;

    try {
        const result = await db().collection("Contacts").deleteOne({ _id: new objId(contactId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        console.error("Error deleting contact:", error);
        res.status(500).json({ message: "Error deleting contact" });
    }
};

exports.getOneContact=async(req,res,next)=>{
    const contactId=req.params.contactId;
    const contact=await db().collection("Contacts").findOne({ _id: new objId(contactId) });
    if(contact){
      return res.status(200).json(contact)
    }
    return res.status(404).json({message:"not found a contact"})
  }

exports.editContact = async (req, res, next) => {
    const { contactId } = req.params;
    const { name, lastname, address, city, country, emails, phoneNumbers } = req.body;

    try {
        const contact = await db().collection("Contacts").updateOne(
            { _id: new objId(contactId) },
            { $set: { name, lastname, address, city, country, emails, phoneNumbers } }
        );

        if (contact.modifiedCount === 0) {
            return res.status(500).json({ message: "Failed to update contact" });
        }

        res.status(200).json({ message: "Contact updated successfully" });
    } catch (error) {
        console.error("Error editing contact:", error);
        res.status(500).json({ message: "Error editing contact" });
    }
};
