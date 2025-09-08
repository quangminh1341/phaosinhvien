// Dữ liệu hoa hồng giả định
const mockCommissionHistory = [
    // { usedBy: mockReferralUsages[10], productName: 'Fullstack - Web Bán Hàng', amount: 7500, date: '2025-07-25T16:25:00' },
    // { usedBy: mockReferralUsages[9], productName: 'Website Tĩnh - CV Cá Nhân', amount: 2500, date: '2025-07-28T13:00:00' },
    // { usedBy: mockReferralUsages[8], productName: 'Custom - App Quản Lý', amount: 15000, date: '2025-07-30T22:30:00' },
    // { usedBy: mockReferralUsages[3], productName: 'Website Tĩnh - Portfolio', amount: 3000, date: '2025-08-15T09:05:00' },
    // { usedBy: mockReferralUsages[1], productName: 'Fullstack - Blog cá nhân', amount: 6000, date: '2025-08-20T15:30:00' },
];

// --- BIẾN TOÀN CỤC CHO MODAL VÀ DASHBOARD ---
let authModalOverlay, authContainer, modalAnimation, openModal, animatedText;
let openPanelModal; 
let populateAndShowEditForm;


// --- CẤU HÌNH API ---
// ***** LƯU Ý: Đổi lại API_BASE_URL thành endpoint server của bạn khi deploy *****
const API_BASE_URL = '/api'; 
let currentUser = null;

// --- HÀM TRỢ GIÚP API ---
/**
 * Hàm đọc giá trị của một cookie cụ thể theo tên
 * @param {string} name - Tên của cookie cần lấy giá trị (ví dụ: 'accessToken').
 * @returns {string|null} - Giá trị của cookie hoặc null nếu không tìm thấy.
 */
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        return match[2];
    }
    return null;
}
async function apiRequest(endpoint, method = 'GET', body = null, token = null) {
    const headers = {};
    const authToken = token || getCookie('accessToken');
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    const config = {
        method,
        headers,
        credentials: 'include',
    };

    let url = `${API_BASE_URL}${endpoint}`;

    if (body) {
        if (method.toUpperCase() === 'GET') {
            const params = new URLSearchParams(body);
            url += `?${params.toString()}`;
        } 
        else {
            if (body instanceof FormData) {
                config.body = body;
            } else {
                headers['Content-Type'] = 'application/json';
                config.body = JSON.stringify(body);
            }
        }
    }
    
    try {
        const response = await fetch(url, config);
        
        const newAccessToken = response.headers.get('X-Access-Token');
        if (newAccessToken) {
            // Nếu server gửi token mới qua header, bạn có thể cân nhắc lưu nó vào cookie ở đây
            // document.cookie = `accessToken=${newAccessToken}; path=/; max-age=...`;
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(errorData.message || `Lỗi HTTP: ${response.status}`);
        }
        if (response.status === 200 && response.headers.get('content-length') === '0') {
            return null;
        }
        const responseData = await response.json();
        
        return responseData;

    } catch (error) {
        console.error(`Lỗi API tại ${endpoint}:`, error);
        throw error;
    }
}


// --- HÀM XÁC THỰC ---

/**
 * @description Điều hướng người dùng đến trang xác thực Google.
 * @param {'login' | 'register'} action - Hành động là 'login' hoặc 'register'.
 */
function handleGoogleRedirect(action) {
    localStorage.setItem('authAction', action);
    let googleAuthUrl = `${API_BASE_URL}/auth/google`;

    if (action === 'register') {
        const fullName = document.getElementById('register-username').value;
        const phoneNumber = document.getElementById('register-phone').value;
        if (!fullName || !phoneNumber) {
            alert('Vui lòng nhập đầy đủ Tên và Số điện thoại.');
            return;
        }
        const params = new URLSearchParams({
            full_name: fullName,
            phone_number: phoneNumber
        });
        googleAuthUrl += `?${params.toString()}`;
    }
    
    window.location.href = googleAuthUrl;
}

async function handleOAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const isExistParam = urlParams.get('isExist');
    const accessToken = urlParams.get('access_token');

    if (isExistParam === null && !accessToken) return;

    window.history.replaceState({}, document.title, window.location.pathname);

    try {
        const isExist = isExistParam === 'true';
        const authAction = localStorage.getItem('authAction');
        const closeModalBtn = document.querySelector('#auth-modal-overlay .auth-close-btn');

        if (accessToken) {
            const expiryDays = 30;
            document.cookie = `accessToken=${accessToken}; path=/; max-age=${expiryDays * 24 * 60 * 60}; SameSite=Strict; Secure`;
        }

        if (authAction === 'login') {
            if (isExist) {
                await fetchAndDisplayUserProfile();
                if (closeModalBtn) closeModalBtn.click();
            } else {
                const message = "Tài khoản Google này chưa tồn tại. Vui lòng đăng ký.";
                if (openModal) openModal(true, message, false); 
            }
        } else if (authAction === 'register') {           
                await fetchAndDisplayUserProfile();
                if (closeModalBtn) closeModalBtn.click();
        }
    } catch (error) {
        console.error('Lỗi xử lý callback OAuth:', error);
        alert('Đã có lỗi xảy ra trong quá trình xác thực.');
    } finally {
        localStorage.removeItem('authAction');
    }
}

/**
 * @description **LOGIC MỚI**: Lấy hồ sơ người dùng và quyết định trạng thái đăng nhập.
 * @returns {Promise<boolean>} - Trả về true nếu đăng nhập thành công (có token và hồ sơ đầy đủ), ngược lại trả về false.
 */
async function fetchAndDisplayUserProfile() {
    try {
        const response = await apiRequest('/users/me/profile');
        const userData = response.data;
        // console.log('Dữ liệu người dùng nhận được từ API:', userData);
        
        if (!userData || !userData.full_name || !userData.phone_number) {
            console.warn("Hồ sơ người dùng chưa hoàn chỉnh (thiếu tên hoặc SĐT). Yêu cầu cập nhật.");
            // Không hiển thị trạng thái đăng nhập và trả về false.
            return false;
        }
        
        // Nếu hồ sơ đầy đủ, cập nhật UI và trả về true.
        window.currentUser = userData;
        await showLoggedInState();
        return true;

    } catch (error) {
        console.error("Phiên đăng nhập không hợp lệ hoặc đã hết hạn.", error)
        handleLogout();
        return false;
    }
}

async function checkLoginStatus() {
       await fetchAndDisplayUserProfile();
}

async function handleLogout() {
    try {
        await apiRequest('/auth/logout', 'POST');
    } catch (error) {
        console.error("Lỗi khi đăng xuất trên server:", error);
    } finally {
        localStorage.clear();
        sessionStorage.clear();
        window.currentUser = null;
        showLoggedOutState();
    }
}


// --- CÁC HÀM CẬP NHẬT GIAO DIỆN ---

async function showLoggedInState(user) {
    const headerAuth = document.querySelector('.header-auth');
    const profileContainer = document.querySelector('.profile-container');
    const notificationContainer = document.querySelector('.notification-container');

    if (headerAuth && profileContainer && notificationContainer && user) {
        profileContainer.querySelector('.profile-name').textContent = window.currentUser.full_name || window.currentUser.email;
        profileContainer.querySelector('.profile-money').textContent = `Số dư: ${user.moneys?.toLocaleString('vi-VN') || 0} VNĐ`;
        
        const profileAvatar = profileContainer.querySelector('.profile-avatar');
        if (user.avatar_url) profileAvatar.src = user.avatar_url;

        headerAuth.style.display = 'none';
        profileContainer.style.display = 'block';
        notificationContainer.style.display = 'block';
        
        try {
            const notificationResponse = await apiRequest('/users/me/notifications', 'GET');
            const notifications = notificationResponse.data || []; 
            updateNotificationUI(notifications);
        } catch (error) {
            console.error("Lỗi khi tải thông báo:", error);
            updateNotificationUI([]); 
        }

        const panelUsername = document.querySelector('.panel-username');
        const panelAvatar = document.querySelector('.panel-avatar');
        if (panelUsername) panelUsername.textContent = user.full_name || user.email;
        if (panelAvatar) panelAvatar.src = user.avatar_url || 'images/logo.png';
        
        const adminOnlyElements = document.querySelectorAll('.admin-only');
        const displayStyle = (user.role === 'admin') ? 'block' : 'none';
        adminOnlyElements.forEach(el => {
            el.style.display = displayStyle;
        });
        
        populateProfilePanel(user);
    }
}

