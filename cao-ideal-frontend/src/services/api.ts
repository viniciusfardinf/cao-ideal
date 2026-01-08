const PROD_URL = 'https://cao-ideal.onrender.com/api/v1'; 
const DEV_URL = 'http://localhost:3000/api/v1';

const API_URL = import.meta.env.PROD ? PROD_URL : DEV_URL;

export const getDogRecommendations = async (params: any) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    // A URL final deve ser: https://cao-ideal.onrender.com/api/v1/recommendations
    const response = await fetch(`${API_URL}/recommendations?${queryString}`);

    if (!response.ok) throw new Error('Erro na resposta do servidor');
    return response.json();
  } catch (error) {
    console.error("Erro de conexão:", error);
    return []; 
  }
};