/*Copyright 2018 Christopher Varjas - All Rights Reserved. Unauthorized copying or distribution of this file via any medium is strictly prohibited.*/

onload = function() {

// let rotationDefault = [0.5, -0.5, 0] // {x:0.5, y:-0.5, z:0}
let rotationDefault = [0, 0, 0]
let pivot = new THREE.Group()
let axis = {
	x: new THREE.Vector3(1, 0, 0),
	y: new THREE.Vector3(0, 1, 0),
	z: new THREE.Vector3(0, 0, 1)
}

function rotate(data, rotation) {
	for (object of data) {
		// object.applyAxisAngle(axis.y, 0.1)
		object.rotation.set(...rotation)
	}
}

function translate(data, position) {
	for (object of data) {
		object.position.set(...position)
	}
}

function render(data) {
	for (element of data) {
		let geometry = new THREE.BoxBufferGeometry(...element.dimensions);
		let material = new THREE.MeshBasicMaterial({
			// color: 0x00aaaa,
			color: 0x00ffff,
			lights: false,
			wireframe: true,
		})
		mesh = new THREE.Mesh(geometry, material)
		// scene.add(mesh)
		pivot.add(mesh)
		// rotate([mesh], rotationDefault)
		translate([mesh], element.origin)
		// console.log(mesh)
	}
	renderer.render(scene, camera)
}

function init() {
	// camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
	let frustumSize = 100
	let aspect = window.innerWidth / window.innerHeight
	camera = new THREE.OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 1, 2000)
	// camera.position.z = 400
	camera.position.set(0, 20, 100)
	scene = new THREE.Scene()
	controls = new THREE.OrbitControls(camera)
	// controls.target.set(0, 0, 0)
	// let texture = new THREE.TextureLoader().load('textures/crate.gif')
	// let geometry = new THREE.BoxBufferGeometry(200, 200, 150)
	let axesHelper = new THREE.AxesHelper(2000)
	// let material = new THREE.MeshBasicMaterial({ map: texture })
	// let material = new THREE.MeshBasicMaterial({
	// 	// color: 0x00aaaa,
	// 	color: 0x00ffff,
	// 	lights: false,
	// 	wireframe: true,
	// })
	// mesh = new THREE.Mesh(geometry, material)
	// scene.add(mesh)
	scene.add(axesHelper)
	scene.add(pivot)
	renderer = new THREE.WebGLRenderer({ antialias: true })
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)
	// window.addEventListener('resize', onWindowResize, false)
	// rotate([mesh,axesHelper], {x: 0.5, y: -0.3})
	// rotate([axesHelper], rotationDefault)
	// rotate([pivot], rotationDefault)
	renderer.render(scene, camera)
}
function animate() {
	requestAnimationFrame(animate)
	// scene.rotation.y -= 0.001
	controls.update()
	renderer.render(scene, camera)
}

init()
animate()
// render([[200, 150, 100]])

let settings = {}
// Box coordinates return [x,y,z] positions for vertices
// Verbose returns all coordinates, not just esssential ones

// Settings are all average values, variance can be defined elsewhere
function range(size, startAt = 0) {
	return [...Array(size).keys()].map(i => i + startAt)
}
settings = {
	length: 10,
	height: 4,
	depth: 1,
	lengthFull: 50,
	verbose: false,
	variance: {
		length: 0,
		height: 0,
		depth: 0
	}
}
// Generate a wall
function wall(settings) {
	let segments = settings.lengthFull / settings.length
	let segmentLength = settings.lengthFull / segments
	let output = [
		// dimensions: [],
		// origin: [0,0,0]
	]

	for (segment of range(segments)) {
		let segmentStart = segment * segmentLength
		output.push({
			dimensions: [segmentLength, settings.height, settings.depth],
			origin: [segmentStart, 0, 0]
		})
		// output.push([segmentStart, 0, 0])
		// output.push([segmentStart + segmentLength, settings.depth, settings.height])
	}
	return output
}

render(wall(settings))

settings = {
	length: 10,
	height: 4,
	depth: 1,
	verbose: false,
	variance: {
		length: 0,
		height: 0,
		depth: 0
	}
}
function block(settings) {
	// Need to account for an offset coordinate if necessary
	let output = [[0,0,0]]
	// Build base plane
	output.push([settings.length, 0, 0])
	output.push([0, settings.depth, 0])
	output.push([settings.length, settings.depth, 0])
	// Build top plane
	output.push([0, 0, settings.height])
	output.push([settings.length, 0, settings.height])
	output.push([0, settings.depth, settings.height])
	output.push([settings.length, settings.depth, settings.height])
	return output
}

settings = {
	length: 10,
	height: 3,
	depth: 10,
	verbose: false,
	variance: {
		length: 0,
		height: 0,
		depth: 0
	}
}
// Generate a residential structure
function residential(settings) {
	return block(settings)
}

residential(settings)

settings = {
	
}
// Generate a commercial structure
function commercial(settings) {

}


settings = {
	
}
// Generate a industrial structure
function industrial(settings) {

}
}
