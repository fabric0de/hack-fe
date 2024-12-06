import { postCart } from "@/api/cartApi";
import { getProductThree } from "@/api/productApi";
import InCartButton from "@/components/buttons/InCartButton";
import RetryButton from "@/components/buttons/RetryButton";
import ProductCard from "@/components/productCard/ProductCard";
import ProductCardBack from "@/components/productCard/ProductCardBack";
import questions from "@/constant/mbtiQuestion.json";
import { useState } from "react";

const calculateMBTI = (answers) => {
  const score = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  answers.forEach((answer) => {
    score[answer] += 1;
  });

  return (
    (score.E >= score.I ? "E" : "I") +
    (score.S >= score.N ? "S" : "N") +
    (score.T >= score.F ? "T" : "F") +
    (score.J >= score.P ? "J" : "P")
  );
};

function MbtiForm() {
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
      const mbtiResult = calculateMBTI([...answers, type]);
      setResult(mbtiResult);
    }
  };

  const handleGetProduct = async (type, result) => {
    const data = await getProductThree(type, result);

    setProducts(data);
  };

  const addToCart = async (userId, productId) => {
    const data = await postCart(userId, productId);
  };

  return (
    <div className="p-6 bg-gray-100 rounded shadow-md">
      {result ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">당신의 MBTI는: {result}</h2>
          {showProduct ? (
            <div>
              <ProductCard products={products} />
              <div className="flex items-center justify-center gap-20">
                <RetryButton
                  handleGetProduct={handleGetProduct}
                  type={"mbti"}
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
                  handleGetProduct("mbti", result);
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
          <div className="flex gap-3 py-8">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.type)}
                className="w-full h-64 text-2xl px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
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

export default MbtiForm;
