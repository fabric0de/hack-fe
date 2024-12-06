import { postCart } from "@/api/cartApi";
import { getProductThree } from "@/api/productApi";
import InCartButton from "@/components/buttons/InCartButton";
import RetryButton from "@/components/buttons/RetryButton";
import ProductCard from "@/components/productCard/ProductCard";
import ProductCardBack from "@/components/productCard/ProductCardBack";
import questions from "@/constant/personalColorQuestion.json";
import { useState } from "react";

function PersonalColorForm() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState("");
  const [showProduct, setShowProduct] = useState(false);
  const [products, setProducts] = useState([]);

  const handleAnswer = (type) => {
    setAnswers((prev) => [...prev, type]);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const result = answers.reduce(
      (acc, type) => ({ ...acc, [type]: (acc[type] || 0) + 1 }),
      {}
    );
    const sorted = Object.entries(result).sort((a, b) => b[1] - a[1]);
    setResult(sorted[0][0]);
    console.log(result);
  };

  const handleGetProduct = async (type, result) => {
    const data = await getProductThree(type, result);

    setProducts(data);
  };

  const addToCart = async (userId, productId) => {
    await postCart(userId, productId);
  };

  return (
    <div className="p-6 bg-gray-100 rounded shadow-md">
      {result ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            당신의 퍼스널 컬러는: {result}
          </h2>
          {showProduct ? (
            <div>
              <ProductCard products={products} />
              <div className="flex items-center justify-center gap-20">
                <RetryButton
                  handleGetProduct={handleGetProduct}
                  type={"personalColor"}
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
              <p>MBTI에 맞는 상품을 확인해보세요!</p>
              <ProductCardBack />
              <button
                onClick={() => {
                  setShowProduct((prev) => !prev);
                  handleGetProduct("personalColor", result);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
              >
                추천 상품 확인하기
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {questions[currentQuestion].question}
          </h2>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row ">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.type)}
                className="w-64 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 sm:h-64"
              >
                {option.answer}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonalColorForm;
