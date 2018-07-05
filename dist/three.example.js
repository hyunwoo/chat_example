"use strict";

console.log(THREE);

var camera, scene, renderer;

var mesh;

// mesh -> 기하정보와 그려지는 방법을 같이 가진다
var geometry;
// 기하 정보
// vertex, normal, uv, index


// 텍스쳐 질감 그려질 방법
var material; // shader

// vertex shader // glsl, hlsl : shader language
// pixel shader  // glsl, hlsl : shader language


// geometry shader dx10 gpu

var stats = void 0;

var meshes = [];
init();
animate();

function init() {

    // Perspective ,
    // Orthographic ,
    // field of view
    //
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(60, //fov
    window.innerWidth / window.innerHeight, // aspect ratio
    0.01, // near clip
    10); // far clip
    camera.position.z = 1;

    // 공간을 만든다
    scene = new THREE.Scene();

    for (var i = 0; i < 100; i++) {
        geometry = new THREE.BoxGeometry(Math.random() * 0.2 + 0.1, Math.random() * 0.2 + 0.1, Math.random() * 0.2 + 0.1);
        material = new THREE.MeshNormalMaterial();

        // geometry, material
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 3 - 1.5;
        mesh.position.y = Math.random() * 3 - 1.5;
        mesh.position.y = Math.random() * 3 - 1.5;

        scene.add(mesh);
        meshes.push(mesh);
    }

    // draw call - cpu -> gpu

    //


    // 그림을 그려주는 친구
    // 그림을 그릴때 , size와 scene , camera가 필요하다.


    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI / 2;

    stats = new Stats();
    document.body.appendChild(stats.dom);

    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
    // controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    // controls.dampingFactor = 0.25;
    // controls.screenSpacePanning = false;
    // controls.minDistance = 0;
    // controls.maxDistance = 500
    // controls.maxPolarAngle = Math.PI / 2;
}

function animate() {
    requestAnimationFrame(animate);

    // transform
    // position, rotation, scale

    for (var i = 0; i < meshes.length; i++) {
        var _mesh = meshes[i];
        _mesh.position.x += (Math.random() - 0.5) * 0.01;
        _mesh.position.y += (Math.random() - 0.5) * 0.01;
        _mesh.position.z += (Math.random() - 0.5) * 0.01;

        _mesh.rotation.x += 0.01;
    }
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.02;
    renderer.render(scene, camera);
    stats.update();
}