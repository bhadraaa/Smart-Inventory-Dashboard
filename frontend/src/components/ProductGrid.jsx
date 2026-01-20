import ProductCard from './ProductCard'

export default function ProductGrid({
  products,
  loadingId,
  onChangeStock
}) {
  return (
    <div className="grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          isLoading={loadingId === product.id}
          onDecrease={() =>
            onChangeStock(product, -1)
          }
          onIncrease={() =>
            onChangeStock(product, 1)
          }
        />
      ))}
    </div>
  )
}
