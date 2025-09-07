// Dữ liệu thông báo giả định
const mockNotifications = [
    // { id: 1, message: "Chào mừng bạn đến với Phao Sinh Viên! Hãy khám phá các dịch vụ của chúng tôi.", timestamp: "5 phút trước", read: false },
    // { id: 2, message: "Ưu đãi đặc biệt: Giảm giá 20% cho đơn hàng đầu tiên của bạn khi đăng ký.", timestamp: "1 giờ trước", read: false },
    // { id: 3, message: "Dự án Website Tĩnh của bạn đã được cập nhật.", timestamp: "3 giờ trước", read: true },
    // { id: 4, message: "Bạn có một tin nhắn mới từ bộ phận hỗ trợ.", timestamp: "1 ngày trước", read: false },
    // { id: 5, message: "Chính sách bảo mật của chúng tôi đã được cập nhật.", timestamp: "2 ngày trước", read: true },
    // ...Array.from({ length: 30 }, (_, i) => ({
    //     id: i + 6,
    //     message: `Đây là thông báo số ${i + 6}. Nội dung này chỉ để kiểm tra.`,
    //     timestamp: `${i + 3} ngày trước`,
    //     read: i % 3 !== 0,
    // }))
];

// Dữ liệu đơn hàng giả định
const mockOrders = [
    // { id: 'PSV-A4B1C2', productName: 'Website Tĩnh - CV Cá Nhân', date: '2025-07-28T10:30:00', price: 50000, status: 'Hoàn thành', revisions: 2 },
    // { id: 'PSV-D5E6F7', productName: 'Fullstack - Web Bán Hàng', date: '2025-07-25T14:00:00', price: 150000, status: 'Hoàn thành', revisions: 1 },
    // { id: 'PSV-G8H9I0', productName: 'Custom - App Quản Lý', date: '2025-08-30T09:00:00', price: 300000, status: 'Tiến hành', revisions: 0 },
    // { id: 'PSV-J1K2L3', productName: 'Website Tĩnh - Landing Page', date: '2025-08-31T11:45:00', price: 75000, status: 'Chờ xác nhận', revisions: 0 },
    // { id: 'PSV-M4N5O6', productName: 'Fullstack - Blog cá nhân', date: '2025-07-22T18:20:00', price: 120000, status: 'Từ Chối', revisions: 0, rejectionReason: 'Yêu cầu không khả thi trong thời gian ngắn.' },
    // { id: 'PSV-P7Q8R9', productName: 'Website Tĩnh - Portfolio', date: '2025-08-31T16:00:00', price: 60000, status: 'Chờ xác nhận', revisions: 0 },
    // { id: 'PSV-T5U6V7', productName: 'Website Tĩnh - Web nhà hàng', date: '2025-08-15T12:00:00', price: 90000, status: 'Đã hủy', revisions: 1 },
];

// Dữ liệu giao dịch giả định
const mockTransactions = [
    // { type: 'deposit', amount: 50000, date: '2025-07-15T08:00:00', method: 'Thẻ cào', endingBalance: 1975000 },
    // { type: 'spent', amount: 50000, date: '2025-07-28T10:31:00', productName: 'Website Tĩnh - CV Cá Nhân', endingBalance: 1925000 },
    // { type: 'withdrawal', amount: 20000, date: '2025-08-15T14:30:00', endingCommissionBalance: 50000 },
    // { type: 'deposit', amount: 100000, date: '2025-08-20T09:15:00', method: 'Chuyển khoản', endingBalance: 2025000 },
    // { type: 'spent', amount: 75000, date: '2025-08-31T11:46:00', productName: 'Website Tĩnh - Landing Page', endingBalance: 1950000 },
];

// Dữ liệu các cấp độ (Level)
const mockLevels = [
    // { id: '123', title: 'Đồng', min_referrals: 0, commission_percentage: 0.05 }, // 5%
    // { id: '456', title: 'Bạc', min_referrals: 20, commission_percentage: 0.055 }, // 5.5%
    // { id: '789', title: 'Vàng', min_referrals: 50, commission_percentage: 0.06 }, // 6%
];

