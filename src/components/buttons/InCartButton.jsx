import Link from "next/link";
import { useState } from "react";

function InCartButton({ addToCart, location, products }) {
  const [user, setUser] = useState(1);

  const formattedProducts = products.map((product) => ({
    productId: product.productId || product,
  }));

  const handleAddToCart = async () => {
    if (!formattedProducts.length) {
      console.error("No products to add to cart");
      return;
    }
    await addToCart(user, formattedProducts);
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={handleAddToCart}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
      >
        <Link href={location}>장바구니에 넣기</Link>
      </button>
    </div>
  );
}

export default InCartButton;
