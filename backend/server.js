const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 5000

// --------------------
// MIDDLEWARE
// --------------------
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// --------------------
// JSON FILE PATH
// --------------------
const dataPath = path.join(__dirname, 'data', 'products.json')

// --------------------
// HELPERS
// --------------------
function readProducts() {
  const data = fs.readFileSync(dataPath, 'utf-8')
  return JSON.parse(data)
}

function writeProducts(products) {
  fs.writeFileSync(
    dataPath,
    JSON.stringify(products, null, 2),
    'utf-8'
  )
}

// --------------------
// ROUTES
// --------------------

// Health check
app.get('/', (req, res) => {
  res.send('Backend is running')
})

// GET all products
app.get('/products', (req, res) => {
  try {
    const products = readProducts()
    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to load products' })
  }
})

// UPDATE stock
app.post('/update-stock', (req, res) => {
  try {
    let { id, newQuantity } = req.body

    id = Number(id)
    newQuantity = Number(newQuantity)

    if (Number.isNaN(id) || Number.isNaN(newQuantity)) {
      return res.status(400).json({
        message: 'Invalid id or quantity'
      })
    }

    if (newQuantity < 0) {
      return res.status(400).json({
        message: 'Quantity cannot be negative'
      })
    }

    const products = readProducts()
    const index = products.findIndex(p => p.id === id)

    if (index === -1) {
      return res.status(404).json({
        message: 'Product not found'
      })
    }

    products[index].quantity = newQuantity
    writeProducts(products)

    // ✅ Return FULL updated product
    res.json(products[index])
  } catch (err) {
    console.error('UPDATE ERROR:', err)
    res.status(500).json({
      message: 'Server error while updating stock'
    })
  }
})

// --------------------
// START SERVER
// --------------------
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`)
})
