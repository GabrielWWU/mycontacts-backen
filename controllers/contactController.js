const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")


const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if(!contact){
    res.status(404)
    throw new Error("´Contact not found ")
  }
  res.status(200).json(contact)
})

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find()
  res.status(200).json(contacts)
})

const createContact = asyncHandler(async (req, res) => {
  console.log(req.body)
  const {name, email, phone} = req.body
  if(!name || !email || !phone){
    res.status(400)
      throw new Error("Name is mandatory")
  }
  const contact = await Contact.create({
    name, email, phone 
  })

  res.status(200).json(contact)
})

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if(!contact){
    res.status(404)
    throw new Error("´Contact not found ")
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true} // wenn ich das so setze dann gibt mir mongodb die aktuallisierte ressource an und nicht die veraltete
  )
  res.status(200).json(updatedContact)
})

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if(!contact){
    res.status(404)
    throw new Error("´Contact not found ")
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(contact)
})

module.exports = {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact
}
