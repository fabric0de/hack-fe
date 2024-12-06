const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const postOrder = async (userId, products) => {
  try {
    const response = await fetch(`${API_URL}/orders/users/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products }),
    });

    if (!response.ok) {
      console.error("Request failed:", response.status, response.statusText);
      return null;
    }

    const text = await response.text();
    if (text) {
      try {
        const data = JSON.parse(text);
        console.log("Parsed response:", data);
        return data;
      } catch (err) {
        console.error("Failed to parse response as JSON:", err);
        return null;
      }
    } else {
      console.warn("Empty response body.");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getOrder = async (userId) => {
  try {
    const response = await fetch(`${API_URL}orders/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();

      return data.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
