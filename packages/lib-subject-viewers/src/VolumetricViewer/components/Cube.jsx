import {
  BufferGeometry,
  BoxGeometry,
  Color,
  HemisphereLight,
  InstancedMesh,
  Line,
  LineBasicMaterial,
  Matrix4,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer
} from 'three'
import { object } from 'prop-types'
import { OrbitControls } from '../helpers/OrbitControls'
import { pointColor } from '../helpers/pointColor.js'
import { SortedSetUnion } from '../helpers/SortedSet.js'
import { useEffect, useLayoutEffect, useRef } from 'react'

// Shim for node.js testing
const glContext = null

const AXIS_COLORS = [
  0xE45950, // x
  0x06FE76, // y
  0x235DFF, // z
]

export const Cube = ({ annotations, tool, viewer, orbitControlsEnabled = true }) => {
  const FPS_INTERVAL = 1000 / 60
  const NUM_MESH_POINTS = Math.pow(viewer.base, 2) * 3 - viewer.base * 3 + 1

  // We need to create internal refs so that resizing + animation loop works properly
  const canvasRef = useRef(null)
  const meshPlaneSet = useRef(null)
  const threeRef = useRef({})
  const animationFrameId = useRef(null)

  // State Change management through useEffect()
  useEffect(() => {
    setupCube()

    // Render mesh + add to scene so that raycasting works
    renderPlanePoints()
    threeRef.current.scene.add(threeRef.current.meshPlane)

    if (annotations) renderAnnotations()
    animate()

    // Resize canvas
    resizeCube()

    // Setup State Listeners
    if (annotations) {
      annotations.on('active:annotation', renderAnnotations)
      annotations.on('add:annotation', renderAnnotations)
      annotations.on('update:annotation', renderAnnotations)
    }
    viewer.on('change:dimension:frame', renderPlanePoints)
    viewer.on('change:threshold', renderPlanePoints)

    return () => {
      // Cancel animation frame
      if (animationFrameId.current) {
        window.cancelAnimationFrame(animationFrameId.current)
        animationFrameId.current = null
      }

      // Remove event listeners
      if (annotations) {
        annotations.off('active:annotation', renderAnnotations)
        annotations.off('add:annotation', renderAnnotations)
        annotations.off('update:annotation', renderAnnotations)
      }
      viewer.off('change:dimension:frame', renderPlanePoints)
      viewer.off('change:threshold', renderPlanePoints)

      // Dispose Three.js resources
      if (threeRef.current) {
        // Dispose orbit controls
        if (threeRef.current.orbit) {
          threeRef.current.orbit.dispose()
        }

        // Dispose scene children (geometries, materials)
        if (threeRef.current.scene) {
          threeRef.current.scene.traverse((object) => {
            if (object.geometry) {
              object.geometry.dispose()
            }
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose())
              } else {
                object.material.dispose()
              }
            }
          })
          threeRef.current.scene.clear()
        }

        // Dispose renderer (don't call forceContextLoss as it prevents context reuse on remount)
        if (threeRef.current.renderer) {
          threeRef.current.renderer.dispose()
        }

        // Clear refs
        threeRef.current = {}
      }

      meshPlaneSet.current = null
    }
  }, [])

  useLayoutEffect(() => {
    window.addEventListener('resize', resizeCube)
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('resize', resizeCube)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  // Functions that do the actual work
  function setupCube () {
    // Setup Ref object once DOM is rendered
    threeRef.current = {
      canvas: null,
      camera: new PerspectiveCamera(100, 1, 0.01, 3000),
      cubes: new Object3D(),
      isShift: false,
      isClicked: -1,
      lastRender: 0,
      light: new HemisphereLight(0xffffff, 0x888888, 3),
      matrix: new Matrix4(),
      mouse: new Vector2(1, 1),
      mouseDown: 0,
      meshPlane: new InstancedMesh(
        new BoxGeometry(1, 1, 1),
        new MeshBasicMaterial({ color: 0xffffff }),
        NUM_MESH_POINTS
      ),
      orbit: null,
      raycaster: new Raycaster(),
      renderer: null,
      scene: new Scene()
    }

    // Setup camera, light, scene, and orbit controls
    const position = viewer.base * 0.66
    threeRef.current.camera.position.set(position, position, position)

    threeRef.current.light.position.set(0, 1, 0)

    threeRef.current.meshPlane.name = 'plane'

    threeRef.current.scene.background = new Color(0x000000)
    threeRef.current.scene.add(threeRef.current.light)

    threeRef.current.renderer = new WebGLRenderer({
      context: glContext,
      canvas: canvasRef.current,
      preserveDrawingBuffer: true
    })
    threeRef.current.renderer.setPixelRatio(window.devicePixelRatio)
    resizeCube()

    threeRef.current.orbit = new OrbitControls(
      threeRef.current.camera,
      threeRef.current.renderer.domElement
    )

    // This changes where the camera is physically located in the scene
    threeRef.current.orbit.target.set(0, 0, 0)
    threeRef.current.orbit.enableDamping = false
    threeRef.current.orbit.enableZoom = false
    threeRef.current.orbit.enablePan = false
    threeRef.current.orbit.enableRotate = orbitControlsEnabled
    threeRef.current.orbit.update()
  }

  function animate () {
    // Safety check for unmounted component
    if (!threeRef.current.lastRender && threeRef.current.lastRender !== 0) return

    const lastRender = Date.now() - threeRef.current.lastRender
    animationFrameId.current = window.requestAnimationFrame(animate)

    if (lastRender > FPS_INTERVAL) {
      // throttle to 60fps
      render()
      threeRef.current.lastRender = Date.now()
    }
  }

  function render () {
    // Safety check for unmounted component
    if (!threeRef.current.raycaster || !threeRef.current.renderer) return

    threeRef.current.raycaster.setFromCamera(
      threeRef.current.mouse,
      threeRef.current.camera
    )

    // Because the render loop is called every frame, we minimize work to only that needed for click
    if (threeRef.current.isClicked !== -1) {
      const button = threeRef.current.isClicked
      const shiftKey = threeRef.current.isShift

      const intersectionScene = threeRef.current.raycaster.intersectObject(
        threeRef.current.scene
      )

      // reset modifiers
      threeRef.current.isClicked = -1
      threeRef.current.isShift = false

      if (intersectionScene.length > 0) {
        let intersectingIndex = intersectionScene.findIndex(o => {
          return o.object.name.indexOf('Annotation') === 0
            || o.object.name === 'plane'
        })

        // clicked on something that's not relevant
        if (intersectingIndex === -1) return

        const iObj = intersectionScene[intersectingIndex]
        let point

        if (iObj.object.name === 'plane') {
          point = meshPlaneSet.current?.data?.[iObj.instanceId]
        } else if (iObj.object.name.indexOf('Annotation') === 0) {
          point = annotations.annotations[iObj.object.annotationIndex].points.active[0]
        }

        // clicked on something that's not relevant
        if (!point) return

        if (tool?.events.click) {
          tool.events.click({
            button,
            point,
            shiftKey
          })
        }
      }
    }

    threeRef.current.renderer.render(
      threeRef.current.scene,
      threeRef.current.camera
    )
  }

  function renderPlanePoints () {
    // const t0 = performance.now()

    // Guard against disposed or uninitialized viewer/component
    if (!viewer || viewer.base <= 0 || !threeRef.current?.meshPlane) return

    const frames = viewer.planeFrameActive
    const sets = frames.map((frame, dimension) =>
      viewer.getPlaneSet({ dimension, frame })
    )

    meshPlaneSet.current = SortedSetUnion({ sets })

    const meshPlane = threeRef.current?.meshPlane
    if (!meshPlane) return

    meshPlaneSet.current.data.forEach((point, index) => {
      drawMeshPoint({
        mesh: meshPlane,
        meshPointIndex: index,
        point
      })
    })
    // console.log("Performance: renderPlanePoints()", performance.now() - t0)

    renderPlaneOutline({ frames })

    if (meshPlane.instanceMatrix) meshPlane.instanceMatrix.needsUpdate = true
    if (meshPlane.instanceColor) meshPlane.instanceColor.needsUpdate = true
  }

  function renderPlaneOutline ({ frames }) {
    const OUTLINE_MAX = viewer.base - .25
    const OUTLINE_MIN = -.75

    const planeOutlines = [
      [
        [frames[0], OUTLINE_MIN, OUTLINE_MIN],
        [frames[0], OUTLINE_MAX, OUTLINE_MIN],
        [frames[0], OUTLINE_MAX, OUTLINE_MAX],
        [frames[0], OUTLINE_MIN, OUTLINE_MAX],
        [frames[0], OUTLINE_MIN, OUTLINE_MIN],
      ],
      [
        [OUTLINE_MAX, frames[1], OUTLINE_MAX],
        [OUTLINE_MAX, frames[1], OUTLINE_MIN],
        [OUTLINE_MIN, frames[1], OUTLINE_MIN],
        [OUTLINE_MIN, frames[1], OUTLINE_MAX],
        [OUTLINE_MAX, frames[1], OUTLINE_MAX],
      ],
      [
        [OUTLINE_MAX, OUTLINE_MIN, frames[2]],
        [OUTLINE_MAX, OUTLINE_MAX, frames[2]],
        [OUTLINE_MIN, OUTLINE_MAX, frames[2]],
        [OUTLINE_MIN, OUTLINE_MIN, frames[2]],
        [OUTLINE_MAX, OUTLINE_MIN, frames[2]],
      ],
    ]

    planeOutlines.forEach((planeOutline, dimension) => {
      const points = planeOutline
        .map(coors => getPositionInSpace({ coors }))
        .map(pnt => new Vector3(...pnt))
      const line = threeRef.current.scene.children
        .find(c => c.name === `Line ${dimension}`)

      if (line)
        return line.geometry.setFromPoints(points)

      const geometry = new BufferGeometry().setFromPoints(points)
      const material = new LineBasicMaterial({ color: AXIS_COLORS[dimension] })
      const newLine = new Line(geometry, material)
      newLine.name = `Line ${dimension}`
      threeRef.current.scene.add(newLine)
    })
  }

  /** ********* ANNOTATIONS *******************/
  function renderAnnotations () {
    const objsToRemove = []
    for (let i = 0; i < threeRef.current.scene.children.length; i++) {
      const obj = threeRef.current.scene.children[i]
      if (obj.name.indexOf('Annotation') === 0) {
        objsToRemove.push(obj)
      }
    }

    threeRef.current.scene.remove(...objsToRemove)

    for (let i = 0; i < annotations.annotations.length; i++) {
      const annotation = annotations.annotations[i]
      if (annotation.points.active.length > 0)
        addAnnotation({ annotation, annotationIndex: i })
    }
  }

  function addAnnotation ({ annotation, annotationIndex }) {
    // Create the mesh
    const mesh = new InstancedMesh(
      new BoxGeometry(1, 1, 1),
      new MeshBasicMaterial({ color: 0xffffff }),
      annotation.points.all.data.length
    )

    // Add points to the mesh
    annotation.points.all.data.forEach((point, pointIndex) => {
      drawMeshPoint({
        annotationIndex,
        mesh,
        meshPointIndex: pointIndex,
        point
      })
    })

    // Add mesh to the scene
    mesh.name = annotation.label
    mesh.annotationIndex = annotationIndex
    threeRef.current.scene.add(mesh)
    mesh.instanceMatrix.needsUpdate = true
  }

  /** ********* MESH *******************/
  function drawMeshPoint ({
    annotationIndex = -1,
    mesh,
    meshPointIndex,
    point
  }) {
    // isInactive makes all inactive marks less visible
    const isInactive = (annotationIndex === -1)
      ? false
      : (annotations?.config.activeAnnotation !== annotationIndex)

    const pointValue = viewer.getPointValue({ point })
    const isVisible = viewer.isPointInThreshold({ point })

    const position = isVisible
      ? getPositionInSpace({ coors: viewer.getPointCoordinates({ point }) })
      : [50000, 50000, 50000] // basically remove from view

    threeRef.current.matrix.setPosition(...position)
    mesh.setMatrixAt(meshPointIndex, threeRef.current.matrix)
    mesh.setColorAt(
      meshPointIndex,
      pointColor({
        annotationIndex,
        isInactive,
        isThree: true,
        pointValue,
        threshold: viewer.threshold
      })
    )
  }

  // Calculate the physical position in space
  function getPositionInSpace ({ coors }) {
    const [x, y, z] = coors
    const numPointsAdjustment = viewer.base - 1
    const positionOffset = (numPointsAdjustment / 2) * -1

    return [
      numPointsAdjustment + positionOffset - x,
      numPointsAdjustment + positionOffset - y,
      numPointsAdjustment + positionOffset - z
    ]
  }

  function onMouseMove (e) {
    // useEffect can setup the listeners before the cube is initialized
    if (!canvasRef.current || !threeRef.current || !threeRef.current.mouse) return

    // Update the base ref() so that the animation loop handles the mouse move
    const { height, left, top, width } =
      canvasRef.current.parentElement.getBoundingClientRect()
    threeRef.current.mouse.x = 2 * ((e.clientX - left) / width) - 1
    threeRef.current.mouse.y = 1 - 2 * ((e.clientY - top) / height)
  }

  function onPointerDown () {
    // detect click through pointer down + up since we can rotate the Cube
    threeRef.current.mouseDown = Date.now()
  }

  function onPointerUp (e) {
    const duration = Date.now() - threeRef.current.mouseDown
    if (duration < 250) {
      // ms to call it a click
      if (e.shiftKey) threeRef.current.isShift = true
      threeRef.current.isClicked = e.button
    }
  }

  function resizeCube () {
    if (!threeRef.current.camera) return

    // constrain based on parent element width and height
    const { width } =
      canvasRef.current.parentElement.getBoundingClientRect()

    threeRef.current.camera.aspect = 1
    threeRef.current.camera.updateProjectionMatrix()
    threeRef.current.renderer.setSize(width, width)
  }

  return (
    <canvas
      data-testid='cube'
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      ref={canvasRef}
    />
  )
}

Cube.propTypes = {
  annotations: object,
  tool: object,
  viewer: object
}
