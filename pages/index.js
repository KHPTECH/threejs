import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Earth from "../components/Earth/Index";
import React from "react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";

export default function App() {
  const mountRef = useRef(null);

  useEffect(() => {
    const DayMap = new THREE.TextureLoader().load("earthmap1k.jpg");
    const BumpMap = new THREE.TextureLoader().load("earthbump.jpg");
    const cloudMap = new THREE.TextureLoader().load("earthCloud.png");
    const galaxyMap = new THREE.TextureLoader().load("galaxy.png");


    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 1.5;
    // camera.position.set( 2, 2, 1);
    var renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setClearColor("#000");
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.updateProjectionMatrix();
    });

    //main geometry
    var geometry = new THREE.SphereGeometry(0.6, 36, 36);
    var material = new THREE.MeshPhongMaterial({
      map: DayMap,
      bumpMap: BumpMap,
      bumpScale: 0.3,
      //color: 0x00ff00
    });
    const earth = new THREE.Mesh(geometry, material);

    scene.add(earth);

    //Cloud GEometry
    const cloudGeometry = new THREE.SphereGeometry(.63,36,36)
    const cloudMaterial =new THREE.MeshPhongMaterial({
      map: cloudMap,
      transparent : true,
    })
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial)
    scene.add(cloudMesh)

    //Star geometry
    const starGeometry = new THREE.SphereGeometry(80, 64,64)
    const starMaterial = new THREE.MeshBasicMaterial({
      map:galaxyMap,
      side: THREE.BackSide,
    })
    const starMesh = new THREE.Mesh(starGeometry, starMaterial)

    scene.add(starMesh)

    //light
    const light = new THREE.AmbientLight(0xffffff, 0.2);
    //light.position.set(10, 0, 25);
    scene.add(light);

    const pointlight = new THREE.PointLight(0xffffff, 0.5);
    pointlight.position.set(5, 3, 5);
    scene.add(pointlight);

    const controls = new OrbitControls(camera, renderer.domElement);

    controls.minDistance = 0;
    controls.maxDistance = Infinity;
    // controls.autoRotate = true
    controls.enableZoom = true; // Set to false to disable zooming
    // controls.zoomSpeed = 1.0;

    //controls.update() must be called after any manual changes to the camera's transform
    //camera.position.set( 0, 20, 100 );
    // controls.update();

    const animate = () => {
      requestAnimationFrame(animate);

      earth.rotation.y -= 0.0015;
      cloudMesh.rotation.y -= 0.0012;
      starMesh.rotation.y -= 0.002
      // required if controls.enableDamping or controls.autoRotate are set to true

      controls.update();

      renderer.render(scene, camera);
    };
    animate();

    return () => mountRef.current.removeChild(renderer.domElement);
  }, []);
  
  //  <> 
  // <div className="container">
  //   <nav className="naviagation">
  //     <ul className="nav-menu">
  //       <li className="nav-items"><a href="#">Home </a></li>
  //       <li className="nav-items"><a href="#">About </a></li>
  //       <li className="nav-items"><a href="#">Contact </a></li>
  //       <li className="nav-items"><a href="#">Service </a></li>
  //     </ul>
  //   </nav>
  // </div>
  return (
    <> 
     <div className="container">
        <nav className="navigation">
            <ul className="nav-menu">
                <li className="nav-items"><a href="#">Home</a></li>
                <li className="nav-items"><a href="#">About</a></li>
                <li className="nav-items"><a href="#">Contact</a></li>
                <li className="nav-items"><a href="#">Services</a></li>
            </ul>
        </nav>

        <div className="title-container">
            <div className="title">
                <h1>Get well soon dear Earth</h1>
                <p>If you cant keep clean your old bedroom you will also destroy the new one. Dont look for an
                    alternative of earth. Rather keep it clean and habitable. Environment pollution has increased
                    significantly. By polluting the environment we are not just destroying the earth, we are destroying
                    humanity as well.</p>
                <button className="btn">Lets Clean</button>
            </div>
        </div>
    </div>
  <div ref={mountRef}>

  </div>
  </>
    )

  // 
}
