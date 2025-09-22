document.addEventListener('DOMContentLoaded', () => {

    // --- Control de la Música ---
    const music = document.getElementById('background-music');
    const musicBtn = document.getElementById('music-control-btn');
    const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/><path d="M0 0h24v24H0z" fill="none"/></svg>`;
    const pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/><path d="M0 0h24v24H0z" fill="none"/></svg>`;
    let isPlaying = false;

    // Intento de autoplay
    music.play().then(() => {
        isPlaying = true;
        musicBtn.innerHTML = pauseIcon;
    }).catch(error => {
        // La reproducción automática fue bloqueada por el navegador.
        // El usuario deberá hacer clic para iniciar la música.
        console.log("Autoplay was prevented. User interaction needed.");
        isPlaying = false;
        musicBtn.innerHTML = playIcon;
    });

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            musicBtn.innerHTML = playIcon;
        } else {
            music.play();
            musicBtn.innerHTML = pauseIcon;
        }
        isPlaying = !isPlaying;
    });


    // --- Efecto de Partículas (Pétalos) ---
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const numberOfParticles = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 2; // Tamaño del pétalo
            this.speedY = Math.random() * 2 + 1; // Velocidad de caída
            this.speedX = Math.random() * 3 - 1.5; // Movimiento lateral
            this.color = 'rgba(255, 215, 0, 0.7)'; // Color dorado/amarillo
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;

            // Reset particle when it goes off screen
            if (this.y > canvas.height) {
                this.y = -this.size;
                this.x = Math.random() * canvas.width;
                this.speedY = Math.random() * 2 + 1;
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // Ajustar el canvas si la ventana cambia de tamaño
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles(); // Reiniciar partículas para el nuevo tamaño
    });

    // --- Lógica de la Carta ---
    const letterBtn = document.getElementById('letter-btn');
    const letterOverlay = document.getElementById('letter-overlay');
    const envelope = document.getElementById('envelope');
    const letterContent = document.getElementById('letter-content');

    // Asegurarse de que el overlay y el contenido de la carta estén ocultos al inicio
    letterOverlay.classList.add('hidden');
    letterContent.classList.add('hidden');

    letterBtn.addEventListener('click', () => {
        letterOverlay.classList.remove('hidden');
        // Asegurarse de que el sobre esté cerrado y la carta oculta al abrir el overlay
        envelope.classList.remove('open');
        letterContent.classList.add('hidden');
    });

    envelope.addEventListener('click', () => {
        envelope.classList.add('open');
        setTimeout(() => {
            letterContent.classList.remove('hidden');
        }, 800); // Sincronizar con la animación de CSS
    });

    letterOverlay.addEventListener('click', (e) => {
        // Cierra el overlay solo si se hace clic en el fondo, no en la carta
        if (e.target === letterOverlay) {
            letterOverlay.classList.add('hidden');
            // Resetea el estado del sobre y la carta para la próxima vez
            setTimeout(() => {
                envelope.classList.remove('open');
                letterContent.classList.add('hidden');
            }, 500);
        }
    });
});