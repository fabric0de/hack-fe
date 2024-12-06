"use client";

import { getOrder } from "@/api/orderApi";
import { useState, useEffect } from "react";

function OrderPage() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [user, setUser] = useState(1);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const result = await getOrder(user);
        console.log(result);
        setOrderHistory(data.orders);
      } catch (error) {
        console.error("주문 내역을 불러오는 중 오류 발생:", error);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">주문 내역</h1>
      {orderHistory.length === 0 ? (
        <div className="text-center text-gray-600">주문 내역이 없습니다.</div>
      ) : (
        <div className="bg-white rounded shadow p-4">
          <ul>
            {orderHistory.map((order) => (
              <li key={order.id} className="border-b last:border-none py-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">주문 번호: {order.id}</span>
                  <span className="text-sm text-gray-500">
                    주문 날짜: {new Date(order.date).toLocaleDateString()}
                  </span>
                </div>
                <ul className="mt-2">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between py-1">
                      <span>{item.name}</span>
                      <span>{item.price.toLocaleString()} 원</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold">총액:</span>
                  <span className="font-bold">
                    {order.totalAmount.toLocaleString()} 원
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default OrderPage;
