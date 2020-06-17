import AudioOSC from "../index";
let osc = null;
function init(){
    let ctx = new AudioContext();
    let cvs = document.querySelector(".cvs");
    navigator.mediaDevices.getUserMedia({audio: true, video: true})
        .then(stream=>{
            let _streamSrc = ctx.createMediaStreamSource(stream);
            osc            = new AudioOSC(ctx, cvs, _streamSrc,null,2048);
            osc.start();
            document.querySelector(".btn.pause").addEventListener("click",osc.pause);
            document.querySelector(".btn.reset").addEventListener("click",osc.reset);
        });
}

document.querySelector(".btn.start").addEventListener("click",init);