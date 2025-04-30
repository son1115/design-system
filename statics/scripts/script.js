document.addEventListener('DOMContentLoaded', function() {
    // ==============================================
    // === 아이콘 관련 스크립트 시작 ===
    // ==============================================
    console.log('DOM 로드 완료. 아이콘 스크립트 시작.'); // 스크립트 시작 확인

    // 아이콘 기능이 필요한 모든 input-wrapper 요소를 찾습니다.
    const inputWrappers = document.querySelectorAll('.input-wrapper');
    // console.log('찾은 input-wrapper 요소 개수:', inputWrappers.length); // 필요시 로그 확인

    inputWrappers.forEach((wrapper, index) => {
        // console.log(`[${index}] 번째 input-wrapper 처리 시작:`, wrapper); // 필요시 로그 확인
        const input = wrapper.querySelector('.form-control'); // input 또는 textarea
        const clearButton = wrapper.querySelector('.btn-clear');

        // input 요소와 clearButton 요소를 제대로 찾았는지 확인
        if (!input) {
            // console.error(`[${index}] 번째 input-wrapper에서 .form-control 요소를 찾을 수 없습니다.`); // 에러보다는 경고가 나을 수 있음
        }
        // btn-clear는 textarea에는 없을 수 있으므로 에러 로깅 제거 또는 조건부 처리
        // if (!clearButton && input.tagName !== 'TEXTAREA') { // input 인데 버튼 없을 때만 에러
        //     console.error(`[${index}] 번째 input-wrapper에서 .btn-clear 요소를 찾을 수 없습니다.`);
        // }

        // input 이면서 clearButton 이 있을 때만 이벤트 리스너 추가
        if (input && input.tagName !== 'TEXTAREA' && clearButton) {
            // console.log(`[${index}] input 및 clearButton 요소 찾음. 이벤트 리스너 추가 시도.`); // 필요시 로그 확인

            // 입력 이벤트 감지
            input.addEventListener('input', function() {
                // console.log(`[${index}] input 이벤트 발생! 현재 값: "${input.value}" (길이: ${input.value.length})`); // 필요시 로그 확인
                if (input.value.length > 0) {
                    if (!clearButton.classList.contains('is-visible')) {
                        // console.log(`[${index}] is-visible 클래스 추가.`); // 필요시 로그 확인
                        clearButton.classList.add('is-visible');
                    }
                } else {
                    if (clearButton.classList.contains('is-visible')) {
                        // console.log(`[${index}] is-visible 클래스 제거.`); // 필요시 로그 확인
                        clearButton.classList.remove('is-visible');
                    }
                }
            });

            // 지우기 버튼 클릭 이벤트
            clearButton.addEventListener('click', function() {
                // console.log(`[${index}] 지우기 버튼 클릭됨.`); // 필요시 로그 확인
                input.value = '';
                if (clearButton.classList.contains('is-visible')) {
                    // console.log(`[${index}] 클릭 후 is-visible 클래스 제거.`); // 필요시 로그 확인
                    clearButton.classList.remove('is-visible');
                }
                input.focus();
                // input 이벤트 강제 발생 (필요시)
                // input.dispatchEvent(new Event('input', { bubbles: true }));
            });

            // 페이지 로드 시 초기 상태 확인
            // console.log(`[${index}] 초기 값 확인: "${input.value}" (길이: ${input.value.length})`); // 필요시 로그 확인
            if (input.value.length > 0) {
                // console.log(`[${index}] 초기 값이 있으므로 is-visible 클래스 추가.`); // 필요시 로그 확인
                clearButton.classList.add('is-visible');
            }
            // console.log(`[${index}] 이벤트 리스너 설정 완료.`); // 필요시 로그 확인
        }
    });
    console.log('아이콘 스크립트 설정 완료.');
    // === 아이콘 관련 스크립트 끝 ===
    // ==============================================


    // ==========================================================
    // === Textarea 자동 높이 조절 스크립트 (클래스 기반) 시작 ===
    // ==========================================================
    console.log('Textarea 자동 높이 조절 스크립트 시작.');

    // 높이를 조절하는 함수 정의
    const autoResize = (element) => {
        if (!element) return; // 대상 없으면 종료
        element.style.height = 'auto'; // 높이 초기화
        element.style.height = element.scrollHeight + 'px'; // scrollHeight로 높이 재설정
        // console.log(`Textarea 높이 조절됨: ${element.scrollHeight}px`); // 필요시 로그 확인
    };

    // '.auto-resize' 클래스를 가진 모든 textarea 요소를 선택
    const textareasToResize = document.querySelectorAll('textarea.auto-resize');

    if (textareasToResize.length > 0) {
        console.log(`자동 높이 조절 대상 textarea ${textareasToResize.length}개 찾음 (클래스: .auto-resize).`);

        textareasToResize.forEach(textareaElement => {
            // 각 textarea에 input 이벤트 리스너 추가
            textareaElement.addEventListener('input', () => {
                autoResize(textareaElement);
            });

            // 페이지 로드 시 초기 높이 설정 (setTimeout으로 약간의 딜레이)
            setTimeout(() => {
                autoResize(textareaElement);
                // console.log(`${textareaElement.id || '선택된 요소'} 초기 높이 조절 완료.`); // 필요시 로그 확인
            }, 10);
        });

        console.log('모든 대상 Textarea에 자동 높이 조절 이벤트 리스너 설정 완료.');

    } else {
        // 대상 textarea가 없을 경우 경고 로그 (오류 대신)
        console.warn("자동 높이 조절 대상 textarea(.auto-resize)를 찾지 못했습니다.");
    }
    // === Textarea 자동 높이 조절 스크립트 끝 ===
    // ============================================

}); // DOMContentLoaded 끝

