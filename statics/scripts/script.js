// script.js

document.addEventListener('DOMContentLoaded', function() {
    // ==============================================
    // === 아이콘 관련 스크립트 시작 (기존 유지) ===
    // ==============================================
    console.log('DOM 로드 완료. 아이콘 스크립트 시작.');

    const inputWrappers = document.querySelectorAll('.input-wrapper');
    // console.log('찾은 input-wrapper 요소 개수:', inputWrappers.length);

    inputWrappers.forEach((wrapper) => { // index 불필요시 제거
        const input = wrapper.querySelector('.form-control');
        const clearButton = wrapper.querySelector('.btn-clear');

        if (!input) {
            // console.warn(`[${index}] 번째 input-wrapper에서 .form-control 요소를 찾을 수 없습니다.`);
            return; // input 없으면 해당 wrapper 처리 중단
        }

        // input 이면서 clearButton 이 있을 때만 이벤트 리스너 추가
        if (input.tagName !== 'TEXTAREA' && clearButton) {
            input.addEventListener('input', function() {
                if (input.value.length > 0) {
                    if (!clearButton.classList.contains('is-visible')) {
                        clearButton.classList.add('is-visible');
                    }
                } else {
                    if (clearButton.classList.contains('is-visible')) {
                        clearButton.classList.remove('is-visible');
                    }
                }
            });

            clearButton.addEventListener('click', function() {
                input.value = '';
                if (clearButton.classList.contains('is-visible')) {
                    clearButton.classList.remove('is-visible');
                }
                input.focus();
            });

            // 초기 로드 시
            if (input.value.length > 0) {
                clearButton.classList.add('is-visible');
            }
        }
    });
    console.log('아이콘 스크립트 설정 완료.');
    // === 아이콘 관련 스크립트 끝 ===
    // ==============================================


    // ==========================================================
    // === Textarea 자동 높이 조절 스크립트 (클래스 기반) 시작 (기존 유지) ===
    // ==========================================================
    console.log('Textarea 자동 높이 조절 스크립트 시작.');

    const autoResize = (element) => {
        if (!element) return;
        element.style.height = 'auto';
        element.style.height = element.scrollHeight + 'px';
    };

    const textareasToResize = document.querySelectorAll('textarea.auto-resize');

    if (textareasToResize.length > 0) {
        console.log(`자동 높이 조절 대상 textarea ${textareasToResize.length}개 찾음 (클래스: .auto-resize).`);
        textareasToResize.forEach(textareaElement => {
            textareaElement.addEventListener('input', () => {
                autoResize(textareaElement);
            });
            // 초기 로드 시 높이 조절 (약간의 딜레이 후)
            setTimeout(() => {
                autoResize(textareaElement);
            }, 10);
        });
        console.log('모든 대상 Textarea에 자동 높이 조절 이벤트 리스너 설정 완료.');
    } else {
        console.warn("자동 높이 조절 대상 textarea(.auto-resize)를 찾지 못했습니다.");
    }
    // === Textarea 자동 높이 조절 스크립트 끝 ===
    // ============================================


    // ==========================================================
    // === 네이티브 Select 플로팅 라벨 보조 스크립트 시작 (수정/대체된 부분) ===
    // ==========================================================
    console.log('네이티브 Select 플로팅 라벨 보조 스크립트 시작.');

    // .form-floating 안에 있으면서 .sb-wrapper 클래스를 가진 div 내부의 select.form-control 찾기
    const nativeFloatingSelects = document.querySelectorAll('.form-floating.sb-wrapper select.form-control');

    nativeFloatingSelects.forEach(selectElement => {
        const wrapper = selectElement.closest('.form-floating.sb-wrapper'); // 가장 가까운 .form-floating.sb-wrapper 찾기
        if (!wrapper) return;

        const updateLabelAndPlaceholderState = () => {
            // selectElement.value 가 비어있지 않고 (즉, placeholder가 아닌 값이 선택됨)
            // 또한, 첫 번째 옵션(플레이스홀더, selectedIndex === 0)이 아닐 때 .has-value 추가
            if (selectElement.value && selectElement.value !== "" && selectElement.selectedIndex > 0) {
                wrapper.classList.add('has-value');
                selectElement.classList.remove('placeholder-shown'); // CSS에서 플레이스홀더 색상 제어용
            } else {
                wrapper.classList.remove('has-value');
                selectElement.classList.add('placeholder-shown'); // CSS에서 플레이스홀더 색상 제어용
            }
        };

        // 초기 로드 시 상태 업데이트
        updateLabelAndPlaceholderState();

        // select 요소의 값이 변경될 때 상태 업데이트
        selectElement.addEventListener('change', updateLabelAndPlaceholderState);

        // select 요소에 포커스 갔을 때 (CSS에서 :focus + label 로 이미 처리될 수 있음)
        // 만약 JS로 .is-open 클래스 제어가 필요하다면 아래 주석 해제하고 CSS에 .form-floating.is-open > label 스타일 추가
        /*
        selectElement.addEventListener('focus', () => {
            wrapper.classList.add('is-open');
        });

        selectElement.addEventListener('blur', () => {
            wrapper.classList.remove('is-open');
            updateLabelAndPlaceholderState(); // 블러 시에도 최종 값 기준으로 라벨 상태 확인
        });
        */
    });

    if (nativeFloatingSelects.length > 0) {
        console.log(`네이티브 Select 플로팅 라벨 보조 스크립트 ${nativeFloatingSelects.length}개 설정 완료.`);
    } else {
        console.warn("플로팅 라벨을 사용하는 네이티브 select (.form-floating.sb-wrapper select.form-control) 요소를 찾지 못했습니다.");
    }
    // === 네이티브 Select 플로팅 라벨 보조 스크립트 끝 ===
    // ============================================

}); // DOMContentLoaded 끝