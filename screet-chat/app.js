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

// Supabase yapılandırması
const supabaseUrl = 'https://blmicabawyohyfthokgu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsbWljYWJhd3lvaHlmdGhva2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MjU1NzgsImV4cCI6MjAyNjAwMTU3OH0.vJ_d2jqWGe9FBcHU4YeN_kKxGVf-R_h9gHJc9NKGS0I'
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

// Mesaj gönderme
async function sendMessage(e) {
    e.preventDefault();
    const messageInput = document.querySelector('.message-form input');
    const message = messageInput.value.trim();
    const messagesContainer = document.querySelector('.messages-list');
    
    if (message) {
        const sender = 'Anonim'; // İsterseniz burada sabit bir isim de kullanabilirsiniz
        
        try {
            const { error } = await supabase
                .from('messages')
                .insert([
                    { sender: sender, content: message }
                ]);

            if (error) throw error;
            messageInput.value = '';
        } catch (error) {
            console.error('Mesaj gönderilemedi:', error);
            alert('Mesaj gönderilemedi: ' + error.message);
        }
    }
}

// Mesajları dinle
const messagesContainer = document.querySelector('.messages-list');
const channel = supabase
    .channel('public:messages')
    .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
            const message = payload.new;
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.innerHTML = `
                <div class="message-text"><strong>${message.sender}:</strong> ${message.content}</div>
                <div class="message-time">${new Date().toLocaleTimeString()}</div>
            `;
            messagesContainer.appendChild(messageElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    )
    .subscribe();

// Sayfa yüklendiğinde mevcut mesajları getir
async function loadMessages() {
    try {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) throw error;

        const messagesContainer = document.querySelector('.messages-list');
        messagesContainer.innerHTML = '';

        data.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.innerHTML = `
                <div class="message-text"><strong>${message.sender}:</strong> ${message.content}</div>
                <div class="message-time">${new Date(message.created_at).toLocaleTimeString()}</div>
            `;
            messagesContainer.appendChild(messageElement);
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } catch (error) {
        console.error('Mesajlar yüklenemedi:', error);
        alert('Mesajlar yüklenemedi: ' + error.message);
    }
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
    loadMessages(); // Mesajları yükle

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
    messageForm.addEventListener('submit', sendMessage);

    // Fotoğraf yükleme
    const photoInput = document.getElementById('photoInput');
    photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handlePhotoUpload(file);
        }
    });
}); 