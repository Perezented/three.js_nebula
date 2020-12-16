import "./App.css";
import {
  Scene,
  PerspectiveCamera,
  AmbientLight,
  WebGLRenderer,
  FogExp2,
  TextureLoader,
  PlaneBufferGeometry,
  MeshLambertMaterial,
  Mesh,
  DirectionalLight,
  PointLight
} from "three";
import * as POSTPROCESSING from "postprocessing";
import smoke from "./smoke.png";
import spaceImg from "./jeremy-thomas-E0AHdsENmDg-unsplash.jpg";
function App() {
  // Set up, main points: SCENE CAMERA RENDERER
  let scene,
    camera,
    renderer,
    cloudParticles = [],
    composer;
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
  // renderer startup
  renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // addition of fog
  scene.fog = new FogExp2(0x03544e, 0.001);
  renderer.setClearColor(scene.fog.color);
  // add the renderer.domElement to body
  document.body.appendChild(renderer.domElement); // LOOK INTO THIS. THERE MUST BE ANOTHER WAY

  return null;
}

export default App;
