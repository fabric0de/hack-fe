"use client";
// updateCartQuantity
import {
  deleteCart,
  downCartQuantity,
  getCart,
  upCartQuantity,
} from "@/api/cartApi";
import { postOrder } from "@/api/orderApi";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function CartPage() {
  const [carts, setCarts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [user, setUser] = useState(1);
  const [defaultImage, setDefaultImage] = useState(
    "/images/default-thumbnail.jpg"
  );

  const calculatorTotalAmount = () => {
    let amount = 0;
    carts.forEach((cart) => {
      const price = cart.product.price || 10000;
      const quantity = cart.product.quantity || 1;
      amount += price * quantity;
    });
    setTotalAmount(amount);
  };

  const handleGetCarts = async () => {
    const data = await getCart(user);
    setCarts(data);
  };

  useEffect(() => {
    handleGetCarts();
  }, [user]);

  useEffect(() => {
    if (carts.length > 0) {
      calculatorTotalAmount();
    }
  }, [carts]);

  const handleDeleteCart = async (user, cartId) => {
    await deleteCart(user, cartId);
    handleGetCarts();
  };

  const handleQuantityChange = async (cartId, newQuantity) => {
    if (newQuantity < 1) return;

    setCarts((prevCarts) =>
      prevCarts.map((cart) =>
        cart.id === cartId
          ? { ...cart, product: { ...cart.product, quantity: newQuantity } }
          : cart
      )
    );
  };

  const handlePostOrder = async () => {
    postOrder(user, carts.product);
  };
  return (
    <section className="bg-white py-8 antialiased">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 ">장바구니</h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            {/* 상품 영역 */}
            {carts.map((cart, index) => (
              <div className="space-y-6 mb-4" key={index}>
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm ">
                  <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <a href="#" className="w-20 shrink-0 md:order-1">
                      <Image
                        alt={cart.product.name}
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
                    <label htmlFor="counter-input" className="sr-only">
                      Choose quantity:
                    </label>
                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                      <div className="flex items-center">
                        <button
                          type="button"
                          id="decrement-button-5"
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                          onClick={() => {
                            downCartQuantity(1, cart.product.productId);

                            handleQuantityChange(
                              cart.id,
                              cart.product.quantity - 1
                            );
                          }}
                        >
                          <svg
                            className="h-2.5 w-2.5 text-gray-900"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <input
                          type="text"
                          id="counter-input-5"
                          data-input-counter
                          className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                          value={cart.product.quantity}
                          readOnly
                        />
                        <button
                          type="button"
                          id="increment-button-5"
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                          onClick={() => {
                            upCartQuantity(1, cart.product.productId);
                            handleQuantityChange(
                              cart.id,
                              cart.product.quantity + 1
                            );
                          }}
                        >
                          <svg
                            className="h-2.5 w-2.5 text-gray-900"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-gray-900">
                          {cart.product.price
                            ? cart.product.price.toLocaleString("ko-KR")
                            : "10,000"}
                          ₩
                        </p>
                      </div>
                    </div>

                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                      <a
                        href="#"
                        className="text-base font-medium text-gray-900 hover:underline "
                      >
                        {cart.product.name}
                      </a>

                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          className="inline-flex items-center text-sm font-medium text-red-600 hover:underline "
                          onClick={() => handleDeleteCart(user, cart.id)}
                        >
                          <svg
                            className="me-1.5 h-5 w-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18 17.94 6M18 18 6.06 6"
                            />
                          </svg>
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 주문 영역 */}
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
              <p className="text-xl font-semibold text-gray-900 ">주문 정보</p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 ">
                      주문 금액
                    </dt>
                    <dd className="text-base font-medium text-gray-900 ">
                      {totalAmount.toLocaleString("ko-KR")}₩
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 ">
                      할인
                    </dt>
                    <dd className="text-base font-medium text-green-600">
                      -{(totalAmount * 0.1).toLocaleString("ko-KR")}₩
                    </dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                  <dt className="text-base font-semibold text-gray-900 ">
                    총 금액
                  </dt>
                  <dd className="text-base font-bold text-gray-900 ">
                    {(totalAmount - totalAmount * 0.1).toLocaleString("ko-KR")}₩
                  </dd>
                </dl>
              </div>

              <button
                className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-lg text-white bg-blue-500 font-bold hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                onClick={() => handlePostOrder(user, carts)}
              >
                <Link href="/order">결제하기</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
