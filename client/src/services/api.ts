const BASE_URL = 'http://localhost:3000';

export const apiService = {
  uploadPDF: async (fileName: string, documentText: string) => {
    const response = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName, documentText }),
    });
    if (!response) throw new Error('Erro no upload.');
    return response.json();
  },

  sendMessage: async (message: string) => {
    const response = await fetch(`${BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    if (!response) throw new Error('Erro no chat.');
    return response.json();
  },

  mockAPI: async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      reply: 'Resposta simulada.',
    };
  },
};
