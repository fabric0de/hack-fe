"use client";

import MbtiForm from "@/components/forms/MbtiForm";
import PersonalColorForm from "@/components/forms/PersonalColorForm";
import TodayFortuneForm from "@/components/forms/TodayFortuneForm";
import ProductCardBack from "@/components/productCard/ProductCardBack";
import { useState } from "react";

function FormNav({ selectForm, setSelectForm }) {
  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        onClick={() => setSelectForm("mbti")}
        className={`px-4 py-2 rounded ${
          selectForm === "mbti" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Mbti로 추천받기
      </button>
      <button
        onClick={() => setSelectForm("color")}
        className={`px-4 py-2 rounded ${
          selectForm === "color" ? "bg-green-500 text-white" : "bg-gray-200"
        }`}
      >
        퍼스널컬러로 추천받기
      </button>
      <button
        onClick={() => setSelectForm("fortune")}
        className={`px-4 py-2 rounded ${
          selectForm === "fortune" ? "bg-yellow-500 text-white" : "bg-gray-200"
        }`}
      >
        오늘의 운세로 추천받기
      </button>
    </div>
  );
}

function Forms() {
  const [selectForm, setSelectForm] = useState("");

  return (
    <div className="p-4 space-y-4">
      <FormNav selectForm={selectForm} setSelectForm={setSelectForm} />

      <div className="mt-24">
        {selectForm === "" && (
          <div className="bg-white shadow-lg rounded-lg p-6 text-gray-700">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                다양한 테스트로 맞춤 상품을 추천받으세요!
              </h1>
              <p>3가지 상품을 추천하고 추천받은 상품을 할인해드립니다!</p>
              <p>
                마음에 들지 않으면
                <span className="font-semibold">다시 추천받기</span>를
                눌러보세요!
              </p>
              <p className="text-sm text-gray-500">
                다시 추천받기는 최대
                <span className="text-red-500 font-semibold">3번</span>까지
                가능합니다.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-gray-500">
                아래처럼 카드 3개가 뒷면으로 나옵니다.
              </p>
              <div className="flex gap-4 justify-center">
                <ProductCardBack />
              </div>
            </div>
          </div>
        )}

        {selectForm === "mbti" && <MbtiForm />}
        {selectForm === "color" && <PersonalColorForm />}
        {selectForm === "fortune" && <TodayFortuneForm />}
      </div>
    </div>
  );
}

export default Forms;
