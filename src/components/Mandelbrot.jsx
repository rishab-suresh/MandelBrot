import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';




const MandelbrotMaterial = shaderMaterial(
    {
        u_center: new THREE.Vector2(-0.5,0.0),
        u_zoom: 1.0,
        u_max_iterations: 256,
        u_aspect:1.0,
        u_bg_color: new THREE.Color('#000000'), 
    },
    vertexShader,
    fragmentShader
);

extend({MandelbrotMaterial});

function Mandelbrot({ bgColor }) { 
    const {viewport,camera} = useThree();
    const materialRef = useRef();

    const centerCameraPosition = new THREE.Vector3(-0.245,0.186,0);
    useFrame((state)=>{
        const time = state.clock.getElapsedTime();


        const minZ = 0.035;
        const maxZ = 1.75;
        camera.position.z = minZ + (maxZ - minZ) * ((Math.sin(time * 0.2) + 1.5) / 2.5);


        const xAmplitude = 0.10;
        camera.position.x = centerCameraPosition.x + Math.cos(time * 0.13) * xAmplitude;
        camera.position.y = centerCameraPosition.y;

        // This section passes our animation data to the shader
        if (materialRef.current){
            const zoom = 2.0/camera.position.z;
            materialRef.current.uniforms.u_zoom.value = zoom;
            materialRef.current.uniforms.u_aspect.value = viewport.aspect;
            materialRef.current.uniforms.u_center.value.x = camera.position.x - 0.5;
            materialRef.current.uniforms.u_center.value.y = camera.position.y;

            const iterations = Math.max(128,Math.floor(75* Math.sqrt(zoom)));
            materialRef.current.uniforms.u_max_iterations.value = iterations
        }
    });

    return(
        <mesh scale={[viewport.width,viewport.height,1]}>
            <planeGeometry args={[1,1]}/>
            <mandelbrotMaterial ref={materialRef} u_bg_color={bgColor}/>
        </mesh>
    )
}

export default Mandelbrot;