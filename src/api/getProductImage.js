const API_URL = process.env.NEXT_PUBLIC_IMAGE_API_KEY;

export const fetchImage = async (searchTerm) => {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${searchTerm}&client_id=${API_URL}`
  );
  const data = await response.json();
  console.log(data);
  return data[0]?.urls?.regular;
};
