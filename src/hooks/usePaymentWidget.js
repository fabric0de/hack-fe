export const usePaymentWidget = () => {
  const { data: paymentWidget } = useQuery({
    queryKey: ["payment-widget", TOSS_WIDGET_CLIENT_KEY, ANONYMOUS],
    queryFn: () => {
      return loadPaymentWidget(TOSS_WIDGET_CLIENT_KEY, ANONYMOUS);
    },
  });

  const handlePaymentRequest = async (orderList) => {
    // 결제를 요청하기 전에 orderId, amount를 서버(토스)에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    try {
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName:
          orderList.length > 1
            ? `${orderList[0].name} 외 ${orderList.length - 1}개`
            : `${orderList[0].name}`,
        successUrl: `${window.location.origin}/order/success`,
        failUrl: `${window.location.origin}/order/fail`,
      });
    } catch (error) {
      console.error("Error requesting payment:", error);
    }
  };

  return { paymentWidget, handlePaymentRequest };
};
