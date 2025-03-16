import React, { useState, useEffect } from 'react';
import { Mic, Send } from 'lucide-react';

export const InputArea = ({ onSendMessage, onStartVoice, isListening, isLoading }) => {
  const [message, setMessage] = useState('');
  const [isMicSupported, setIsMicSupported] = useState(false);

  useEffect(() => {
    setIsMicSupported(!!window.webkitSpeechRecognition);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 bg-white border-t">
      {isMicSupported && (
        <button
          type="button"
          onClick={onStartVoice}
          disabled={isLoading}
          className={`p-2 rounded-full ${
            isListening ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
          } hover:bg-opacity-80 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          title={isListening ? 'Stop recording' : 'Start recording'}
        >
          <Mic className="w-6 h-6" />
        </button>
      )}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Въведете вашето съобщение..."
        disabled={isLoading}
        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={!message.trim() || isLoading}
        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-6 h-6" />
      </button>
    </form>
  );
};