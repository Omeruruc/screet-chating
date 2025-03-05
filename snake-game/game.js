const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Canvas boyutlarını ayarla
canvas.width = 400;
canvas.height = 400;

// Oyun değişkenleri
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [
    { x: 10, y: 10, actualX: 10 * gridSize, actualY: 10 * gridSize }
];
let food = { x: 5, y: 5 };
let bombs = [];
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameInterval;
let gameSpeed = 100;
let isGameRunning = false;
let isFirstMove = true;
let lastTime = 0;
const MOVEMENT_SPEED = 0.35; // Yılanın hareket hızı

// DOM elementleri
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const finalScoreElement = document.getElementById('finalScore');
const gameOverElement = document.getElementById('gameOver');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

// Yüksek skoru göster
highScoreElement.textContent = highScore;

// Bomba oluştur
function generateBomb() {
    let newBomb;
    do {
        newBomb = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    } while (
        snake.some(segment => segment.x === newBomb.x && segment.y === newBomb.y) ||
        (food.x === newBomb.x && food.y === newBomb.y) ||
        bombs.some(bomb => bomb.x === newBomb.x && bomb.y === newBomb.y)
    );
    return newBomb;
}

// Oyunu başlat
function startGame() {
    if (isGameRunning) return;
    
    // Oyunu sıfırla
    snake = [{ x: 10, y: 10, actualX: 10 * gridSize, actualY: 10 * gridSize }];
    food = generateFood();
    bombs = [generateBomb(), generateBomb()]; // İki bomba oluştur
    dx = 0;
    dy = 0;
    score = 0;
    isFirstMove = true;
    scoreElement.textContent = score;
    gameOverElement.classList.add('hidden');
    isGameRunning = true;
    startBtn.textContent = 'Yeniden Başlat';
    
    // Oyun döngüsünü başlat
    lastTime = performance.now();
    cancelAnimationFrame(gameInterval);
    gameLoop();
}

// Oyun döngüsü
function gameLoop(currentTime) {
    if (!isGameRunning) return;
    
    gameInterval = requestAnimationFrame(gameLoop);
    
    // FPS kontrolü
    const deltaTime = currentTime - lastTime;
    if (deltaTime < 1000 / 120) return; // FPS'i 60'tan 120'ye çıkardım
    
    lastTime = currentTime;
    
    // İlk hareket yapılmadıysa bekle
    if (isFirstMove && dx === 0 && dy === 0) {
        draw();
        return;
    }
    
    // Yılanın pozisyonunu güncelle
    const head = snake[0];
    const targetX = head.x * gridSize;
    const targetY = head.y * gridSize;
    
    // Akıcı hareket için pozisyonu güncelle
    head.actualX += (targetX - head.actualX) * MOVEMENT_SPEED * (deltaTime / 16);
    head.actualY += (targetY - head.actualY) * MOVEMENT_SPEED * (deltaTime / 16);
    
    // Yeni pozisyona yakın olduğunda bir sonraki kareye geç
    if (Math.abs(head.actualX - targetX) < 0.1 && Math.abs(head.actualY - targetY) < 0.1) {
        const newHead = {
            x: head.x + dx,
            y: head.y + dy,
            actualX: head.actualX,
            actualY: head.actualY
        };
        
        // Duvar çarpışma kontrolü
        if (newHead.x < 0 || newHead.x >= tileCount || newHead.y < 0 || newHead.y >= tileCount) {
            gameOver();
            return;
        }
        
        // Kendine çarpma kontrolü
        for (let i = 1; i < snake.length; i++) {
            if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
                gameOver();
                return;
            }
        }
        
        // Yılanı hareket ettir
        snake.unshift(newHead);
        
        // Yem yeme kontrolü
        if (newHead.x === food.x && newHead.y === food.y) {
            score += 10;
            scoreElement.textContent = score;
            food = generateFood();
            
            // Yeni bomba ekle
            if (score % 30 === 0) {
                bombs.push(generateBomb());
            }
        } else {
            snake.pop();
        }
        
        // Bomba çarpışma kontrolü
        bombs.forEach(bomb => {
            if (newHead.x === bomb.x && newHead.y === bomb.y) {
                score = Math.max(0, score - 20); // Skoru 20 azalt ama 0'ın altına düşmesin
                scoreElement.textContent = score;
                // Bombayı yeni bir konuma taşı
                const bombIndex = bombs.indexOf(bomb);
                bombs[bombIndex] = generateBomb();
            }
        });
    }
    
    // Ekranı çiz
    draw();
}

// Yem oluştur
function generateFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
}

