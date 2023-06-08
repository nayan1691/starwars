import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import NotFound from './pages/NotFound';
import ErrorComponent from './common/components/ErrorComponent';

export const ErrorContext = createContext({});
function App() {
  const [error, setError] = useState(undefined);
  return (
    <ErrorContext.Provider value={{ setError }}>
      <Routes>
        <Route
          path="/"
          element={error ? <ErrorComponent error={error} /> : <Home />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorContext.Provider>
  );
}

function WrappedApp() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default WrappedApp;
