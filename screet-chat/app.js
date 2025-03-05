// Hacker arka plan animasyonu
function createHackerBackground() {
    const bg = document.querySelector('.hacker-bg');
    const characters = '01';
    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);
    const drops = new Array(columns).fill(1);

    function draw() {
        let output = '';
        drops.forEach((drop, i) => {
            const char = characters[Math.floor(Math.random() * characters.length)];
            output += `<span style="left: ${i * fontSize}px; top: ${drop * fontSize}px;">${char}</span>`;
            if (drop * fontSize > window.innerHeight && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        });
        bg.innerHTML = output;
    }

    setInterval(draw, 50);
}

// Mesajları ve fotoğrafları saklayacak diziler
let messages = [];
let photos = [];

// Seksiyon değiştirme
function showSection(sectionName) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionName).classList.add('active');
}

// Mesaj gönderme
function sendMessage(text) {
    const message = {
        id: Date.now(),
        text,
        timestamp: new Date().toISOString()
    };
    messages.push(message);
    displayMessages();
}

// Mesajları görüntüleme
function displayMessages() {
    const messagesList = document.querySelector('.messages-list');
    messagesList.innerHTML = messages.map(message => `
        <div class="message">
            <div class="message-text">${message.text}</div>
            <div class="message-time">${new Date(message.timestamp).toLocaleTimeString()}</div>
        </div>
    `).join('');
    messagesList.scrollTop = messagesList.scrollHeight;
}

// Fotoğraf yükleme
function handlePhotoUpload(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const photo = {
            id: Date.now(),
            data: e.target.result,
            timestamp: new Date().toISOString()
        };
        photos.push(photo);
        displayPhotos();
    };
    reader.readAsDataURL(file);
}

// Fotoğrafları görüntüleme
function displayPhotos() {
    const gallery = document.querySelector('.photo-gallery');
    gallery.innerHTML = photos.map(photo => `
        <div class="photo-item">
            <img src="${photo.data}" alt="Yüklenen fotoğraf">
            <div class="photo-time">${new Date(photo.timestamp).toLocaleTimeString()}</div>
        </div>
    `).join('');
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    createHackerBackground();

    // Giriş formu
    const loginForm = document.querySelector('.login-box form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('password').value;
        const keyword = document.getElementById('keyword').value;

        if (password === '2024' && keyword === '2025') {
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('mainScreen').style.display = 'flex';
        } else {
            alert('Hatalı giriş bilgileri!');
        }
    });

    // Navigasyon butonları
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('logout')) {
                document.getElementById('loginScreen').style.display = 'flex';
                document.getElementById('mainScreen').style.display = 'none';
                document.getElementById('password').value = '';
                document.getElementById('keyword').value = '';
            } else {
                const section = btn.dataset.section;
                showSection(section);
            }
        });
    });

    // Mesaj formu
    const messageForm = document.querySelector('.message-form');
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = messageForm.querySelector('input');
        const message = input.value.trim();
        if (message) {
            sendMessage(message);
            input.value = '';
        }
    });

    // Fotoğraf yükleme
    const photoInput = document.getElementById('photoInput');
    photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handlePhotoUpload(file);
        }
    });
}); 