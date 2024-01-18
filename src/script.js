import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'
import * as dat from 'lil-gui'

// console.log(FirstPersonControls)

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Fog
const fog = new THREE.Fog('#262837', 1, 150)
scene.fog = fog  

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const bricksColorTexture = textureLoader.load('/textures/bricks/temple.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

const tileColorTexture = textureLoader.load('/textures/floor/tile.jpg')
const tileAmbientOcclusionTexture = textureLoader.load('/textures/floor/alpha.jpg')
const tileRoughnessTexture = textureLoader.load('/textures/floor/invert.jpg')

tileColorTexture.repeat.set(32, 32)
tileAmbientOcclusionTexture.repeat.set(32, 32)
tileRoughnessTexture.repeat.set(32, 32)

tileColorTexture.wrapS = THREE.RepeatWrapping
tileAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
tileRoughnessTexture.wrapS = THREE.RepeatWrapping

tileColorTexture.wrapT = THREE.RepeatWrapping
tileAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
tileRoughnessTexture.wrapT = THREE.RepeatWrapping


/**
 * House
 */
// Group 1
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture,
    })
)
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))
walls.position.y = 2.5 / 2
house.add(walls)

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45' })
)
roof.position.y = 2.5 + 0.5
roof.rotation.y = Math.PI * 0.25
house.add(roof)

// Group 2
for(let x=-5; x<5; x++){
    for(let z=-5; z<5; z++){
        const durbar = new THREE.Group()
        scene.add(durbar)

        // Durbar Walls
        const durbarwalls = walls.clone()
        // const durbarwalls = new THREE.Mesh(
        //     new THREE.BoxGeometry(4, 2.5, 4),
        //     new THREE.MeshStandardMaterial({
        //         map: bricksColorTexture,
        //         aoMap: bricksAmbientOcclusionTexture,
        //         normalMap: bricksNormalTexture,
        //         roughnessMap: bricksRoughnessTexture,
        //     })
        // )
        durbarwalls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(durbarwalls.geometry.attributes.uv.array, 2))
        durbarwalls.position.y = 2.5 / 2
        durbar.add(durbarwalls)

        const durbarwalls2 = new THREE.Mesh(
            new THREE.BoxGeometry(4, 2.5, 4),
            new THREE.MeshStandardMaterial({
                map: bricksColorTexture,
                aoMap: bricksAmbientOcclusionTexture,
                normalMap: bricksNormalTexture,
                roughnessMap: bricksRoughnessTexture,
                roughness:10
            })
        )
        
        const randX = Math.random()
        const randY = Math.random()
        const randZ = Math.random()

        durbarwalls2.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(durbarwalls2.geometry.attributes.uv.array, 2))
        durbarwalls2.position.y = 4.2
        durbarwalls2.scale.x = 0.7
        durbarwalls2.scale.y = 0.7
        durbarwalls2.scale.z = 0.7
        
        durbar.scale.x = randX * 4 + 1
        durbar.scale.y = randY * 4 + 1
        durbar.scale.z = randZ * 4 + 1
        durbar.add(durbarwalls2)

        // Durbar Roof
        const durbarRoof = new THREE.Mesh(
            new THREE.ConeGeometry(3.5, 2, 4,),
            new THREE.MeshStandardMaterial({ color: '#b35f45' , roughness:5})
        )
        durbarRoof.position.y = 2.5 + 1
        durbarRoof.rotation.y = Math.PI * 0.25
        durbar.add(durbarRoof)
        
        durbar.position.x = x * 20
        durbar.position.z = z * 20

        // Durbar Roof 2
        const durbarRoof2 = new THREE.Mesh(
            new THREE.ConeGeometry(3.5, 2, 4,),
            new THREE.MeshStandardMaterial({ color: '#b35f45' , roughness:5})
        )
        durbarRoof2.position.y = 5.6
        durbarRoof2.scale.x = 0.8
        durbarRoof2.scale.y = 0.8
        durbarRoof2.scale.z = 0.8
        durbarRoof2.rotation.y = Math.PI * 0.25
        durbar.add(durbarRoof2)

    }
}



// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(230, 230),
    new THREE.MeshStandardMaterial({
        map: tileColorTexture,
        aoMap: tileAmbientOcclusionTexture,
        // normalMap: tileNormalTexture,
        roughnessMap: tileRoughnessTexture,    
    })
)
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ddbbdd', 0.5)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#bbbbbb', 1)
moonLight.position.set(4, 5, 5)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)
moonLight.castShadow = true

// Door Light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.001, 1000)
camera.position.x = 40
camera.position.y = 30
camera.position.z = 40
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = true
// const controls = new PointerLockControls(camera, canvas)
// scene.add(controls.getObject())
// const controls = new FirstPersonControls(camera, canvas)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')


/**
 * Shadows
 */
// renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

moonLight.castShadow = true
doorLight.castShadow = true

walls.castShadow = true

floor.receiveShadow = true

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()