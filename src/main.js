function comeIn() {
    //检测等入端口是手机还是电脑
    var system ={};  
    var p = navigator.platform;       
    system.win = p.indexOf("Win") == 0;  
    system.mac = p.indexOf("Mac") == 0;  
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);     
    if(system.win||system.mac||system.xll){//如果是电脑跳转到
            window.location.href="#";  
    }else{  //如果是手机,跳转到
           window.location.href="#";  
    }

    // 取得并插入移入动画
    document.getElementById("landing__left_down-wall").className = "landing__left_down-wall";
    document.getElementById("landing__left_down-wall__borders").className = "landing__left_down-wall__borders";
    document.getElementById("landing__left_centerbar").className = "landing__left_centerbar";
    document.getElementById("landing__left_top-block").className = "landing__left_top-block";
    document.getElementById("landing__left_top-block__borders").className = "landing__left_top-block__borders";
    
    document.getElementById("landing__right_down-wall").className = "landing__right_down-wall";
    document.getElementById("landing__right_down-wall__borders").className = "landing__right_down-wall__borders";
    document.getElementById("landing__right_centerbar").className = "landing__right_centerbar";
    document.getElementById("landing__right_top-block").className = "landing__right_top-block";
    document.getElementById("landing__right_top-block__borders").className = "landing__right_top-block__borders";

    document.getElementById("landing__center_wall_clear").className = "landing__center_wall_clear";
    document.getElementById("landing__inner").className = "landing__inner";
    // 石头墙延迟动画
    setTimeout(function(){document.getElementById("landing__left_up-wall").className = "landing__left_up-wall";},"2000");
    setTimeout(function(){document.getElementById("landing__left_up-wall__borders").className = "landing__left_up-wall__borders";},"2000");
    setTimeout(function(){document.getElementById("landing__right_up-wall").className = "landing__right_up-wall";},"2000");
    setTimeout(function(){document.getElementById("landing__right_up-wall__borders").className = "landing__right_up-wall__borders";},"2000");
    //石头墙延迟音效
    const upWallBlockSound =new Audio('../assets/sound/up_wall_block.mp3');
    setTimeout(function(){upWallBlockSound.play()},"2000");
    //森林遮罩出现
    setTimeout(function(){document.getElementById("landing__dark_lamp_full_center_wall_box").className = "landing__dark_lamp_full_center_wall_box";},"2200");
    setTimeout(function(){document.getElementById("landing__dark_lamp_full_center_wall").className = "landing__dark_lamp_full_center_wall";},"2200");
    //同森林遮罩出现的门框阴影
    setTimeout(function(){document.getElementById("landing__center_wall_clear_shadow").className = "landing__center_wall_clear_shadow";},"2200");
    //森林遮罩跟随鼠标移动
    // 根据id获取元素
    const container = document.getElementById('landing__dark_lamp_full_center_wall');
    // 窗口的鼠标移动事件,传入event对象
    window.onmousemove = function(e) {


        // 返回被触发时的鼠标X，Y位置
        // console.log('X:'+e.clientX+'Y:'+e.clientY);
        let x = e.clientX / 2 ;
            y = e.clientY / 5;
        // 将容器的背景图片定位进行修改
        container.style.backgroundPositionX = x - 900+ 'px';
        container.style.backgroundPositionY = y - 210+ 'px';
    }
    

    //lamp另外触发
    // setTimeout(function(){document.getElementById("salty_lamp").className = "salty_lamp_display";},"3200");

    //22/12/9 检测是否被点击focus，或是鼠标点到外面去了
    // document.getElementById("landing__dark_lamp_full_center_wall").addEventListener("focus", function() {
    //     console.log("focus")
    // })
    // document.getElementById("landing__dark_lamp_full_center_wall").addEventListener("blur", function() {
    //     console.log("blur")
    // })
}

var pick_Times = 0;//计数捡起/1次提示需要缩放窗口 然后到55之后唤出按钮

// 检验dark_lamp_full_center_wall的focus与否的特性函数
function focusLisener(){

    document.getElementById("landing__dark_lamp_full_center_wall").addEventListener("focus", function() {

         pick_Times ++ ;//一次的时候缩放窗口，十次的时候出现按钮
         //把pick_Times值偷偷藏进网页以便dialog.js读取
        document.getElementById("flag").innerHTML = pick_Times;
         //pickTimes.style.hidden = this.hidden;
         console.log("focus: "+pick_Times)
         //捡起音效
         const pick_lamp =new Audio('../assets/sound/pick_lamp.mp3');
         pick_lamp.volume = 0.1;//调节音量
         setTimeout(function(){pick_lamp.play()},"0");
         if (pick_Times>108 ){//呼唤次数达标了！！
            document.getElementById("landing__dark_lamp_full_center_wall").className="landing__light_none_full_center_wall";
            setTimeout(function(){document.getElementById("salty_lamp").style.display="none";},"10");//关掉模型
            // document.getElementById("flag").innerHTML="1";//与module.js连接
            document.getElementById("landing__dark_lamp_full_center_wall").style="pointer-events:none";//禁用点击事件，点击不在出现模型

            
            setTimeout(() => {//出现盐精灵宝宝
                document.getElementById("salty_baby").className = "salty_baby_appear";
            }, 3200);            
            setTimeout(() => {//模糊
                document.getElementById("salty_baby").className = "salty_baby_disappear";
            }, 7200);
            setTimeout(() => {//删除
                document.getElementById("salty_baby").className = "#";
            }, 7790);//6000+600其中"600"要和CSS动画结束时长一致(或小于)，否则会出现模糊的图片
               
         }
         //出现模型
         setTimeout(function(){document.getElementById("salty_lamp").className = "salty_lamp_display";},"10");
        })
    document.getElementById("landing__dark_lamp_full_center_wall").addEventListener("blur", function() {
         console.log("blur")
         //放下音效
         if (pick_Times>100 ){putdown_lamp.volume = 0;//阻止最后一次放下}
         const putdown_lamp =new Audio('../assets/sound/putdown_lamp.mp3');
         putdown_lamp.volume = 0.03;//调节音量
         setTimeout(function(){putdown_lamp.play()},"0");

         setTimeout(function(){document.getElementById("salty_lamp").className = "salty_lamp_hide";},"10");
    }
    })
    
    
}
