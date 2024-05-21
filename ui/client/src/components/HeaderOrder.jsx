
import { Toast } from 'primereact/toast';
import React, { useRef, useMemo } from 'react';

export default function HeaderOrder({
  cart,
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
  clearCart,
}) {
  const toast = useRef(null);
  const API_URL = "http://localhost:5038/";
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  const saveOrder = async () => {
    console.log(cart);

    const created = new Date();

    const showWarn = (msg) => {
      toast.current.show({ severity: 'warn', summary: 'Warning', detail: msg, life: 3000 });
    };
    const showError = (msg) => {
      toast.current.show({ severity: 'error', summary: 'Error', detail: msg, life: 3000 });
    };
    const showSuccess = (msg) => {
      toast.current.show({ severity: 'success', summary: 'Success', detail: msg, life: 3000 });
    };

    if (cart.length === 0) {
      showWarn('The cart is empty, you cannot submit an order');
      return;
    }

    const data = new FormData();
    data.append("cart", JSON.stringify(cart));  // Assuming cart needs to be serialized to JSON
    data.append("totalPrice", cartTotal);
    data.append("created", created);

    console.log("FormData entries:", Array.from(data.entries()));

    try {
      const response = await fetch(API_URL + "api/project/AddOrder", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        clearCart();  // Clear the cart since the order was successful
        showSuccess('Order made successfully.');
      } else {
        throw new Error("Failed to make the order");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      showError('There was an error submitting your order. Please try again.');
    }
  };

  return (
    <>
      <Toast ref={toast} />
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
    </>
  );
}
