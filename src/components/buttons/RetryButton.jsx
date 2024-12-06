import { useState } from "react";

function RetryButton({ handleGetProduct, type, result }) {
  const [clickCount, setClickCount] = useState(0);
  const maxClicks = 3;

  const handleClick = () => {
    if (clickCount < maxClicks) {
      setClickCount((prev) => prev + 1);
      handleGetProduct(type, result);
    }
  };

  const isDisabled = clickCount >= maxClicks;

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`px-4 py-2 rounded ${
        isDisabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-gray-500 text-white hover:bg-gray-400"
      }`}
    >
      {isDisabled ? "더 이상 새로고침할 수 없습니다" : "새로고침"}
    </button>
  );
}

export default RetryButton;
