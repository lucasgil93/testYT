export default function OrderItem({ item, addToCart }) {
  const { id, name, image, description, price } = item;

  return (
    <div className="bg-orange-50 m-1 p-2 border-2 border-red-500 rounded-lg shadow-lg">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-black text-lg font-bold uppercase">{name}</h3>
        <p>{description}</p>
        <p className="font-extrabold text-gray-900 text-xl">{price}€</p>
        <button
          type="button"
          className="bg-black text-white p-2 rounded-xl"
          onClick={() => addToCart(item)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
