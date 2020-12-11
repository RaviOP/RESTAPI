const express = require('express')
require('./db/mongoose')
const userRoute = require('./routes/users')

const app = express()
const PORT = 3000 || process.env.PORT

app.use(express.json())
app.use(userRoute)

app.listen(PORT, () => {
    console.log(`Server is Up and Running On Port ${PORT}`)
})