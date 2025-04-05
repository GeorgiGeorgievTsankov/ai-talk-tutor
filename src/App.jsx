import React, { useState, useEffect } from "react";
import { ChatMessage } from "./components/ChatMessage";
import { DifficultySelector } from "./components/DifficultySelector";
import { InputArea } from "./components/InputArea";
import { geminiService } from "./services/geminiService";
import tutorLogo from "./assets/img/tutor.png";

function App() {
  const [messages, setMessages] = useState([]);
  const [difficulty, setDifficulty] = useState("beginner");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (window.webkitSpeechRecognition) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleSendMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    } else {
      console.warn("Speech recognition not supported");
    }

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, []);

  useEffect(() => {
    if (!import.meta.env.VITE_DEEPSEEK_API_KEY) {
      console.error(
        "DeepSeek API key is missing! Please check your .env file."
      );
    }
  }, []);

  const handleSendMessage = async (content) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);

    setIsLoading(true);

    try {
      console.log("Sending request to DeepSeek API...");
      console.log(
        "API Key:",
        import.meta.env.VITE_DEEPSEEK_API_KEY.substring(0, 5) + "..."
      );

      const response = await geminiService.getLanguageFeedback(content);
      console.log("Full API response:", response);

      let aiResponse = "Sorry, I couldn't process your request.";

      if (response && response.candidates && response.candidates.length > 0) {
        aiResponse = response.candidates[0].content.parts[0].text;

        if (difficulty === "beginner") {
          aiResponse = simplifyResponse(aiResponse);
        } else if (difficulty === "advanced") {
          aiResponse = enhanceResponse(aiResponse);
        }
      }

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);

      speakText(aiResponse);
    } catch (error) {
      console.error("Detailed error:", error);
      console.error("Error stack:", error.stack);

      const fallbackResponse = {
        id: (Date.now() + 1).toString(),
        content: `Error: ${error.message}`,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, fallbackResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const simplifyResponse = (response) => {
    return response.split(".").slice(0, 2).join(".") + ".";
  };

  const enhanceResponse = (response) => {
    return (
      response +
      " Consider exploring more advanced vocabulary and complex sentence structures to enhance your fluency."
    );
  };

  const handleStartVoice = () => {
    if (!recognition) {
      alert("Speech recognition is not supported in your browser");
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  function speakText(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
  }

  const handleClearConversation = () => {
    geminiService.clearConversation();
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src={tutorLogo}
                alt="tutor"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                TalkTutor
              </h1>
            </div>
            <div className="flex sm:flex-row items-center gap-3 sm:gap-4 sm:ml-auto">
              <DifficultySelector
                difficulty={difficulty}
                onChange={setDifficulty}
              />
              <button
                onClick={handleClearConversation}
                className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
              >
                Clear Chat
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="bg-white rounded-lg shadow-sm h-[calc(100vh-12rem)] sm:h-[calc(100vh-16rem)] flex flex-col">
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex justify-center py-3 sm:py-4">
                <div className="animate-pulse text-gray-500">
                  AI is thinking...
                </div>
              </div>
            )}
          </div>
          <InputArea
            onSendMessage={handleSendMessage}
            onStartVoice={handleStartVoice}
            isListening={isListening}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
