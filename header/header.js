
// Dữ liệu người dùng giả định được cập nhật
const mockUser = {
  id: 'a1b2c3d4-e5f6-7890-123A-567890abcdef',
  email: 'quangminh01341@gmail.com',
  full_name: 'Zaiiky',
  referral_code: 'MINHDEPTRAI',
  invited_by: 'Minh Đức',
  money: 2000000,
  money_commission: 50000, 
  referrals: 12, 
  level_id: '123',
  created_at: '2025-08-31T14:43:26Z',
  role: 'member',
  phone: '0912345678',
  gender: 'Nam',
  dob: '2003-10-25'
};

// Dữ liệu thông báo giả định
const mockNotifications = [
    { id: 1, message: "Chào mừng bạn đến với Phao Sinh Viên! Hãy khám phá các dịch vụ của chúng tôi.", timestamp: "5 phút trước", read: false },
    { id: 2, message: "Ưu đãi đặc biệt: Giảm giá 20% cho đơn hàng đầu tiên của bạn khi đăng ký.", timestamp: "1 giờ trước", read: false },
    { id: 3, message: "Dự án Website Tĩnh của bạn đã được cập nhật.", timestamp: "3 giờ trước", read: true },
    { id: 4, message: "Bạn có một tin nhắn mới từ bộ phận hỗ trợ.", timestamp: "1 ngày trước", read: false },
    { id: 5, message: "Chính sách bảo mật của chúng tôi đã được cập nhật.", timestamp: "2 ngày trước", read: true },
    ...Array.from({ length: 30 }, (_, i) => ({
        id: i + 6,
        message: `Đây là thông báo số ${i + 6}. Nội dung này chỉ để kiểm tra.`,
        timestamp: `${i + 3} ngày trước`,
        read: i % 3 !== 0,
    }))
];

// Dữ liệu đơn hàng giả định
const mockOrders = [
    { id: 'PSV-A4B1C2', productName: 'Website Tĩnh - CV Cá Nhân', date: '2025-07-28T10:30:00', price: 50000, status: 'Hoàn thành', revisions: 2 },
    { id: 'PSV-D5E6F7', productName: 'Fullstack - Web Bán Hàng', date: '2025-07-25T14:00:00', price: 150000, status: 'Hoàn thành', revisions: 1 },
    { id: 'PSV-G8H9I0', productName: 'Custom - App Quản Lý', date: '2025-08-30T09:00:00', price: 300000, status: 'Tiến hành', revisions: 0 },
    { id: 'PSV-J1K2L3', productName: 'Website Tĩnh - Landing Page', date: '2025-08-31T11:45:00', price: 75000, status: 'Chờ xác nhận', revisions: 0 },
    { id: 'PSV-M4N5O6', productName: 'Fullstack - Blog cá nhân', date: '2025-07-22T18:20:00', price: 120000, status: 'Từ Chối', revisions: 0, rejectionReason: 'Yêu cầu không khả thi trong thời gian ngắn.' },
    { id: 'PSV-P7Q8R9', productName: 'Website Tĩnh - Portfolio', date: '2025-08-31T16:00:00', price: 60000, status: 'Chờ xác nhận', revisions: 0 },
    { id: 'PSV-T5U6V7', productName: 'Website Tĩnh - Web nhà hàng', date: '2025-08-15T12:00:00', price: 90000, status: 'Đã hủy', revisions: 1 },
];

// Dữ liệu giao dịch giả định
const mockTransactions = [
    { type: 'deposit', amount: 50000, date: '2025-07-15T08:00:00', method: 'Thẻ cào', endingBalance: 1975000 },
    { type: 'spent', amount: 50000, date: '2025-07-28T10:31:00', productName: 'Website Tĩnh - CV Cá Nhân', endingBalance: 1925000 },
    { type: 'withdrawal', amount: 20000, date: '2025-08-15T14:30:00', endingCommissionBalance: 50000 },
    { type: 'deposit', amount: 100000, date: '2025-08-20T09:15:00', method: 'Chuyển khoản', endingBalance: 2025000 },
    { type: 'spent', amount: 75000, date: '2025-08-31T11:46:00', productName: 'Website Tĩnh - Landing Page', endingBalance: 1950000 },
];

