// ATENÇÃO: Verifique se não há barra "/" sobrando no final da URL
const PROD_URL = 'https://cao-ideal.onrender.com/api/v1';
const DEV_URL = 'http://localhost:3000/api/v1';

const API_URL = import.meta.env.PROD ? PROD_URL : DEV_URL;

export const getDogRecommendations = async (params: any) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    // Aqui montamos a URL final. Ex: https://cao-ideal.onrender.com/api/v1/recommendations
    const response = await fetch(`${API_URL}/recommendations?${queryString}`);

    if (!response.ok) throw new Error('Falha ao buscar recomendações');
    return response.json();
  } catch (error) {
    console.error("Erro na API:", error);
    return [];
  }
};

export const getRandomDogImages = async () => {
  try {
    const response = await fetch(`https://api.thedogapi.com/v1/images/search?limit=25&has_breeds=true&order=RANDOM`);
    const data = await response.json();
    return Array.isArray(data) ? data.map((img: any) => img.url) : ["https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"];
  } catch (error) {
    return ["https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"];
  }
};