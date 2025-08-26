# Interactive Mandelbrot Set with Three.js and React

This project is a real-time, animated visualization of the Mandelbrot set fractal, built using modern web technologies. It leverages the power of the GPU through custom GLSL shaders to calculate and render the intricate patterns of the fractal, allowing for a smooth, continuous animation that explores its infinite complexity.
<!-- It's helpful to add a screenshot here later -->
---

### Core Technologies

*   **React**: For building the user interface and managing the application state.
*   **Three.js**: The underlying 3D graphics library for WebGL.
*   **@react-three/fiber**: A React renderer for Three.js, which makes it easy to build declarative 3D scenes with components.
*   **@react-three/drei**: A collection of useful helpers and abstractions for `@react-three/fiber`.
*   **GLSL**: The OpenGL Shading Language is used to write the custom vertex and fragment shaders that perform the heavy lifting of calculating the fractal on the GPU.
*   **Vite**: The build tool providing a fast and lean development experience.

---

### Features

*   **Real-time Rendering**: The Mandelbrot set is calculated and drawn on the GPU for maximum performance.
*   **Automated Animation**: The camera automatically pans and zooms through an interesting region of the fractal, creating a hypnotic, continuous fly-through effect.
*   **Dynamic Detail**: The shader's iteration count increases dynamically with the zoom level, revealing finer details in deep zooms.
*   **Modular Codebase**: The project is structured with separate files for the React components and the GLSL shaders for better organization and readability.
*   **Synced Theming**: The background color of the scene is synchronized with the color of the interior of the Mandelbrot set.

---

### How to Run Locally

1.  **Clone the repository** (if you haven't already).
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the development server**:
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5173` (or the next available port).
