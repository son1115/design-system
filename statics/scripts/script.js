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
    // === 탭(Tabs) 관련 스크립트 시작 (기존 유지) ===
    // ==============================================
    // console.log('탭 UI (버튼 상태 전용) 스크립트 시작.'); // 중복 로그 제거 또는 유지
    const allTabsContainers = document.querySelectorAll('.tabs-container');
    allTabsContainers.forEach(tabsContainer => {
        const tabList = tabsContainer.querySelector('.tab-list');
        if (!tabList) return;
        const tabs = Array.from(tabList.querySelectorAll('button[role="tab"]'));
        if (tabs.length === 0) return;
        
        tabList.addEventListener('click', (event) => {
            const clickedTabButton = event.target.closest('button[role="tab"]');
            if (!clickedTabButton || clickedTabButton.getAttribute('aria-selected') === 'true' || clickedTabButton.disabled) {
                return;
            }
            tabs.forEach(tab => {
                tab.setAttribute('aria-selected', 'false');
                tab.setAttribute('tabindex', '-1');
                if (tab.parentElement.classList.contains('tab-item')) {
                    tab.parentElement.classList.remove('active');
                }
            });
            clickedTabButton.setAttribute('aria-selected', 'true');
            clickedTabButton.setAttribute('tabindex', '0');
            if (clickedTabButton.parentElement.classList.contains('tab-item')) {
                clickedTabButton.parentElement.classList.add('active');
            }
            clickedTabButton.focus();
        });

        tabList.addEventListener('keydown', (event) => {
            const currentTab = event.target.closest('button[role="tab"]');
            if (!currentTab) return;
            let newTabIndex;
            const currentIndex = tabs.indexOf(currentTab);
            if (event.key === 'ArrowRight') newTabIndex = (currentIndex + 1) % tabs.length;
            else if (event.key === 'ArrowLeft') newTabIndex = (currentIndex - 1 + tabs.length) % tabs.length;
            else if (event.key === 'Home') newTabIndex = 0;
            else if (event.key === 'End') newTabIndex = tabs.length - 1;
            else return;
            event.preventDefault();
            tabs[newTabIndex].click();
        });
    });
    // if (allTabsContainers.length > 0) { // 중복 로그 제거 또는 유지
    //     console.log(`탭 UI (버튼 상태 전용) 스크립트 ${allTabsContainers.length}개 컨테이너에 설정 완료.`);
    // }
    // === 탭(Tabs) 관련 스크립트 끝 ===

    // ==============================================
    // === 태그(Tag) 선택 기능 스크립트 시작 (기존 유지) ===
    // ==============================================
    // console.log('태그 선택 기능 스크립트 시작.'); // 중복 로그 제거 또는 유지
    const tags = document.querySelectorAll('.tag');
    if (tags.length > 0) {
        tags.forEach(tag => {
            tag.addEventListener('click', function() {
                this.classList.toggle('tag-active');
            });
        });
        // console.log(`태그 선택 기능이 ${tags.length}개의 태그에 설정되었습니다.`); // 중복 로그 제거 또는 유지
    }
    // === 태그(Tag) 선택 기능 스크립트 끝 ===

    // ============================================================
    // === 테이블형 페이지네이션 로직 (기존 유지) ===
    // ============================================================
    const paginationContainer = document.getElementById('tablePagination');
    if (paginationContainer) { // tablePagination이 있을 때만 실행
        const pageNumbersContainer = paginationContainer.querySelector('.page-numbers-container');
        const prevButtonLi = paginationContainer.querySelector('.prev');
        const nextButtonLi = paginationContainer.querySelector('.next');
        const firstButtonLi = paginationContainer.querySelector('.first');
        const lastButtonLi = paginationContainer.querySelector('.last');

        let currentPage = 1;
        const totalPages = 30;
        const pagesPerGroup = 5;

        function renderPageNumbers() {
            if (!pageNumbersContainer) return;
            pageNumbersContainer.innerHTML = '';
            const currentGroup = Math.ceil(currentPage / pagesPerGroup);
            let startPage = (currentGroup - 1) * pagesPerGroup + 1;
            let endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

            for (let i = startPage; i <= endPage; i++) {
                const pageLink = document.createElement('a');
                pageLink.href = '#';
                pageLink.textContent = i;
                pageLink.dataset.page = i;
                if (i === currentPage) {
                    pageLink.classList.add('active');
                    pageLink.setAttribute('aria-current', 'page');
                }
                pageLink.addEventListener('click', function (e) {
                    e.preventDefault();
                    currentPage = parseInt(this.dataset.page);
                    renderAll();
                });
                pageNumbersContainer.appendChild(pageLink);
            }
        }

        function updateButtonStates() {
            if (prevButtonLi) prevButtonLi.classList.toggle('disabled', currentPage === 1);
            if (firstButtonLi) firstButtonLi.classList.toggle('disabled', currentPage === 1);
            if (nextButtonLi) nextButtonLi.classList.toggle('disabled', currentPage === totalPages);
            if (lastButtonLi) lastButtonLi.classList.toggle('disabled', currentPage === totalPages);
        }

        function renderAll() {
            renderPageNumbers();
            updateButtonStates();
        }

        prevButtonLi?.querySelector('a')?.addEventListener('click', function (e) {
            e.preventDefault();
            if (currentPage > 1) {
                const currentGroupFirstPage = (Math.ceil(currentPage / pagesPerGroup) - 1) * pagesPerGroup + 1;
                if (currentPage === currentGroupFirstPage && currentPage > 1) {
                    currentPage = Math.max(1, currentGroupFirstPage - 1);
                } else {
                    currentPage--;
                }
                renderAll();
            }
        });
        nextButtonLi?.querySelector('a')?.addEventListener('click', function (e) {
            e.preventDefault();
            if (currentPage < totalPages) {
                const currentGroup = Math.ceil(currentPage / pagesPerGroup);
                const currentGroupLastPage = Math.min(currentGroup * pagesPerGroup, totalPages);
                if (currentPage === currentGroupLastPage && currentPage < totalPages) {
                    currentPage = Math.min(totalPages, currentGroupLastPage + 1);
                } else {
                    currentPage++;
                }
                renderAll();
            }
        });
        firstButtonLi?.querySelector('a')?.addEventListener('click', function (e) {
            e.preventDefault();
            if (currentPage !== 1) { currentPage = 1; renderAll(); }
        });
        lastButtonLi?.querySelector('a')?.addEventListener('click', function (e) {
            e.preventDefault();
            if (currentPage !== totalPages) { currentPage = totalPages; renderAll(); }
        });

        if (pageNumbersContainer && prevButtonLi && nextButtonLi && firstButtonLi && lastButtonLi) {
            renderAll();
        } else {
            // console.warn('One or more pagination control elements are missing for tablePagination.');
        }
    } else {
        // console.warn('Pagination container #tablePagination not found.');
    }
    // === 테이블형 페이지네이션 로직 끝 ===


    // ============================================================
    // === 카드형 페이지네이션 초기화 함수 정의 및 호출 ===
    // ============================================================
    function initializeCardPagination(containerId, totalPages, initialCurrentPage) {
        // console.log(`[${containerId}] Initializing card pagination...`);
        const container = document.getElementById(containerId);

        if (!container) {
            // console.error(`[${containerId}] Pagination container NOT FOUND!`);
            return;
        }

        const prevBtn = container.querySelector('.pagination-card-btn.prev');
        const nextBtn = container.querySelector('.pagination-card-btn.next');
        const pageInfoContainer = container.querySelector('.pagination-card-page-info');
        const currentPageSpan = pageInfoContainer?.querySelector('.current-page');
        const totalPagesIndicatorSpan = pageInfoContainer?.querySelector('.total-pages-indicator');

        if (!prevBtn) console.warn(`[${containerId}] Previous button (.pagination-card-btn.prev) NOT FOUND.`);
        if (!nextBtn) console.warn(`[${containerId}] Next button (.pagination-card-btn.next) NOT FOUND.`);
        if (!pageInfoContainer) console.warn(`[${containerId}] Page info container (.pagination-card-page-info) NOT FOUND.`);
        if (!currentPageSpan) console.warn(`[${containerId}] Current page span (.current-page) NOT FOUND.`);
        if (!totalPagesIndicatorSpan) console.warn(`[${containerId}] Total pages indicator span (.total-pages-indicator) NOT FOUND.`);

        let currentPage = initialCurrentPage;

        function updateUI() {
            // console.log(`[${containerId}] updateUI called. Current page: ${currentPage}`);

            if (currentPageSpan && totalPagesIndicatorSpan) {
                currentPageSpan.textContent = currentPage;
                totalPagesIndicatorSpan.textContent = ` / ${totalPages}`;
            } else {
                if (pageInfoContainer) {
                    pageInfoContainer.textContent = `${currentPage} / ${totalPages}`;
                    // console.warn(`[${containerId}] Using fallback for page info text because inner spans are missing.`);
                }
            }

            if (prevBtn) {
                prevBtn.disabled = (currentPage === 1);
            }
            if (nextBtn) {
                nextBtn.disabled = (currentPage === totalPages);
            }
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                // console.log(`[${containerId}] Previous button clicked.`);
                if (currentPage > 1) {
                    currentPage--;
                    updateUI();
                }
            });
            // console.log(`[${containerId}] Event listener ADDED for Previous button.`);
        } else {
            // console.warn(`[${containerId}] Event listener NOT ADDED for Previous button (button not found).`);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                // console.log(`[${containerId}] Next button clicked.`);
                if (currentPage < totalPages) {
                    currentPage++;
                    updateUI();
                }
            });
            // console.log(`[${containerId}] Event listener ADDED for Next button.`);
        } else {
            // console.warn(`[${containerId}] Event listener NOT ADDED for Next button (button not found).`);
        }
        
        if (pageInfoContainer && prevBtn && nextBtn) {
            updateUI();
            // console.log(`[${containerId}] Initial UI update complete.`);
        } else {
            // console.error(`[${containerId}] Essential elements for card pagination are missing. Full initialization failed.`);
        }
    }

    // 카드형 페이지네이션 호출
    initializeCardPagination('cardPagination', 15, 1);
    // === 카드형 페이지네이션 초기화 함수 정의 및 호출 끝 ===

}); // DOMContentLoaded 끝