// Dữ liệu các cấp độ (Level)
const mockLevels = [
    { id: '123', title: 'Đồng', min_referrals: 0, commission_percentage: 0.05 }, // 5%
    { id: '456', title: 'Bạc', min_referrals: 20, commission_percentage: 0.055 }, // 5.5%
    { id: '789', title: 'Vàng', min_referrals: 50, commission_percentage: 0.06 }, // 6%
];

// Dữ liệu lịch sử dùng mã
const mockReferralUsages = [
    { usedByFullName: 'Nguyễn Văn A', usedByGmail: 'nguyenvana@gmail.com', dateUsed: '2025-08-25T10:00:00' },
    { usedByFullName: 'Trần Thị B', usedByGmail: 'tranthib@gmail.com', dateUsed: '2025-08-20T15:30:00' },
    { usedByFullName: 'Lê Hoàng C', usedByGmail: 'lehoangc@gmail.com', dateUsed: '2025-08-19T11:20:00' },
    { usedByFullName: 'Phạm Thị D', usedByGmail: 'phamthid@gmail.com', dateUsed: '2025-08-15T09:05:00' },
    { usedByFullName: 'Võ Văn E', usedByGmail: 'vovane@gmail.com', dateUsed: '2025-08-12T20:00:00' },
    { usedByFullName: 'Đặng Thị F', usedByGmail: 'dangthif@gmail.com', dateUsed: '2025-08-10T14:10:00' },
    { usedByFullName: 'Hồ Văn G', usedByGmail: 'hovang@gmail.com', dateUsed: '2025-08-05T18:45:00' },
    { usedByFullName: 'Bùi Thị H', usedByGmail: 'buithih@gmail.com', dateUsed: '2025-08-02T08:00:00' },
    { usedByFullName: 'Đỗ Văn I', usedByGmail: 'dovani@gmail.com', dateUsed: '2025-07-30T22:30:00' },
    { usedByFullName: 'Hoàng Thị K', usedByGmail: 'hoangthik@gmail.com', dateUsed: '2025-07-28T13:00:00' },
    { usedByFullName: 'Ngô Văn L', usedByGmail: 'ngovanl@gmail.com', dateUsed: '2025-07-25T16:25:00' },
    { usedByFullName: 'Dương Thị M', usedByGmail: 'duongthim@gmail.com', dateUsed: '2025-07-21T19:00:00' },
];

// Dữ liệu hoa hồng giả định
const mockCommissionHistory = [
    { usedBy: mockReferralUsages[10], productName: 'Fullstack - Web Bán Hàng', amount: 7500, date: '2025-07-25T16:25:00' },
    { usedBy: mockReferralUsages[9], productName: 'Website Tĩnh - CV Cá Nhân', amount: 2500, date: '2025-07-28T13:00:00' },
    { usedBy: mockReferralUsages[8], productName: 'Custom - App Quản Lý', amount: 15000, date: '2025-07-30T22:30:00' },
    { usedBy: mockReferralUsages[3], productName: 'Website Tĩnh - Portfolio', amount: 3000, date: '2025-08-15T09:05:00' },
    { usedBy: mockReferralUsages[1], productName: 'Fullstack - Blog cá nhân', amount: 6000, date: '2025-08-20T15:30:00' },
];


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

