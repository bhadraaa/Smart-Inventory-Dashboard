import { useEffect, useState } from 'react'
import ProductGrid from './components/ProductGrid'
import { fetchProducts, updateStock } from './api'
import './index.css'

export default function App() {
  const [products, setProducts] = useState([])
  const [loadingId, setLoadingId] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch products on load
  useEffect(() => {
    fetchProducts()
      .then(data => setProducts(data))
      .catch(err => {
        console.error(err)
        alert('Failed to load products')
      })
      .finally(() => setLoading(false))
  }, [])

  // Handle + / - clicks
  const handleChangeStock = async (product, delta) => {
    const newQuantity = product.quantity + delta

    if (newQuantity < 0) return

    setLoadingId(product.id)

    try {
      const updatedProduct = await updateStock(
        product.id,
        newQuantity
      )

      setProducts(prev =>
        prev.map(p =>
          p.id === updatedProduct.id ? updatedProduct : p
        )
      )
    } catch (err) {
      console.error(err.message)
      alert(err.message)
    } finally {
      setLoadingId(null)
    }
  }

  if (loading) {
    return <p className="page-loading">Loading products…</p>
  }

  return (
    <div className="container">
      <h1>Smart Inventory Dashboard</h1>

      <ProductGrid
        products={products}
        loadingId={loadingId}
        onChangeStock={handleChangeStock}
      />
    </div>
  )
}