// script.js

document.addEventListener('DOMContentLoaded', function() {
    // --- 기존 아이콘 관련 코드 ... ---
    console.log('아이콘 스크립트 설정 완료.');

    // --- 기존 Textarea 자동 높이 조절 스크립트 ... ---
    console.log('Textarea 자동 높이 조절 이벤트 리스너 설정 완료.');


    // ==============================================
    // === 커스텀 셀렉트 박스 (SB) 스크립트 시작 ===
    // ==============================================
    console.log('커스텀 셀렉트 박스 스크립트 시작.');

    // 페이지의 모든 커스텀 셀렉트 박스 wrapper 요소를 찾음
    const sbWrappers = document.querySelectorAll('.sb-wrapper');

    sbWrappers.forEach(wrapper => {
        const displayButton = wrapper.querySelector('.sb-display');
        const optionsList = wrapper.querySelector('.sb-options');

        // 필수 요소들이 있는지 확인
        if (!displayButton || !optionsList) {
            console.error('SB 필수 요소(.sb-display 또는 .sb-options)를 찾을 수 없습니다.', wrapper);
            return; // 현재 wrapper 처리를 중단하고 다음 wrapper로 넘어감
        }

        // 1. 표시 영역(버튼) 클릭 이벤트 처리
        displayButton.addEventListener('click', (event) => {
            // 현재 셀렉트 박스의 열림/닫힘 상태 토글
            const isOpen = wrapper.classList.toggle('is-open');
            displayButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

            // 플로팅 라벨 상태 업데이트 (옵션) - 라벨이 열렸을 때도 뜨도록
            if (wrapper.classList.contains('form-floating')) {
                // .is-open 클래스가 추가/제거될 때 라벨 상태 자동 업데이트 (CSS 규칙 필요)
            }

            console.log(`${displayButton.id || 'SB'} ${isOpen ? '열림' : '닫힘'}`);
        });

        // --- 옵션 선택, 외부 클릭 시 닫기 등은 여기에 추가 ---

    }); // sbWrappers.forEach 끝

    // --- 외부 클릭 시 모든 드롭다운 닫기 (간단 버전) ---
    document.addEventListener('click', (event) => {
        // 클릭된 요소가 sb-wrapper 내부가 아닐 경우 모든 드롭다운 닫기
        if (!event.target.closest('.sb-wrapper')) {
            closeAllSelectBoxes();
        }
    });

    // 모든 셀렉트 박스 닫는 함수
    function closeAllSelectBoxes() {
        sbWrappers.forEach(wrapper => {
            if (wrapper.classList.contains('is-open')) {
                wrapper.classList.remove('is-open');
                const button = wrapper.querySelector('.sb-display');
                if (button) {
                    button.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }
    // === 커스텀 셀렉트 박스 (SB) 스크립트 끝 ===
    // ============================================

}); // DOMContentLoaded 끝