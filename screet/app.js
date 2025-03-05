import { supabase } from './supabase-config.js';

// Matrix yağmur efekti için
function createMatrixRain() {
    const matrixBg = document.querySelector('.matrix-bg');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
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
        matrixBg.innerHTML = output;
    }

    setInterval(draw, 33);
}

// Mesajları tutacak dizi
let messages = [];

// Mesajları gerçek zamanlı dinle
async function listenToMessages() {
    try {
        // Önceki abonelikleri temizle
        await supabase.removeAllChannels();

        // İlk yüklemede mevcut mesajları al
        const { data: existingMessages, error: fetchError } = await supabase
            .from('messages')
            .select('*')
            .order('created_at', { ascending: true });
        
        if (fetchError) {
            console.error('Mesajlar yüklenirken hata:', fetchError);
            alert('Mesajlar yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.');
            return;
        }
        
        messages = existingMessages || [];
        displayMessages();
        
        // Realtime kanalını oluştur
        const channel = supabase.channel('any')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'messages'
                },
                (payload) => {
                    console.log('Realtime değişiklik algılandı:', payload);
                    
                    if (payload.eventType === 'INSERT') {
                        console.log('Yeni mesaj eklendi:', payload.new);
                        if (!messages.some(m => m.id === payload.new.id)) {
                            messages.push(payload.new);
                            displayMessages();
                        }
                    } else if (payload.eventType === 'DELETE') {
                        console.log('Mesaj silindi:', payload.old);
                        messages = messages.filter(m => m.id !== payload.old.id);
                        displayMessages();
                    } else if (payload.eventType === 'UPDATE') {
                        console.log('Mesaj güncellendi:', payload.new);
                        const index = messages.findIndex(m => m.id === payload.new.id);
                        if (index !== -1) {
                            messages[index] = payload.new;
                            displayMessages();
                        }
                    }
                }
            );

        console.log('Realtime kanal oluşturuldu, abone olunuyor...');
        const { error: subscribeError } = await channel.subscribe((status) => {
            console.log('Subscription status:', status);
        });

        if (subscribeError) {
            console.error('Realtime abonelik hatası:', subscribeError);
            throw subscribeError;
        }

    } catch (error) {
        console.error('listenToMessages hatası:', error);
        alert('Bir hata oluştu. Lütfen sayfayı yenileyin.');
    }
}

// Mesajları görüntüle
function displayMessages() {
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.innerHTML = '';
    
    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.is_sent ? 'sent' : 'received'}`;
        
        if (message.type === 'text') {
            messageDiv.textContent = message.content;
        } else if (message.type === 'image') {
            const img = document.createElement('img');
            img.src = message.content;
            img.style.maxWidth = '100%';
            img.style.borderRadius = '5px';
            messageDiv.appendChild(img);
        }
        
        chatMessages.appendChild(messageDiv);
    });
    
    // Otomatik kaydırma
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Mesaj gönderme
async function sendMessage(content, type = 'text') {
    try {
        console.log('Mesaj gönderiliyor:', { content, type });
        
        const messageData = {
            content,
            type,
            is_sent: true,
            created_at: new Date().toISOString()
        };
        
        const { data, error } = await supabase
            .from('messages')
            .insert([messageData])
            .select();
            
        if (error) {
            console.error('Mesaj gönderme hatası:', error);
            throw error;
        }
        
        console.log('Mesaj başarıyla gönderildi:', data);
    } catch (error) {
        console.error("Mesaj gönderilirken hata:", error);
        alert('Mesaj gönderilirken bir hata oluştu! Lütfen tekrar deneyin.');
    }
}

// Fotoğraf yükleme
async function uploadPhoto(file) {
    try {
        const fileName = `${Date.now()}_${file.name}`;
        const { data, error } = await supabase.storage
            .from('photos')
            .upload(fileName, file);
            
        if (error) throw error;
        
        const { data: { publicUrl } } = supabase.storage
            .from('photos')
            .getPublicUrl(fileName);
            
        await sendMessage(publicUrl, 'image');
    } catch (error) {
        console.error("Fotoğraf yüklenirken hata:", error);
        alert('Fotoğraf yüklenirken bir hata oluştu!');
    }
}

// Seksiyon gösterme
function showSection(sectionName) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-target="${sectionName}"]`).classList.add('active');

    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.getElementById(sectionName).classList.add('active');
}

// Çıkış yapma
function logout() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('mainScreen').style.display = 'none';
    document.getElementById('passwordInput').value = '';
}

// Fotoğrafları yerel depolamadan yükleme
function loadPhotos() {
    const photos = JSON.parse(localStorage.getItem('photos') || '[]');
    const photoGallery = document.getElementById('photoGallery');
    photoGallery.innerHTML = '';
    
    photos.forEach((photo, index) => {
        const photoDiv = document.createElement('div');
        photoDiv.className = 'photo-item';
        
        const img = document.createElement('img');
        img.src = photo.data;
        img.alt = `Fotoğraf ${index + 1}`;
        
        const time = new Date(photo.timestamp);
        const dateStr = time.toLocaleDateString('tr-TR');
        
        const overlay = document.createElement('div');
        overlay.className = 'photo-overlay';
        overlay.innerHTML = `
            <div class="photo-date">${dateStr}</div>
            <button onclick="deletePhoto(${index})" class="delete-photo">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        photoDiv.appendChild(img);
        photoDiv.appendChild(overlay);
        photoGallery.appendChild(photoDiv);
    });
}

// Fotoğraf silme
function deletePhoto(index) {
    if (confirm('Bu fotoğrafı silmek istediğinizden emin misiniz?')) {
        const photos = JSON.parse(localStorage.getItem('photos') || '[]');
        photos.splice(index, 1);
        localStorage.setItem('photos', JSON.stringify(photos));
        loadPhotos();
    }
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('mainScreen').style.display = 'none';
    createMatrixRain();
    
    // Giriş formu
    const loginForm = document.querySelector('.login-box form');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const password = document.getElementById('password').value;
        const keyword = document.getElementById('keyword').value;
        
        if (password === '1234' && keyword === 'matrix') {
            // Giriş ekranını gizle
            document.getElementById('loginScreen').style.display = 'none';
            // Ana ekranı göster
            document.getElementById('mainScreen').style.display = 'block';
            // Mesajlar bölümünü aktif et
            document.getElementById('messages').classList.add('active');
            // Mesajları dinlemeye başla
            await listenToMessages();
        } else {
            alert('Hatalı giriş bilgileri!');
        }
    });
    
    // Navigasyon butonları
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('logout')) {
                logout();
            } else {
                const target = btn.dataset.target;
                showSection(target);
            }
        });
    });
    
    // Mesaj gönderme formu
    const chatForm = document.querySelector('.chat-input');
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = chatForm.querySelector('input');
        const message = input.value.trim();
        
        if (message) {
            await sendMessage(message);
            input.value = '';
        }
    });
    
    // Fotoğraf yükleme
    const photoInput = document.getElementById('photoInput');
    photoInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
            await uploadPhoto(file);
        }
    });
}); 