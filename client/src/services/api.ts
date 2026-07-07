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

    if (!response.ok) {
      throw new Error(`Erro ao enviar mensagem: ${response.status}`);
    }

    return response.json();
  },

  mockAPI: async () => {
    await new Promise((resolve, reject) => {
      const shouldFail = false;
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error('Operação falhou.'));
        } else {
          resolve({ reply: 'Resposta simulada.' });
        }
      }, 1000);
    });

    return {
      reply: 'Resposta simulada.',
    };
  },
};
