
import React, { useState } from "react";
import App from "./src/App.jsx";
import Load from "./src/components/Loading/Load.jsx";

export default function MainApp() {
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