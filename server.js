const express = require("express")
const dotenv = require("dotenv").config()
const errorHandler = require("./middleware/errorHandler")
const connectDb = require("./config/dbConnection")

connectDb()
const app = express()
const port =  process.env.PORT || 5000
// middleware um die routes zu benutzen
app.use(express.json())
app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users", require("./routes/userRoutes.js"))
app.use(errorHandler)


app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`)
})