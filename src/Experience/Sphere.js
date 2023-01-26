import * as THREE from 'three'
import Experience from './Experience';

import vertex from './shaders/sphere/vertex.glsl'
import fragment from './shaders/sphere/fragment.glsl'

export default class Background {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene;
    this.renderer = this.experience.renderer.instance
    this.config = this.experience.config
    this.time = this.experience.time
    this.debug = this.experience.debug

    if(this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'Sphere'
      })
    }

    this.setGeometry()
    this.setMaterial()
    this.setCubeTexture()
    this.setMesh()
  }

  setDebug() {

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
        tCube: { value: 0 },
        mRefractionRatio: { value: 1.02 },
        mFresnelBias: { value: 0.1 },
        mFresnelScale: { value: 4.0 },
        mFresnelPower: { value: 2.0 }
      }
    })

    if(this.debug) {
      this.debugFolder.addInput(
        this.material.uniforms.mRefractionRatio,
        'value',
        { label: 'refraction ratio', min: -1.2, max: 1.2, step: 0.001 }
      )
      this.debugFolder.addInput(
        this.material.uniforms.mFresnelBias,
        'value',
        { label: 'fresnel bias', min: -2, max: 2, step: 0.001 }
      )
      this.debugFolder.addInput(
        this.material.uniforms.mFresnelScale,
        'value',
        { label: 'fresnel scale', min: 0, max: 10, step: 0.001 }
      )
      this.debugFolder.addInput(
        this.material.uniforms.mFresnelPower,
        'value',
        { label: 'fresnel power', min: 0, max: 10, step: 0.001 }
      )
    }
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