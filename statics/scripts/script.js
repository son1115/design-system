document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료. 아이콘 스크립트 시작.'); // 스크립트 시작 확인

    // 아이콘 기능이 필요한 모든 input-wrapper 요소를 찾습니다.
    const inputWrappers = document.querySelectorAll('.input-wrapper');
    console.log('찾은 input-wrapper 요소 개수:', inputWrappers.length); // 몇 개를 찾았는지 확인

    inputWrappers.forEach((wrapper, index) => {
        console.log(`[${index}] 번째 input-wrapper 처리 시작:`, wrapper); // 각 wrapper 처리 시작 확인
        const input = wrapper.querySelector('.form-control'); // input 또는 textarea
        const clearButton = wrapper.querySelector('.btn-clear');

        // input 요소와 clearButton 요소를 제대로 찾았는지 확인
        if (!input) {
            console.error(`[${index}] 번째 input-wrapper에서 .form-control 요소를 찾을 수 없습니다.`);
        }
        if (!clearButton) {
            console.error(`[${index}] 번째 input-wrapper에서 .btn-clear 요소를 찾을 수 없습니다.`);
        }

        if (input && clearButton) {
            console.log(`[${index}] input 및 clearButton 요소 찾음. 이벤트 리스너 추가 시도.`);

            // 입력 이벤트 감지 (내용 변경 시)
            input.addEventListener('input', function() {
                console.log(`[${index}] input 이벤트 발생! 현재 값: "${input.value}" (길이: ${input.value.length})`); // 이벤트 발생 및 값 확인
                // 입력 내용이 있으면 is-visible 클래스 추가, 없으면 제거
                if (input.value.length > 0) {
                    if (!clearButton.classList.contains('is-visible')) {
                        console.log(`[${index}] is-visible 클래스 추가.`);
                        clearButton.classList.add('is-visible');
                    }
                } else {
                    if (clearButton.classList.contains('is-visible')) {
                        console.log(`[${index}] is-visible 클래스 제거.`);
                        clearButton.classList.remove('is-visible');
                    }
                }
            });

            // 지우기 버튼 클릭 이벤트
            clearButton.addEventListener('click', function() {
                console.log(`[${index}] 지우기 버튼 클릭됨.`); // 클릭 이벤트 확인
                input.value = ''; // 입력 내용 지우기
                // 클래스 제거는 input 이벤트가 발생하여 처리되도록 하거나, 여기서 직접 제거
                if (clearButton.classList.contains('is-visible')) {
                     console.log(`[${index}] 클릭 후 is-visible 클래스 제거.`);
                     clearButton.classList.remove('is-visible');
                }
                input.focus(); // 다시 입력 필드에 포커스 주기 (선택 사항)

                // 필요시 input 이벤트 강제 발생 (다른 로직이 input 이벤트에 의존하는 경우)
                // console.log(`[${index}] input 이벤트 강제 발생 시도.`);
                // input.dispatchEvent(new Event('input', { bubbles: true }));
            });

            // 페이지 로드 시 초기 상태 확인
            console.log(`[${index}] 초기 값 확인: "${input.value}" (길이: ${input.value.length})`);
            if (input.value.length > 0) {
                console.log(`[${index}] 초기 값이 있으므로 is-visible 클래스 추가.`);
                clearButton.classList.add('is-visible');
            } else {
                 console.log(`[${index}] 초기 값이 없으므로 is-visible 클래스 추가 안 함.`);
            }

            console.log(`[${index}] 이벤트 리스너 설정 완료.`);

        } else {
            console.error(`[${index}] input 또는 clearButton 요소를 찾지 못해 이벤트 리스너를 설정할 수 없습니다.`);
        }
    });

    console.log('아이콘 스크립트 설정 완료.');
});