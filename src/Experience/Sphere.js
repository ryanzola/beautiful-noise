import * as THREE from 'three'
import Experience from './Experience';

import vertex from './shaders/sphere/vertex.glsl'
import fragment from './shaders/sphere/fragment.glsl'

export default class Background {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene;
    this.renderer = this.experience.renderer.instance
    this.time = this.experience.time

    this.setGeometry()
    this.setMaterial()
    this.setCubeTexture()
    this.setMesh()
  }

  setGeometry() {
    this.geometry = new THREE.SphereBufferGeometry(0.4, 32, 32)
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: { value: 0 },
        tCube: { value: 0 }
      }
    })
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  setCubeTexture() {
    this.cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
      format: THREE.RGBAFormat,
      generateMipmaps: true,
      minFilter: THREE.LinearMipMapLinearFilter,
      encoding: THREE.sRGBEncoding
    })

    this.cubeCamera = new THREE.CubeCamera(0.1, 10, this.cubeRenderTarget)
  }

  update() {
    this.material.uniforms.uTime.value = this.time.elapsed * 0.002
    this.mesh.visible = false
    this.cubeCamera.update(this.renderer, this.scene)
    this.mesh.visible = true
    this.material.uniforms.tCube.value = this.cubeRenderTarget.texture
  }
}