import "./App.css";
import {
function App() {
  // Set up, main points: SCENE CAMERA RENDERER
  let scene, camera, renderer;
  // Make a new scene and camera
  scene = new Scene();
  camera = new PerspectiveCamera(
    // FOV
    80,
    // Aspect ratio
    window.innerWidth / window.innerHeight,
    // near clipping plane
    1,
    // far clipping plane
    1000
  );
  
  // Where the camera is located
  camera.position.z = 10;

  // Ambient light setup
  let ambient = new AmbientLight(0x000000);
  // Add abient to scene
  scene.add(ambient);

  let directionalLight = new DirectionalLight(0xff8c19);

  directionalLight.position.set(0, 3, 0.5);
  scene.add(directionalLight);
  return null;
}

export default App;
