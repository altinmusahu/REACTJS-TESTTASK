const router = require('express').Router();

const contactController = require("../controllers/Contacts");

router.post('/register', contactController.createContact);

module.exports=router;