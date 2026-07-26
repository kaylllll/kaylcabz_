/* ===========================================
   Every Beat Is You ❤️
   Part 3 - Main Script
=========================================== */

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    createStars();
});

/* ===========================
   Loading Screen
=========================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loading").style.opacity = "0";

        setTimeout(() => {

            document.getElementById("loading").style.display = "none";

            intro();

        },800);

    },1800);

});

/* ===========================
   Intro Animation
=========================== */

const introText = document.getElementById("intro");

function intro(){

    introText.animate([
        {opacity:0,transform:"translate(-50%,30px)"},
        {opacity:1,transform:"translate(-50%,0px)"}
    ],{
        duration:1800,
        fill:"forwards"
    });

}

/* ===========================
   Stars
=========================== */

const stars=[];

function createStars(){

    stars.length=0;

    for(let i=0;i<250;i++){

        stars.push({

            x:Math.random()*w,
            y:Math.random()*h,

            r:Math.random()*2,

            a:Math.random(),

            s:.003+Math.random()*.01

        });

    }

}

createStars();

function drawStars(){

    ctx.clearRect(0,0,w,h);

    stars.forEach(star=>{

        star.a += star.s;

        const alpha=(Math.sin(star.a)+1)/2;

        ctx.beginPath();

        ctx.arc(star.x,star.y,star.r,0,Math.PI*2);

        ctx.fillStyle=`rgba(255,255,255,${alpha})`;

        ctx.fill();

    });

}

/* ===========================
   Floating Hearts
=========================== */

const particles=document.getElementById("particles");

function createHeart(){

    const heart=document.createElement("div");

    heart.innerHTML="❤";

    heart.style.position="absolute";

    heart.style.left=Math.random()*100+"vw";

    heart.style.top="110vh";

    heart.style.color="rgba(255,80,150,.8)";

    heart.style.fontSize=(10+Math.random()*25)+"px";

    heart.style.pointerEvents="none";

    heart.style.transition="transform 10s linear, opacity 10s";

    particles.appendChild(heart);

    requestAnimationFrame(()=>{

        heart.style.transform=`translateY(-130vh) rotate(${Math.random()*360}deg)`;

        heart.style.opacity="0";

    });

    setTimeout(()=>{

        heart.remove();

    },10000);

}

setInterval(createHeart,250);

/* ===========================
   Click Heart
=========================== */

const letter=document.getElementById("letter");

const heart=document.getElementById("heartContainer");

heart.onclick=()=>{

    letter.classList.add("active");

    typeWriter();

}

/* ===========================
   Close Letter
=========================== */

document.querySelector(".close").onclick=()=>{

    letter.classList.remove("active");

}

/* ===========================
   Typewriter
=========================== */

const paragraphs=document.querySelectorAll("#typewriter p");

let typed=false;

function typeWriter(){

    if(typed) return;

    typed=true;

    paragraphs.forEach(p=>{

        const text=p.innerHTML;

        p.innerHTML="";

        let i=0;

        const timer=setInterval(()=>{

            p.innerHTML+=text.charAt(i);

            i++;

            if(i>=text.length){

                clearInterval(timer);

            }

        },18);

    });

}

/* ===========================
   Music
=========================== */

const music=document.getElementById("music");

const musicBtn=document.getElementById("musicButton");

let playing=false;

musicBtn.onclick=()=>{

    if(!playing){

        music.play();

        playing=true;

        musicBtn.innerHTML="⏸";

    }else{

        music.pause();

        playing=false;

        musicBtn.innerHTML="🎵";

    }

}

/* ===========================
   Ending
=========================== */

setTimeout(()=>{

    document.getElementById("ending").animate([
        {opacity:0},
        {opacity:1}
    ],{
        duration:3000,
        fill:"forwards"
    });

},70000);

/* ===========================
   Mouse Glow
=========================== */

document.addEventListener("mousemove",(e)=>{

    heart.animate([
        {
            filter:"drop-shadow(0 0 35px hotpink)"
        },
        {
            filter:"drop-shadow(0 0 90px deeppink)"
        }
    ],{
        duration:600,
        fill:"forwards"
    });

});

/* ===========================
   Main Loop
=========================== */

function animate(){

    drawStars();

    requestAnimationFrame(animate);

}

animate();