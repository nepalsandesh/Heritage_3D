// import './style.css'
// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
// // import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'




// /**
//  * Base
//  */
// // Debug
// // const gui = new dat.GUI()

// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()

// // // Axes helper
// // const axesHelper = new THREE.AxesHelper()
// // scene.add(axesHelper)

// /**
//  * Textures
//  */
// const textureLoader = new THREE.TextureLoader()
// const matcapTexture = textureLoader.load('/textures/matcaps/8.png')

// /**
//  * Fonts
//  */
// const fontLoader = new  FontLoader()

// fontLoader.load(
//     '/fonts/helvetiker_regular.typeface.json',
//     (font) => {
//         const textGeometry = new TextGeometry(
//             'Hello World,',
//             {
//                 font: font,
//                 size: 0.5,
//                 height:0.2,
//                 curveSegments: 6,
//                 bevelEnabled: true,
//                 bevelThickness: 0.03,
//                 bevelSize: 0.02,
//                 bevelOffset: 0,
//                 bevelSegments: 4
//             }
//         )
//         // // To center the geometry
//         // // textGeometry.computeBoundingBox()
//         // // console.log(textGeometry.boundingBox)
//         // textGeometry.translate(
//         //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
//         //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
//         //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5,
//         // )
//         // // textGeometry.computeBoundingBox()
//         // // console.log(textGeometry.boundingBox)

//         // or,
//         textGeometry.center()

//         const textGeometry2 = new TextGeometry(
//             'Happy Computing !',
//             {
//                 font: font,
//                 size: 0.5,
//                 height:0.2,
//                 curveSegments: 6,
//                 bevelEnabled: true,
//                 bevelThickness: 0.03,
//                 bevelSize: 0.02,
//                 bevelOffset: 0,
//                 bevelSegments: 4
//             }
//         )
//         // // To center the geometry
//         // // textGeometry.computeBoundingBox()
//         // // console.log(textGeometry.boundingBox)

//         // // textGeometry.computeBoundingBox()
//         // // console.log(textGeometry.boundingBox)

//         // or,
//         textGeometry2.center()
//         textGeometry2.translate(
//             (textGeometry.boundingBox.max.x - 1.7),
//             - (textGeometry.boundingBox.max.y) * 3,
//             (textGeometry.boundingBox.max.z),
//         )

//         const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
//         const text1 = new THREE.Mesh(textGeometry, textMaterial)
//         const text2 = new THREE.Mesh(textGeometry2, textMaterial)
//         scene.add(text1, text2)
        
//         console.time('donuts')

//         const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
//         const donutMaterial = new THREE.MeshMatcapMaterial({ matcap:matcapTexture })

//         for(let i = 0; i < 100; i++)
//         {
//             const donut = new THREE.Mesh(donutGeometry, donutMaterial)
            
//             donut.position.x = (Math.random() - 0.5) * 10
//             donut.position.y = (Math.random() - 0.5) * 10
//             donut.position.z = (Math.random() - 0.5) * 10

//             donut.rotation.x = Math.random() * Math.PI
//             donut.rotation.y = Math.random() * Math.PI

//             // // scaling donuts
//             const scale = Math.random()
//             // donut.scale.x = scale
//             // donut.scale.y = scale
//             // donut.scale.z = scale

//             // // or,
//             donut.scale.set(scale, scale, scale)

//             scene.add(donut)
//         }

//         console.timeEnd('donuts')
//     }
// )


// /**
//  * Object
//  */
// // const cube = new THREE.Mesh(
// //     new THREE.BoxGeometry(1, 1, 1),
// //     new THREE.MeshBasicMaterial()
// // )

// // scene.add(cube)

// /**
//  * Sizes
//  */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.01, 100)
// camera.position.x = 1
// camera.position.y = 1
// camera.position.z = 2
// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// /**
//  * Animate
//  */
// const clock = new THREE.Clock()

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()

//     // Update controls
//     controls.update()

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()


/**
 * ------------------------------------------- Heritage 3D ----------------------------
 */


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
camera.position.x = 4
camera.position.y = 4
camera.position.z = 4
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



    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}


tick()