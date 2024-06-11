const router = require('express').Router();

const contactController = require("../controllers/Contacts");

router.post('/register', contactController.createContact);
router.get('/fetchcontacts', contactController.fetchContacts);

module.exports=router;