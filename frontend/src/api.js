const API_BASE = 'https://smart-inventory-dashboard-1-9ekt.onrender.com'

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function updateStock(id, newQuantity) {
  const res = await fetch(`${API_BASE}/update-stock`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, newQuantity })
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text)
  }

  return res.json()
}
