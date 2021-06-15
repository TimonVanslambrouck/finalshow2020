const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1200 );

const controls = new THREE.OrbitControls( camera, renderer.domElement);
camera.position.set( 1, 0, 0 );
controls.update();
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
scene.add( directionalLight );

const geometry = new THREE.SphereGeometry( 1000, 32, 32 );
const textureLoader= new THREE.TextureLoader();

const textureLoaderRoom = new THREE.TextureLoader();
const texture = textureLoader.load('testbackground.jpg');
const textureRoom = textureLoaderRoom.load('testbackground.jpg');

const material = new THREE.MeshBasicMaterial({map: texture, side:THREE.DoubleSide});
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );


// const textureLoaderTest= new THREE.TextureLoader();
// const tilesBaseColor = textureLoaderTest.load("./Texture/Waffle_001_basecolor.jpg");
// const tilesNormalMap = textureLoaderTest.load("./Texture/Waffle_001_normal.jpg");
// const tilesHeightMap = textureLoaderTest.load("./Texture/Waffle_001_height.png");
// const tilesRoughnessMap = textureLoaderTest.load("./Texture/Waffle_001_roughness.jpg");
// const tilesAmbientOcclusionMap = textureLoaderTest.load("./Texture/Waffle_001_ambientOcclusion.jpg");

const whitePlas_mat = new THREE.MeshPhongMaterial({
	color: 0xffffff,
});

const LED_mat = new THREE.MeshLambertMaterial({
	color : 0x96FFFD,
	emissive: 0x89DBFB,
	emissiveIntensity: 2.3
});

const glass_mat = new THREE.MeshPhysicalMaterial({
	color: 0xffffff,
	metalness: .9,
	roughness: .00,
	envMapIntensity: 0.9,
	clearcoat: 1,
	transparent: true,
	// transmission: .95,
	opacity: .8,
	reflectivity: 0.8,
	refractionRatio: 0.985,
	ior: 0.9
	});

	// const boxmateria = new THREE.MeshStandardMaterial({
	// 	map: tilesBaseColor,
	// 	normalMap: tilesNormalMap,
	// 	displacementMap: tilesHeightMap,
	// 	roughnessMap: tilesRoughnessMap,
	// 	aoMap: tilesAmbientOcclusionMap
	// });

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


var group = new THREE.Group();

//droneWhite
let loader1 = new THREE.GLTFLoader();
loader1.load("./DroneComp/droneWhite.glb", function(gltf){   
model = gltf.scene;
gltf.scene.traverse(function(object){
		object.castShadow = true;
		object.material= whitePlas_mat;
})
group.add(model);
	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
	}
);


//droneLED
let loader2= new THREE.GLTFLoader();
loader2.load("./DroneComp/droneLED.glb", function(gltf){   
	model = gltf.scene;
	gltf.scene.traverse(function(object){
		object.castShadow = true;
		object.material= LED_mat;

	})
	group.add(model);
		},
		// called while loading is progressing
		function (xhr) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
		// called when loading has errors
		function ( error ) {
			console.log( 'An error happened' );
		}
	);

//droneBlack
let loader3= new THREE.GLTFLoader();
loader3.load("./DroneComp/droneBlack.glb", function(gltf){   
	model = gltf.scene;
	gltf.scene.traverse(function(object){
		object.castShadow = true;
		

	})
	group.add(model);
		},
		// called while loading is progressing
		function (xhr) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
		// called when loading has errors
		function ( error ) {
			console.log( 'An error happened' );
		}
	);

//droneGlas
let loader4= new THREE.GLTFLoader();
loader4.load("./DroneComp/droneGlas.glb", function(gltf){   
	model = gltf.scene;
	
	gltf.scene.traverse(function(object){
		object.castShadow = true;
		object.material= glass_mat;

	})
group.add(model);
		},
		// called while loading is progressing
		function (xhr) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
		// called when loading has errors
		function ( error ) {
			console.log( 'An error happened' );
		}
	);


scene.add(group);

function animate() {
	group.position.z -= 0.01;
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();