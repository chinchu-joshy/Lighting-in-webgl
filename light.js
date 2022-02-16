import {FBXLoader} from './js/fbxloader.js'
let camera, scene, renderer,hemilight,spotlight
init();
animate();

const controls = new THREE.OrbitControls(camera, renderer.domElement);
/* -------------------------------- controls -------------------------------- */

function init() {
  /* -------------------------------- geometry -------------------------------- */
  scene = new THREE.Scene();
  // scene.add(new THREE.AxesHelper(500))
  scene.background=new THREE.CubeTextureLoader().setPath('image/').load(['y.jpeg','y.jpeg','y.jpeg','y.jpeg','y.jpeg','y.jpeg'])
  const fbxLoader = new FBXLoader()
fbxLoader.load(
    'iguana.fbx',
    (object) => {
        object.traverse(function (child) {
          if(child.isMesh){
            const texture = new THREE.TextureLoader().load( "color.jpg" )
          child.material.map = texture
          child.material.needsUpdate = true;
          child.castShadow=true
          child.receiveShadow=true
          if(child.material.map) child.material.map.anisotropy=16

          }
          
        
            // if ((child as THREE.Mesh).isMesh) {
            //     // (child as THREE.Mesh).material = material
            //     if ((child as THREE.Mesh).material) {
            //         ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
            //     }
            // }
        })
        object.scale.set(.03, .03, .03)
        object.rotation.x=Math.PI/2
        
        object.position.set(0,15,0)
        scene.add(object)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)
  
//   new THREE.GLTFLoader().load('scene.gltf',(result)=>{
//     model=result.scene.children[0]
//     model.position.set(-5,-25)
//     model.traverse(n=>{
//       if(n.isMesh){
//         n.castShadow=true
//         n.reciveShadow=true


//       }
//     })
//     scene.add(model)

//  })
  // const material = new THREE.MeshBasicMaterial({
    
  
  // });
  // const plane = new THREE.Mesh(geometry, material);
  // scene.add(plane);

  /* ---------------------------------- light--------------------------------- */
  hemilight=new THREE.HemisphereLight(0xffeeb1,0x080820,2)
  scene.add(hemilight)
spotlight=new THREE.SpotLight(0xffa95c,2)
spotlight.castShadow=true
spotlight.shadow.bias=-0.0001
spotlight.shadow.mapSize.width=1024*4
spotlight.shadow.mapSize.height=1024*4
scene.add(spotlight)
  /* --------------------------------- camera --------------------------------- */
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);
  /* --------------------------------- render --------------------------------- */
  renderer =new  THREE.WebGL1Renderer({ antialias: true ,alpha:true});
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.toneMapping= THREE.ReinhardToneMapping
  renderer.toneMappingExpousure=2.5
  renderer.shadowMap.enabled=true
  document.body.appendChild(renderer.domElement);
}

/* --------------------------------- animate -------------------------------- */

function animate() {
  spotlight.position.set(
    camera.position.x+10,camera.position.y+10,camera.position.z+10
  )

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
