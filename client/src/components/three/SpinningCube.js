import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as THREE from 'three';

class SpinningCube extends Component{

  // Settings
  height: number;
  width: number;

  // Environments
  scene: THREE.Scene;
  envScene: THREE.Scene;
  dynamicLight: THREE.SpotLight;
  ambientLight: THREE.AmbientLight;
  pointLights: ThreePointLights;

  // Cameras
  camera: THREE.PerspectiveCamera;

  // Rendering
  webGLRenderer: THREE.WebGLRenderer;

  // Shapes
  geometry: THREE.BoxGeometry;
  material: THREE.MeshBasicMaterial;
  cube: THREE.Mesh;

  // Dom
  threeContainer: HTMLElement;

  state = {
    dynamicLighting: false,
    dynamicLightProps: {
      color: 0xc9e2ff,
      intensity: 0.8,
      distance: 0,
      decay: 2,
      offset: new THREE.Vector3(),
      lock: false
    }
  };

  constructor(props: Object){
    super(props);

    /**Properties**/
    /*************************************/
    (this: any).height = this.props.height;
    (this: any).width = this.props.width;

    /**Methods**/
    /*************************************/

    // Initialization
    (this: any).initThree = this.initThree.bind(this);
    (this: any).animate = this.animate.bind(this);
  }

  /**COMPONENT LIFECYCLE**/
  /*************************************/

  componentDidMount(){
    console.log('initThree(); was called!');
    this.initThree();
    console.log('animate(); was called!');
    //this.animate();
  }

  initThree(): void{

    this.threeContainer = this.refs.threeView;
    console.log(this.threeContainer);
    // Init Camera
    this.camera = new THREE.PerspectiveCamera(50, this.width / this.height);

    // Scenes
    this.scene = new THREE.Scene();
    this.envScene = new THREE.Scene();
    this.camera.target = new THREE.Vector3();

    // Lights
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1);

    this.dynamicLight = new THREE.PointLight(...this.state.dynamicLightProps);
    this.dynamicLight.target = new THREE.Vector3();
    this.dynamicLight.castShadow = true;
    this.dynamicLight.shadow.mapSize.width = 2048;
    this.dynamicLight.shadow.mapSize.height = 2048;
    this.dynamicLight.shadow.bias = -0.0002;
    this.dynamicLight.shadow.camera.near = this.camera.near;
    this.dynamicLight.shadow.camera.far = this.camera.far;
    this.dynamicLight.visible = this.state.dynamicLighting;

    // Cube
    this.geometry = new THREE.BoxGeometry(1,1,1);
    this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    this.cube = new THREE.Mesh( this.geometry, this.material );
    //console.log(this.cube);

    this.scene.add(this.dynamicLight);
    this.scene.add(this.ambientLight);
    this.scene.add(this.camera);
    this.scene.add(this.cube);
    //console.log(this.scene);
    this.camera.position.z = 5;


    // WebGLRenderer
    this.webGLRenderer = new THREE.WebGLRenderer({
      alpha: true,
      autoClear: false,
      antialias: true,
      gammaInput: true,
      gammaOutput: true,
    });

    this.webGLRenderer.shadowMap.enabled = true;
    this.webGLRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.webGLRenderer.setPixelRatio(this.pixelRatio);
    this.webGLRenderer.setSize(this.width, this.height);
    this.threeContainer.appendChild(this.webGLRenderer.domElement);
  }

  animate(): void{
    window.requestAnimationFrame(this.animate);
    this.cube.rotation.x += 0.01;
		this.cube.rotation.y += 0.01;
    this.cube.rotation.z += 0.01;

    this.webGLRenderer.render( this.scene, this.camera );
  }

  render(): Object{
    return(
      <div>
        <div ref="threeView" className="three-view" />
      </div>
    );
  }
}

SpinningCube.propTypes = {

};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(SpinningCube);
