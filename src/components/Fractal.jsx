import React, { useRef } from 'react'
import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Import our shaders
import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'

// Create a reusable shader material
const FractalMaterial = shaderMaterial(
  // Uniforms: variables passed from JS to the shader
  {
    u_center: new THREE.Vector2(0.0, 0.0), // Center the view for Julia sets
    u_zoom: 1.0,
    u_max_iterations: 256,
    u_aspect: 1.0,
    u_bg_color: new THREE.Color('#000000'),
    u_julia_c: new THREE.Vector2(-0.8, 0.156), // The 'c' value that defines the set
    u_mode: 0, // 0 for Mandelbrot, 1 for Julia
  },
  vertexShader,
  fragmentShader
);

extend({ FractalMaterial });

function Fractal({ mode, bgColor }) { 
  const { viewport } = useThree(); // Camera is no longer needed here
  const materialRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (materialRef.current) {
      // Always update shared uniforms
      materialRef.current.uniforms.u_bg_color.value.set(bgColor);
      materialRef.current.uniforms.u_aspect.value = viewport.aspect;
      materialRef.current.uniforms.u_mode.value = mode;

      if (mode === 0) { // Mandelbrot animation - visually centered
        const zoom = 0.7 + 0.5 * ((Math.sin(time * 0.2) + 1) / 2);
        // Shifted the center point from -0.5 to -0.75 to better center the shape visually
        const centerX = -0.75 + Math.cos(time * 0.13) * 0.7;
        
        materialRef.current.uniforms.u_center.value.x = centerX;
        materialRef.current.uniforms.u_center.value.y = 0.0;
        materialRef.current.uniforms.u_zoom.value = zoom;

        const iterations = Math.max(128, Math.floor(75 * Math.sqrt(zoom)));
        materialRef.current.uniforms.u_max_iterations.value = iterations;

      } else { // Julia animation - remains mathematically centered
        // Animate the 'c' value to morph the Julia set
        materialRef.current.uniforms.u_julia_c.value.x = 0.7885 * Math.cos(time * 0.2);
        materialRef.current.uniforms.u_julia_c.value.y = 0.7885 * Math.sin(time * 0.2);
        
        // Ensure view is static and centered
        materialRef.current.uniforms.u_center.value.x = 0.0;
        materialRef.current.uniforms.u_center.value.y = 0.0;
        materialRef.current.uniforms.u_zoom.value = 1.0;
      }
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <fractalMaterial ref={materialRef} />
    </mesh>
  )
}

export default Fractal;