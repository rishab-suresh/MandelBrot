import { Canvas } from '@react-three/fiber'
import React from 'react'
import Mandelbrot from './components/Mandelbrot'

function App() {
  const bgColor = '#1a032b'; // Define our background color here

  // We need to modify the parent div's style directly for the CSS background
  document.documentElement.style.setProperty('background-color', bgColor);

  return (
    <Canvas camera={{ position: [0, 0, 2] }}>
      <Mandelbrot bgColor={bgColor} />
    </Canvas>
  );
}

export default App;
