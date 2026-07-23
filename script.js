/*==========================================================
 AI Research Website V2
 Script.js
 Part 1/4
==========================================================*/

"use strict";

/*==========================================================
SELECTORS
==========================================================*/

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/*==========================================================
ELEMENTS
==========================================================*/

const loader = $("#loader");

const navbar = $(".navbar");

const menuBtn = $("#menuBtn");

const navLinks = $(".nav-links");

const links = $$(".nav-links a");

const scrollTopBtn = $("#scrollTop");

/*==========================================================
WINDOW LOAD
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("loader");

    window.setTimeout(() => {

        if(loader){

            loader.style.opacity = "0";
            loader.style.visibility = "hidden";

            setTimeout(()=>{

                loader.remove();

            },500);

        }

    },800);

});

/*==========================================================
CURRENT YEAR
==========================================================*/

const year = $("#year");

if (year) {

    year.textContent = new Date().getFullYear();

}

/*==========================================================
MOBILE MENU
==========================================================*/

menuBtn?.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    menuBtn.classList.toggle("active");

});

/*==========================================================
CLOSE MENU
==========================================================*/

links.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuBtn.classList.remove("active");

    });

});

/*==========================================================
SMOOTH SCROLL
==========================================================*/

links.forEach(link => {

    link.addEventListener("click", e => {

        const href = link.getAttribute("href");

        if (!href.startsWith("#")) return;

        e.preventDefault();

        const target = document.querySelector(href);

        if (!target) return;

        window.scrollTo({

            top: target.offsetTop - 80,

            behavior: "smooth"

        });

    });

});

/*==========================================================
NAVBAR SCROLL
==========================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.style.background = "rgba(5,10,18,.85)";

        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";

    }

    else {

        navbar.style.background = "rgba(5,10,18,.35)";

        navbar.style.boxShadow = "none";

    }

});

/*==========================================================
ACTIVE NAV LINK
==========================================================*/

const sections = $$("section");

function updateActiveNav() {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;

        const height = section.offsetHeight;

        if (scrollY >= top && scrollY < top + height) {

            current = section.id;

        }

    });

    links.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveNav);

/*==========================================================
SCROLL TO TOP
==========================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        scrollTopBtn.classList.add("show");

    }

    else {

        scrollTopBtn.classList.remove("show");

    }

});

scrollTopBtn?.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/*==========================================================
PERFORMANCE
==========================================================*/

window.addEventListener(

    "touchstart",

    () => {},

    {

        passive: true

    }

);

window.addEventListener(

    "wheel",

    () => {},

    {

        passive: true

    }

);

/*==========================================================
END OF PART 1
==========================================================*/
/*==========================================================
 Script.js
 Part 2/4
==========================================================*/

/*==========================================================
SCROLL REVEAL
==========================================================*/

const revealElements = document.querySelectorAll(
".section,.feature-card,.glass-card,.timeline-item,.gallery-item,.publication-card,.stat-card"
);

const revealObserver = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

revealObserver.unobserve(entry.target);

}

});

},

{

threshold:.15,

rootMargin:"0px 0px -60px 0px"

}

);

revealElements.forEach(el=>{

el.classList.add("reveal");

revealObserver.observe(el);

});

/*==========================================================
CURSOR
==========================================================*/

/*=========================================
APPLE STYLE CURSOR GLOW
=========================================*/

const cursor = document.querySelector(".cursor");
const glow = document.querySelector(".cursor-glow");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let glowX = mouseX;
let glowY = mouseY;

const FOLLOW_SPEED = 0.08;

