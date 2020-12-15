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

  return null;
}

export default App;
