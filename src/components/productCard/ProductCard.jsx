import Image from "next/image";
import { useState } from "react";

function ProductCard({ products }) {
  const [defaultImage, setDefaultImage] = useState(
    "/images/default-thumbnail.jpg"
  );

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
          {products.map((product, index) => (
            <div className="p-4 w-1/3" key={index}>
              <div className="rounded-lg h-32 sm:h-64 overflow-hidden">
                <Image
                  alt={product.productName}
                  className="object-cover object-center h-full w-full"
                  width={0}
                  height={0}
                  sizes="100vw"
                  src={product.url || defaultImage}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
              <h2 className="text-xs h-10 font-medium title-font text-gray-900 mt-5">
                {product.productName}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
