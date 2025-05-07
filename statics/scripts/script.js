// script.js

document.addEventListener('DOMContentLoaded', function() {
    // ==============================================
    // === 아이콘 관련 스크립트 시작 (기존 유지) ===
    // ==============================================
    // console.log('DOM 로드 완료. 아이콘 스크립트 시작.');
    const inputWrappers = document.querySelectorAll('.input-wrapper');
    inputWrappers.forEach((wrapper) => {
        const input = wrapper.querySelector('.form-control');
        const clearButton = wrapper.querySelector('.btn-clear');
        if (!input) { return; }
        if (input.tagName !== 'TEXTAREA' && clearButton) {
            const toggleClearButton = () => {
                clearButton.classList.toggle('is-visible', input.value.length > 0);
            };
            input.addEventListener('input', toggleClearButton);
            clearButton.addEventListener('click', function() {
                input.value = '';
                toggleClearButton();
                input.focus();
            });
            toggleClearButton(); // 초기 상태
        }
    });
    // console.log('아이콘 스크립트 설정 완료.');
    // === 아이콘 관련 스크립트 끝 ===
    // ==============================================


    // ==========================================================
    // === Textarea 자동 높이 조절 스크립트 (기존 유지) ===
    // ==========================================================
    // console.log('Textarea 자동 높이 조절 스크립트 시작.');
    const autoResize = (element) => {
        if (!element) return;
        element.style.height = 'auto';
        element.style.height = element.scrollHeight + 'px';
    };
    const textareasToResize = document.querySelectorAll('textarea.auto-resize');
    if (textareasToResize.length > 0) {
        textareasToResize.forEach(textareaElement => {
            textareaElement.addEventListener('input', () => autoResize(textareaElement));
            setTimeout(() => autoResize(textareaElement), 0);
        });
    }
    // console.log('Textarea 자동 높이 조절 완료.');
    // === Textarea 자동 높이 조절 스크립트 끝 ===
    // ============================================


    // ==========================================================
    // === 네이티브 Select 플로팅 라벨 보조 스크립트 (기존 유지) ===
    // ==========================================================
    // console.log('네이티브 Select 플로팅 라벨 보조 스크립트 시작.');
    const nativeFloatingSelects = document.querySelectorAll('.form-floating.sb-wrapper select.form-control');
    nativeFloatingSelects.forEach(selectElement => {
        const wrapper = selectElement.closest('.form-floating.sb-wrapper');
        if (!wrapper) return;
        const updateLabelAndPlaceholderState = () => {
            const hasValue = selectElement.value && selectElement.value !== "" && selectElement.selectedIndex > 0;
            wrapper.classList.toggle('has-value', hasValue);
            selectElement.classList.toggle('placeholder-shown', !hasValue);
        };
        updateLabelAndPlaceholderState();
        selectElement.addEventListener('change', updateLabelAndPlaceholderState);
    });
    // console.log('네이티브 Select 플로팅 라벨 보조 스크립트 완료.');
    // === 네이티브 Select 플로팅 라벨 보조 스크립트 끝 ===
    // ============================================


    // ==============================================
    // === 탭(Tabs) 관련 스크립트 시작 (패널 제어 없이 버튼 상태만 변경) ===
    // ==============================================
    console.log('탭 UI (버튼 상태 전용) 스크립트 시작.');

    const allTabsContainers = document.querySelectorAll('.tabs-container');

    allTabsContainers.forEach(tabsContainer => {
        const tabList = tabsContainer.querySelector('.tab-list');
        if (!tabList) {
            // console.warn('Tab list not found in a tabsContainer:', tabsContainer);
            return;
        }

        const tabs = Array.from(tabList.querySelectorAll('button[role="tab"]'));

        if (tabs.length === 0) {
            // console.warn('No tab buttons found in a tab list:', tabList);
            return;
        }
        
        // 초기 활성 탭은 HTML에서 class="active" 및 aria-selected="true"로 설정된 것을 따름

        tabList.addEventListener('click', (event) => {
            const clickedTabButton = event.target.closest('button[role="tab"]');

            // 클릭된 요소가 탭 버튼이 아니거나, 이미 활성화된 탭이거나, 비활성화된 탭이면 아무것도 하지 않음
            if (!clickedTabButton || clickedTabButton.getAttribute('aria-selected') === 'true' || clickedTabButton.disabled) {
                return;
            }

            // 1. 모든 탭 버튼 비활성화 (aria-selected, tabindex, .active 클래스)
            tabs.forEach(tab => {
                tab.setAttribute('aria-selected', 'false');
                tab.setAttribute('tabindex', '-1');
                if (tab.parentElement.classList.contains('tab-item')) { // li에 active 클래스 적용 시
                    tab.parentElement.classList.remove('active');
                }
                // 만약 버튼 자체에 active 클래스를 적용한다면:
                // tab.classList.remove('active'); 
            });

            // 2. 클릭된 탭 버튼 활성화
            clickedTabButton.setAttribute('aria-selected', 'true');
            clickedTabButton.setAttribute('tabindex', '0');
            if (clickedTabButton.parentElement.classList.contains('tab-item')) { // li에 active 클래스 적용 시
                clickedTabButton.parentElement.classList.add('active');
            }
            // 만약 버튼 자체에 active 클래스를 적용한다면:
            // clickedTabButton.classList.add('active');

            clickedTabButton.focus(); // 클릭된 탭으로 포커스 이동 (접근성)
        });

        // 키보드 네비게이션 (방향키, Home, End)
        tabList.addEventListener('keydown', (event) => {
            const currentTab = event.target.closest('button[role="tab"]');
            if (!currentTab) return;

            let newTabIndex;
            const currentIndex = tabs.indexOf(currentTab);

            if (event.key === 'ArrowRight') {
                newTabIndex = (currentIndex + 1) % tabs.length;
            } else if (event.key === 'ArrowLeft') {
                newTabIndex = (currentIndex - 1 + tabs.length) % tabs.length;
            } else if (event.key === 'Home') {
                newTabIndex = 0;
            } else if (event.key === 'End') {
                newTabIndex = tabs.length - 1;
            } else {
                return; // 다른 키는 무시
            }

            event.preventDefault(); // 기본 동작(예: 페이지 스크롤) 방지
            tabs[newTabIndex].click(); // 해당 탭을 클릭한 것처럼 동작 (위의 click 이벤트 핸들러 호출)
        });
    });

    if (allTabsContainers.length > 0) {
        console.log(`탭 UI (버튼 상태 전용) 스크립트 ${allTabsContainers.length}개 컨테이너에 설정 완료.`);
    } else {
        // console.warn("탭 UI 컨테이너(.tabs-container)를 찾지 못했습니다.");
    }
    // === 탭(Tabs) 관련 스크립트 끝 ===
    // ==============================================

}); // DOMContentLoaded 끝