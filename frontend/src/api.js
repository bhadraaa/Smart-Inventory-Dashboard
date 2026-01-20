export async function fetchProducts() {
  const res = await fetch('http://localhost:5000/products')
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function updateStock(id, newQuantity) {
  const res = await fetch('http://localhost:5000/update-stock', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, newQuantity })
  })

  // ❗ Do NOT assume JSON on error
  if (!res.ok) {
    const text = await res.text()
    throw new Error(
      res.status === 500
        ? 'Server error while updating stock'
        : text
    )
  }

  return res.json()
}