window.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    if(cursor){

        cursor.style.transform =
        `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;

    }

}, { passive:true });

function animateCursor(){

    glowX += (mouseX - glowX) * FOLLOW_SPEED;
    glowY += (mouseY - glowY) * FOLLOW_SPEED;

    if(glow){

        glow.style.transform =
        `translate(${glowX}px, ${glowY}px) translate(-50%,-50%)`;

    }

    requestAnimationFrame(animateCursor);

}

requestAnimationFrame(animateCursor);

/*==========================================================
CURSOR HOVER
==========================================================*/

document.querySelectorAll(

"a,button,.feature-card,.gallery-item"

).forEach(item=>{

item.addEventListener("mouseenter",()=>{

cursor.style.transform="translate(-50%,-50%) scale(2)";

glow.style.transform="translate(-50%,-50%) scale(1.4)";

});

item.addEventListener("mouseleave",()=>{

cursor.style.transform="translate(-50%,-50%) scale(1)";

glow.style.transform="translate(-50%,-50%) scale(1)";

});

});

/*==========================================================
LOGO POPUP
==========================================================*/

const logo=document.getElementById("logoImage");

const modal=document.getElementById("logoModal");

const fullLogo=document.getElementById("fullLogo");

const closeLogo=document.querySelector(".close-logo");

if(logo){

logo.addEventListener("click",()=>{

fullLogo.src=logo.src;

modal.classList.add("active");

document.body.style.overflow="hidden";

});

}

if(closeLogo){

closeLogo.addEventListener("click",()=>{

modal.classList.remove("active");

document.body.style.overflow="";

});

}

modal?.addEventListener("click",e=>{

if(e.target===modal){

modal.classList.remove("active");

document.body.style.overflow="";

}

});

/*==========================================================
FADE HERO
==========================================================*/

const hero=document.querySelector(".hero");

window.addEventListener("scroll",()=>{

const y=window.scrollY;

hero.style.opacity=Math.max(1-y/900,.35);

hero.style.transform=`translateY(${y*0.2}px)`;

});

/*==========================================================
BUTTON RIPPLE
==========================================================*/

document.querySelectorAll(".btn").forEach(btn=>{

btn.addEventListener("click",function(e){

const circle=document.createElement("span");

const d=Math.max(

this.clientWidth,

this.clientHeight

);

circle.style.width=d+"px";

circle.style.height=d+"px";

circle.style.left=e.offsetX-d/2+"px";

circle.style.top=e.offsetY-d/2+"px";

circle.className="ripple";

this.appendChild(circle);

setTimeout(()=>{

circle.remove();

},600);

});

});

/*==========================================================
PARALLAX IMAGE
==========================================================*/

const heroImage=document.querySelector(".hero-image-wrapper");

window.addEventListener("mousemove",e=>{

if(!heroImage)return;

const x=(window.innerWidth/2-e.clientX)/45;

const y=(window.innerHeight/2-e.clientY)/45;

heroImage.style.transform=

`rotateY(${-x}deg) rotateX(${y}deg)`;

});

/*==========================================================
WINDOW BLUR
==========================================================*/

window.addEventListener("blur",()=>{

document.body.classList.add("paused");

});

window.addEventListener("focus",()=>{

document.body.classList.remove("paused");

});

/*==========================================================
END PART 2
==========================================================*/
/*==========================================================
 Script.js
 Part 3/4
==========================================================*/

/*==========================================================
COUNTER ANIMATION
==========================================================*/

const counters=document.querySelectorAll(".counter");

const counterObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting) return;

const counter=entry.target;

const target=+counter.dataset.target;

let current=0;

const speed=Math.max(1,target/120);

function update(){

current+=speed;

if(current>=target){

counter.textContent=target;

return;

}

counter.textContent=Math.floor(current);

requestAnimationFrame(update);

}

update();

counterObserver.unobserve(counter);

});

},

{

threshold:.5

});

counters.forEach(counter=>{

counterObserver.observe(counter);

});

/*==========================================================
GALLERY LIGHTBOX
==========================================================*/

const galleryItems=document.querySelectorAll(".gallery-item img");

const lightbox=document.createElement("div");

lightbox.className="lightbox";

lightbox.innerHTML=`

<span class="lightbox-close">&times;</span>

<img class="lightbox-image">

`;

document.body.appendChild(lightbox);

const lightboxImg=lightbox.querySelector(".lightbox-image");

const lightboxClose=lightbox.querySelector(".lightbox-close");

galleryItems.forEach(img=>{

img.addEventListener("click",()=>{

lightbox.classList.add("show");

lightboxImg.src=img.src;

document.body.style.overflow="hidden";

});

});

function closeLightbox(){

lightbox.classList.remove("show");

document.body.style.overflow="";

}

lightboxClose.addEventListener("click",closeLightbox);

lightbox.addEventListener("click",e=>{

if(e.target===lightbox){

closeLightbox();

}

});

/*==========================================================
KEYBOARD SHORTCUTS
==========================================================*/

document.addEventListener("keydown",e=>{

if(e.key==="Escape"){

closeLightbox();

modal?.classList.remove("active");

document.body.style.overflow="";

}

if(e.key==="Home"){

window.scrollTo({

top:0,

behavior:"smooth"

});

}

});

/*==========================================================
LAZY IMAGE EFFECT
==========================================================*/

const images=document.querySelectorAll("img");

const imageObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("fade-in");

imageObserver.unobserve(entry.target);

}

});

},

{

threshold:.15

});

images.forEach(img=>{

imageObserver.observe(img);

});

/*==========================================================
SCROLL PROGRESS BAR
==========================================================*/

const progress=document.createElement("div");

progress.id="scrollProgress";

document.body.appendChild(progress);

window.addEventListener("scroll",()=>{

const height=

document.documentElement.scrollHeight-

window.innerHeight;

const width=

(window.scrollY/height)*100;

progress.style.width=width+"%";

});

/*==========================================================
AUTO HIGHLIGHT
==========================================================*/

document.querySelectorAll(".feature-card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-10px) scale(1.02)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});

/*==========================================================
PERFORMANCE FPS LIMIT
==========================================================*/

let ticking=false;

window.addEventListener("scroll",()=>{

if(!ticking){

requestAnimationFrame(()=>{

updateActiveNav();

ticking=false;

});

ticking=true;

}

},

{

passive:true

});

/*==========================================================
PAGE VISIBILITY
==========================================================*/

document.addEventListener(
    "visibilitychange",
    () => {
        if (document.hidden) {
            document.body.classList.add("paused");
        } else {
            document.body.classList.remove("paused");
        }
    }
);

/*==========================================================
UTILITY
==========================================================*/

function debounce(fn,delay){

let timer;

return function(){

clearTimeout(timer);

timer=setTimeout(()=>{

fn.apply(this,arguments);

},delay);

};

}

window.addEventListener(

"resize",

debounce(()=>{

console.log("Layout Updated");

},200)

);

/*==========================================================
END PART 3
==========================================================*/
/*==========================================================
 Script.js
 Part 4/4
 Ultra Fast AI Background
==========================================================*/

const canvas=document.getElementById("bgCanvas");

if(canvas){

const ctx=canvas.getContext("2d",{alpha:true});

let w,h,dpr;

let particles=[];

let animationId=null;

const MOBILE=window.innerWidth<768;

const COUNT=MOBILE?35:90;

const DIST=MOBILE?90:140;

function resize(){

dpr=window.devicePixelRatio||1;

w=window.innerWidth;

h=window.innerHeight;

canvas.width=w*dpr;

canvas.height=h*dpr;

canvas.style.width=w+"px";

canvas.style.height=h+"px";

ctx.setTransform(dpr,0,0,dpr,0,0);

}

resize();

class Particle{

constructor(){

this.reset(true);

}

reset(first=false){

this.x=Math.random()*w;

this.y=Math.random()*h;

this.vx=(Math.random()-.5)*0.35;

this.vy=(Math.random()-.5)*0.35;

this.r=1+Math.random()*2;

if(first){

this.x=Math.random()*w;

this.y=Math.random()*h;

}

}

update(){

this.x+=this.vx;

this.y+=this.vy;

if(this.x<0||this.x>w) this.vx*=-1;

if(this.y<0||this.y>h) this.vy*=-1;

}

draw(){

ctx.beginPath();

ctx.arc(this.x,this.y,this.r,0,Math.PI*2);

ctx.fillStyle="rgba(0,255,180,.9)";

ctx.fill();

}

}

for(let i=0;i<COUNT;i++){

particles.push(new Particle());

}

const mouse={

x:-9999,

y:-9999

};

window.addEventListener("mousemove",e=>{

mouse.x=e.clientX;

mouse.y=e.clientY;

},{passive:true});

window.addEventListener("mouseleave",()=>{

mouse.x=-9999;

mouse.y=-9999;

});

function connect(){

ctx.lineWidth=.7;

for(let i=0;i<particles.length;i++){

const p1=particles[i];

for(let j=i+1;j<particles.length;j++){

const p2=particles[j];

const dx=p1.x-p2.x;

const dy=p1.y-p2.y;

const d=Math.sqrt(dx*dx+dy*dy);

if(d<DIST){

ctx.strokeStyle=

`rgba(0,255,180,${1-d/DIST})`;

ctx.beginPath();

ctx.moveTo(p1.x,p1.y);

ctx.lineTo(p2.x,p2.y);

ctx.stroke();

}

}

const mdx=p1.x-mouse.x;

const mdy=p1.y-mouse.y;

const md=Math.sqrt(mdx*mdx+mdy*mdy);

if(md<120){

ctx.beginPath();

ctx.strokeStyle=

`rgba(0,200,255,${1-md/120})`;

ctx.moveTo(p1.x,p1.y);

ctx.lineTo(mouse.x,mouse.y);

ctx.stroke();

}

}

}

function animate(){

ctx.clearRect(0,0,w,h);

for(const p of particles){

p.update();

p.draw();

}

connect();

animationId=requestAnimationFrame(animate);

}

animate();

let resizeTimer;

window.addEventListener("resize",()=>{

clearTimeout(resizeTimer);

resizeTimer=setTimeout(()=>{

resize();

},150);

},{passive:true});

document.addEventListener("visibilitychange",()=>{

if(document.hidden){

cancelAnimationFrame(animationId);

}else{

animate();

}

});

}
function toggleMenu() {
    let menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

// baire click korle menu bondho
document.addEventListener('click', function(e) {
    if (!e.target.closest('.float-btn') && !e.target.closest('.contact-menu')) {
        document.getElementById("menu").style.display = "none";
    }
});
/*==========================================================
 END
==========================================================*/

console.log(

"%cAI Research Website Loaded",

"color:#00ffb3;font-size:18px;font-weight:bold;"

);