// Dữ liệu lịch sử dùng mã
const mockReferralUsages = [
    // { usedByFullName: 'Nguyễn Văn A', usedByGmail: 'nguyenvana@gmail.com', dateUsed: '2025-08-25T10:00:00' },
    // { usedByFullName: 'Trần Thị B', usedByGmail: 'tranthib@gmail.com', dateUsed: '2025-08-20T15:30:00' },
    // { usedByFullName: 'Lê Hoàng C', usedByGmail: 'lehoangc@gmail.com', dateUsed: '2025-08-19T11:20:00' },
    // { usedByFullName: 'Phạm Thị D', usedByGmail: 'phamthid@gmail.com', dateUsed: '2025-08-15T09:05:00' },
    // { usedByFullName: 'Võ Văn E', usedByGmail: 'vovane@gmail.com', dateUsed: '2025-08-12T20:00:00' },
    // { usedByFullName: 'Đặng Thị F', usedByGmail: 'dangthif@gmail.com', dateUsed: '2025-08-10T14:10:00' },
    // { usedByFullName: 'Hồ Văn G', usedByGmail: 'hovang@gmail.com', dateUsed: '2025-08-05T18:45:00' },
    // { usedByFullName: 'Bùi Thị H', usedByGmail: 'buithih@gmail.com', dateUsed: '2025-08-02T08:00:00' },
    // { usedByFullName: 'Đỗ Văn I', usedByGmail: 'dovani@gmail.com', dateUsed: '2025-07-30T22:30:00' },
    // { usedByFullName: 'Hoàng Thị K', usedByGmail: 'hoangthik@gmail.com', dateUsed: '2025-07-28T13:00:00' },
    // { usedByFullName: 'Ngô Văn L', usedByGmail: 'ngovanl@gmail.com', dateUsed: '2025-07-25T16:25:00' },
    // { usedByFullName: 'Dương Thị M', usedByGmail: 'duongthim@gmail.com', dateUsed: '2025-07-21T19:00:00' },
];

// Dữ liệu hoa hồng giả định
const mockCommissionHistory = [
    // { usedBy: mockReferralUsages[10], productName: 'Fullstack - Web Bán Hàng', amount: 7500, date: '2025-07-25T16:25:00' },
    // { usedBy: mockReferralUsages[9], productName: 'Website Tĩnh - CV Cá Nhân', amount: 2500, date: '2025-07-28T13:00:00' },
    // { usedBy: mockReferralUsages[8], productName: 'Custom - App Quản Lý', amount: 15000, date: '2025-07-30T22:30:00' },
    // { usedBy: mockReferralUsages[3], productName: 'Website Tĩnh - Portfolio', amount: 3000, date: '2025-08-15T09:05:00' },
    // { usedBy: mockReferralUsages[1], productName: 'Fullstack - Blog cá nhân', amount: 6000, date: '2025-08-20T15:30:00' },
];

// --- BIẾN TOÀN CỤC CHO MODAL ---
let authModalOverlay, authContainer, modalAnimation, openModal;

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
            localStorage.setItem('accessToken', accessToken);
        }

        if (authAction === 'login') {
            if (isExist) {
                await fetchAndDisplayUserProfile();
                if (closeModalBtn) closeModalBtn.click();
            } else {
                const message = "Tài khoản Google này chưa tồn tại. Vui lòng đăng ký.";
                if (openModal) openModal(false, message);
            }
        } else if (authAction === 'register') {
            if (isExist) {
                const message = "Tài khoản Google này đã tồn tại. Vui lòng đăng nhập.";
                if (openModal) openModal(false, message);
            } else {
                await fetchAndDisplayUserProfile();
                if (closeModalBtn) closeModalBtn.click();
            }
        }
    } catch (error) {
        console.error('Lỗi xử lý callback OAuth:', error);
        alert('Đã có lỗi xảy ra trong quá trình xác thực.');
    } finally {
        localStorage.removeItem('authAction');
    }
}

async function fetchAndDisplayUserProfile() {
    try {
        const response = await apiRequest('/users/me/profile');
        currentUser = response.data;
        showLoggedInState(currentUser);
    } catch (error) {
        console.error("Phiên đăng nhập không hợp lệ hoặc đã hết hạn.", error);
        handleLogout();
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
        currentUser = null;
        showLoggedOutState();
    }
}


// --- CÁC HÀM CẬP NHẬT GIAO DIỆN ---

