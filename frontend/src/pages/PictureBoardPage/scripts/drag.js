let tiltChecked = false;
let moveChecked = true;
const tilt = document.getElementById('tilt');
const move = document.getElementById('move');

function updateButtonStates() {
    if (tiltChecked) {
        tilt.style.backgroundColor = '#c4aa9f';
    } else {
        tilt.style.backgroundColor = '#F1EBE9';
    }

    if (moveChecked) {
        move.style.backgroundColor = '#c4aa9f';
    } else {
        move.style.backgroundColor = '#F1EBE9';
    }
}

tilt.addEventListener('click', function() {
    tiltChecked = !tiltChecked;
    moveChecked = !tiltChecked;
    updateButtonStates();
});

move.addEventListener('click', function() {
    moveChecked = !moveChecked;
    tiltChecked = !moveChecked;
    updateButtonStates();
});

let isDragging = false;
let isResizing = false;
let offsetX, offsetY;
let dragTarget = null;
let highestZIndex = 100;
let startX, startY;
let initialScale;

let tiltsetY = 0;

function getEventCoordinates(e) {
    if (e.touches) {
        e = e.touches[0];
    }
    return e;
}

function startDrag(e) {
    let event = getEventCoordinates(e);
    if (event.target.classList.contains('resize')) {
        e.preventDefault();
        isResizing = true;
        dragTarget = event.target.closest('.photo-container-set');
        startX = event.clientX;
        startY = event.clientY;
        initialScale = parseFloat(dragTarget.style.transform.replace(/[^\d.]/g, '')) || 1;
        dragTarget.style.cursor = 'nw-resize';
        document.body.style.cursor = 'nw-resize';
        document.addEventListener('mousemove', onResizing);
        document.addEventListener('touchmove', onResizing, { passive: false });
    } else if (event.target.classList.contains('photo-container-set') || event.target.closest('.photo-container-set')) {
        e.preventDefault();
        isDragging = true;
        dragTarget = event.target.classList.contains('photo-container-set') ? event.target : event.target.closest('.photo-container-set');
        dragTarget.style.zIndex = ++highestZIndex;
        dragTarget.style.position = 'absolute';
        if (!tiltChecked) {
            dragTarget.style.cursor = 'grabbing';
            document.body.style.cursor = 'grabbing';
        }
        tiltsetY = event.clientY;

        offsetX = event.clientX - dragTarget.getBoundingClientRect().left;
        offsetY = event.clientY - dragTarget.getBoundingClientRect().top;
        document.addEventListener('mousemove', onDragging);
        document.addEventListener('touchmove', onDragging, { passive: false });
    }
}

function drag(e) {
    if (!isDragging || !dragTarget) return;
    let event = getEventCoordinates(e);

    let container = dragTarget.parentElement;
    let containerRect = container.getBoundingClientRect();
    let newX = event.clientX - offsetX - containerRect.left + container.scrollLeft;
    let newY = event.clientY - offsetY - containerRect.top + container.scrollTop;

    const containerWidth = container.clientWidth;
    const targetWidth = dragTarget.clientWidth;
    const targetHeight = dragTarget.clientHeight;

    // x축 경계값 계산
    newX = Math.max(0, Math.min(newX, containerWidth - targetWidth));
    // y축은 0 아래로는 못 가게 하지만 아래로는 제한 없음
    newY = Math.max(0, newY);

    if (!tiltChecked) {
        dragTarget.style.left = `${newX}px`;
        dragTarget.style.top = `${newY}px`;

        updateBottomElement();
    } else {
        let deg = 0 - (tiltsetY - event.clientY);
        dragTarget.style.rotate = `${deg}deg`;
    }
}

function endDrag(e) {
    if (isDragging) {
        isDragging = false;
        dragTarget.style.cursor = 'default';
        document.body.style.cursor = 'default';
        dragTarget = null;
        document.removeEventListener('mousemove', onDragging);
        document.removeEventListener('touchmove', onDragging);
    }
    if (isResizing) {
        isResizing = false;
        dragTarget.style.cursor = 'default';
        document.body.style.cursor = 'default';
        dragTarget = null;
        document.removeEventListener('mousemove', onResizing);
        document.removeEventListener('touchmove', onResizing);
    }
}

function onDragging(e) {
    if (!isDragging) return;
    e.preventDefault();
    requestAnimationFrame(() => drag(e));
}

function onResizing(e) {
    if (!isResizing) return;
    e.preventDefault();

    let event = getEventCoordinates(e);
    let deltaX = event.clientX - startX;
    let deltaY = event.clientY - startY;

    let newScale = initialScale + (deltaX + deltaY) / 100;
    newScale = Math.max(0.5, Math.min(newScale, 2));

    dragTarget.style.transform = `scale(${newScale})`;
}

function updateBottomElement() {
    const elements = document.querySelectorAll('.photo-container-set');
    let maxBottom = 0;

    elements.forEach(element => {
        let bottom = parseInt(element.style.top) + element.clientHeight;
        if (bottom > maxBottom) {
            maxBottom = bottom;
        }
    });

    let bottomElement = document.getElementById('bottomElement');
    if (bottomElement) {
        bottomElement.style.top = `${maxBottom + 70}px`; // 100px 간격 유지
        backgroundText();
    }
}

document.addEventListener('mousedown', startDrag);
document.addEventListener('touchstart', startDrag, { passive: false });

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);
document.addEventListener('mouseleave', endDrag);
