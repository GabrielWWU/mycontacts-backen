const express = require("express")
const router = express.Router()
const {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact
} = require("../controllers/contactController")

router.route("/").get(getContacts)

router.route("/").post(createContact)

router.route("/:id").put(updateContact).delete(deleteContact).get(getContact)



module.exports = router; 