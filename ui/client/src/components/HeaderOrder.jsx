import { useMemo } from "react";

export default function HeaderOrder({
  cart,
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
  clearCart,
}) {
  // State Derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  const saveOrder = () => {
    console.log(cart)
    console.log(localStorage)
  }

  return (
    <header className="py-5 w-full">
      <div className="container mx-auto px-4">
        <div className="flex justify-center md:justify-between">
          <nav className="mt-5 flex items-start justify-end w-full">

            <div id="carrito" className="w-full bg-white p-3 shadow-lg rounded-lg z-10">
              {isEmpty ? (
                <p className="text-center">Cart is Empty</p>
              ) : (
                <>
                  <table className="w-full table-auto">
                    <thead>
                      <tr>
                        <th className="border-2 border-gray-300">Name</th>
                        <th className="border-2 border-gray-300">Price</th>
                        <th className="border-2 border-gray-300" >Amount</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td className="border-2 border-gray-300 text-center">{item.name}</td>
                          <td className="font-bold border-2 border-gray-300 text-center">${item.price}</td>
                          <td className="flex flex-row border-1 border-gray-300 items-center justify-center gap-2">
                            <button
                              type="button"
                              className="bg-black text-white p-2 rounded-full"
                              onClick={() => decreaseQuantity(item.id)}
                            >
                              -
                            </button>
                            {item.quantity}
                            <button
                              type="button"
                              className="bg-black text-white p-2 rounded-full"
                              onClick={() => increaseQuantity(item.id)}
                            >
                              +
                            </button>
                          </td>
                          <td>
                            <button
                              className="bg-red-500 text-white p-2  flex items-center justify-center rounded-full"
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <p className="text-right">
                    Total Amount: <span className="font-bold">${cartTotal}</span>
                  </p>
                </>
              )}

              <button
                className="bg-green-500 text-white w-full mt-3 p-2"
                onClick={saveOrder}
              >
                Order
              </button>
              <button
                className="bg-black text-white w-full mt-3 p-2"
                onClick={clearCart}
              >
                Empty Cart
              </button>
            </div>

          </nav>
        </div>
      </div>
    </header>
  );
}
