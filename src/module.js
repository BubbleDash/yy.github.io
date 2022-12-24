
// import {GLTFLoader} from 'node_modules/three/examples/jsm/loaders/GLTFLoader.js';
// import * as THREE from "./three.module.js";
import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {Scene,PerspectiveCamera,WebGLRenderer,BoxGeometry,MeshBasicMaterial,Mesh,AxesHelper,SpotLight,PlaneGeometry,MeshLambertMaterial,AmbientLight,Vector2,Box3} from 'three';

import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';

// ../node_modules/three/examples/jsm/controls/OrbitControls.js



//import * as THREE from 'three';后不用麻烦导入
var scene = new THREE.Scene();
scene.castShadow = true;
//var scene =new Scene();

//x、y、z辅助坐标轴
// var axes = new AxesHelper(900);
// scene.add(axes);
// var helper = new THREE.GridHelper(1200, 60, 0xFF4444, 0x404040);
// scene.add(helper);



/* //地面网格 
// //添加一个平面几何当作地面
// var planeGeometry = new PlaneGeometry(100,100);
// //设置地面网格颜色，为了可以显示阴影材质设置为兰伯特材质，普通材质无法显示阴影
// var planeMaterial = new MeshLambertMaterial({color:0x222222});
// //生成阴影
// var plane=new Mesh(planeGeometry,planeMaterial);
// //往里旋转90°（否则看不见）
// plane.rotation.x=-0.5*Math.PI;
// //plane.position.set(15,0,0);
// //console.log(plane.castShadow);//检测地面是否接受阴影
// plane.receiveShadow = true;//让地面接受阴影
// plane.castShadow = true;
// //推入阴影到画面
// scene.add(plane);
*/
//设置一个兰伯特光源对象（没有方向且不会生成阴影）
var ambientLight = new AmbientLight(0xe4bff8);
scene.add(ambientLight);
//设置会产生阴影的光源(聚光灯)
var spotLight1 =new SpotLight(0xe4bff8);
scene.add(spotLight1);
//将聚光灯放在左上角
spotLight1.position.set(-6,10,18);
var spotLight2 =new SpotLight(0xe4bff8);
scene.add(spotLight2);
spotLight2.position.set(4,10,-12);

/* //需要显示阴影需要告诉计算机，我‘真的’要阴影
// spotLight.castShadow = true;
// //设置阴影效果
// spotLight.shadow.mapSize=new Vector2(1024,1024);
// spotLight.shadow.camera.far = 130;
// spotLight.shadow.camera.near = 40;
*/

//添加平行光（太阳光）
const directionalLight = new THREE.DirectionalLight( 0xe4bff8, 0.15 );

scene.add( directionalLight );

var camera =new PerspectiveCamera(75,document.getElementById("landing__inner").offsetWidth/document.getElementById("landing__inner").offsetHeight,1,1000);

var renderer = new WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth,  window.innerHeight );
renderer.shadowMap.enabled = true;
console.log(renderer.shadowMap.enabled);

document.getElementById("salty_lamp").appendChild(renderer.domElement);
let rotateObj = [];


  


const loader = new GLTFLoader();           
const gltf = loader.load( './models/sl.glb', function ( gltf ) {
    /*return gltf;
    //console.log(gltf.scene);
    //gltf.scene.castShadow = true;//单单设置一个是没有用的要全部设置（包括所有孩子）
   */
    //导入后要直接内部推入场景中，否则显示不了 
    scene.add( gltf.scene );
    //gltf.scene.overrideMaterial
    //移动物体
    gltf.scene.position.x=-0.7;
    gltf.scene.position.y=-0.4;
    gltf.scene.position.z=-0;
    gltf.scene.scale.set(0.5,0.5,0.5);//缩放
    

    //设置可以显示阴影 

    for(var k in gltf.scene.children){
        //console.log(k);
        // if(k.name=="六面玻璃"){
        //     console.log(k);
        //     k.transparent = true;//是否透明
        //     k.opacity = 0.0;//透明度
        // }
        rotateObj.push(gltf.scene.children[k]);
    }


      
    
            
    
                     
} ,undefined, function ( error ) {

console.error( error );
} );


