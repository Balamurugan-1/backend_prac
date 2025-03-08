const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.model')
const app = express()

app.use(express.json());
app.use(express.urlencoded())


app.get('/', (req, res) => {
    res.send("Hello from the node API server")

})

// Creating a product
app.post('/api/create', async (req, res) => {

    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }


})

// Viewing products and a particular product
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/api/product/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)


    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Updating an existing product
app.put('/api/update/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        const updatedProduct = await Product.findById(id)

        res.status(200).json(updatedProduct)


    }
    catch (error) {

        res.status(500).json({ message: error.message })
    }
})

// Deleting an product through api
app.delete('/api/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id)

        if (!product) {
            return res.status(404).json({ message: "Product does not exist in the db" })
        }

        res.status(200).json({ message: "Product succesfully deleted" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
mongoose.connect("mongodb+srv://username:dbpassword@backendapi.z1unk.mongodb.net/node_api?retryWrites=true&w=majority&appName=backendapi")
    .then(() => {
        console.log("Connection is sucessfull")
        app.listen(3000, () => {
            console.log("Server is running on port 3000")
        });
    })
    .catch(() => {
        console.log("Connection failed")
    })