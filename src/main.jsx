import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

console.log('Environment variables loaded:', {
  apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY ? 'Present' : 'Missing'
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);