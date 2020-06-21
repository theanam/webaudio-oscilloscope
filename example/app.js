import {MediaStreamOscilloscope, getUserMedia} from "../dist/index";

let stats = document.querySelector(".status");
let cvs   = cvs = document.querySelector(".cvs");

function fancyGraph(ctx,width,height){
    let backstrokeStyle = ctx.strokeStyle;
    ctx.strokeStyle = "#444";
    ctx.fillRect(0,0,width,height);
    ctx.beginPath();
    for(let i=0; i<width; i+=10){
        ctx.moveTo(i,0);
        ctx.lineTo(i,height);
    }
    for(let j=0; j<height; j+=10){
        ctx.moveTo(0,j);
        ctx.lineTo(width,j);
    }
    ctx.stroke();
    ctx.strokeStyle = backstrokeStyle;
}
function startOsc(){
    getUserMedia({audio: true})
        .then(stream=>{
            if(!stream) {
                stats.classList.add("err");
                stats.classList.remove("success");
                stats.innerHTML = "Could not Access microphone";
                return false;
            }
            stats.classList.add("success");
            stats.classList.remove("error");
            stats.innerHTML = "Listening to your microphone, Try saying something";
            let osc = new MediaStreamOscilloscope(stream, cvs, null, 2048, null, fancyGraph);
            osc.start();
            document.querySelector(".btn.pause").addEventListener("click",()=>{
                stats.innerHTML = "Oscilloscope Paused";
                osc.pause();
            });
            document.querySelector(".btn.reset").addEventListener("click",()=>{
                stats.innerHTML = "Oscilloscope Reset";
                osc.reset();
            });
        });
}
document.querySelector(".start").addEventListener("click",startOsc);