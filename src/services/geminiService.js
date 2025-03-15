const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const geminiService = {
  async getLanguageFeedback(text) {
    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an English teacher. Have a natural conversation with the student.
  First, respond to their message normally, then correct their grammar and explain the mistakes.
  Keep the conversation engaging and interactive: "${text}"`
            }]
          }]
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      return data;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  }
}; 