function showLoggedOutState() {
    const headerAuth = document.querySelector('.header-auth');
    const profileContainer = document.querySelector('.profile-container');
    const notificationContainer = document.querySelector('.notification-container');
    if (headerAuth && profileContainer && notificationContainer) {
        headerAuth.style.display = 'flex';
        profileContainer.style.display = 'none';
        notificationContainer.style.display = 'none';
    }
    document.querySelectorAll('.admin-only').forEach(el => {
        el.style.display = 'none';
    });
}


function updateContactLogo(theme) {
    const contactLogo = document.querySelector('.contact-info-card .contact-logo img');
    if (contactLogo) {
        if (theme === 'light') {
            contactLogo.src = 'images/logo-light.png';
        } else {
            contactLogo.src = 'images/logo.png';
        }
    }
}

function updateAuthModalColors(theme) {
    const root = document.documentElement;
    if (theme === 'light') {
        root.style.setProperty('--current-strip-1', 'var(--color-light-strip-1)');
        root.style.setProperty('--current-strip-2', 'var(--color-light-strip-2)');
    } else {
        root.style.setProperty('--current-strip-1', 'var(--color-dark-strip-1)');
        root.style.setProperty('--current-strip-2', 'var(--color-dark-strip-2)');
    }
}

function updateNotificationUI(notifications) {
    const notificationContainer = document.querySelector('.notification-container');
    if (!notificationContainer) return;
    const badge = notificationContainer.querySelector('.notification-badge');
    const list = notificationContainer.querySelector('.notification-list');
    const unreadCount = notifications.filter(n => !n.read).length;
    if (unreadCount > 0) {
        badge.style.display = 'flex';
        badge.textContent = unreadCount > 25 ? '25+' : unreadCount;
    } else {
        badge.style.display = 'none';
    }
    list.innerHTML = '';
    if (notifications.length > 0) {
        notifications.forEach(notif => {
            const item = document.createElement('li');
            item.classList.add('notification-item');
            item.innerHTML = `
                ${!notif.read ? '<div class="unread-dot"></div>' : '<div style="width: 8px; flex-shrink: 0;"></div>'}
                <div class="notification-item-content">
                    <p>${notif.message}</p>
                    <div class="timestamp">${notif.timestamp}</div>
                </div>
            `;
            list.appendChild(item);
        });
    } else {
        list.innerHTML = '<li class="notification-item"><p>Không có thông báo mới.</p></li>';
    }
}

