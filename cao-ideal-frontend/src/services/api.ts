const API_URL = 'http://localhost:3000/api/v1';

export const getDogRecommendations = async (params: any) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}/recommendations?${queryString}`);
  if (!response.ok) throw new Error('Falha ao buscar recomendações');
  return response.json();
};

export const getRandomDogImages = async () => {
  try {
    // Usando a rota de busca de imagens aprovadas com o limite máximo de 25
    // O parâmetro has_breeds=true garante que as fotos sejam de cachorros com raça definida
    const response = await fetch(`https://api.thedogapi.com/v1/images/search?limit=25&has_breeds=true&order=RANDOM`);
    const data = await response.json();
    
    if (Array.isArray(data) && data.length > 0) {
      // Mapeia as URLs das imagens em tamanho original
      return data.map((img: any) => img.url);
    }
    
    return ["https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"];
  } catch (error) {
    console.error("Erro ao buscar na galeria pública:", error);
    return ["https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"];
  }
};