// Ekranı çiz
function draw() {
    // Arkaplanı temizle
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Yılanı çiz
    if (snake.length > 0) {
        // Gölge efekti
        ctx.shadowColor = '#4CAF50';
        ctx.shadowBlur = 20;
        
        // Gövdeyi çiz
        ctx.beginPath();
        ctx.moveTo(snake[0].actualX + gridSize/2, snake[0].actualY + gridSize/2);
        
        for (let i = 1; i < snake.length; i++) {
            const current = snake[i];
            const prev = snake[i-1];
            
            // Bezier eğrisi ile segmentleri birleştir
            ctx.quadraticCurveTo(
                current.actualX + gridSize/2,
                current.actualY + gridSize/2,
                (current.actualX + prev.actualX)/2 + gridSize/2,
                (current.actualY + prev.actualY)/2 + gridSize/2
            );
        }
        
        ctx.lineWidth = gridSize - 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#4CAF50';
        ctx.stroke();
        
        // Gölgeyi kapat
        ctx.shadowBlur = 0;
        
        // Yılanın başını çiz
        ctx.beginPath();
        ctx.arc(
            snake[0].actualX + gridSize/2,
            snake[0].actualY + gridSize/2,
            gridSize/2 - 2,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = '#2E7D32';
        ctx.fill();
        
        // Gözleri çiz
        const eyeRadius = 3;
        let eyeX1, eyeY1, eyeX2, eyeY2;
        
        if (dx === 1) { // Sağa
            eyeX1 = eyeX2 = snake[0].actualX + gridSize * 0.75;
            eyeY1 = snake[0].actualY + gridSize * 0.3;
            eyeY2 = snake[0].actualY + gridSize * 0.7;
        } else if (dx === -1) { // Sola
            eyeX1 = eyeX2 = snake[0].actualX + gridSize * 0.25;
            eyeY1 = snake[0].actualY + gridSize * 0.3;
            eyeY2 = snake[0].actualY + gridSize * 0.7;
        } else if (dy === -1) { // Yukarı
            eyeY1 = eyeY2 = snake[0].actualY + gridSize * 0.25;
            eyeX1 = snake[0].actualX + gridSize * 0.3;
            eyeX2 = snake[0].actualX + gridSize * 0.7;
        } else if (dy === 1) { // Aşağı
            eyeY1 = eyeY2 = snake[0].actualY + gridSize * 0.75;
            eyeX1 = snake[0].actualX + gridSize * 0.3;
            eyeX2 = snake[0].actualX + gridSize * 0.7;
        } else { // Başlangıç pozisyonu
            eyeX1 = eyeX2 = snake[0].actualX + gridSize * 0.75;
            eyeY1 = snake[0].actualY + gridSize * 0.3;
            eyeY2 = snake[0].actualY + gridSize * 0.7;
        }
        
        ctx.beginPath();
        ctx.arc(eyeX1, eyeY1, eyeRadius, 0, Math.PI * 2);
        ctx.arc(eyeX2, eyeY2, eyeRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    }
    
    // Yemi çiz
    ctx.beginPath();
    ctx.arc(
        food.x * gridSize + gridSize/2,
        food.y * gridSize + gridSize/2,
        gridSize/2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fillStyle = '#FF5252';
    ctx.fill();
    
    // Işık efekti
    const gradient = ctx.createRadialGradient(
        food.x * gridSize + gridSize/2,
        food.y * gridSize + gridSize/2,
        0,
        food.x * gridSize + gridSize/2,
        food.y * gridSize + gridSize/2,
        gridSize
    );
    gradient.addColorStop(0, 'rgba(255, 82, 82, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 82, 82, 0)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Bombaları çiz
    bombs.forEach(bomb => {
        // Bomba gövdesi
        ctx.beginPath();
        ctx.arc(
            bomb.x * gridSize + gridSize/2,
            bomb.y * gridSize + gridSize/2,
            gridSize/2 - 2,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = '#333';
        ctx.fill();
        
        // Fitil
        ctx.beginPath();
        ctx.moveTo(bomb.x * gridSize + gridSize/2, bomb.y * gridSize + gridSize/4);
        ctx.lineTo(bomb.x * gridSize + gridSize/2 + 4, bomb.y * gridSize);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FFA000';
        ctx.stroke();
        
        // Parıltı efekti
        const bombGlow = ctx.createRadialGradient(
            bomb.x * gridSize + gridSize/2,
            bomb.y * gridSize + gridSize/2,
            0,
            bomb.x * gridSize + gridSize/2,
            bomb.y * gridSize + gridSize/2,
            gridSize
        );
        bombGlow.addColorStop(0, 'rgba(255, 160, 0, 0.2)');
        bombGlow.addColorStop(1, 'rgba(255, 160, 0, 0)');
        ctx.fillStyle = bombGlow;
        ctx.fill();
    });
}

// Oyun bitti
function gameOver() {
    isGameRunning = false;
    clearInterval(gameInterval);
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreElement.textContent = highScore;
    }
    
    finalScoreElement.textContent = score;
    gameOverElement.classList.remove('hidden');
    startBtn.textContent = 'Başlat';
}

// Klavye kontrolleri
document.addEventListener('keydown', (e) => {
    if (!isGameRunning) return;
    
    switch (e.key) {
        case 'ArrowUp':
            if (dy === 1) return; // Ters yöne gitmeyi engelle
            dx = 0;
            dy = -1;
            isFirstMove = false;
            break;
        case 'ArrowDown':
            if (dy === -1) return;
            dx = 0;
            dy = 1;
            isFirstMove = false;
            break;
        case 'ArrowLeft':
            if (dx === 1) return;
            dx = -1;
            dy = 0;
            isFirstMove = false;
            break;
        case 'ArrowRight':
            if (dx === -1) return;
            dx = 1;
            dy = 0;
            isFirstMove = false;
            break;
    }
});

// Mobil kontroller
document.getElementById('upBtn').addEventListener('click', () => {
    if (dy === 1 || !isGameRunning) return;
    dx = 0;
    dy = -1;
    isFirstMove = false;
});

document.getElementById('downBtn').addEventListener('click', () => {
    if (dy === -1 || !isGameRunning) return;
    dx = 0;
    dy = 1;
    isFirstMove = false;
});

document.getElementById('leftBtn').addEventListener('click', () => {
    if (dx === 1 || !isGameRunning) return;
    dx = -1;
    dy = 0;
    isFirstMove = false;
});

document.getElementById('rightBtn').addEventListener('click', () => {
    if (dx === -1 || !isGameRunning) return;
    dx = 1;
    dy = 0;
    isFirstMove = false;
});

// Oyun kontrolleri
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame); 