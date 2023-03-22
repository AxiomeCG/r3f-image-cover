import { Canvas, useFrame } from "@react-three/fiber";
import "./App.scss";
import { OrbitControls, Sphere } from "@react-three/drei";
import vertexShader from "./shaders/example/vertex.glsl"
import fragmentShader from "./shaders/example/fragment.glsl"
import { useMemo, useRef } from "react";
import { ShaderMaterial } from "three";

const Scene = () => {
  const sphereRef = useRef<any>(null!);
  const uniforms = useMemo(() => ({
    uTime: {
      value: 0.0
    },
    // Add any other attributes here
  }), [])

  useFrame((state) => {
    const {clock} = state;

    sphereRef.current.material.uniforms.uTime.value = clock.elapsedTime;
  });

  return <>
    <Sphere ref={sphereRef}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </Sphere>
  </>
}


function App() {
  return (
    <>
      <Canvas>
        <Scene/>
        <pointLight position={[0, 5, 0]} intensity={1} color="white"/>
        <OrbitControls/>
      </Canvas>
    </>
  );
}

export default App;
