const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const circles = [];
let isDrawing = false;
let startX, startY;

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    startX = e.clientX - canvas.offsetLeft;
    startY = e.clientY - canvas.offsetTop;
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));

    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    ctx.fill();

    circles.push({ x: startX, y: startY, radius });
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('click', (e) => {
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    const circleUnderCursor = circles.find(circle => {
        const distance = Math.sqrt(Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2));
        return distance <= circle.radius;
    });

    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(circleUnderCursor ? 'Hit' : 'Miss', x, y);
});

canvas.addEventListener('dblclick', (e) => {
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    const circleIndex = circles.findIndex(circle => {
        const distance = Math.sqrt(Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2));
        return distance <= circle.radius;
    });

    if (circleIndex !== -1) {
        circles.splice(circleIndex, 1);
        redrawCanvas();
    }
});

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.length = 0;
});

function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        ctx.fill();
    });
}