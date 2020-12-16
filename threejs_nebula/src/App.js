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

  // How much in which direction the camera moves
  camera.rotation.x = 1.16;
  camera.rotation.y = -0.12;
  camera.rotation.z = 0.1;

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

  // Loader to load in images/textures. cloud png in this case
  let loader = new TextureLoader();
  loader.load(smoke, function (texture) {
    let cloudGeo = new PlaneBufferGeometry(500, 500);
    let cloudMaterial = new MeshLambertMaterial({
      map: texture,
      DirectionalLight,
      transparent: true
    });
    // Make 100 clouds placed randomly into cloudParticles
    for (let p = 0; p < 100; p++) {
      let cloud = new Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(
        Math.random() * 800 - 400,
        500,
        Math.random() * 500 - 500
      );
      // Same rotations as above to not expose the edges of the cloud image
      cloud.rotation.x = 1.16;
      cloud.rotation.y = -0.12;
      cloud.rotation.z = Math.random() * 2 * Math.PI;
      cloud.material.opacity = 0.55;
      cloudParticles.push(cloud);
      // Add each cloud to the scene.
      scene.add(cloud);
    }
  });

  // Used to load in the space background image
  loader.load(spaceImg, function (texture) {
    const textureEffect = new POSTPROCESSING.TextureEffect({
      blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
      texture: texture
    });

    textureEffect.blendMode.opacity.value = 0.25;

    // Post processing
    const bloomEffect = new POSTPROCESSING.BloomEffect({
      blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
      kernelSize: POSTPROCESSING.KernelSize.SMALL,
      useLuminanceFilter: true,
      luminanceThreshold: 0.3,
      luminanceSmoothing: 0.75
    });
    bloomEffect.blendMode.opacity.value = 0.75;

    let effectPass = new POSTPROCESSING.EffectPass(
      camera,
      bloomEffect,
      textureEffect
    );
    effectPass.renderToScreen = true;
    composer = new POSTPROCESSING.EffectComposer(renderer);
    // use composer instead of renderer now
    composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
    composer.addPass(effectPass);

    // animate function
    render();
    function render() {
      cloudParticles.forEach((value) => {
        value.rotation.z -= 0.005;
      });
      composer.render(0.1);
      requestAnimationFrame(render);
    }
  });

  return null;
}

export default App;
