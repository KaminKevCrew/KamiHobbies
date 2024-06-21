'use client';

import React, { useEffect, useRef } from 'react';
import * as Three from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { FlyControls } from 'three/addons/controls/FlyControls.js';
import { STLLoader } from 'three-stdlib'

interface ThreeSceneProps {
    stlFileLocation: string;
    cameraFoV: number;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ stlFileLocation, cameraFoV }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (canvasRef.current && containerRef.current) {
            const scene = new Three.Scene();
            // const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const camera = new Three.PerspectiveCamera(
                cameraFoV,
                containerRef.current.offsetWidth / containerRef.current.offsetHeight,
                0.1,
                1000);

            const renderer = new Three.WebGLRenderer({
                canvas: canvasRef.current,
                antialias: true
            });
            renderer.setPixelRatio(window.devicePixelRatio);

            const handleResize = () => {
                if (containerRef.current) {
                    const width = containerRef.current.offsetWidth;
                    const height = containerRef.current.offsetHeight;
                    camera.aspect = width / height;
                    camera.updateProjectionMatrix();
                    renderer.setSize(width, height);
                }
            };

            handleResize();
            window.addEventListener('resize', handleResize);

            const controls = new OrbitControls( camera, renderer.domElement );

            camera.position.set(0, -150, 100);
            controls.update();

            const ambientLight = new Three.AmbientLight(0x888888); // Dim ambient light
            scene.add(ambientLight);

            const directionalLight = new Three.DirectionalLight(0xffffff, 1); // White directional light
            directionalLight.position.set(100, -100, 100); // Position the light source
            scene.add(directionalLight);

            const loader = new STLLoader();
            loader.load(stlFileLocation, (geometry => {
                const material = new Three.MeshPhysicalMaterial({
                    color: 0x049ef4
                });
                const mesh = new Three.Mesh(geometry, material);
                scene.add(mesh);

                function animate() {
                    requestAnimationFrame( animate );
                    controls.update();
                    // mesh.rotation.x += 0.01;
                    // mesh.rotation.y += 0.01;
                    renderer.render(scene, camera);
                }
                animate();
            }))

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [stlFileLocation, cameraFoV]);

    // return <canvas ref={canvasRef} />;
    return (
        <div ref={containerRef} style={{ width: '100%', height: '500px' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default ThreeScene;