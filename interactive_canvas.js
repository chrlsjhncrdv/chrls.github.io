(function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const DEFAULT_RADIUS = 20;
    const MIN_RADIUS = 5;

    let circles = [];
    let selectedCircleIndex = -1;
    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    function drawCircles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        circles.forEach((circle, index) => {
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
            ctx.fillStyle = (index === selectedCircleIndex) ? 'red' : '#2980b9'; // red if selected, blue otherwise
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.stroke();
        });
    }

    function getCircleAtPosition(x, y) {
        for (let i = circles.length - 1; i >= 0; i--) {
            const circle = circles[i];
            const dx = x - circle.x;
            const dy = y - circle.y;
            if (Math.sqrt(dx * dx + dy * dy) <= circle.radius) {
                return i;
            }
        }
        return -1;
    }

    canvas.addEventListener('mousedown', function(e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const circleIndex = getCircleAtPosition(mouseX, mouseY);
        if (circleIndex !== -1) {
            selectedCircleIndex = circleIndex;
            isDragging = true;
            dragOffsetX = mouseX - circles[circleIndex].x;
            dragOffsetY = mouseY - circles[circleIndex].y;
            drawCircles();
        } else {
            // Clicked on blank space: add new circle
            circles.push({ x: mouseX, y: mouseY, radius: DEFAULT_RADIUS });
            selectedCircleIndex = circles.length - 1;
            drawCircles();
        }
    });

    canvas.addEventListener('mousemove', function(e) {
        if (!isDragging || selectedCircleIndex === -1) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        circles[selectedCircleIndex].x = mouseX - dragOffsetX;
        circles[selectedCircleIndex].y = mouseY - dragOffsetY;
        drawCircles();
    });

    canvas.addEventListener('mouseup', function() {
        isDragging = false;
    });

    canvas.addEventListener('mouseleave', function() {
        isDragging = false;
    });

    window.addEventListener('keydown', function(e) {
        if (selectedCircleIndex !== -1 && (e.key === 'Delete' || e.key === 'Backspace')) {
            circles.splice(selectedCircleIndex, 1);
            selectedCircleIndex = -1;
            drawCircles();
        }
    });

    canvas.addEventListener('wheel', function(e) {
        if (selectedCircleIndex === -1) return;

        e.preventDefault();
        const delta = Math.sign(e.deltaY);
        if (delta < 0) {
            // Scroll up - increase radius
            circles[selectedCircleIndex].radius += 2;
        } else if (delta > 0) {
            // Scroll down - decrease radius
            circles[selectedCircleIndex].radius = Math.max(MIN_RADIUS, circles[selectedCircleIndex].radius - 2);
        }
        drawCircles();
    }, { passive: false });

    drawCircles();
})();
