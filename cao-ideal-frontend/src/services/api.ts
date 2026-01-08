const PROD_URL = 'https://cao-ideal.onrender.com/api/v1';
const DEV_URL = 'http://localhost:3000/api/v1';

const API_URL = import.meta.env.PROD ? PROD_URL : DEV_URL;

// FUNÇÃO 1: Busca as recomendações do seu backend na Render
export const getDogRecommendations = async (params: any) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/recommendations?${queryString}`);

    if (!response.ok) throw new Error('Falha ao buscar recomendações');
    return response.json();
  } catch (error) {
    console.error("Erro na API:", error);
    return [];
  }
};

// FUNÇÃO 2: Busca as imagens para o carrossel (O que estava faltando no erro)
export const getRandomDogImages = async () => {
  try {
    const response = await fetch(
      `https://api.thedogapi.com/v1/images/search?limit=25&has_breeds=true&order=RANDOM`
    );
    const data = await response.json();
    
    if (Array.isArray(data) && data.length > 0) {
      return data.map((img: any) => img.url);
    }
    
    return ["https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"];
  } catch (error) {
    console.error("Erro ao buscar na galeria pública:", error);
    return ["https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"];
  }
};