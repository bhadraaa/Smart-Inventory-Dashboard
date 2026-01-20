export default function ProductCard({
  product,
  isLoading,
  onIncrease,
  onDecrease
}) {
  const isLowStock =
    product.quantity < product.lowStockThreshold

  return (
    <div
      className={`card ${
        isLowStock ? 'low-stock' : ''
      } ${isLoading ? 'loading' : ''}`}
    >
      {/* Product name */}
      <h3>{product.name}</h3>

      {/* Price */}
      <p className="price">₹{product.price}</p>

      {/* Stock */}
      <p className="quantity">
        Stock: <strong>{product.quantity}</strong>
      </p>

      {/* Low stock badge */}
      {isLowStock && (
        <span className="badge">CRITICAL LOW</span>
      )}

      {/* Actions */}
      <div className="actions">
        <button
          onClick={onDecrease}
          disabled={product.quantity === 0 || isLoading}
        >
          −
        </button>

        <button
          onClick={onIncrease}
          disabled={isLoading}
        >
          +
        </button>
      </div>

      <p className={`loading-text ${isLoading ? 'visible' : ''}`}>
        Updating...
      </p>

    </div>
  )
}
