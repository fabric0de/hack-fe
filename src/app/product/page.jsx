"use client";

import { postCart } from "@/api/cartApi";
import { getAllProduct } from "@/api/productApi";
import InCartButton from "@/components/buttons/InCartButton";
import Image from "next/image";
import { useEffect, useState } from "react";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [defaultImage, setDefaultImage] = useState(
    "/images/default-thumbnail.jpg"
  );

  const getProduct = async () => {
    const data = await getAllProduct();
    console.log(data);
    setProducts(data);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const addToCart = async (userId, productId) => {
    const data = await postCart(userId, productId);
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products.map((product, index) => (
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={index}>
              <a className="block relative h-48 rounded overflow-hidden">
                <Image
                  alt={product.productName}
                  className="object-cover object-center h-full w-full"
                  width={0}
                  height={0}
                  sizes="100vw"
                  src={defaultImage}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {product.category}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {product.productName}
                </h2>
                <div className="flex flex-row items-center justify-between ">
                  <p className="mt-1">{product.price}</p>
                  <InCartButton
                    products={[product.productId]}
                    addToCart={addToCart}
                    location={"/product"}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
