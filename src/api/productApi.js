const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProductThree = async (type, result) => {
  try {
    const response = await fetch(
      `${API_URL}/products/category/${type}/${result}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // 상태 코드에 따른 분기 처리
    if (response.ok) {
      const data = await response.json();

      return data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getAllProduct = async () => {
  try {
    const response = await fetch(`${API_URL}/products/findAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();

      return data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