function renderOrders() {
    const orderListContainer = document.querySelector('.order-list');
    const searchInput = document.getElementById('order-search-input');
    const activeFilter = document.querySelector('.order-filters .filter-btn.active');

    if (!orderListContainer || !searchInput || !activeFilter) return;

    const searchTerm = searchInput.value.toLowerCase().trim();
    const filterStatus = activeFilter.dataset.status;

    let processedOrders;

    if (filterStatus === 'Hết bảo hành') {
        const now = new Date();
        const thirtyDaysInMillis = 30 * 24 * 60 * 60 * 1000;
        processedOrders = mockOrders.filter(order => {
            const orderDate = new Date(order.date);
            const isExpired = (now - orderDate) > thirtyDaysInMillis;
            return isExpired && order.status === 'Hoàn thành';
        });
    } else if (filterStatus === 'Đã hủy') {
        processedOrders = mockOrders.filter(order => ['Đã hủy', 'Từ Chối'].includes(order.status));
    } else if (filterStatus !== 'Tất cả') {
        processedOrders = mockOrders.filter(order => order.status === filterStatus);
    } else {
        processedOrders = [...mockOrders];
    }

    if (searchTerm) {
        processedOrders = processedOrders.filter(order => 
            order.id.toLowerCase().includes(searchTerm) || 
            order.productName.toLowerCase().includes(searchTerm)
        );
    }

    if (processedOrders.length > 0) {
        orderListContainer.innerHTML = processedOrders.map(order => {
            let statusClass = '';
            switch(order.status) {
                case 'Hoàn thành': statusClass = 'status-completed'; break;
                case 'Đã hủy':
                case 'Từ Chối':
                    statusClass = 'status-canceled'; 
                    break;
                case 'Tiến hành': statusClass = 'status-inprogress'; break;
                case 'Chờ xác nhận': statusClass = 'status-pending'; break;
            }
            return `
                <div class="order-item">
                    <div class="order-info">
                        <span class="order-id">#${order.id}</span>
                        <p class="order-product">${order.productName}</p>
                        ${order.status === 'Từ Chối' && order.rejectionReason 
                            ? `<p class="order-rejection-reason">Lý do từ chối: ${order.rejectionReason}</p>` 
                            : ''
                        }
                        <span class="order-date">${new Date(order.date).toLocaleString('vi-VN')}</span>
                    </div>
                    <div class="order-details">
                        <span class="order-price">${order.price.toLocaleString('vi-VN')} VNĐ</span>
                        <span class="order-revisions">Sửa: ${order.revisions}</span>
                        <span class="order-status ${statusClass}">${order.status}</span>
                    </div>
                </div>
            `;
        }).join('');
    } else {
        orderListContainer.innerHTML = '<p class="no-orders">Không tìm thấy đơn hàng nào.</p>';
    }
}

