document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('imageContainer');
    let clickStartTime;

    const memoContents = [
        "Winning and losing isn't everything.<br>Sometimes, the journey is just as important as the outcome.<br>-Alex Morgan-",
        "The hard days are what make you stronger.<br>-Aly Raisman-",
        "Start where you are. Use what you have. Do what you can.<br>-Arthur Ashe-",
        "It's never too late to change old habits.<br>-Florence Griffith Joyner-",
        "It's okay to STRUGGLE, but it's not okay to give up<br>on yourself or your dreams.<br>-Gabe Grunewald-"
    ];

    container.addEventListener('mousedown', function(event) {
        clickStartTime = Date.now();
    });

    container.addEventListener('mouseup', function(event) {
        const clickEndTime = Date.now();
        if (clickEndTime - clickStartTime < 100) { // 0.1초 이내로 클릭 종료 시 동작
            const memoButton = event.target.closest('.memoButton');
            if (!memoButton) { // 메모 버튼이 아닌 경우에만 플립 동작
                const photoContainerSet = event.target.closest('.photo-container-set');
                if (photoContainerSet) {
                    photoContainerSet.classList.toggle('flipped');
                }
            }
        }
    });

    container.addEventListener('touchstart', function(event) {
        clickStartTime = Date.now();
    });

    container.addEventListener('touchend', function(event) {
        const clickEndTime = Date.now();
        if (clickEndTime - clickStartTime < 100) { // 0.1초 이내로 클릭 종료 시 동작
            const memoButton = event.target.closest('.memoButton');
            if (!memoButton) { // 메모 버튼이 아닌 경우에만 플립 동작
                const photoContainerSet = event.target.closest('.photo-container-set');
                if (photoContainerSet) {
                    photoContainerSet.classList.toggle('flipped');
                }
            }
        }
    });

    // 메모 버튼 클릭 및 터치 이벤트 처리
    const handleMemoButtonClick = function(event) {
        const memoButton = event.target.closest('.memoButton');
        if (memoButton) {
            const backInfoDiv = memoButton.closest('.back-info-container');
            const photoContainerSet = memoButton.closest('.photo-container-set');

            if (!photoContainerSet.memoState) {
                // 현재 상태 저장
                photoContainerSet.memoState = {
                    innerHTML: backInfoDiv.innerHTML,
                    memoContent: memoContents[Math.floor(Math.random() * memoContents.length)],
                    textureHTML: backInfoDiv.querySelector('img').outerHTML // 텍스처 이미지 저장
                };
            }

            if (backInfoDiv.classList.contains('memo-active')) {
                // 메모 상태에서 다시 클릭하면 원래 내용 복원
                backInfoDiv.innerHTML = photoContainerSet.memoState.innerHTML;
                backInfoDiv.classList.remove('memo-active');
            } else {
                // 메모 내용 표시
                const memoTextElement = document.createElement('div');
                memoTextElement.style.padding = '20px';
                memoTextElement.style.color = '#401C0C';
                memoTextElement.style.textAlign = 'center';

                // 메모 내용 설정
                memoTextElement.innerHTML = photoContainerSet.memoState.memoContent;

                // 글자 크기 조절
                let fontSize = 16;
                memoTextElement.style.fontSize = `${fontSize}px`;
                backInfoDiv.innerHTML = ''; // 기존 내용 삭제
                backInfoDiv.classList.add('memo-active');
                backInfoDiv.appendChild(memoTextElement);

                // 텍스처 이미지와 메모 버튼 추가
                backInfoDiv.insertAdjacentHTML('beforeend', photoContainerSet.memoState.textureHTML);
                backInfoDiv.appendChild(memoButton);

                // 가장 긴 줄을 기준으로 폰트 크기 조절
                const lines = photoContainerSet.memoState.memoContent.split('<br>');
                const maxLineLength = Math.max(...lines.map(line => line.length));

                while (memoTextElement.scrollWidth > backInfoDiv.clientWidth - 40 || memoTextElement.scrollHeight > backInfoDiv.clientHeight - 40) {
                    fontSize -= 1;
                    memoTextElement.style.fontSize = `${fontSize}px`;
                    if (fontSize <= 10) break; // 최소 폰트 크기 설정
                }
            }
        }
    };

    container.addEventListener('click', handleMemoButtonClick);
    container.addEventListener('touchend', function(event) {
        const clickEndTime = Date.now();
        if (clickEndTime - clickStartTime < 100) { // 0.1초 이내로 클릭 종료 시 동작
            handleMemoButtonClick(event);
        }
    });
});
