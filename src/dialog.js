const daziji =new Audio('../assets/sound/daziji.mp3');
daziji.volume = 0.02;
function say(str){
    //实现打字机效果
    for (let i = 0;i < str.length;i++){
        setTimeout(function(){
            document.getElementById("test").innerHTML = str.substring(0,i+1); 
        },(i-1)*120);
        setTimeout(function(){
            setTimeout(function(){daziji.play();},"20");
        },(i-2)*120);
    }
    daziji.pause()
}

//没用的东西
// say("我是个demo,拾起手灯后缩放窗口触发模型");
// setTimeout(function(){say("5000ms后我想说哈哈哈");},"5000");

var time1 = 1;
var time2 = 1;
var time3 = 1;
var time4 = 1;
function picktimes(){
    var pickTimes = parseInt(document.getElementById("flag").innerHTML);//取得拾取次数
    //console.log("pickTimes"+pickTimes);
    if ( pickTimes >= 0 && pickTimes < 8){

        if(time1){
            //不让你在我说话的时候乱点
            document.getElementById("landing__dark_lamp_full_center_wall").style.pointerEvents = "none";

            time1--;
            say("好像有什么东西被卡在了空间夹缝中...<br>( *提示*缩放窗口后继续操作，提灯将出现 )");
            //好啦，我讲完了，乱点吧
            setTimeout(() => {
                document.getElementById("landing__dark_lamp_full_center_wall").style.pointerEvents = "auto";
            }, 5140);
        }


    }

    else if( pickTimes >= 26 && pickTimes < 44){
       
        if(time2){
            document.getElementById("landing__dark_lamp_full_center_wall").style.pointerEvents = "none";

            time2--;
            say("尽管画中的提灯没有灯芯，<br>但只要伸手拿起便会产生光亮...");
            setTimeout(() => {
                say("难道这盏提灯拥有生命！？<br>还是因为这个神秘空间存在未知力量呢....");
            }, 4800);

            setTimeout(() => {
                document.getElementById("landing__dark_lamp_full_center_wall").style.pointerEvents = "auto";
            }, 9600);
        }
    }

    else if( pickTimes >= 55 && pickTimes < 66){
       
        if(time3){ 
            document.getElementById("landing__dark_lamp_full_center_wall").style.pointerEvents = "none";
            
            time3--;
            say("拿拿放放地怎么没点反应......");

            setTimeout(() => {
                document.getElementById("landing__dark_lamp_full_center_wall").style.pointerEvents = "auto";
            }, 2200);
        }
    }

    else if( pickTimes >= 90 ){//100和108不错开他就运行不了

        //文案这边只给2200ms的时间哈，那边盐baby已经6000->10000延迟了
        if(time4){ 
            time4--;
            document.getElementById("landing__dark_lamp_full_center_wall").style.pointerEvents = "none";
            say("提灯中的亮光忽然四散逃窜!");
            setTimeout(() => {
                say("感觉...<br>画中昏暗的世界正在自远处逐渐泛起微光");
            }, 1800);      
            setTimeout(() => {
                document.getElementById("landing__dark_lamp_full_center_wall").style.pointerEvents = "auto";
            }, 5800); 
        }
    }
    else{}
}



