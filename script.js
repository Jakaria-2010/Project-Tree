// =============================
// SJT Research - script.js
// =============================

// ---------- Menu ----------
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
});

// Close menu when a link is clicked
document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", () => {
                nav.classList.remove("active");
        });
});

// ---------- Particle Canvas ----------
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = {
        x: null,
        y: null
};

function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
}

resizeCanvas();

// ---------- Device Settings ----------
function getSettings() {
        
        const width = window.innerWidth;
        
        if (width < 480) {
                
                return {
                        count: 15,
                        distance: 70,
                        speed: 0.35
                };
                
        }
        
        if (width < 768) {
                
                return {
                        count: 25,
                        distance: 90,
                        speed: 0.45
                };
                
        }
        
        if (width < 1024) {
                
                return {
                        count: 40,
                        distance: 110,
                        speed: 0.55
                };
                
        }
        
        return {
                count: 70,
                distance: 140,
                speed: 0.70
        };
        
}

let settings = getSettings();

// ---------- Particle ----------
class Particle {
        
        constructor() {
                
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                
                this.vx = (Math.random() - 0.5) * settings.speed;
                this.vy = (Math.random() - 0.5) * settings.speed;
                
                this.radius = Math.random() * 2 + 1;
                
        }
        
        update() {
                
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < 0 || this.x > canvas.width)
                        this.vx *= -1;
                
                if (this.y < 0 || this.y > canvas.height)
                        this.vy *= -1;
                
        }
        
        draw() {
                
                ctx.beginPath();
                
                ctx.arc(
                        this.x,
                        this.y,
                        this.radius,
                        0,
                        Math.PI * 2
                );
                
                ctx.fillStyle = "#14ffd5";
                
                ctx.shadowColor = "#14ffd5";
                ctx.shadowBlur = 8;
                
                ctx.fill();
                
        }
        
}

// ---------- Create Particles ----------
function createParticles() {
        
        particles = [];
        
        for (let i = 0; i < settings.count; i++) {
                
                particles.push(new Particle());
                
        }
        
}

createParticles();

// ---------- Connect Particles ----------
function connectParticles() {
        
        for (let i = 0; i < particles.length; i++) {
                
                for (let j = i + 1; j < particles.length; j++) {
                        
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < settings.distance) {
                                
                                ctx.beginPath();
                                
                                ctx.strokeStyle =
                                        `rgba(20,255,213,${
                        1 - distance / settings.distance
                    })`;
                                
                                ctx.lineWidth = 1;
                                
                                ctx.moveTo(
                                        particles[i].x,
                                        particles[i].y
                                );
                                
                                ctx.lineTo(
                                        particles[j].x,
                                        particles[j].y
                                );
                                
                                ctx.stroke();
                                
                        }
                        
                }
                
        }
        
}

// ---------- Mouse Lines ----------
function mouseEffect() {
        
        if (mouse.x === null)
                return;
        
        particles.forEach(p => {
                
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < settings.distance) {
                        
                        ctx.beginPath();
                        
                        ctx.strokeStyle =
                                `rgba(20,255,213,${
                    1 - distance / settings.distance
                })`;
                        
                        ctx.moveTo(
                                p.x,
                                p.y
                        );
                        
                        ctx.lineTo(
                                mouse.x,
                                mouse.y
                        );
                        
                        ctx.stroke();
                        
                }
                
        });
        
}

// ---------- Mouse ----------
window.addEventListener("mousemove", e => {
        
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        
});

window.addEventListener("mouseleave", () => {
        
        mouse.x = null;
        mouse.y = null;
        
});

// ---------- Touch ----------
window.addEventListener("touchmove", e => {
        
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        
}, {
        passive: true
});

window.addEventListener("touchend", () => {
        
        mouse.x = null;
        mouse.y = null;
        
});

// ---------- Resize ----------
window.addEventListener("resize", () => {
        
        resizeCanvas();
        
        settings = getSettings();
        
        createParticles();
        
});

// ---------- Animation ----------
function animate() {
        
        ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
        );
        
        particles.forEach(p => {
                
                p.update();
                
                p.draw();
                
        });
        
        connectParticles();
        
        mouseEffect();
        
        requestAnimationFrame(animate);
        
}
const logo = document.getElementById("logo");
const popup = document.getElementById("popup");
const close = document.getElementById("close");

logo.addEventListener("click", () => {
    popup.classList.add("active");
});

close.addEventListener("click", () => {
    popup.classList.remove("active");
});

popup.addEventListener("click", (e) => {
    if (e.target === popup) {
        popup.classList.remove("active");
    }
});
animate();