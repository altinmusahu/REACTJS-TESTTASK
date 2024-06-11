const router = require('express').Router();

const contactController = require("../controllers/Contacts");

router.post('/register', contactController.createContact);
router.get('/fetchcontacts', contactController.fetchContacts);
router.delete('/deletecontact/:contactId', contactController.deleteContact);
router.get('/onecontact/:contactId', contactController.getOneContact);
router.put("/edit/:contactId", contactController.editContact);

module.exports=router;