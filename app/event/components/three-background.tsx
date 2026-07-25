"use client"

import { useEffect, useRef } from "react"

// Tech-event geometric background (FULL SCREEN, high-perf)
// • Scattered small geometry patches (tetra/octa/icosa) with subtle bob/rotate
// • Neon point-field (digital dust) with additive glow
// • Circuit-like traces for a futurist vibe
// • NOTE: Mid-screen scan planes REMOVED per request
export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // We purposely type THREE as any to avoid type-resolution errors if @types/three isn't installed
    let THREE: any

    let scene: any,
      camera: any,
      renderer: any

    // Instanced sets + their per-instance state
    type InstancedSet = {
      mesh: any
      count: number
      baseX: Float32Array
      baseY: Float32Array
      baseZ: Float32Array
      rotX: Float32Array
      rotY: Float32Array
      rotZ: Float32Array
      rotSpeed: Float32Array
      bobAmp: Float32Array
      bobSpeed: Float32Array
      scale0: Float32Array
      hueShift: Float32Array
      tmpObj: any
      tmpMat: any
      tmpQuat: any
      tmpEuler: any
      color: any
    }

    const sets: InstancedSet[] = []
    const traces: any[] = []
    let dots: any = null

    let animationId: number

    // Rebuild function so we can recompute world size on resize for FULL SCREEN coverage
    const build = async () => {
      // @ts-ignore – we intentionally allow dynamic import without types
      THREE = await import("three")

      // Dispose previous content if any
      while (scene?.children?.length) scene.remove(scene.children[0])
      sets.length = 0
      traces.length = 0
      dots = null

      // Scene
      scene = new THREE.Scene()
      scene.fog = new THREE.Fog(0x0a0a0a, 35, 260)

      // Camera – look straight at origin so world size math is exact
      const aspect = window.innerWidth / window.innerHeight
      camera = new THREE.PerspectiveCamera(65, aspect, 0.1, 1200)
      camera.position.set(0, 28, 98)
      camera.lookAt(0, 0, 0)

      // Renderer
      if (!renderer) {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
        if (mountRef.current) mountRef.current.appendChild(renderer.domElement)
      }
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x000000, 0)

      // Light
      scene.add(new THREE.AmbientLight(0xffffff, 0.75))
      const dir = new THREE.DirectionalLight(0xffffff, 0.65)
      dir.position.set(18, 36, 26)
      scene.add(dir)

      // ======= Compute WORLD radius to cover the entire viewport =======
      const dist = Math.abs(camera.position.z) // distance to z=0 plane
      const halfH = Math.tan((camera.fov * Math.PI) / 180 / 2) * dist
      const halfW = halfH * aspect
      const WORLD = Math.ceil(Math.max(halfW, halfH) * 2.0) // generous margin for edges

      // ======= Patch layout (scaled with viewport) =======
      const PATCH_COUNT = Math.round(28 + (window.innerWidth * window.innerHeight) / 140000) // ~28–70
      const patches = Array.from({ length: PATCH_COUNT }, () => {
        const r = 10 + Math.random() * 16 // radius of patch
        return {
          cx: (Math.random() * 2 - 1) * WORLD,
          cz: (Math.random() * 2 - 1) * WORLD,
          r,
          density: 1.0 + Math.random() * 1.2,
        }
      })

      // Helper to sample a patch (weighted by area * density)
      const weights = patches.map((p) => p.r * p.r * p.density)
      const totalW = weights.reduce((a, b) => a + b, 0)
      const pickPatch = () => {
        let t = Math.random() * totalW
        for (let i = 0; i < patches.length; i++) {
          t -= weights[i]
          if (t <= 0) return patches[i]
        }
        return patches[patches.length - 1]
      }

      // ======= Create three instanced shape sets (tetra / octa / icosa) =======
      const makeSet = (geometry: any, count: number, material: any): InstancedSet => {
        const mesh = new THREE.InstancedMesh(geometry, material, count)
        mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
        mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3)

        const baseX = new Float32Array(count)
        const baseY = new Float32Array(count)
        const baseZ = new Float32Array(count)
        const rotX = new Float32Array(count)
        const rotY = new Float32Array(count)
        const rotZ = new Float32Array(count)
        const rotSpeed = new Float32Array(count)
        const bobAmp = new Float32Array(count)
        const bobSpeed = new Float32Array(count)
        const scale0 = new Float32Array(count)
        const hueShift = new Float32Array(count)

        const tmpObj = new THREE.Object3D()
        const tmpMat = new THREE.Matrix4()
        const tmpQuat = new THREE.Quaternion()
        const tmpEuler = new THREE.Euler()
        const color = new THREE.Color()

        for (let i = 0; i < count; i++) {
          const p = pickPatch()
          const ang = Math.random() * Math.PI * 2
          const rad = Math.sqrt(Math.random()) * p.r // uniform in circle
          const x = p.cx + Math.cos(ang) * rad
          const z = p.cz + Math.sin(ang) * rad
          const y = (Math.random() - 0.5) * 3 // small vertical variation

          baseX[i] = x
          baseY[i] = y
          baseZ[i] = z
          rotX[i] = Math.random() * Math.PI
          rotY[i] = Math.random() * Math.PI
          rotZ[i] = Math.random() * Math.PI
          rotSpeed[i] = 0.25 + Math.random() * 0.85
          bobAmp[i] = 0.35 + Math.random() * 1.25
          bobSpeed[i] = 0.6 + Math.random() * 1.4
          scale0[i] = 0.5 + Math.random() * 0.95
          hueShift[i] = Math.random() * 0.25

          // initial transform
          tmpEuler.set(rotX[i], rotY[i], rotZ[i])
          tmpQuat.setFromEuler(tmpEuler)
          tmpObj.position.set(x, y, z)
          tmpObj.quaternion.copy(tmpQuat)
          tmpObj.scale.setScalar(scale0[i])
          tmpObj.updateMatrix()
          mesh.setMatrixAt(i, tmpObj.matrix)

          // color: base in purple→cyan band with per-instance shift
          color.setHSL(0.72 + hueShift[i] * 0.3, 0.85, 0.55)
          mesh.setColorAt(i, color)
        }

        scene.add(mesh)
        return {
          mesh,
          count,
          baseX,
          baseY,
          baseZ,
          rotX,
          rotY,
          rotZ,
          rotSpeed,
          bobAmp,
          bobSpeed,
          scale0,
          hueShift,
          tmpObj,
          tmpMat,
          tmpQuat,
          tmpEuler,
          color,
        }
      }

      // Materials with gentle emissive for neon feel
      const matA = new THREE.MeshStandardMaterial({ color: 0xdc2626, metalness: 0.25, roughness: 0.35, emissive: 0x7f1d1d, emissiveIntensity: 0.25 })
      const matB = new THREE.MeshStandardMaterial({ color: 0x67e8f9, metalness: 0.2, roughness: 0.4, emissive: 0x164e63, emissiveIntensity: 0.22 })
      const matC = new THREE.MeshStandardMaterial({ color: 0xfde047, metalness: 0.28, roughness: 0.3, emissive: 0x78350f, emissiveIntensity: 0.24 })

      // Geometries (small solids)
      const geoA = new THREE.TetrahedronGeometry(0.8)
      const geoB = new THREE.OctahedronGeometry(0.9)
      const geoC = new THREE.IcosahedronGeometry(0.7)

      // Counts scale with viewport so edges are covered
      const baseCount = Math.round((window.innerWidth * window.innerHeight) / 9000) // ~150–300+ per set
      sets.push(makeSet(geoA, Math.min(600, baseCount + 200), matA))
      sets.push(makeSet(geoB, Math.min(560, baseCount + 160), matB))
      sets.push(makeSet(geoC, Math.min(520, baseCount + 120), matC))

      // ======= Neon point-field (digital dust) =======
      const DOTS = Math.min(2600, Math.max(900, Math.round((window.innerWidth * window.innerHeight) / 2500)))
      const pos = new Float32Array(DOTS * 3)
      for (let i = 0; i < DOTS; i++) {
        pos[i * 3 + 0] = (Math.random() * 2 - 1) * WORLD
        pos[i * 3 + 1] = Math.random() * 32
        pos[i * 3 + 2] = (Math.random() * 2 - 1) * WORLD
      }
      const dotsGeo = new THREE.BufferGeometry()
      dotsGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
      const dotsMat = new THREE.PointsMaterial({ size: 1.2, sizeAttenuation: true, transparent: true, opacity: 0.8, depthWrite: false, blending: THREE.AdditiveBlending, color: 0x67e8f9 })
      dots = new THREE.Points(dotsGeo, dotsMat)
      scene.add(dots)

      // ======= Circuit-like traces =======
      const makeTrace = (seed: number) => {
        const steps = 3 + (seed % 3) // 3–5 bends
        const p: any[] = []
        let x = (Math.random() * 2 - 1) * WORLD
        let z = (Math.random() * 2 - 1) * WORLD
        const y = 0.3 + Math.random() * 2.5
        p.push(new THREE.Vector3(x, y, z))
        for (let s = 0; s < steps; s++) {
          // L-shaped jogs in X/Z to resemble PCB traces
          x += (Math.random() < 0.5 ? 1 : -1) * (6 + Math.random() * 18)
          p.push(new THREE.Vector3(x, y, z))
          z += (Math.random() < 0.5 ? 1 : -1) * (6 + Math.random() * 18)
          p.push(new THREE.Vector3(x, y, z))
        }
        const g = new THREE.BufferGeometry().setFromPoints(p)
        const m = new THREE.LineBasicMaterial({ color: Math.random() < 0.5 ? 0x67e8f9 : 0xdc2626, transparent: true, opacity: 0.22 })
        const line = new THREE.Line(g, m)
        line.userData = { y, seed }
        scene.add(line)
        traces.push(line)
      }
      const TRACE_COUNT = Math.round(60 + WORLD / 3)
      for (let i = 0; i < TRACE_COUNT; i++) makeTrace(i)
    }

    const init = async () => {
      await build()

      const animate = () => {
        animationId = requestAnimationFrame(animate)
        const t = performance.now() * 0.001

        // Update instanced sets
        for (const s of sets) {
          for (let i = 0; i < s.count; i++) {
            const y = s.baseY[i] + Math.sin(t * s.bobSpeed[i] + i * 0.37) * s.bobAmp[i]
            const sc = s.scale0[i] * (0.9 + Math.sin(t * 0.9 + i * 0.13) * 0.08)

            s.tmpEuler.set(
              s.rotX[i] + t * 0.5 * s.rotSpeed[i],
              s.rotY[i] + t * 0.7 * s.rotSpeed[i],
              s.rotZ[i] + t * 0.4 * s.rotSpeed[i],
            )
            s.tmpQuat.setFromEuler(s.tmpEuler)
            s.tmpObj.position.set(s.baseX[i], y, s.baseZ[i])
            s.tmpObj.quaternion.copy(s.tmpQuat)
            s.tmpObj.scale.set(sc, sc, sc)
            s.tmpObj.updateMatrix()
            s.mesh.setMatrixAt(i, s.tmpObj.matrix)

            if ((i & 7) === 0) {
              const h = 0.65 + ((s.hueShift[i] + t * 0.02) % 0.3)
              s.color.setHSL(h, 0.85, 0.55)
              s.mesh.setColorAt(i, s.color)
            }
          }
          s.mesh.instanceMatrix.needsUpdate = true
          if (s.mesh.instanceColor) (s.mesh.instanceColor as any).needsUpdate = true
        }

        // Dots: subtle twinkle via rotation + opacity pulse
        if (dots) {
          dots.rotation.y = t * 0.03
          const m = dots.material
          if (m) m.opacity = 0.7 + Math.sin(t * 0.8) * 0.1
        }

        // Traces: pulse and float a bit in Y
        for (let i = 0; i < traces.length; i++) {
          const line = traces[i]
          line.position.y = Math.sin(t * 0.6 + i * 0.37) * 0.5
          const mat = line.material
          if (mat) mat.opacity = 0.14 + (Math.sin(t * 1.5 + i) + 1) * 0.06
        }

        // Camera drift
        camera.position.x = Math.sin(t * 0.1) * 8
        camera.position.y = 28 + Math.sin(t * 0.07) * 1.6
        camera.lookAt(0, 0, 0)

        renderer.render(scene, camera)
      }

      animate()

      // Handle resize: rebuild geometry coverage for full screen
      const handleResize = async () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        await build() // recompute WORLD + repopulate
      }
      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }

    init()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (mountRef.current && renderer) {
        mountRef.current.removeChild(renderer.domElement)
      }
      try {
        sets.forEach((s) => {
          s.mesh?.geometry?.dispose?.()
          s.mesh?.material?.dispose?.()
        })
        traces.forEach((l) => {
          l?.geometry?.dispose?.()
          l?.material?.dispose?.()
        })
        if (dots) {
          dots?.geometry?.dispose?.()
          dots?.material?.dispose?.()
        }
        renderer?.dispose?.()
      } catch {}
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background: "radial-gradient(ellipse at center, rgba(220, 38, 38, 0.08) 0%, rgba(10, 10, 10, 0.95) 70%)",
      }}
    />
  )
}
