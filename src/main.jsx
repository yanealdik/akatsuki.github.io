import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Load from "./components/Loading/Load";
import "./App.css";

function MainApp() {
  const [isLoading, setIsLoading] = useState(true);

  const handleStartLearning = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Load onStartLearning={handleStartLearning} />
      ) : (
        <App />
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
