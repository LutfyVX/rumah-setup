import { useCart } from "../components/Cartdetail";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Cart Empty</h2>
        <p className="text-gray-600">Try to add one of your favorite products</p>
        <button className="mt-4 px-4 py-2 bg-black text-white rounded">Home</button>
      </div>
    );
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Cart</h1>
      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="py-10">Product</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id} className="border-b">
              <td className="flex items-center gap-4 py-4">
                <img src={item.image || item.imageUrl} alt={item.name} className="w-24 h-full object-cover" />
                <div>
                  <p>{item.name}</p>
                  <p className="text-sm text-gray-500">Rp {item.price?.toLocaleString()}</p>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </td>
              <td>Rp {(item.price * item.quantity).toLocaleString()}</td>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm mt-2 underline"
              >
                Remove
              </button>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right mt-6">
        <p className="font-bold">Subtotal</p>
        <p className="font-light">Rp {subtotal?.toLocaleString()}</p>
        <button className="mt-2 px-6 py-2 bg-black text-white rounded">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
