import { object } from 'prop-types'
import {
  AxesHelper,
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
import { useEffect, useLayoutEffect, useRef } from 'react'
import { Histogram } from './Histogram.js'
import { pointColor } from './../helpers/pointColor.js'
import { SortedSetUnion } from './../helpers/SortedSet.js'
import { OrbitControls } from './../helpers/OrbitControls.js'

// Shim for node.js testing
let glContext = null
if (!process.browser) {
  window.requestAnimationFrame = () => {
    // needs to be stubbed out for animate() to work
  }
}

export const Cube = ({ annotations, tool, viewer }) => {
  const FPS_INTERVAL = 1000 / 60
  const NUM_MESH_POINTS = Math.pow(viewer.base, 2) * 3 - viewer.base * 3 + 1

  // We need to create internal refs so that resizing + animation loop works properly
  const canvasRef = useRef(null)
  const canvasAxesRef = useRef(null)
  const meshPlaneSet = useRef(null)
  const threeRef = useRef({})
  const threeAxesRef = useRef({})

  // State Change management through useEffect()
  useEffect(() => {
    setupCube()

    // render mesh + add to scene so that raycasting works
    renderPlanePoints()
    threeRef.current.scene.add(threeRef.current.meshPlane)

    if (annotations) renderAnnotations()
    animate()

    // Resize canvas
    onWindowResize()

    // Setup State Listeners
    annotations.on('add:annotation', addAnnotation)
    annotations.on('remove:annotation', removeAnnotation)
    annotations.on('update:annotation', updateAnnotation)
    viewer.on('change:dimension:frame', renderPlanePoints)
    viewer.on('change:threshold', renderPlanePoints)
    viewer.on('save:screenshot', saveScreenshot)

    return () => {
      annotations.off('add:annotation', addAnnotation)
      annotations.off('remove:annotation', removeAnnotation)
      annotations.off('update:annotation', updateAnnotation)
      viewer.off('change:dimension:frame', renderPlanePoints)
      viewer.off('change:threshold', renderPlanePoints)
      viewer.off('save:screenshot', saveScreenshot)
    }
  }, [])

  useLayoutEffect(() => {
    window.addEventListener('resize', onWindowResize)
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('resize', onWindowResize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  // Save the viewer as a screenshot
  function saveScreenshot () {
    const encodedUri = encodeURI(canvasRef.current.toDataURL())
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'brainsweeper.png')
    document.body.appendChild(link)
    link.click()
  }

  // Functions that do the actual work
  function setupCube () {
    const { width } =
      canvasRef.current.parentElement.getBoundingClientRect()

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
      meshAnnotations: [],
      orbit: null,
      raycaster: new Raycaster(),
      renderer: null,
      scene: new Scene()
    }

    // Setup camera, light, scene, and orbit controls
    threeRef.current.camera.position.set(viewer.base, viewer.base, viewer.base)
    threeRef.current.camera.lookAt(0, 0, 0)

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
    threeRef.current.renderer.setSize(width, width)

		if (OrbitControls) {
			threeRef.current.orbit = new OrbitControls(
				threeRef.current.camera,
				threeRef.current.renderer.domElement,
			);
			threeRef.current.orbit.enableDamping = false;
			threeRef.current.orbit.enableZoom = true;
			threeRef.current.orbit.enablePan = false;
		} else {
			console.log('OrbitControls are not available')
		}

    // View Axes
    const half = viewer.base / 2

    const colors = [
      0xffff00, // yellow
      0x00ffff, // cyan
      0xff00ff // magenta
    ]

    const points = [
      [
        [1, 1, -1],
        [-1, 1, -1],
        [-1, 1, 1]
      ],
      [
        [-1, 1, 1],
        [-1, -1, 1],
        [1, -1, 1]
      ],
      [
        [1, -1, 1],
        [1, -1, -1],
        [1, 1, -1]
      ]
    ]

    points.forEach((pointArr, index) => {
      const _points = []
      pointArr.forEach((point) => {
        _points.push(
          new Vector3(point[0] * half, point[1] * half, point[2] * half)
        )
      })

      const geometry = new BufferGeometry().setFromPoints(_points)
      const material = new LineBasicMaterial({ color: colors[index] })
      const line = new Line(geometry, material)
      threeRef.current.scene.add(line)
    })

    // Axes setup
    threeAxesRef.current = {
      axis: new AxesHelper(100),
      canvas: null,
      light: new HemisphereLight(0xffffff, 0x888888, 3),
      matrix: new Matrix4(),
      mouse: new Vector2(1, 1),
      orbit: null,
      renderer: null,
      scene: new Scene()
    }

    // Setup Axes viewer details
    const xColor = new Color(0xff00ff)
    const yColor = new Color(0xffff00)
    const zColor = new Color(0x00ffff)

    threeAxesRef.current.axis.setColors(xColor, yColor, zColor)
    threeAxesRef.current.scene.background = new Color(0x000000)
    threeAxesRef.current.renderer = new WebGLRenderer({
      context: glContext,
      canvas: canvasAxesRef.current
    })
    threeAxesRef.current.renderer.setPixelRatio(window.devicePixelRatio)
    threeAxesRef.current.renderer.setSize(75, 75)
    threeAxesRef.current.scene.add(threeAxesRef.current.axis)
  }

  function animate () {
    const lastRender = Date.now() - threeRef.current.lastRender
    window.requestAnimationFrame(animate)

    if (lastRender > FPS_INTERVAL) {
      // throttle to 60fps
      render()
      threeRef.current.lastRender = Date.now()
    }
  }

  function render () {
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
        const point =
          meshPlaneSet.current.data[intersectionScene[0].instanceId]

        if (tool.events.click) {
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

    threeAxesRef.current.renderer.render(
      threeAxesRef.current.scene,
      threeRef.current.camera
    )
  }

  function renderPlanePoints () {
    // const t0 = performance.now()

    const frames = viewer.planeFrameActive
    const sets = frames.map((frame, dimension) =>
      viewer.getPlaneSet({ dimension, frame })
    )

    meshPlaneSet.current = SortedSetUnion({ sets })

    meshPlaneSet.current.data.forEach((point, index) => {
      drawMeshPoint({
        mesh: threeRef.current.meshPlane,
        meshPointIndex: index,
        point
      })
    })
    // console.log("Performance: renderPlanePoints()", performance.now() - t0);

    threeRef.current.meshPlane.instanceMatrix.needsUpdate = true
    threeRef.current.meshPlane.instanceColor.needsUpdate = true
  }

  /** ********* ANNOTATIONS *******************/
  function renderAnnotations () {
    annotations.annotations.forEach((annotation, annotationIndex) => {
      addAnnotation({ annotation, annotationIndex })
    })
  }

  function addAnnotation ({ annotation, annotationIndex }) {
    // Create the mesh
    const mesh = new InstancedMesh(
      new BoxGeometry(1, 1, 1),
      new MeshBasicMaterial({ color: 0xffffff }),
      annotation.points.all.data.length
    )
    threeRef.current.meshAnnotations[annotationIndex] = mesh

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
    threeRef.current.scene.add(mesh)
    mesh.instanceMatrix.needsUpdate = true
  }

  function updateAnnotation ({ annotation, annotationIndex }) {
    removeAnnotation({ annotationIndex })
    addAnnotation({ annotation, annotationIndex })
  }

  function removeAnnotation ({ annotationIndex }) {
    const mesh = threeRef.current.meshAnnotations[annotationIndex]
    threeRef.current.scene.remove(mesh)
    threeRef.current.meshAnnotations.splice(annotationIndex, 1)
  }

  /** ********* MESH *******************/
  function drawMeshPoint ({
    annotationIndex = -1,
    mesh,
    meshPointIndex,
    point
  }) {
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
        isThree: true,
        annotationIndex,
        pointValue
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
    if (duration < 150) {
      // ms to call it a click
      if (e.shiftKey) threeRef.current.isShift = true
      threeRef.current.isClicked = e.button
    }
  }

  function onWindowResize () {
    // constrain based on parent element width and height
    const { width } =
      canvasRef.current.parentElement.getBoundingClientRect()

    threeRef.current.camera.aspect = 1
    threeRef.current.camera.updateProjectionMatrix()
    threeRef.current.renderer.setSize(width, width)

    canvasAxesRef.current.width = canvasAxesRef.current.clientWidth
    canvasAxesRef.current.height = canvasAxesRef.current.clientHeight
  }

  return (
    <div style={{ position: 'relative' }}>
      <canvas
        data-testid='cube'
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        ref={canvasRef}
      />
      <canvas
        data-testid='cube-axis'
        ref={canvasAxesRef}
        style={{
          position: 'absolute',
          left: '10px',
          top: '10px',
          width: '75px',
          height: '75px'
        }}
      />
      <Histogram
        annotations={annotations}
        tool={tool}
        viewer={viewer}
      />
    </div>
  )
}

Cube.propTypes = {
  annotations: object,
  tool: object,
  viewer: object
}