function showLoggedInState(user) {
    const headerAuth = document.querySelector('.header-auth');
    const profileContainer = document.querySelector('.profile-container');
    const notificationContainer = document.querySelector('.notification-container');

    if (headerAuth && profileContainer && notificationContainer && user) {
        profileContainer.querySelector('.profile-name').textContent = user.full_name || user.email;
        profileContainer.querySelector('.profile-money').textContent = `Số dư: ${user.moneys?.toLocaleString('vi-VN') || 0} VNĐ`;
        
        const profileAvatar = profileContainer.querySelector('.profile-avatar');
        if (user.avatar_url) profileAvatar.src = user.avatar_url;

        headerAuth.style.display = 'none';
        profileContainer.style.display = 'block';
        notificationContainer.style.display = 'block';
        
        updateNotificationUI(mockNotifications);

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
            const animatedText = new SplitType('.auth-container h1, .auth-container p', { types: 'lines, chars' });
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
            
            openModal = (showRegister, message = '') => {
                document.querySelectorAll('.auth-notification').forEach(el => {
                    el.textContent = '';
                    el.style.visibility = 'hidden';
                });

                authContainer.classList.toggle('right-panel-active', showRegister);
                authModalOverlay.classList.add('visible');

                modalAnimation.restart();

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
        
        // **LOGIC ĐÃ ĐƯỢC SỬA LỖI VÀ TỐI ƯU HÓA**
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
            
            // Chuyển đổi panel nội dung
            userPanelModal.querySelectorAll('.panel-content-item').forEach(p => p.classList.remove('active'));
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) targetPanel.classList.add('active');

            // Cập nhật trạng thái active cho link được nhấp
            userPanelModal.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            const targetLink = userPanelModal.querySelector(`.nav-link[data-target="${targetId}"]`);
            
            if (targetLink) {
                targetLink.classList.add('active');
                
                const parentCollapsible = targetLink.closest('.is-collapsible');
                
                // Đóng tất cả các menu con KHÁC
                userPanelModal.querySelectorAll('.is-collapsible').forEach(menu => {
                    if (menu !== parentCollapsible) {
                        menu.classList.remove('active');
                    }
                });

                // Nếu link được nhấp nằm trong menu con, đảm bảo menu cha của nó được mở
                if (parentCollapsible) {
                    parentCollapsible.classList.add('active');
                }
            }
            
            // Tải dữ liệu cho panel tương ứng
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
        
        const openPanelModal = (initialPanelId) => {
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
        // **KẾT THÚC VÙNG SỬA LỖI**

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
        
        // --- LOGIC CHO DASHBOARD ---
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
        
        const modeToggle = document.getElementById('mode-toggle-html');
        if(modeToggle) {
            modeToggle.addEventListener('change', (e) => {
                const addContainer = document.getElementById('add-product-container');
                const editContainer = document.getElementById('edit-product-container');
                const toggleLabels = document.querySelectorAll('.mode-toggle-container .toggle-label');

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

        const setupImagePreviews = (inputId, previewContainerId) => {
            const imageInput = document.getElementById(inputId);
            const previewContainer = document.getElementById(previewContainerId);

            if (imageInput && previewContainer) {
                imageInput.addEventListener('change', (event) => {
                    previewContainer.innerHTML = '';
                    const files = Array.from(event.target.files);
                    
                    if(files.length === 0) return;

                    files.sort((a, b) => {
                        const nameA = a.name.split('.')[0];
                        const nameB = b.name.split('.')[0];
                        if (nameA === '1') return -1;
                        if (nameB === '1') return 1;
                        return a.name.localeCompare(b.name);
                    });

                    files.forEach(file => {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const isMain = file.name.split('.')[0] === '1';
                            const previewItem = document.createElement('div');
                            previewItem.classList.add('preview-item');
                            if (isMain) {
                                previewItem.classList.add('main-image');
                            }
                            
                            const img = document.createElement('img');
                            img.src = e.target.result;

                            const caption = document.createElement('div');
                            caption.classList.add('caption');
                            caption.textContent = isMain ? 'Ảnh chính' : 'Ảnh phụ';

                            previewItem.appendChild(img);
                            previewItem.appendChild(caption);
                            previewContainer.appendChild(previewItem);
                        };
                        reader.readAsDataURL(file);
                    });
                });
            }
        };

        setupImagePreviews('add-images', 'add-image-previews');
        setupImagePreviews('edit-images', 'edit-image-previews');

        const addProductForm = document.getElementById('add-product-form');
        if (addProductForm) {
            addProductForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                try {
                    const imageFiles = document.getElementById('add-images').files;
                    let coverFile = null;
                    const otherImages = [];

                    for (const file of imageFiles) {
                        if (file.name.split('.')[0] === '1') {
                            coverFile = file;
                        } else {
                            otherImages.push(file);
                        }
                    }

                    if (!coverFile) {
                        alert('Vui lòng chọn ảnh và đảm bảo có một ảnh tên là "1" làm ảnh chính.');
                        return;
                    }

                    const productFormData = new FormData();

                    // 1. Thêm dữ liệu text/number dạng phẳng để khớp với CreateProductDto
                    productFormData.append('title', document.getElementById('add-title').value);
                    productFormData.append('cost', document.getElementById('add-cost').value);
                    productFormData.append('about', document.getElementById('add-about').value);
                    productFormData.append('feature', document.getElementById('add-feature').value);
                    productFormData.append('parameter', document.getElementById('add-parameter').value);
                    productFormData.append('demo_link', document.getElementById('add-demo-link').value);

                    // 2. Thêm file ảnh chính với tên trường là 'images' (số nhiều)
                    // Đây là thay đổi cuối cùng và quan trọng nhất để khớp với FileInterceptor('images',...)
                    productFormData.append('images', coverFile);

                    // Gửi request tạo sản phẩm
                    const productResponse = await apiRequest('/products', 'POST', productFormData);
                    // console.log("Kiểm tra dữ liệu trả về từ API:", productResponse);
                    const productId = productResponse.data.id;

                    if (!productId) {
                        throw new Error("Không nhận được ID sản phẩm sau khi tạo.");
                    }

                    // --- BƯỚC 2: UPLOAD CÁC ẢNH PHỤ CÒN LẠI (NẾU CÓ) ---
                    if (otherImages.length > 0) {
                        const galleryFormData = new FormData();
                        for (const file of otherImages) {
                            // Endpoint này có thể dùng FilesInterceptor('images') để nhận nhiều file
                            galleryFormData.append('images', file);
                        }
                        await apiRequest(`/products/${productId}/images`, 'POST', galleryFormData);
                    }

                    alert('Đăng bài và tải tất cả ảnh lên thành công!');
                    addProductForm.reset();
                    document.getElementById('add-image-previews').innerHTML = '';

                } catch (error) {
                    alert(`Đã xảy ra lỗi khi đăng bài: ${error.message}`);
                    console.error('Lỗi chi tiết:', error);
                }
            });
        }
        
        const editProductForm = document.getElementById('edit-product-form');
        const editFormWrapper = document.getElementById('edit-form-wrapper');
        let currentEditingProductId = null;

         const searchBtn = document.getElementById('search-btn');
         if(searchBtn){
             searchBtn.addEventListener('click', () => {
                const query = document.getElementById('search-product').value;
                if (!query) return;

                alert('Chức năng tìm kiếm đang được phát triển. Dữ liệu mẫu sẽ được hiển thị.');

                currentEditingProductId = 'demo-product-123';
                document.getElementById('edit-title').value = 'Website Tĩnh Mẫu';
                document.getElementById('edit-cost').value = '150';
                document.getElementById('edit-about').value = 'Đây là mô tả mẫu cho sản phẩm website tĩnh.';
                document.getElementById('edit-feature').value = 'Responsive, Tối ưu SEO';
                document.getElementById('edit-parameter').value = 'HTML, CSS, JS';
                document.getElementById('edit-support').value = 'Bảo hành 1 tháng, Hỗ trợ cài đặt';
                document.getElementById('edit-demo-link').value = 'https://example.com';
                editFormWrapper.style.display = 'block';
             });
         }

        if (editProductForm) {
            editProductForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                if (!currentEditingProductId) {
                    alert('Vui lòng tìm kiếm một sản phẩm trước khi cập nhật.');
                    return;
                }

                const productUpdateData = {
                     title: document.getElementById('edit-title').value,
                    cost: parseInt(document.getElementById('edit-cost').value, 10),
                    about: document.getElementById('edit-about').value,
                    feature: document.getElementById('edit-feature').value,
                    parameter: document.getElementById('edit-parameter').value,
                    support: document.getElementById('edit-support').value,
                    demo_link: document.getElementById('edit-demo-link').value,
                };
                
                const formData = new FormData();
                formData.append('product', JSON.stringify(productUpdateData));
                
                const imageFiles = document.getElementById('edit-images').files;
                if (imageFiles.length > 0) {
                    let coverFile = null;
                    for (const file of imageFiles) {
                         if (file.name.split('.')[0] === '1') {
                            coverFile = file;
                            break;
                        }
                    }
                    if(coverFile) {
                        formData.append('file', coverFile);
                    }
                }

                try {
                    await apiRequest(`/products/${currentEditingProductId}`, 'PATCH', formData);
                    alert('Cập nhật sản phẩm thành công!');

                } catch (error) {
                    alert(`Lỗi khi cập nhật: ${error.message}`);
                    console.error('Lỗi khi cập nhật sản phẩm:', error);
                }
            });
        }

        // --- LOGIC CHO PHẦN LỌC ĐƠN HÀNG CỦA ADMIN ---
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

