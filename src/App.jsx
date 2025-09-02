import { Canvas } from '@react-three/fiber';
import React, { useState } from 'react'; // Import useState
import Fractal from './components/Fractal';

function App() {
  const [mode, setMode] = useState(0); // 0 for Mandelbrot, 1 for Julia
  const bgColor = '#1a032b'; 

  document.documentElement.style.setProperty('background-color', bgColor);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 0 ? 1 : 0));
  };

  return (
    <>
      <button
        onClick={toggleMode}
        style={{
          position: 'absolute',
          top: '20px',
          left: '10px',
          zIndex: 100,
          padding: '10px 15px',
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          border: '1px solid white',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Switch to {mode === 0 ? 'Julia' : 'Mandelbrot'} Set
      </button>
      <Canvas camera={{ position: [0, 0, 2] }}>
        <Fractal bgColor={bgColor} mode={mode} /> 
      </Canvas>
    </>
  );
}

export default App;