// //创建测试立方体
// var cubeGeometry = new THREE.BoxGeometry(1,1,1);
// var cubeMaterial = new THREE.MeshLambertMaterial({color:0xf88800});
// //格局集合体和材质创建物体
// var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
// //将几何体添加到场景中
// scene.add(cube);
// cube.castShadow = true;
// cube.position.y = 5;
// //MeshBasicMaterial MeshLambertMaterial


//旋转摄像机
//  camera.position.x = -3;
//  camera.position.y = 0.11;
//  camera.position.z = 3;
 camera.position.set(-3.1,0.11,3);
//让摄像机盯住中心点
camera.lookAt(scene.position);
console.log(scene);

// function animate() {
// requestAnimationFrame( animate );//外部导入这句必写
// renderer.render(scene,camera);//执行渲染操作
// }
// animate();

// function render() {
//     // stats.update();
//     // obtControls.update(clock.getDelta());

//     renderer.render(scene, camera);
//     requestAnimationFrame(render);
//     //controls.update(clock.getDelta());
//     //旋转每一个子部件
//     if (rotateObj) {
//         rotateObj.forEach(item => {
//             item.castShadow = true;
//             item.receiveShadow = true;

//             if (item.name.includes('六梯形头部')||item.name.includes('六边形盖子')){
//                 item.rotation.y -= 0.008;
//             }
//             else if(item.name.includes('手环')){
//                 item.rotation.z += 0.008;
//             }
//             else
//                 item.rotation.y += 0.008;
//             if(item.name.includes('六面玻璃'))
//             {
//                 // item.MeshLambertMaterial.alpha = true;
//             }
//         })
//     }
// }

//创建控件对象
var controls = new OrbitControls(camera,renderer.domElement);

// 创建轨道控制器
var clock = null;
function createControls() {
    clock = new THREE.Clock();
// 创建THREE.Clock对象，用于计算上次调用经过的时间
    controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true ;// 是否自动旋转
    controls.rotateSpeed = 1;//左键旋转速度，已在CSS中禁用了

    
}
    

function render() {
    // console.log(1);//永恒刷新着
    createControls();
    var delta = clock;//获取自上次调用的时间差
    controls.update(delta) ;// 相机更新
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    
    //旋转每一个子部件
    if (rotateObj) {
        rotateObj.forEach(item => {
            item.castShadow = true;
            item.receiveShadow = true;

            if (item.name.includes('六梯形头部')||item.name.includes('六边形盖子')){
                item.rotation.y -= 0.008;
            }
            else if(item.name.includes('手环')){
            item.rotation.z += 0.008;
            }
            else
                item.rotation.y += 0.008;
            if(item.name.includes('六面玻璃'))
            {
                // item.MeshLambertMaterial.alpha = true;
            }
        })
    }

//22/12/10我没有力量了，根本停不下来
    // if( document.getElementById("flag").innerHTML == "1"){
    //     document.getElementById("flag").innerHTML = "";
    //     controls = new OrbitControls( camera, renderer.domElement );
    //     controls.addEventListener( 'change', render );
    //     function render() {
    //     renderer.render( scene, camera );
    //     }
    //     stop()
    // }

  }



  

// 给window绑定事件，监听窗口尺寸变化
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    // 动态检测不能请其，赋值给变量，否则变量将会是固定的，不能随着窗体缩放而缩放模型
    // console.log("现在宽高比：" + window.innerWidth / window.innerHeight);
    // 重新设置相机宽高比例
    //直接读取div长宽，固定lamp显示位置
    camera.aspect = document.getElementById("landing__inner").offsetWidth / document.getElementById("landing__inner").offsetHeight;


    ////不让lamp跑出去
    // if ((window.innerWidth / window.innerHeight)<=1.94 & (window.innerWidth / window.innerHeight)>=1.5){
    //     // 修改相机的参数，宽高比
    //     camera.aspect = window.innerWidth / window.innerHeight;
    //     //camera.position.z = 3 + (window.innerWidth / window.innerHeight) ;
    // }
    // else{
    //     camera.aspect = 0;
    // }

    
   
    // 更新投影的变换矩阵
    camera.updateProjectionMatrix(); // 更新相机投影矩阵
    // 重新设置渲染器尺寸
    renderer.setSize(document.getElementById("landing__inner").offsetWidth, document.getElementById("landing__inner").offsetHeight);

}



//var controls = new OrbitControls(camera,renderer.domElement);//创建控件对象
// controls.addEventListener('change', render);//监听鼠标、键盘事件


render();
// onWindowResize();

