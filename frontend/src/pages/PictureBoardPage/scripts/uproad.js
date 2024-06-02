document.addEventListener('DOMContentLoaded', function() {
    const uproadButton = document.getElementById('uproad');
    const moveButton = document.getElementById('move');
    const tiltButton = document.getElementById('tilt');
    const showButton = document.getElementById('show');
    const captureButton = document.getElementById('capture');
    const imageContainer = document.getElementById('imageContainer');

    uproadButton.addEventListener('click', function() {
        uproadButton.classList.toggle('active');
    });

    captureButton.addEventListener('click', function() {
        const buttons = [uproadButton, captureButton, moveButton, tiltButton, showButton];
        const photoContainerSets = document.querySelectorAll('.photo-container-set');

        // 상태 저장
        const originalStates = [];
        photoContainerSets.forEach(container => {
            const inner = container.querySelector('.photo-inner');
            const isFlipped = container.classList.contains('flipped');
            const { left, top } = container.style;
            originalStates.push({ container, inner, isFlipped, left, top });
            if (isFlipped) {
                container.querySelector('.photo-front').style.display = 'none';
                container.querySelector('.photo-back').style.display = 'block';
            } else {
                container.querySelector('.photo-front').style.display = 'block';
                container.querySelector('.photo-back').style.display = 'none';
            }
        });

        buttons.forEach(button => button.style.visibility = 'hidden');

        // 요소의 크기를 일시적으로 확대하여 스크롤 영역을 포함한 전체 콘텐츠 캡쳐
        const originalOverflow = imageContainer.style.overflow;
        const originalWidth = imageContainer.style.width;
        const originalHeight = imageContainer.style.height;

        imageContainer.style.overflow = 'visible';
        imageContainer.style.width = `${imageContainer.scrollWidth}px`;
        imageContainer.style.height = `${imageContainer.scrollHeight}px`;
        
        htmlToImage.toPng(imageContainer, { quality: 4, backgroundColor: null })
            .then(function(dataUrl) {
                // 상태 복원
                originalStates.forEach(({ container, isFlipped, left, top }) => {
                    if (isFlipped) {
                        container.querySelector('.photo-front').style.display = 'block';
                        container.querySelector('.photo-back').style.display = 'block';
                    } else {
                        container.querySelector('.photo-front').style.display = 'block';
                        container.querySelector('.photo-back').style.display = 'block';
                    }
                    container.style.left = left;
                    container.style.top = top;
                });

                buttons.forEach(button => button.style.visibility = 'visible');
                imageContainer.style.overflow = originalOverflow;
                imageContainer.style.width = originalWidth;
                imageContainer.style.height = originalHeight;

                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = 'PictureBoard.png';
                link.click();
            })
            .catch(function(error) {
                console.error('캡쳐 오류:', error);
                buttons.forEach(button => button.style.visibility = 'visible');
                imageContainer.style.overflow = originalOverflow;
                imageContainer.style.width = originalWidth;
                imageContainer.style.height = originalHeight;
            });
    });
});
