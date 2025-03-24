const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

let conversationHistory = [];

export const geminiService = {
  async getLanguageFeedback(text) {
    try {
      conversationHistory.push({
        role: "user",
        parts: [{ text }]
      });

      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "You are an English language tutor. Keep leading the conversation and ensure continuous engagement.\n" + 
                  "Current conversation history:\n" +
                  conversationHistory.map(msg => `${msg.role}: ${msg.parts[0].text}`).join("\n") +
                  "\nNow respond to the last message, correcting any mistakes and explaining them in a simple way. " +
                  "Then, ask a follow-up question to keep the conversation flowing and make it engaging."
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.5,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]) {
        conversationHistory.push({
          role: "assistant",
          parts: [{ text: data.candidates[0].content.parts[0].text }]
        });
      }

      if (conversationHistory.length > 10) {
        conversationHistory = conversationHistory.slice(-10);
      }

      console.log("Conversation History:", conversationHistory);
      return data;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  },

  clearConversation() {
    conversationHistory = [];
  }
};