async function renderOrders() {
    const orderListContainer = document.querySelector('.order-list');
    const searchInput = document.getElementById('order-search-input');
    const activeFilter = document.querySelector('.order-filters .filter-btn.active');

    if (!orderListContainer || !searchInput || !activeFilter) return;

    orderListContainer.innerHTML = '<p class="no-orders">Đang tải đơn hàng...</p>';

    const searchTerm = searchInput.value.trim().toLowerCase();
    const filterStatus = activeFilter.dataset.status;

    try {
        const params = {};
        if (searchTerm) {
            params.search = searchTerm;
        }

        const response = await apiRequest('/users/me/order-history', 'GET', params);
        const allOrders = response.data || [];
        let processedOrders = [];

        const statusMap = {
            'Chờ xác nhận': 'pending',
            'Tiến hành': 'inprogress',
            'Hoàn thành': 'completed',
        };

        if (filterStatus === 'Tất cả') {
            processedOrders = allOrders;
        } else if (filterStatus === 'Hết bảo hành') {
            const now = new Date();
            const thirtyDaysInMillis = 30 * 24 * 60 * 60 * 1000;
            processedOrders = allOrders.filter(order => {
                if (order.status.toLowerCase() !== 'completed') return false;
                const orderDate = new Date(order.created_at);
                return (now - orderDate) > thirtyDaysInMillis;
            });
        } else if (filterStatus === 'Đã hủy') {
            processedOrders = allOrders.filter(order =>
                ['canceled', 'rejected'].includes(order.status.toLowerCase())
            );
        } else {
            const apiStatusToFilter = statusMap[filterStatus];
            processedOrders = allOrders.filter(order => order.status.toLowerCase() === apiStatusToFilter);
        }

        if (processedOrders.length > 0) {
            orderListContainer.innerHTML = processedOrders.map(order => {
                let statusClass = '';
                const statusDisplayMap = {
                    'completed': 'Hoàn thành',
                    'canceled': 'Đã hủy',
                    'rejected': 'Từ Chối',
                    'inprogress': 'Tiến hành',
                    'pending': 'Chờ xác nhận'
                };
                const displayStatus = statusDisplayMap[order.status.toLowerCase()] || order.status;

                switch (order.status.toLowerCase()) {
                    case 'completed': statusClass = 'status-completed'; break;
                    case 'canceled':
                    case 'rejected':
                        statusClass = 'status-canceled';
                        break;
                    case 'inprogress': statusClass = 'status-inprogress'; break;
                    case 'pending': statusClass = 'status-pending'; break;
                }

                return `
                    <div class="order-item">
                        <div class="order-info">
                            <span class="order-id">#${order.order_code}</span>
                            <p class="order-product">${order.title}</p>
                            <span class="order-date">${new Date(order.created_at).toLocaleString('vi-VN')}</span>
                        </div>
                        <div class="order-details">
                            <span class="order-price">${Number(order.money_pay).toLocaleString('vi-VN')} VNĐ</span>
                            <span class="order-revisions">Sửa: ${order.edit_count}</span>
                            <span class="order-status ${statusClass}">${displayStatus}</span>
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            orderListContainer.innerHTML = '<p class="no-orders">Không tìm thấy đơn hàng nào.</p>';
        }
    } catch (error) {
        console.error("Lỗi khi tải lịch sử đơn hàng:", error);
        orderListContainer.innerHTML = '<p class="no-orders">Đã xảy ra lỗi khi tải dữ liệu đơn hàng.</p>';
    }
}

function populateProfilePanel(user) {
    if (!user) return;

    const avatarPreview = document.getElementById('profile-avatar-preview');
    const balanceSpan = document.getElementById('profile-balance');
    const commissionSpan = document.getElementById('profile-commission');

    if (avatarPreview) avatarPreview.src = user.avatar_url || 'images/logo.png';
    if(balanceSpan) balanceSpan.textContent = (user.moneys || 0).toLocaleString('vi-VN') + ' VNĐ';
    if(commissionSpan) commissionSpan.textContent = (user.moneys_commission || 0).toLocaleString('vi-VN') + ' VNĐ';

    const nameInput = document.getElementById('profile-name');
    const referralInput = document.getElementById('profile-referral-code');
    if (nameInput) nameInput.value = user.full_name || '';
    if (referralInput) referralInput.value = user.referral_code || '';

    const emailInput = document.getElementById('profile-email');
    if (emailInput) {
        emailInput.value = user.email || '';
    }

    const phoneInput = document.getElementById('profile-phone');
    const addPhoneBtn = document.getElementById('add-phone-btn');
    const phoneDisplayWrapper = document.getElementById('phone-display-wrapper');
    const phoneEditWrapper = document.getElementById('phone-edit-wrapper');
    const maskedPhoneInput = document.getElementById('profile-phone-masked');

    addPhoneBtn.style.display = 'none';
    phoneDisplayWrapper.style.display = 'none';
    phoneEditWrapper.style.display = 'none';
    phoneInput.style.display = 'none';

    if (user.phone_number) {
        phoneDisplayWrapper.style.display = 'flex';
        maskedPhoneInput.value = user.phone_number;
    } else {
        addPhoneBtn.style.display = 'inline-flex';
    }

    const genderRadio = document.querySelector(`input[name="gender"][value="${user.gender}"]`);
    if (genderRadio) genderRadio.checked = true;

    const daySelect = document.getElementById('dob-day');
    const monthSelect = document.getElementById('dob-month');
    const yearSelect = document.getElementById('dob-year');
    
    if (daySelect.innerHTML === "") {
        daySelect.innerHTML = '<option value="">Ngày</option>' + [...Array(31).keys()].map(i => `<option value="${i + 1}">${i + 1}</option>`).join('');
        monthSelect.innerHTML = '<option value="">Tháng</option>' + [...Array(12).keys()].map(i => `<option value="${i + 1}">${i + 1}</option>`).join('');
        const currentYear = new Date().getFullYear();
        yearSelect.innerHTML = '<option value="">Năm</option>' + [...Array(100).keys()].map(i => `<option value="${currentYear - i}">${currentYear - i}</option>`).join('');
    }

    if (user.birthday) {
        const dob = new Date(user.birthday);
        daySelect.value = dob.getUTCDate();
        monthSelect.value = dob.getUTCMonth() + 1;
        yearSelect.value = dob.getUTCFullYear();
    }
}


function populateMonthFilter() {
    const monthFilter = document.getElementById('month-filter');
    if (!monthFilter || monthFilter.options.length > 0) return;

    const months = [];
    const startDate = new Date('2025-07-01');
    const endDate = new Date();

    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        months.push({ month: month + 1, year });
        currentDate.setMonth(month + 1);
    }

    monthFilter.innerHTML = months.reverse().map(item => 
        `<option value="${item.year}-${item.month}">${item.month}/${item.year}</option>`
    ).join('');
}

function renderTransactions() {
    const transactionListContainer = document.querySelector('.transaction-list');
    const activeTypeFilter = document.querySelector('.payment-filters .filter-btn.active');
    const monthFilter = document.getElementById('month-filter');

    if (!transactionListContainer || !activeTypeFilter || !monthFilter.value) return;

    const filterType = activeTypeFilter.dataset.type;
    const [selectedYear, selectedMonth] = monthFilter.value.split('-').map(Number);
    
    const startDate = new Date(selectedYear, selectedMonth - 1, 1);
    const endDate = new Date(selectedYear, selectedMonth, 0, 23, 59, 59);

    let processedTransactions = mockTransactions;

    processedTransactions = processedTransactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate >= startDate && transactionDate <= endDate;
    });

    if (filterType !== 'all') {
        processedTransactions = processedTransactions.filter(t => t.type === filterType);
    }

    if (processedTransactions.length > 0) {
        transactionListContainer.innerHTML = processedTransactions.map(t => {
            if (t.type === 'deposit') {
                return `
                    <div class="transaction-item">
                        <div class="transaction-icon deposit"><i class="fas fa-arrow-down"></i></div>
                        <div class="transaction-info">
                            <p class="transaction-title">Nạp tiền vào tài khoản</p>
                            <span class="transaction-detail">Phương thức: ${t.method}</span>
                            <span class="transaction-date">${new Date(t.date).toLocaleString('vi-VN')}</span>
                        </div>
                        <div class="transaction-amount">
                            <span class="amount positive">+${t.amount.toLocaleString('vi-VN')} VNĐ</span>
                            <span class="ending-balance">Số dư: ${t.endingBalance.toLocaleString('vi-VN')} VNĐ</span>
                        </div>
                    </div>`;
            }
            if (t.type === 'withdrawal') {
                 return `
                    <div class="transaction-item">
                        <div class="transaction-icon withdrawal"><i class="fas fa-arrow-up"></i></div>
                        <div class="transaction-info">
                            <p class="transaction-title">Rút tiền hoa hồng</p>
                            <span class="transaction-date">${new Date(t.date).toLocaleString('vi-VN')}</span>
                        </div>
                        <div class="transaction-amount">
                            <span class="amount negative">-${t.amount.toLocaleString('vi-VN')} VNĐ</span>
                            <span class="ending-balance">Hoa hồng còn lại: ${t.endingCommissionBalance.toLocaleString('vi-VN')} VNĐ</span>
                        </div>
                    </div>`;
            }
            if (t.type === 'spent') {
                 return `
                    <div class="transaction-item">
                        <div class="transaction-icon spent"><i class="fas fa-shopping-cart"></i></div>
                        <div class="transaction-info">
                            <p class="transaction-title">Thanh toán đơn hàng</p>
                            <span class="transaction-detail">Sản phẩm: ${t.productName}</span>
                            <span class="transaction-date">${new Date(t.date).toLocaleString('vi-VN')}</span>
                        </div>
                        <div class="transaction-amount">
                            <span class="amount negative">-${t.amount.toLocaleString('vi-VN')} VNĐ</span>
                            <span class="ending-balance">Số dư: ${t.endingBalance.toLocaleString('vi-VN')} VNĐ</span>
                        </div>
                    </div>`;
            }
        }).join('');
    } else {
        transactionListContainer.innerHTML = '<p class="no-orders">Không có giao dịch nào trong tháng này.</p>';
    }
}

async function renderMarketingStats() {
    const activeFilterBtn = document.querySelector('.marketing-filters .filter-btn.active');
    if (!activeFilterBtn) return;
    const activeFilter = activeFilterBtn.dataset.type;

    document.getElementById('marketing-codes-used-view').style.display = 'none';
    document.getElementById('marketing-commission-view').style.display = 'none';

    try {
        const summaryData = await apiRequest('/users/me/marketing/commission', 'GET');

        const totalCommissionCard = document.getElementById('stat-total-commission');
        if (totalCommissionCard) {
            totalCommissionCard.textContent = (summaryData.total_moneys_commission || 0).toLocaleString('vi-VN') + ' VNĐ';
        }

        const levelEl = document.getElementById('stat-level');
        if (levelEl) levelEl.textContent = summaryData.level_name || '--';

        const codesUsedEl = document.getElementById('stat-codes-used');
        if (codesUsedEl) codesUsedEl.textContent = summaryData.referrals || 0;

    } catch (error) {
        console.error("Lỗi khi tải dữ liệu tóm tắt tiếp thị:", error);
        document.getElementById('stat-total-commission').textContent = 'Lỗi';
        document.getElementById('stat-level').textContent = 'Lỗi';
        document.getElementById('stat-codes-used').textContent = 'Lỗi';
    }

    if (activeFilter === 'codes-used') {
        renderCodesUsedView();
    } else if (activeFilter === 'commission') {
        await renderCommissionView();
    }
}

function renderCodesUsedView() {
    const view = document.getElementById('marketing-codes-used-view');
    view.style.display = 'block';

    const referralListContainer = view.querySelector('.referral-list');
    const referrals = mockReferralUsages;

    if (referrals.length > 0) {
        referralListContainer.innerHTML = referrals.map(ref => `
            <div class="referral-item">
                <div class="referral-user">
                    <span class="referral-name">${ref.usedByFullName}</span>
                    <span class="referral-gmail">${ref.usedByGmail}</span>
                </div>
                <span class="referral-date">${new Date(ref.dateUsed).toLocaleString('vi-VN')}</span>
            </div>
        `).join('');
    } else {
        referralListContainer.innerHTML = '<p class="no-orders">Chưa có ai sử dụng mã của bạn.</p>';
    }
}

async function renderCommissionView() {
    const view = document.getElementById('marketing-commission-view');
    view.style.display = 'block';

    const monthFilter = document.getElementById('commission-month-filter');
    const monthlyCommissionCard = document.getElementById('stat-monthly-commission');
    const commissionListContainer = view.querySelector('.commission-list');
    const monthlyLabel = document.getElementById('stat-monthly-label');

    if (monthFilter.options.length === 0) {
        const months = [];
        const startDate = new Date('2025-07-01');
        const endDate = new Date();
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            months.push({ month: currentDate.getMonth() + 1, year: currentDate.getFullYear() });
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
        monthFilter.innerHTML = months.reverse().map(item =>
            `<option value="${item.year}-${item.month}">${item.month}/${item.year}</option>`
        ).join('');
    }
    
    if (!monthFilter.value) {
        commissionListContainer.innerHTML = '<p class="no-orders">Vui lòng chọn một tháng để xem.</p>';
        return;
    }

    const [selectedYear, selectedMonth] = monthFilter.value.split('-').map(Number);
    if (monthlyLabel) {
        monthlyLabel.textContent = `Đã nhận trong tháng ${selectedMonth}`;
    }
    
    try {
        const payload = {
            year: selectedYear,
            month: selectedMonth,
            page: 1,
            limit: 50
        };
        const monthlyData = await apiRequest('/users/me/marketing/commission', 'GET', payload);

        const history = monthlyData.history || [];
        
        const monthlyTotal = history.reduce((sum, item) => sum + item.money_commission, 0);
        if (monthlyCommissionCard) {
            monthlyCommissionCard.textContent = monthlyTotal.toLocaleString('vi-VN') + ' VNĐ';
        }

        if (history.length > 0) {
            commissionListContainer.innerHTML = history.map(c => `
                <div class="commission-item">
                    <div class="commission-user-product">
                        <div class="commission-user">
                            <span class="commission-name">${c.full_name}</span>
                            <span class="commission-gmail">${c.email}</span>
                        </div>
                        <div class="commission-product">
                            <i class="fas fa-box-open"></i>
                            <span>${c.product_title}</span>
                        </div>
                    </div>
                    <div class="commission-details">
                        <span class="commission-amount">+${c.money_commission.toLocaleString('vi-VN')} VNĐ</span>
                        <span class="commission-date">${new Date(c.created_at).toLocaleString('vi-VN')}</span>
                    </div>
                </div>
            `).join('');
        } else {
            commissionListContainer.innerHTML = '<p class="no-orders">Không có hoa hồng nào trong tháng này.</p>';
        }

    } catch (error) {
        console.error("Lỗi khi tải lịch sử hoa hồng:", error);
        commissionListContainer.innerHTML = '<p class="no-orders">Đã xảy ra lỗi khi tải dữ liệu.</p>';
        if (monthlyCommissionCard) monthlyCommissionCard.textContent = '0 VNĐ';
    }
}


// --- HÀM KHỞI TẠO CHÍNH ---
function initializeHeader() {
    const navToggle = document.querySelector('.nav-toggle');
    const siteNav = document.querySelector('.site-nav');
    if (navToggle && siteNav) {
        navToggle.addEventListener('click', () => {
            siteNav.classList.toggle('nav-open');
            navToggle.classList.toggle('nav-open');
        });
    }

    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        updateContactLogo('light');
        updateAuthModalColors('light');
    } else {
        document.body.classList.remove('light-mode');
        updateContactLogo('dark');
        updateAuthModalColors('dark');
    }
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            let theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
            updateContactLogo(theme);
            updateAuthModalColors(theme);
        });
    }

    authModalOverlay = document.getElementById('auth-modal-overlay');
    if (authModalOverlay) {
        authContainer = document.getElementById('auth-container');
        
        const openLoginButtons = document.querySelectorAll('.login-btn, .login-btn-mobile');
        const openRegisterButtons = document.querySelectorAll('.register-btn, .register-btn-mobile');

        const closeModalBtn = authModalOverlay.querySelector('.auth-close-btn');
        const goSignUpLink = document.getElementById('goSignUp');
        const goSignInLink = document.getElementById('goSignIn');
        
        const registerForm = document.getElementById('register-form');
        const registerStep1 = document.getElementById('register-step-1');
        const googleRegisterBtn = document.getElementById('google-register-btn');
        
        const resetRegisterForm = () => {
            if (registerStep1 && googleRegisterBtn) {
                registerStep1.style.display = 'flex';
                googleRegisterBtn.style.display = 'none';
                if(registerForm) registerForm.reset();
            }
        };

        if (authContainer) {
            animatedText = new SplitType('.auth-container h1, .auth-container p', { types: 'lines, chars' });
            modalAnimation = gsap.timeline({
                paused: true,
                onReverseComplete: () => {
                    authModalOverlay.classList.remove('visible');
                    gsap.set('.auth-container h1, .auth-container p', { visibility: 'hidden' });
                }
            });
            modalAnimation
                .from(authContainer, { y: 50, opacity: 0, duration: 0.5, ease: "power2.out" })
                .set('.auth-container h1, .auth-container p', { visibility: 'visible' })
                .from(animatedText.chars, { yPercent: 115, stagger: 0.02, duration: 0.6, ease: "power2.out" }, "-=0.3")
                .from('.form-container input, .auth-button', { opacity: 0, y: 20, stagger: 0.02, duration: 0.4, ease: "power2.out" }, "-=0.5");
            
            openModal = (showRegister, message = '', useAnimation = true) => {
                document.querySelectorAll('.auth-notification').forEach(el => {
                    el.textContent = '';
                    el.style.visibility = 'hidden';
                });

                authContainer.classList.toggle('right-panel-active', showRegister);
                authModalOverlay.classList.add('visible');

                if (useAnimation) {
                    modalAnimation.restart();
                } else {
                    gsap.set(authContainer, { y: 0, opacity: 1 });
                    gsap.set('.auth-container h1, .auth-container p', { visibility: 'visible' });
                    gsap.set(animatedText.chars, { yPercent: 0 });
                    gsap.set('.form-container input, .auth-button', { opacity: 1, y: 0 });
                }

                if (message) {
                    const targetId = showRegister ? '#auth-notification-signup' : '#auth-notification-signin';
                    const notifEl = document.querySelector(targetId);
                    if (notifEl) {
                        notifEl.textContent = message;
                        notifEl.style.visibility = 'visible';
                    }
                }
            };

            const closeModal = () => {
                modalAnimation.timeScale(3.5).reverse();
                setTimeout(resetRegisterForm, 600);
            };

            openLoginButtons.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openModal(false); }));
            openRegisterButtons.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openModal(true); }));
            
            if (goSignUpLink) {
                goSignUpLink.addEventListener('click', (e) => { 
                    e.preventDefault(); 
                    
                    const notifEl = document.getElementById('auth-notification-signup');
                    if (notifEl) {
                        notifEl.textContent = '';
                        notifEl.style.visibility = 'hidden';
                    }

                    authContainer.classList.add('right-panel-active');
                    resetRegisterForm();
                });
            }
            if (goSignInLink) {
                goSignInLink.addEventListener('click', (e) => { 
                    e.preventDefault(); 
                    authContainer.classList.remove('right-panel-active'); 
                });
            }
            if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
            authModalOverlay.addEventListener('click', (e) => { if (e.target === authModalOverlay) closeModal(); });

            if(registerForm && registerStep1 && googleRegisterBtn) {
                registerForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    if(registerForm.checkValidity()) {
                        registerStep1.style.display = 'none';
                        googleRegisterBtn.style.display = 'flex';
                    }
                });
            }

            const googleLoginBtn = document.querySelector('.sign-in-container .google-btn');
            if(googleLoginBtn) {
                googleLoginBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    handleGoogleRedirect('login');
                });
            }
            if(googleRegisterBtn) {
                googleRegisterBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    handleGoogleRedirect('register');
                });
            }
        }
    }

    const profileContainer = document.querySelector('.profile-container');
    if (profileContainer) {
        const profileButton = profileContainer.querySelector('.user-profile-button');
        const profileDropdown = profileContainer.querySelector('.profile-dropdown');
        const logoutButton = profileContainer.querySelector('.logout-btn');

        profileButton.addEventListener('click', () => {
            profileButton.classList.toggle('active');
            profileDropdown.classList.toggle('active');
        });

        window.addEventListener('click', (e) => {
            if (!profileContainer.contains(e.target)) {
                profileButton.classList.remove('active');
                profileDropdown.classList.remove('active');
            }
        });

        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            handleLogout();
        });
    }

    const notificationContainer = document.querySelector('.notification-container');
    if (notificationContainer) {
        const bellButton = notificationContainer.querySelector('.notification-bell-btn');
        const notificationDropdown = notificationContainer.querySelector('.notification-dropdown');

        bellButton.addEventListener('click', () => {
            notificationDropdown.classList.toggle('active');
        });

        window.addEventListener('click', (e) => {
            if (!notificationContainer.contains(e.target)) {
                notificationDropdown.classList.remove('active');
            }
        });
    }
    
    const userPanelModal = document.getElementById('user-panel-modal');
    if (userPanelModal) {
        const profileInfoBtn = document.getElementById('profile-info-btn');
        const profileOrdersBtn = document.getElementById('profile-orders-btn');
        const profilePaymentsBtn = document.getElementById('profile-payments-btn');
        const profileDashboardBtn = document.getElementById('profile-dashboard-btn');
        const closePanelBtn = userPanelModal.querySelector('.user-panel-close-btn');
        const panelSidebarNav = userPanelModal.querySelector('.user-panel-nav');
        
        const showPanel = async (targetId) => {
            const protectedPanels = [
                'panel-profile', 'panel-orders', 'panel-payments', 
                'panel-marketing', 'panel-dashboard', 'panel-admin-orders', 
                'panel-admin-notifications', 'panel-admin-codes'
            ];

            if (protectedPanels.includes(targetId) && !currentUser) {
                openModal(false, 'Vui lòng đăng nhập để truy cập chức năng này.');
                return;
            }

            const isAdminPanel = targetId.startsWith('panel-admin-') || targetId === 'panel-dashboard';
            if (isAdminPanel && (!currentUser || currentUser.role !== 'admin')) {
                alert('Bạn không có quyền truy cập chức năng này.');
                return;
            }
            
            userPanelModal.querySelectorAll('.panel-content-item').forEach(p => p.classList.remove('active'));
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) targetPanel.classList.add('active');

            userPanelModal.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            const targetLink = userPanelModal.querySelector(`.nav-link[data-target="${targetId}"]`);
            
            if (targetLink) {
                targetLink.classList.add('active');
                
                const parentCollapsible = targetLink.closest('.is-collapsible');
                
                userPanelModal.querySelectorAll('.is-collapsible').forEach(menu => {
                    if (menu !== parentCollapsible) {
                        menu.classList.remove('active');
                    }
                });

                if (parentCollapsible) {
                    parentCollapsible.classList.add('active');
                }
            }
            
            if (targetId === 'panel-orders') await renderOrders();
            if (targetId === 'panel-payments') {
                populateMonthFilter();
                renderTransactions();
            }
            if (targetId === 'panel-marketing') await renderMarketingStats();
            if (targetId === 'panel-admin-orders') {
                const projectFilters = document.querySelector('.admin-project-filters');
                if(projectFilters.querySelector('.active')) {
                     renderAdminOrders();
                }
            }
        };
        
        openPanelModal = (initialPanelId) => {
            userPanelModal.classList.add('visible');
            showPanel(initialPanelId || 'panel-profile');
        };
        
        const closePanelModal = () => userPanelModal.classList.remove('visible');

        if (profileInfoBtn) profileInfoBtn.addEventListener('click', (e) => { e.preventDefault(); openPanelModal('panel-profile'); });
        if (profileOrdersBtn) profileOrdersBtn.addEventListener('click', (e) => { e.preventDefault(); openPanelModal('panel-orders'); });
        if (profilePaymentsBtn) profilePaymentsBtn.addEventListener('click', (e) => { e.preventDefault(); openPanelModal('panel-payments'); });
        if (profileDashboardBtn) profileDashboardBtn.addEventListener('click', (e) => { e.preventDefault(); openPanelModal('panel-dashboard'); });

        if (panelSidebarNav) {
            panelSidebarNav.addEventListener('click', (e) => {
                const link = e.target.closest('a');
                if (!link) return;
                
                e.preventDefault();
                
                if (link.classList.contains('nav-category-toggle')) {
                    const parentCategory = link.closest('.is-collapsible');
                    if (parentCategory) {
                        parentCategory.classList.toggle('active');
                    }
                } 
                else if (link.dataset.target) {
                    showPanel(link.dataset.target);
                }
            });
        }
    
        closePanelBtn.addEventListener('click', closePanelModal);
        userPanelModal.addEventListener('click', (e) => { if (e.target === userPanelModal) closePanelModal(); });
        
        populateAndShowEditForm = (productData) => {
            openPanelModal('panel-dashboard');

            setTimeout(() => {
                const category = productData.category;
                let tabId, type, suffix, lowerType;

                if (category === 'Website HTML') {
                    tabId = 'website-html-panel';
                    type = 'Html';
                    suffix = '';
                    lowerType = 'html';
                } else if (category === 'Fullstack') {
                    tabId = 'fullstack-panel';
                    type = 'Fullstack';
                    suffix = '-fullstack';
                    lowerType = 'fullstack';
                } else {
                    alert(`Chức năng sửa cho danh mục "${category}" chưa được hỗ trợ.`);
                    return;
                }

                document.querySelector('.dashboard-filters .filter-btn.active').classList.remove('active');
                document.querySelector(`.dashboard-filters .filter-btn[data-target="${tabId}"]`).classList.add('active');

                document.querySelectorAll('.dashboard-tab-content.active').forEach(t => t.classList.remove('active'));
                document.getElementById(tabId).classList.add('active');
                
                const modeToggle = document.getElementById(`mode-toggle-${lowerType}`);
                if (modeToggle.checked) {
                    modeToggle.checked = false;
                    const changeEvent = new Event('change');
                    modeToggle.dispatchEvent(changeEvent);
                }

                const editFormWrapper = document.getElementById(`edit-form-wrapper${suffix}`);
                editFormWrapper.dataset.productId = productData.id;
                editFormWrapper._originalData = productData; // Lưu dữ liệu gốc
                
                document.getElementById(`edit-title${suffix}`).value = productData.title || '';
                document.getElementById(`edit-cost${suffix}`).value = productData.cost || '';
                document.getElementById(`edit-about${suffix}`).value = productData.about || '';
                document.getElementById(`edit-feature${suffix}`).value = productData.feature || '';
                document.getElementById(`edit-parameter${suffix}`).value = productData.parameter || '';
                document.getElementById(`edit-demo-link${suffix}`).value = productData.demo_link || '';
                
                const fileStoreKey = `edit${type}`;
                managedFiles[fileStoreKey] = [];
                renderImagePreviews(fileStoreKey, productData.imageGallery || []);
                
                editFormWrapper.style.display = 'block';

            }, 150);
        };

        const copyReferralBtn = document.getElementById('copy-referral-btn');
        const referralCodeInput = document.getElementById('profile-referral-code');

        copyReferralBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(referralCodeInput.value).then(() => {
                const originalIcon = copyReferralBtn.innerHTML;
                copyReferralBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyReferralBtn.innerHTML = originalIcon;
                }, 1500);
            }).catch(err => {
                console.error('Không thể sao chép: ', err);
            });
        });
        
        const orderFilters = document.querySelector('.order-filters');
        const searchInput = document.getElementById('order-search-input');

        if (orderFilters) {
            orderFilters.addEventListener('click', (e) => {
                if (e.target.classList.contains('filter-btn')) {
                    orderFilters.querySelector('.active').classList.remove('active');
                    e.target.classList.add('active');
                    renderOrders();
                }
            });
        }
        if (searchInput) {
            searchInput.addEventListener('input', renderOrders);
        }

        const paymentFilters = document.querySelector('.payment-filters');
        const monthFilter = document.getElementById('month-filter');

        if(paymentFilters) {
            paymentFilters.addEventListener('click', e => {
                if (e.target.classList.contains('filter-btn')) {
                    paymentFilters.querySelector('.active').classList.remove('active');
                    e.target.classList.add('active');
                    renderTransactions();
                }
            });
        }
        if(monthFilter) {
            monthFilter.addEventListener('change', renderTransactions);
        }
        
        const marketingFilters = document.querySelector('.marketing-filters');
        const commissionMonthFilter = document.getElementById('commission-month-filter');

        if (marketingFilters) {
            marketingFilters.addEventListener('click', async (e) => {
                if (e.target.classList.contains('filter-btn')) {
                    marketingFilters.querySelector('.active').classList.remove('active');
                    e.target.classList.add('active');
                    await renderMarketingStats();
                }
            });
        }
        if (commissionMonthFilter) {
            commissionMonthFilter.addEventListener('change', async () => {
                await renderCommissionView();
            });
        }
        
        const chatIcon = document.getElementById('chat-icon');
        const chatBox = document.getElementById('chat-box');
        const chatCloseBtn = document.getElementById('chat-close');
        const chatInput = document.getElementById('chat-input');
        const chatSendBtn = document.getElementById('chat-send-btn');
        const chatBody = document.querySelector('.chat-body');

        if (chatIcon && chatBox && chatCloseBtn) {
            chatIcon.addEventListener('click', () => chatBox.classList.toggle('hidden'));
            chatCloseBtn.addEventListener('click', () => chatBox.classList.add('hidden'));
            window.addEventListener('click', (e) => {
                if (!chatBox.contains(e.target) && !chatIcon.contains(e.target)) {
                    chatBox.classList.add('hidden');
                }
            });
        }
        
        const sendMessage = () => {
            const messageText = chatInput.value.trim();
            if (messageText === "") return;
            const userMessage = document.createElement('div');
            userMessage.classList.add('chat-message', 'message-user');
            userMessage.textContent = messageText;
            chatBody.appendChild(userMessage);
            chatBody.scrollTop = chatBody.scrollHeight;
            chatInput.value = '';
            setTimeout(() => {
                const systemMessage = document.createElement('div');
                systemMessage.classList.add('chat-message', 'message-system');
                systemMessage.textContent = 'Chúng tôi đã nhận được tin nhắn của bạn. Vui lòng chờ trong giây lát!';
                chatBody.appendChild(systemMessage);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);
        }
        if(chatSendBtn) {
            chatSendBtn.addEventListener('click', sendMessage);
        }
        if(chatInput){
            chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
        }

        const bankList = [
            "Agribank", "GPBank", "Oceanbank", "CB Bank", "Vietcombank", "BIDV", "VietinBank",
            "Techcombank", "MBBank", "VPBank", "ACB", "SHB", "HDBank", "VIB", "SeABank",
            "TPBank", "MSB", "OCB", "Eximbank", "Sacombank", "Nam A Bank", "NCB", "ABBank",
            "Bac A Bank", "PVcomBank", "VietBank", "KienlongBank", "PGBank", "LienVietPostBank",
            "Saigonbank", "DongA Bank", "BaoViet Bank", "Indovina Bank (IVB)",
            "Ngân hàng Liên doanh Việt - Nga (VRB)", "Ngân hàng Chính sách Xã hội (VBSP)",
            "Ngân hàng Phát triển Việt Nam (VDB)", "Ngân hàng Hợp tác xã Việt Nam (Co-opBank)",
            "Shinhan Bank Vietnam", "HSBC Vietnam", "Standard Chartered Vietnam", "Woori Bank Vietnam",
            "CIMB Bank Vietnam", "Public Bank Vietnam", "Hong Leong Bank Vietnam", "UOB Vietnam",
            "Citibank Vietnam"
        ];

        const openBankLinkModalBtn = document.getElementById('open-bank-link-modal-btn');
        const openMomoLinkModalBtn = document.getElementById('open-momo-link-modal-btn');
        const openZaloPayLinkModalBtn = document.getElementById('open-zalopay-link-modal-btn');

        const bankLinkModal = document.getElementById('bank-link-modal');
        const momoLinkModal = document.getElementById('momo-link-modal');
        const zaloPayLinkModal = document.getElementById('zalopay-link-modal');

        const allPaymentModals = [bankLinkModal, momoLinkModal, zaloPayLinkModal];

        const openPaymentModal = (modal) => {
            if (modal) modal.classList.add('visible');
        };

        const closePaymentModal = (modal) => {
            if (modal) modal.classList.remove('visible');
        };

        const bankSelect = document.getElementById('bank-select');
        if (bankSelect) {
            bankSelect.innerHTML = '<option value="" disabled selected>Chọn ngân hàng của bạn</option>' +
                                   bankList.map(bank => `<option value="${bank}">${bank}</option>`).join('');
        }

        if (openBankLinkModalBtn) openBankLinkModalBtn.addEventListener('click', () => openPaymentModal(bankLinkModal));
        if (openMomoLinkModalBtn) openMomoLinkModalBtn.addEventListener('click', () => openPaymentModal(momoLinkModal));
        if (openZaloPayLinkModalBtn) openZaloPayLinkModalBtn.addEventListener('click', () => openPaymentModal(zaloPayLinkModal));

        allPaymentModals.forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        closePaymentModal(modal);
                    }
                });
                const closeBtn = modal.querySelector('.close-modal-btn');
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => closePaymentModal(modal));
                }
                const form = modal.querySelector('form');
                if (form) {
                    form.addEventListener('submit', (e) => {
                        e.preventDefault();
                        alert('Chức năng đang được phát triển!');
                        closePaymentModal(modal);
                    });
                }
            }
        });
        
        const profileForm = document.getElementById('profile-form');
        const changePhoneBtn = document.getElementById('change-phone-btn');
        const confirmPhoneChangeBtn = document.getElementById('confirm-phone-change-btn');
        const phoneDisplayWrapper = document.getElementById('phone-display-wrapper');
        const phoneEditWrapper = document.getElementById('phone-edit-wrapper');
        const avatarUploadInput = document.getElementById('avatar-upload');
        const avatarPreview = document.getElementById('profile-avatar-preview');
        const mainPhoneLabel = document.getElementById('main-phone-label');

        if (avatarUploadInput && avatarPreview) {
            avatarUploadInput.addEventListener('change', () => {
                const file = avatarUploadInput.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        avatarPreview.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        if (profileForm) {
            profileForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData();
                let hasChanges = false;

                const newFullName = document.getElementById('profile-name').value;
                if (newFullName !== currentUser.full_name) {
                    formData.append('full_name', newFullName);
                    hasChanges = true;
                }

                const selectedGender = document.querySelector('input[name="gender"]:checked');
                const newGender = selectedGender ? selectedGender.value : null;
                if (newGender && newGender !== currentUser.gender) {
                    formData.append('gender', newGender);
                    hasChanges = true;
                }

                const day = document.getElementById('dob-day').value;
                const month = document.getElementById('dob-month').value;
                const year = document.getElementById('dob-year').value;
                if (day && month && year) {
                    const newBirthday = new Date(Date.UTC(year, month - 1, day));
                    const currentBirthday = currentUser.birthday ? new Date(currentUser.birthday) : null;
                    if (!currentBirthday || newBirthday.getTime() !== currentBirthday.getTime()) {
                         formData.append('birthday', newBirthday.toISOString());
                         hasChanges = true;
                    }
                }
                
                const avatarFile = document.getElementById('avatar-upload').files[0];
                if (avatarFile) {
                    formData.append('avatar', avatarFile);
                    hasChanges = true;
                }

                if (!hasChanges) {
                    alert('Không có thay đổi nào để lưu.');
                    return;
                }

                try {
                    const response = await apiRequest('/users/me/profile', 'PATCH', formData);
                    if (response.message === "Updated successfully") {
                        alert("Cập nhật hồ sơ thành công!");
                        await fetchAndDisplayUserProfile();
                    }
                } catch (error) {
                    alert(`Lỗi cập nhật hồ sơ: ${error.message}`);
                }
            });
        }

        if (changePhoneBtn) {
            changePhoneBtn.addEventListener('click', () => {
                if(mainPhoneLabel) mainPhoneLabel.style.display = 'none';
                phoneDisplayWrapper.style.display = 'none';
                phoneEditWrapper.style.display = 'block';
            });
        }

        if (confirmPhoneChangeBtn) {
            confirmPhoneChangeBtn.addEventListener('click', async () => {
                const oldPhone = document.getElementById('profile-phone-old').value;
                const newPhone = document.getElementById('profile-phone-new').value;

                if (!oldPhone || !newPhone) {
                    alert('Vui lòng nhập cả số điện thoại cũ và mới.');
                    return;
                }

                const phoneRegex = /^0\d{9}$/;
                if (!phoneRegex.test(newPhone)) {
                    alert("Số điện thoại mới không hợp lệ. Vui lòng nhập SĐT bắt đầu bằng 0 và có 10 chữ số.");
                    return;
                }

                try {
                    const payload = {
                        phone_number_old: oldPhone,
                        phone_number_new: newPhone
                    };
                    const response = await apiRequest('/users/me/profile', 'PATCH', payload);

                    if (response.message === "Updated successfully") {
                        alert('Cập nhật số điện thoại thành công!');
                        
                        await fetchAndDisplayUserProfile();
                        
                        document.getElementById('profile-phone-old').value = '';
                        document.getElementById('profile-phone-new').value = '';
                        phoneEditWrapper.style.display = 'none';
                        phoneDisplayWrapper.style.display = 'flex';
                        if(mainPhoneLabel) mainPhoneLabel.style.display = 'block';
                    }
                } catch (error) {
                    if (error.message && error.message.toLowerCase().includes('old phone number does not match')) {
                        alert('Số điện thoại cũ không khớp.');
                    } else {
                        alert(`Lỗi cập nhật số điện thoại: ${error.message}`);
                    }
                }
            });
        }
        
        let managedFiles = {
            addHtml: [],
            editHtml: [],
            addFullstack: [],
            editFullstack: []
        };

        const dashboardFilters = document.querySelector('.dashboard-filters');
        const dashboardTabs = document.querySelectorAll('.dashboard-tab-content');

        if (dashboardFilters) {
            dashboardFilters.addEventListener('click', (e) => {
                if (e.target.classList.contains('filter-btn')) {
                    dashboardFilters.querySelector('.active').classList.remove('active');
                    e.target.classList.add('active');
                    const targetId = e.target.dataset.target;
                    dashboardTabs.forEach(tab => {
                        tab.classList.remove('active');
                        if (tab.id === targetId) {
                            tab.classList.add('active');
                        }
                    });
                }
            });
        }

        const renderImagePreviews = (fileStoreKey, existingImages = []) => {
            let previewContainerId;
            if (fileStoreKey === 'addHtml') previewContainerId = '#add-image-previews';
            else if (fileStoreKey === 'editHtml') previewContainerId = '#edit-image-previews';
            else if (fileStoreKey === 'addFullstack') previewContainerId = '#add-image-previews-fullstack';
            else if (fileStoreKey === 'editFullstack') previewContainerId = '#edit-image-previews-fullstack';
            else return;
        
            const previewContainer = document.querySelector(previewContainerId);
            if (!previewContainer) return;
        
            previewContainer.innerHTML = '';
        
            // START: MODIFICATION FOR IMAGE DELETION
            existingImages.forEach((img, index) => {
                const isMain = index === 0;
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item existing-image';
                if (isMain) previewItem.classList.add('main-image');
                previewItem.dataset.imageId = img.id;
        
                previewItem.innerHTML = `
                    <img src="${img.image_url}" alt="Existing Preview">
                    <div class="caption">${isMain ? 'Ảnh chính' : `Ảnh ${index + 1}`}</div>
                    <button type="button" class="remove-preview-btn">&times;</button>
                `;
        
                previewItem.querySelector('.remove-preview-btn').onclick = async () => {
                    const formWrapper = previewContainer.closest('[id^="edit-form-wrapper"]');
                    const productId = formWrapper.dataset.productId;
                    const imageId = previewItem.dataset.imageId;
                    
                    if (!productId || !imageId) {
                        alert("Lỗi: Không tìm thấy ID sản phẩm hoặc ID ảnh.");
                        return;
                    }

                    if (!confirm("Bạn có chắc chắn muốn xóa ảnh này không?")) {
                        return;
                    }

                    try {
                        const response = await apiRequest(`/products/${productId}/images/${imageId}`, 'DELETE');
                        if (response && response.message === "Deleted successfully") {
                            previewItem.remove();
                            // Also remove from the local state to prevent it from being re-rendered
                            const originalData = formWrapper._originalData;
                            if (originalData && originalData.imageGallery) {
                                originalData.imageGallery = originalData.imageGallery.filter(i => i.id !== imageId);
                            }
                            alert("Đã xóa ảnh thành công.");
                        } else {
                            throw new Error("Phản hồi xóa từ server không thành công.");
                        }
                    } catch (error) {
                        console.error(`Lỗi khi xóa ảnh ${imageId}:`, error);
                        alert(`Không thể xóa ảnh: ${error.message}`);
                    }
                };
                previewContainer.appendChild(previewItem);
            });
            // END: MODIFICATION FOR IMAGE DELETION
        
            const newFiles = managedFiles[fileStoreKey] || [];
            const sortedFiles = [...newFiles].sort((a, b) => {
                const nameA = a.name.split('.')[0];
                const nameB = b.name.split('.')[0];
                if (nameA === '1') return -1;
                if (nameB === '1') return 1;
                return a.name.localeCompare(b.name, undefined, { numeric: true });
            });
        
            sortedFiles.forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const isMain = file.name.split('.')[0] === '1';
                    const previewItem = document.createElement('div');
                    previewItem.className = 'preview-item new-file';
                    if (isMain) previewItem.classList.add('main-image');
        
                    previewItem.innerHTML = `
                        <img src="${e.target.result}" alt="New Preview">
                        <div class="caption">${isMain ? 'Ảnh chính (Mới)' : 'Ảnh phụ (Mới)'}</div>
                        <button type="button" class="remove-preview-btn">&times;</button>
                    `;
                    previewItem.querySelector('.remove-preview-btn').onclick = () => {
                        managedFiles[fileStoreKey] = managedFiles[fileStoreKey].filter(f => f.name !== file.name);
                        renderImagePreviews(fileStoreKey, existingImages);
                    };
                    previewContainer.appendChild(previewItem);
                };
                reader.readAsDataURL(file);
            });
            
            const addPlaceholder = document.createElement('div');
            addPlaceholder.className = 'add-image-placeholder';
            addPlaceholder.innerHTML = `+<input type="file" accept="image/*" multiple />`;
            const fileInput = addPlaceholder.querySelector('input');
            addPlaceholder.onclick = () => fileInput.click();
        
            fileInput.onchange = (event) => {
                handleFileSelection(event.target.files, fileStoreKey, false);
                renderImagePreviews(fileStoreKey, existingImages);
                // START: MODIFICATION - FIX DOUBLE IMAGE BUG
                event.target.value = ''; // Reset input to allow re-selecting the same file
                // END: MODIFICATION
            };
            previewContainer.appendChild(addPlaceholder);
        };


        const handleFileSelection = (files, fileStoreKey, folderMode = false) => {
            const newFiles = Array.from(files);
            const existingFileNames = managedFiles[fileStoreKey].map(f => f.name);
            
            let uniqueNewFiles;

            if (folderMode) {
                uniqueNewFiles = newFiles.filter(f =>
                    f.name.toLowerCase().endsWith('.webp') && !existingFileNames.includes(f.name)
                );
                if (newFiles.length > 0 && uniqueNewFiles.length === 0) {
                    alert('Thư mục đã chọn không chứa file ảnh .webp nào.');
                }
            } else {
                uniqueNewFiles = newFiles.filter(f =>
                    f.type.startsWith('image/') && !existingFileNames.includes(f.name)
                );
            }

            if (uniqueNewFiles.length > 0) {
                managedFiles[fileStoreKey].push(...uniqueNewFiles);
            }
        };

        const initializeDashboardTab = (type) => {
            const lowerType = type.toLowerCase();
            const suffix = type === 'Html' ? '' : `-${lowerType}`;
            const addFileStoreKey = `add${type}`;
            const editFileStoreKey = `edit${type}`;

            const modeToggle = document.getElementById(`mode-toggle-${lowerType}`);
            if (modeToggle) {
                modeToggle.addEventListener('change', (e) => {
                    const addContainer = document.getElementById(`add-product-container${suffix}`);
                    const editContainer = document.getElementById(`edit-product-container${suffix}`);
                    const toggleLabels = modeToggle.closest('.mode-toggle-container').querySelectorAll('.toggle-label');

                    if (e.target.checked) {
                        addContainer.classList.add('active');
                        editContainer.classList.remove('active');
                        toggleLabels[0].classList.remove('active');
                        toggleLabels[1].classList.add('active');
                    } else {
                        addContainer.classList.remove('active');
                        editContainer.classList.add('active');
                        toggleLabels[0].classList.add('active');
                        toggleLabels[1].classList.remove('active');
                    }
                });
            }

            const addFolderInput = document.getElementById(`add-images${suffix}`);
            if (addFolderInput) {
                addFolderInput.addEventListener('change', (event) => {
                    handleFileSelection(event.target.files, addFileStoreKey, true);
                    renderImagePreviews(addFileStoreKey, []);
                    event.target.value = '';
                });
            }

            const editFolderInput = document.getElementById(`edit-images${suffix}`);
            if (editFolderInput) {
                editFolderInput.addEventListener('change', (event) => {
                    const formWrapper = editFolderInput.closest('[id^="edit-form-wrapper"]');
                    const originalData = formWrapper._originalData || {};
                    const existingImages = originalData.imageGallery || [];
                    handleFileSelection(event.target.files, editFileStoreKey, true);
                    renderImagePreviews(editFileStoreKey, existingImages);
                    event.target.value = '';
                });
            }

            const addProductForm = document.getElementById(`add-product-form${suffix}`);
            if (addProductForm) {
                addProductForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const files = managedFiles[addFileStoreKey];
                    const coverFile = files.find(f => f.name.split('.')[0] === '1');
                    if (!coverFile) {
                        alert('Vui lòng chọn ảnh và đảm bảo có một ảnh tên là "1" làm ảnh chính.');
                        return;
                    }

                    try {
                        const productFormData = new FormData();
                        productFormData.append('title', document.getElementById(`add-title${suffix}`).value);
                        productFormData.append('cost', document.getElementById(`add-cost${suffix}`).value);
                        productFormData.append('about', document.getElementById(`add-about${suffix}`).value);
                        productFormData.append('feature', document.getElementById(`add-feature${suffix}`).value);
                        productFormData.append('parameter', document.getElementById(`add-parameter${suffix}`).value);
                        productFormData.append('demo_link', document.getElementById(`add-demo-link${suffix}`).value);
                        productFormData.append('cover_image', coverFile);

                        const category = type === 'Html' ? 'Website HTML' : 'Fullstack';
                        productFormData.append('category', category);

                        const productResponse = await apiRequest('/products', 'POST', productFormData);
                        const productId = productResponse.data.id;

                        if (!productId) throw new Error("Không nhận được ID sản phẩm sau khi tạo.");

                        const otherImages = files.filter(f => f.name.split('.')[0] !== '1');
                        if (otherImages.length > 0) {
                            const galleryFormData = new FormData();
                            otherImages.forEach(file => galleryFormData.append('images', file));
                            await apiRequest(`/products/${productId}/images`, 'POST', galleryFormData);
                        }

                        alert('Đăng bài và tải tất cả ảnh lên thành công!');
                        addProductForm.reset();
                        managedFiles[addFileStoreKey] = [];
                        renderImagePreviews(addFileStoreKey, []);
                    } catch (error) {
                        alert(`Đã xảy ra lỗi khi đăng bài: ${error.message}`);
                        console.error('Lỗi chi tiết:', error);
                    }
                });
            }

            // START: MODIFICATION - UPDATE BUTTON LOGIC
            const updateBtn = document.getElementById(`update-product-btn${suffix}`);
            if (updateBtn) {
                updateBtn.addEventListener('click', async () => {
                    const formWrapper = updateBtn.closest('[id^="edit-form-wrapper"]');
                    const productId = formWrapper.dataset.productId;
                    const originalData = formWrapper._originalData;

                    if (!productId || !originalData) {
                        alert('Lỗi: Không tìm thấy dữ liệu sản phẩm để cập nhật.');
                        return;
                    }

                    let updateSuccess = false;
                    let gallerySuccess = false;

                    try {
                        // --- BƯỚC 1: TẠO FORMDATA VÀ THÊM CÁC TRƯỜNG DỮ LIỆU ---
                        // Giống hệt cách bạn làm trong POST, không dùng vòng lặp
                        const patchFormData = new FormData();
                        patchFormData.append('title', document.getElementById(`edit-title${suffix}`).value);
                        patchFormData.append('cost', document.getElementById(`edit-cost${suffix}`).value);
                        patchFormData.append('about', document.getElementById(`edit-about${suffix}`).value);
                        patchFormData.append('feature', document.getElementById(`edit-feature${suffix}`).value);
                        patchFormData.append('parameter', document.getElementById(`edit-parameter${suffix}`).value);
                        // patchFormData.append('support', document.getElementById(`edit-support${suffix}`).value);
                        patchFormData.append('demo_link', document.getElementById(`edit-demo-link${suffix}`).value);

                        // Xử lý và thêm ảnh bìa mới (nếu có)
                        const newFiles = managedFiles[editFileStoreKey];
                        const newCoverFile = newFiles.find(f => f.name.split('.')[0] === '1');
                        if (newCoverFile) {
                            patchFormData.append('cover_image', newCoverFile);
                        }

                        // --- BƯỚC 2: CONSOLE LOG DỮ LIỆU SẮP GỬI ĐI ---
                        console.log('--- [PATCH] Dữ liệu sản phẩm sắp gửi đi: ---');
                        for (const [key, value] of patchFormData.entries()) {
                            console.log(`${key}:`, value);
                        }
                        console.log('-------------------------------------------');


                        // --- BƯỚC 3: GỬI YÊU CẦU API ĐỂ CẬP NHẬT SẢN PHẨM ---
                        const patchResponse = await apiRequest(`/products/${productId}`, 'PATCH', patchFormData);
                        if (patchResponse && patchResponse.message === "updated successfully") {
                            console.log("Cập nhật thông tin sản phẩm thành công!");
                            updateSuccess = true;
                        } else {
                            const serverResponseText = JSON.stringify(patchResponse, null, 2);
                            throw new Error(`Phản hồi cập nhật không thành công. Máy chủ trả về:\n\n${serverResponseText}`);
                        }

                        // --- BƯỚC 4: XỬ LÝ VÀ TẢI LÊN CÁC ẢNH PHỤ MỚI ---
                        const newGalleryImages = newFiles.filter(f => f.name.split('.')[0] !== '1');
                        if (newGalleryImages.length > 0) {
                            const galleryFormData = new FormData();
                            newGalleryImages.forEach(file => {
                                galleryFormData.append('images', file);
                            });

                            // Console log dữ liệu ảnh phụ sắp gửi đi
                            console.log('--- [POST] Dữ liệu ảnh phụ sắp gửi đi: ---');
                            for (const [key, value] of galleryFormData.entries()) {
                                console.log(`${key}:`, value);
                            }
                            console.log('-----------------------------------------');

                            const galleryResponse = await apiRequest(`/products/${productId}/images`, 'POST', galleryFormData);
                            if (galleryResponse && galleryResponse.message === "Created successfully") {
                                console.log("Tải lên ảnh phụ mới thành công!");
                                gallerySuccess = true;
                            } else {
                                throw new Error("Phản hồi tải lên ảnh phụ không thành công.");
                            }
                        } else {
                            gallerySuccess = true;
                        }

                        // --- BƯỚC 5: THÔNG BÁO KẾT QUẢ ---
                        if (updateSuccess && gallerySuccess) {
                            alert("Cập nhật sản phẩm thành công!");
                            managedFiles[editFileStoreKey] = [];
                        }

                    } catch (error) {
                        alert(`Lỗi khi cập nhật sản phẩm: ${error.message}`);
                        console.error("Lỗi chi tiết:", error);
                    }
                });
            }
            // END: MODIFICATION
            
            renderImagePreviews(addFileStoreKey, []);
            renderImagePreviews(editFileStoreKey, []);
        };

        initializeDashboardTab('Html');
        initializeDashboardTab('Fullstack');

        const adminProjectFilters = document.querySelector('.admin-project-filters');
        const adminStatusFilters = document.querySelector('#panel-admin-orders .order-filters');

        const renderAdminOrders = () => {
            const orderListContainer = document.querySelector('.order-list-admin');
            const activeProjectTypeBtn = adminProjectFilters.querySelector('.active');
            const activeStatusBtn = adminStatusFilters.querySelector('.active');

            if (!activeProjectTypeBtn || !activeStatusBtn) {
                orderListContainer.innerHTML = '<p class="no-orders">Vui lòng chọn bộ lọc.</p>';
                return;
            }

            const activeProjectType = activeProjectTypeBtn.dataset.projectType;
            const activeStatus = activeStatusBtn.dataset.status;

            const mockAdminOrders = [
                { id: 'PSV-001', user: 'User A', productName: 'Website Tĩnh A', projectType: 'Website HTML', status: 'Mới' },
                { id: 'PSV-002', user: 'User B', productName: 'Fullstack App B', projectType: 'Fullstack', status: 'Tiến hành' },
                { id: 'PSV-003', user: 'User C', productName: 'Website Tĩnh C', projectType: 'Website HTML', status: 'Hoàn thành' },
                { id: 'PSV-004', user: 'User D', productName: 'Fullstack App D', projectType: 'Fullstack', status: 'Đã hủy' },
                { id: 'PSV-005', user: 'User E', productName: 'Website Tĩnh E', projectType: 'Website HTML', status: 'Tiến hành' },
            ];

            let filteredOrders = mockAdminOrders.filter(order => order.projectType === activeProjectType);

            if (activeStatus !== 'Tất cả') {
                filteredOrders = filteredOrders.filter(order => order.status === activeStatus);
            }

            if (filteredOrders.length > 0) {
                orderListContainer.innerHTML = filteredOrders.map(order => `
                    <div class="order-item">
                        <div class="order-info">
                            <span class="order-id">#${order.id} (User: ${order.user})</span>
                            <p class="order-product">${order.productName}</p>
                        </div>
                        <div class="order-details">
                            <span class="order-status">${order.status}</span>
                        </div>
                    </div>
                `).join('');
            } else {
                orderListContainer.innerHTML = '<p class="no-orders">Không có đơn hàng nào phù hợp.</p>';
            }
        };

        if (adminProjectFilters) {
            adminProjectFilters.addEventListener('click', (e) => {
                if (e.target.classList.contains('filter-btn')) {
                    adminProjectFilters.querySelector('.active').classList.remove('active');
                    e.target.classList.add('active');
                    renderAdminOrders();
                }
            });
        }

        if (adminStatusFilters) {
            adminStatusFilters.addEventListener('click', (e) => {
                if (e.target.classList.contains('filter-btn')) {
                    adminStatusFilters.querySelector('.active').classList.remove('active');
                    e.target.classList.add('active');
                    renderAdminOrders();
                }
            });
        }
    }
    
    handleOAuthCallback();
    checkLoginStatus();
}