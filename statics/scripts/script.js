document.addEventListener('DOMContentLoaded', function() {
    // 아이콘 기능이 필요한 모든 input-wrapper 요소를 찾습니다.
    const inputWrappers = document.querySelectorAll('.input-wrapper');

    inputWrappers.forEach(wrapper => {
        const input = wrapper.querySelector('.form-control'); // input 또는 textarea
        const clearButton = wrapper.querySelector('.btn-clear');

        if (input && clearButton) {
            // 입력 이벤트 감지 (내용 변경 시)
            input.addEventListener('input', function() {
                // 입력 내용이 있으면 is-visible 클래스 추가, 없으면 제거
                if (input.value.length > 0) {
                    clearButton.classList.add('is-visible');
                } else {
                    clearButton.classList.remove('is-visible');
                }
            });

            // 지우기 버튼 클릭 이벤트
            clearButton.addEventListener('click', function() {
                input.value = ''; // 입력 내용 지우기
                clearButton.classList.remove('is-visible'); // 아이콘 숨기기
                input.focus(); // 다시 입력 필드에 포커스 주기 (선택 사항)
                // 값이 변경되었음을 알리는 이벤트 강제 발생 (필요시)
                // input.dispatchEvent(new Event('input'));
            });

            // 페이지 로드 시 초기 상태 확인
            if (input.value.length > 0) {
                clearButton.classList.add('is-visible');
            }
        }
    });
});