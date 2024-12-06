import { postCart } from "@/api/cartApi";
import { getProductThree } from "@/api/productApi";
import InCartButton from "@/components/buttons/InCartButton";
import RetryButton from "@/components/buttons/RetryButton";
import ProductCard from "@/components/productCard/ProductCard";
import ProductCardBack from "@/components/productCard/ProductCardBack";
import { useState } from "react";

function TodayFortuneForm() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [result, setResult] = useState(null);
  const [showProduct, setShowProduct] = useState(false);
  const [products, setProducts] = useState([]);

  const cards = [
    { id: 1, name: "행운", image: "/images/cloba.jpg" },
    { id: 2, name: "애정", image: "/images/love.jpg" },
    { id: 3, name: "재물", image: "/images/diamond.jpg" },
  ];

  const fortunes = ["나쁨", "보통", "좋음"];

  const handleCardClick = (card) => {
    setSelectedCard(card);
    const randomResult = fortunes[Math.floor(Math.random() * fortunes.length)];
    setResult(randomResult);
  };

  const handleGetProduct = async (type, result) => {
    let apiResult;
    if (result === "나쁨") {
      apiResult = "bad";
    } else if (result === "보통") {
      apiResult = "normal";
    } else if (result === "좋음") {
      apiResult = "good";
    }
    const data = await getProductThree(type, apiResult);

    setProducts(data);
  };

  const addToCart = async (userId, productId) => {
    await postCart(userId, productId);
  };

  return (
    <div className="p-6 bg-gray-100 rounded shadow-md text-center">
      {!result ? (
        <div>
          <h2 className="text-2xl font-bold mb-6">오늘의 운세를 선택하세요</h2>
          <div className="flex justify-center gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className="cursor-pointer p-4 bg-white shadow hover:shadow-md rounded-lg"
                onClick={() => handleCardClick(card)}
              >
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-48 h-32 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold">{card.name}</h3>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {selectedCard.name} 운의 결과는:{" "}
            <span className="text-blue-500">{result}</span>
          </h2>
          {/* <p className="mb-6 text-gray-600">
            {result === '나쁨'
              ? '오늘은 조심하는 것이 좋아요. 신중하게 행동하세요!'
              : result === '보통'
              ? '평범한 하루가 예상됩니다. 무리하지 않는 것이 좋습니다.'
              : '좋은 일이 일어날 것 같아요! 기대해도 좋습니다!'}
          </p> */}
          {showProduct ? (
            <div>
              <ProductCard products={products} />
              <div className="flex items-center justify-center gap-20">
                <RetryButton
                  handleGetProduct={handleGetProduct}
                  type={"fortune"}
                  result={result}
                />
                <InCartButton
                  products={products}
                  addToCart={addToCart}
                  location={"/cart"}
                />
              </div>
            </div>
          ) : (
            <div>
              <p>오늘의 운세에 어울리는 맞는 상품을 확인해보세요!</p>
              <ProductCardBack />
              <button
                onClick={() => {
                  setShowProduct((prev) => !prev);
                  handleGetProduct("fortune", result);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
              >
                추천 상품 확인하기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TodayFortuneForm;