function populateProfilePanel(user) {
    if (!user) return;

    const avatarPreview = document.getElementById('profile-avatar-preview');
    const balanceSpan = document.getElementById('profile-balance');
    const commissionSpan = document.getElementById('profile-commission');

    if (avatarPreview) avatarPreview.src = 'images/logo.png';
    if(balanceSpan) balanceSpan.textContent = user.money.toLocaleString('vi-VN') + ' VNĐ';
    if(commissionSpan) commissionSpan.textContent = user.money_commission.toLocaleString('vi-VN') + ' VNĐ';

    const nameInput = document.getElementById('profile-name');
    const referralInput = document.getElementById('profile-referral-code');
    if (nameInput) nameInput.value = user.full_name;
    if (referralInput) referralInput.value = user.referral_code;

    const emailInput = document.getElementById('profile-email');
    if (emailInput && user.email) {
        const [localPart, domain] = user.email.split('@');
        if (localPart.length > 4) {
            const start = localPart.substring(0, 2);
            const end = localPart.substring(localPart.length - 2);
            emailInput.value = `${start}${'*'.repeat(localPart.length - 4)}${end}@${domain}`;
        } else {
            emailInput.value = user.email;
        }
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

    if (user.phone) {
        phoneDisplayWrapper.style.display = 'flex';
        const start = user.phone.substring(0, 2);
        const end = user.phone.substring(user.phone.length - 2);
        maskedPhoneInput.value = `${start}******${end}`;
    } else {
        addPhoneBtn.style.display = 'inline-flex';
    }

    const genderRadio = document.querySelector(`input[name="gender"][value="${user.gender}"]`);
    if (genderRadio) genderRadio.checked = true;

    const daySelect = document.getElementById('dob-day');
    const monthSelect = document.getElementById('dob-month');
    const yearSelect = document.getElementById('dob-year');
    
    if (daySelect.innerHTML === "") {
        daySelect.innerHTML = [...Array(31).keys()].map(i => `<option value="${i + 1}">${i + 1}</option>`).join('');
        monthSelect.innerHTML = [...Array(12).keys()].map(i => `<option value="${i + 1}">${i + 1}</option>`).join('');
        const currentYear = new Date().getFullYear();
        yearSelect.innerHTML = [...Array(100).keys()].map(i => `<option value="${currentYear - i}">${currentYear - i}</option>`).join('');
    }

    if (user.dob) {
        const [year, month, day] = user.dob.split('-');
        daySelect.value = parseInt(day, 10);
        monthSelect.value = parseInt(month, 10);
        yearSelect.value = year;
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

function renderMarketingStats() {
    const activeFilter = document.querySelector('.marketing-filters .filter-btn.active').dataset.type;

    document.getElementById('marketing-codes-used-view').style.display = 'none';
    document.getElementById('marketing-commission-view').style.display = 'none';

    if (activeFilter === 'codes-used') {
        renderCodesUsedView();
    } else if (activeFilter === 'commission') {
        renderCommissionView();
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

function renderCommissionView() {
    const view = document.getElementById('marketing-commission-view');
    view.style.display = 'block';

    const monthFilter = document.getElementById('commission-month-filter');
    const totalCommissionCard = document.getElementById('stat-total-commission');
    const monthlyCommissionCard = document.getElementById('stat-monthly-commission');
    const commissionListContainer = view.querySelector('.commission-list');

    // Populate month filter if empty
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

    // Calculate total commission
    const totalCommission = mockCommissionHistory.reduce((sum, item) => sum + item.amount, 0);
    totalCommissionCard.textContent = totalCommission.toLocaleString('vi-VN') + ' VNĐ';

    // Filter by selected month
    const [selectedYear, selectedMonth] = monthFilter.value.split('-').map(Number);
    const startDate = new Date(selectedYear, selectedMonth - 1, 1);
    const endDate = new Date(selectedYear, selectedMonth, 0, 23, 59, 59);

    const monthlyCommissions = mockCommissionHistory.filter(c => {
        const commissionDate = new Date(c.date);
        return commissionDate >= startDate && commissionDate <= endDate;
    });

    // Calculate and display monthly total
    const monthlyTotal = monthlyCommissions.reduce((sum, item) => sum + item.amount, 0);
    monthlyCommissionCard.textContent = monthlyTotal.toLocaleString('vi-VN') + ' VNĐ';

    // Render list
    if (monthlyCommissions.length > 0) {
        commissionListContainer.innerHTML = monthlyCommissions.map(c => `
            <div class="commission-item">
                <div class="commission-user-product">
                    <div class="commission-user">
                        <span class="commission-name">${c.usedBy.usedByFullName}</span>
                        <span class="commission-gmail">${c.usedBy.usedByGmail}</span>
                    </div>
                    <div class="commission-product">
                        <i class="fas fa-box-open"></i>
                        <span>${c.productName}</span>
                    </div>
                </div>
                <div class="commission-details">
                    <span class="commission-amount">+${c.amount.toLocaleString('vi-VN')} VNĐ</span>
                    <span class="commission-date">${new Date(c.date).toLocaleString('vi-VN')}</span>
                </div>
            </div>
        `).join('');
    } else {
        commissionListContainer.innerHTML = '<p class="no-orders">Không có hoa hồng nào trong tháng này.</p>';
    }
}


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

    const headerAuth = document.querySelector('.header-auth');
    const profileContainer = document.querySelector('.profile-container');
    const notificationContainer = document.querySelector('.notification-container');
    const authModalOverlay = document.getElementById('auth-modal-overlay');

    const showLoggedInState = (user) => {
        if (headerAuth && profileContainer && notificationContainer) {
            profileContainer.querySelector('.profile-name').textContent = user.full_name;
            profileContainer.querySelector('.profile-money').textContent = `Số dư: ${user.money.toLocaleString('en-US')}`;
            headerAuth.style.display = 'none';
            profileContainer.style.display = 'block';
            notificationContainer.style.display = 'block';
            updateNotificationUI(mockNotifications);
            const panelUsername = document.querySelector('.panel-username');
            const panelAvatar = document.querySelector('.panel-avatar');
            if (panelUsername) panelUsername.textContent = user.full_name;
            if (panelAvatar) panelAvatar.src = 'images/logo.png';
            populateProfilePanel(user);
        }
    };

    const showLoggedOutState = () => {
        if (headerAuth && profileContainer && notificationContainer) {
            headerAuth.style.display = 'flex';
            profileContainer.style.display = 'none';
            notificationContainer.style.display = 'none';
        }
    };

    if (authModalOverlay) {
        const authContainer = document.getElementById('auth-container');
        const openLoginButtons = document.querySelectorAll('.login-btn, .auth-link-mobile:nth-child(5)');
        const openRegisterButtons = document.querySelectorAll('.register-btn, .auth-link-mobile:nth-child(6)');
        const closeModalBtn = authModalOverlay.querySelector('.auth-close-btn');
        const goSignUpLink = document.getElementById('goSignUp');
        const goSignInLink = document.getElementById('goSignIn');
        let modalAnimation;

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
            
            const openModal = (showRegister) => {
                authContainer.classList.toggle('right-panel-active', showRegister);
                authModalOverlay.classList.add('visible');
                modalAnimation.timeScale(2).play();
            };
            const closeModal = () => modalAnimation.timeScale(3.5).reverse();

            openLoginButtons.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openModal(false); }));
            openRegisterButtons.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openModal(true); }));
            if (goSignUpLink) goSignUpLink.addEventListener('click', (e) => { e.preventDefault(); authContainer.classList.add('right-panel-active'); });
            if (goSignInLink) goSignInLink.addEventListener('click', (e) => { e.preventDefault(); authContainer.classList.remove('right-panel-active'); });
            if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
            authModalOverlay.addEventListener('click', (e) => { if (e.target === authModalOverlay) closeModal(); });

            const signInButtonInModal = document.querySelector('.sign-in-container .auth-button');
            if (signInButtonInModal) {
                signInButtonInModal.addEventListener('click', (e) => {
                    e.preventDefault();
                    showLoggedInState(mockUser);
                    closeModal();
                });
            }
        }
    }

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
            showLoggedOutState();
        });
    }

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
        const closePanelBtn = userPanelModal.querySelector('.user-panel-close-btn');
        const panelSidebarNav = userPanelModal.querySelector('.user-panel-nav');
        const collapsibleCategory = userPanelModal.querySelector('.nav-category.is-collapsible');
    
        const collapseAll = () => {
            if (collapsibleCategory) {
                collapsibleCategory.classList.remove('active');
            }
        };
    
        const expandInfo = () => {
            if (collapsibleCategory) {
                collapsibleCategory.classList.add('active');
            }
        };
    
        const showPanel = (targetId) => {
            userPanelModal.querySelectorAll('.panel-content-item').forEach(p => p.classList.remove('active'));
            userPanelModal.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            
            const targetPanel = document.getElementById(targetId);
            const targetLink = userPanelModal.querySelector(`.nav-link[data-target="${targetId}"]`);
            
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
            if (targetLink) {
                targetLink.classList.add('active');
                if (targetLink.closest('.submenu')) {
                    expandInfo();
                } else {
                    collapseAll();
                }
            }
            if (targetId === 'panel-profile') {
                populateProfilePanel(mockUser);
            }
            if (targetId === 'panel-orders') {
                renderOrders();
            }
            if (targetId === 'panel-payments') {
                populateMonthFilter();
                renderTransactions();
            }
            if (targetId === 'panel-marketing') {
                // Initial render for marketing panel
                renderMarketingStats();
            }
        };
    
        const openPanelModal = (initialPanelId) => {
            showPanel(initialPanelId);
            userPanelModal.classList.add('visible');
        };
        
        const closePanelModal = () => {
            userPanelModal.classList.remove('visible');
            collapseAll();
        };
    
        if (profileInfoBtn) {
            profileInfoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openPanelModal('panel-profile');
            });
        }
    
        if (profileOrdersBtn) {
            profileOrdersBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openPanelModal('panel-orders');
            });
        }
        
        if (profilePaymentsBtn) {
            profilePaymentsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openPanelModal('panel-payments');
            });
        }
    
        if (panelSidebarNav) {
            panelSidebarNav.addEventListener('click', (e) => {
                const link = e.target.closest('a');
                if (!link) return;
    
                e.preventDefault();
                
                if (link.classList.contains('nav-category-toggle')) {
                    collapsibleCategory.classList.toggle('active');
                } 
                else if (link.dataset.target) {
                    const targetId = link.dataset.target;
                    showPanel(targetId);
                }
            });
        }
    
        closePanelBtn.addEventListener('click', closePanelModal);
        userPanelModal.addEventListener('click', (e) => {
            if (e.target === userPanelModal) {
                closePanelModal();
            }
        });

        const avatarUpload = document.getElementById('avatar-upload');
        const avatarPreview = document.getElementById('profile-avatar-preview');
        avatarUpload.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                avatarPreview.src = URL.createObjectURL(this.files[0]);
            }
        });

        const addPhoneBtn = document.getElementById('add-phone-btn');
        const phoneInput = document.getElementById('profile-phone');
        const changePhoneBtn = document.getElementById('change-phone-btn');
        const phoneDisplayWrapper = document.getElementById('phone-display-wrapper');
        const phoneEditWrapper = document.getElementById('phone-edit-wrapper');
        const oldPhoneInput = document.getElementById('profile-phone-old');
        const newPhoneInput = document.getElementById('profile-phone-new');
        const confirmChangeBtn = document.getElementById('confirm-phone-change-btn');
        
        addPhoneBtn.addEventListener('click', () => {
            addPhoneBtn.style.display = 'none';
            phoneInput.style.display = 'block';
            phoneInput.focus();
        });
        
        changePhoneBtn.addEventListener('click', () => {
            document.getElementById('main-phone-label').style.display = 'none';
            phoneDisplayWrapper.style.display = 'none';
            phoneEditWrapper.style.display = 'block';
        });

        confirmChangeBtn.addEventListener('click', () => {
            const oldPhone = oldPhoneInput.value.trim();
            const newPhone = newPhoneInput.value.trim();
            const phoneRegex = /^0\d{9}$/;

            if (oldPhone !== mockUser.phone) {
                alert('Lỗi: Số điện thoại cũ không chính xác.');
                return;
            }
            if (!phoneRegex.test(newPhone)) {
                alert('Lỗi: Số điện thoại mới không hợp lệ. Vui lòng nhập SĐT có 10 số và bắt đầu bằng 0.');
                return;
            }
            if (oldPhone === newPhone) {
                alert('Lỗi: Số điện thoại mới phải khác số điện thoại cũ.');
                return;
            }

            mockUser.phone = newPhone;
            alert('Thay đổi số điện thoại thành công!');
            oldPhoneInput.value = '';
            newPhoneInput.value = '';
            populateProfilePanel(mockUser);
        });
        
        phoneInput.addEventListener('blur', () => {
            const phoneNumber = phoneInput.value.trim();
            const phoneRegex = /^0\d{9}$/;

            if (phoneNumber === '' || !phoneRegex.test(phoneNumber)) {
                if (mockUser.phone === null) {
                    phoneInput.value = '';
                    phoneInput.style.display = 'none';
                    addPhoneBtn.style.display = 'inline-flex';
                }
            }
        });

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

        const profileForm = document.getElementById('profile-form');
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newPhoneNumber = phoneInput.value.trim();
            const phoneRegex = /^0\d{9}$/;

            if(mockUser.phone === null) {
                if (newPhoneNumber && phoneRegex.test(newPhoneNumber)) {
                    mockUser.phone = newPhoneNumber;
                }
            }
            
            mockUser.full_name = document.getElementById('profile-name').value;
            
            populateProfilePanel(mockUser);
            alert('Thông tin hồ sơ đã được cập nhật!');
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
        
        // Marketing Panel Logic
        const marketingFilters = document.querySelector('.marketing-filters');
        const commissionMonthFilter = document.getElementById('commission-month-filter');

        if (marketingFilters) {
            marketingFilters.addEventListener('click', (e) => {
                if (e.target.classList.contains('filter-btn')) {
                    marketingFilters.querySelector('.active').classList.remove('active');
                    e.target.classList.add('active');
                    renderMarketingStats();
                }
            });
        }
        if (commissionMonthFilter) {
            commissionMonthFilter.addEventListener('change', renderCommissionView);
        }
    }
}