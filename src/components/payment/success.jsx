// "use client";

// import { useState } from "react";

// const OrderSuccessPage = ({ payment, isError }) => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const { orderNumber } = useOrderStore();
//   const router = useRouter();

//   useEffect(() => {
//     // 에러이면서 주문번호가 있으면 주문 내역 화면을 보여줍니다.
//     if (isError && orderNumber) {
//       router.push(`/order/receipt`);
//       return;
//     } else if (isError) {
//       // 에러만 있다면 에러 화면을 보여줍니다.
//       router.push("/error");
//       return;
//     }

//     // payment의 상태가 DONE일 때만 완료 화면을 보여줍니다.
//     if (payment && payment.status === "DONE") setIsLoaded(true);
//   }, []);

//   return <>{isLoaded ? <SuccessContainer payment={payment} /> : <Waiting />}</>;
// };

// export default OrderSuccessPage;
