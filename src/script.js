import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'
import * as dat from 'lil-gui'

// console.log(PointerLockControls)

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
const fog = new THREE.Fog('#262837', 1, 300)
scene.fog = fog  

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const bricksColorTexture = textureLoader.load('/textures/bricks/temple.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')
const nayatpolTexture = textureLoader.load('/textures/nayatpola/nayatpola3.jpg')
const nayatpolUpTexture = textureLoader.load('/textures/nayatpola/nayatpolatop.jpg')
const nayatpolBaseTexture = textureLoader.load('/textures/nayatpola/base.jpg')
const templeTexture = textureLoader.load('/textures/bricks/temple.jpg')

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
// scene.add(house)

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
        
        durbar.position.x = x * 30
        durbar.position.z = z * 30

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
        durbar.scale.y =  2 + Math.random() * 5

    }
}



// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(400, 400),
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
 * Nayatpola Temple
 */

const nayatpolGroup = new THREE.Group()
scene.add(nayatpolGroup)

const nayatpolBaseGeometry = new THREE.BoxGeometry(10, 1, 10)
const nayatpolBaseMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map:nayatpolBaseTexture  })
const nayatpolBase = new THREE.Mesh(nayatpolBaseGeometry, nayatpolBaseMaterial)
nayatpolBase.position.y = 1

const nayatpolBase2 =  nayatpolBase.clone(true)
nayatpolBase2.scale.set(0.9, 1, 0.9)
nayatpolBase2.position.y = 1

const nayatpolBase3 =  nayatpolBase.clone(true)
nayatpolBase3.scale.set(0.8, 1, 0.8)
nayatpolBase3.position.y = 2

const nayatpolBase4 =  nayatpolBase.clone(true)
nayatpolBase4.scale.set(0.7, 1, 0.7)
nayatpolBase4.position.y = 3

const nayatpolBase5 =  nayatpolBase.clone(true)
nayatpolBase5.scale.set(0.6, 1, 0.6)
nayatpolBase5.position.y = 4

nayatpolGroup.add(nayatpolBase, nayatpolBase2, nayatpolBase3, nayatpolBase4, nayatpolBase5)


const nayatpolRoomGeometry = new THREE.BoxGeometry(4, 4, 4)
const nayatpolRoomMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map:nayatpolTexture})
const nayatpolRoomUpMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map:templeTexture})
const nayatpolRoom = new THREE.Mesh(nayatpolRoomGeometry, nayatpolRoomUpMaterial)
const nayatpolRoom2 = new THREE.Mesh(nayatpolRoomGeometry, nayatpolRoomUpMaterial)
const nayatpolRoom3 = new THREE.Mesh(nayatpolRoomGeometry, nayatpolRoomUpMaterial)
const nayatpolRoom4 = new THREE.Mesh(nayatpolRoomGeometry, nayatpolRoomUpMaterial)
const nayatpolRoom5 = new THREE.Mesh(nayatpolRoomGeometry, nayatpolRoomUpMaterial)

nayatpolRoom.position.y = 5
nayatpolRoom2.position.y = 8
nayatpolRoom2.scale.set(0.7, 0.7, 0.7)

nayatpolRoom3.position.y = 10
nayatpolRoom3.scale.set(0.5, 0.5, 0.5)

nayatpolRoom4.position.y = 12
nayatpolRoom4.scale.set(0.3, 0.3, 0.3)

nayatpolRoom5.position.y = 13.5
nayatpolRoom5.scale.set(0.1, 0.1, 0.1)

nayatpolGroup.add(nayatpolRoom, nayatpolRoom2, nayatpolRoom3, nayatpolRoom4, nayatpolRoom5)

const nayatpolaRoof = roof.clone()
nayatpolaRoof.material.color.set(0xffaa66)
nayatpolaRoof.scale.set(1.3, 2, 1.3)
nayatpolaRoof.position.y = 8



const nayatpolaRoof2 = nayatpolaRoof.clone()
nayatpolaRoof2.scale.set(1,  1.5, 1)
nayatpolaRoof2.position.y = 10

const nayatpolaRoof3 = nayatpolaRoof.clone()
nayatpolaRoof3.scale.set(0.7,  1.2, 0.7)
nayatpolaRoof3.position.y = 11.5

const nayatpolaRoof4 = nayatpolaRoof.clone()
nayatpolaRoof4.scale.set(0.5,  1, 0.5)
nayatpolaRoof4.position.y = 13

const nayatpolaRoof5 = nayatpolaRoof.clone()
nayatpolaRoof5.scale.set(0.2,  0.3, 0.2)
nayatpolaRoof5.position.y = 13.8

nayatpolGroup.add(nayatpolaRoof, nayatpolaRoof2, nayatpolaRoof3, nayatpolaRoof4, nayatpolaRoof5 )
nayatpolGroup.scale.set(10, 10, 10)
nayatpolGroup.position.y = -3















/**
 * Dharahara
 */




/**Sajha Yatayat */





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
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height, 0.001, 1000)
camera.position.x = 4
camera.position.y = 4
camera.position.z = 150
scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true
// controls.autoRotate = true


const pControls = new PointerLockControls(camera, canvas)
const playButton = document.getElementById('menuPanel')
playButton.onclick = () =>
{   
    pControls.lock()
    playButton.style.display = 'none'
}

pControls.addEventListener('unlock', () => {
    playButton.style.display = 'block'
})

// Key down events
const keyMap = {}
const onDocumentKey = (e) => {
    keyMap[e.code] = e.type === 'keydown'
}
document.addEventListener('keydown', onDocumentKey, false)
document.addEventListener('keyup', onDocumentKey, false)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')
document.body.appendChild(canvas)


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
    // controls.update()    
    if (keyMap['KeyW'] || keyMap['ArrowUp']) {
        pControls.moveForward(0.25)
    }
    if (keyMap['KeyS'] || keyMap['ArrowDown']) {
        pControls.moveForward(-0.25)
    }
    if (keyMap['KeyA'] || keyMap['ArrowLeft']) {
        pControls.moveRight(-0.25)
    }
    if (keyMap['KeyD'] || keyMap['ArrowRight']) {
        pControls.moveRight(0.25)
    }
    if (keyMap['KeyE']) {
        camera.position.y += 0.1
    }
    if (keyMap['KeyQ']) {
        camera.position.y -= 0.1
    }



    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}


tick()