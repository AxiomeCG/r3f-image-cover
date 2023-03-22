import { Canvas } from "@react-three/fiber";
import "./App.scss";
import { Center, OrbitControls, useTexture } from "@react-three/drei";
import imageCoverVertexShader from "./shaders/image-fit/vertex.glsl"
import imageCoverFragmentShader from "./shaders/image-fit/fragment.glsl"
import { Texture, Vector2 } from "three";


const calculateScaleFactors = (texture: Texture, containerSize: Vector2) => {

  const containerAspectRatio = containerSize.x / containerSize.y;
  const imageAspectRatio = texture.image.width / texture.image.height;

  let scaleFactorX = 1;
  let scaleFactorY = 1;

  const landscapeFactor = imageAspectRatio / containerAspectRatio;
  const portraitFactor = containerAspectRatio / imageAspectRatio;

  const isLandscapeModeContainer = containerAspectRatio >= 1;
  const isContainerRatioStronger = containerAspectRatio >= imageAspectRatio;


  if (isContainerRatioStronger) {
    scaleFactorY = isLandscapeModeContainer ? landscapeFactor : portraitFactor;
  } else {
    scaleFactorX = isLandscapeModeContainer ? landscapeFactor : portraitFactor;
  }

  return {scaleFactorX, scaleFactorY}
}

function generateGalleryMeshes(textures: Texture[], landscapeContainerDimensions: Vector2) {
  return textures.map((texture, index) => {
    const {scaleFactorX, scaleFactorY} = calculateScaleFactors(texture, landscapeContainerDimensions);

    const uniforms = {
      uTexture: {
        value: texture
      },
      uScaleFactorX: {
        value: scaleFactorX
      },
      uScaleFactorY: {
        value: scaleFactorY
      }
    }

    return <mesh key={`plane${index}`} position={[(landscapeContainerDimensions.x + 0.5) * index, 0, 0]}>
      <planeGeometry args={[landscapeContainerDimensions.x, landscapeContainerDimensions.y]}/>
      <shaderMaterial vertexShader={imageCoverVertexShader} fragmentShader={imageCoverFragmentShader}
                      uniforms={uniforms}/>
    </mesh>
  });
}

const Scene = () => {
  const textures = useTexture([
    "/pictures/kevin-wang-8FLIauBdVvY-unsplash.jpg",
    "/pictures/peter-steiner-buF3tTLtEQI-unsplash.jpg",
    "/pictures/willian-justen-de-vasconcellos-cxOspNBMFyk-unsplash.jpg",
    "/pictures/willian-justen-de-vasconcellos-vsVZJ7z7JL8-unsplash.jpg"
  ]);

  const landscapeContainerDimensions = new Vector2(6, 4);
  const portraitContainerDimensions = new Vector2(4, 6);

  const landscapeMeshes = generateGalleryMeshes(textures, landscapeContainerDimensions);
  const portraitMeshes = generateGalleryMeshes(textures, portraitContainerDimensions);

  return <>
    <Center>
      <Center>
        {landscapeMeshes}
      </Center>
      <Center position={[0, -6, 0]}>
        {portraitMeshes}
      </Center>
    </Center>
  </>
}

function App() {

  return (
    <>
      <Canvas camera={{position: [0,0,10]}}>
        <Scene/>
        <pointLight position={[0, 5, 0]} intensity={1} color="white"/>
        <OrbitControls/>
      </Canvas>
    </>
  );
}

export default App;
