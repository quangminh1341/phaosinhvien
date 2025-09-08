gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// --- BIẾN TRẠNG THÁI ---
let projectData = {};
let currentProject = "";
let isAnimating = false;
let currentProductData = null;
let isDetailViewActive = false;
let currentZoomIndex = 0;
const discordWebhookUrl = 'https://discord.com/api/webhooks/1410604044707434587/k1qjnS9rookO1XC4XjTJCR7v0zy2JKkiGCrBqvgoLTBuugR4AmJ3JLRg_dOPATdyiz2E';

let homeTl, panel2Tl;

// --- DOM ELEMENTS ---
const serviceListContainer = document.querySelector('.service-list-container');
const closeServiceListBtn = document.querySelector('.close-service-list-btn');
const projectSelect = document.getElementById('project-select');
const backButton = document.querySelector('.back-button');
const gallery = document.querySelector('.thumbnail-gallery');
const galleryWrapper = document.querySelector('.thumbnail-gallery-wrapper');
const productDetailContainer = document.querySelector('.product-detail-container');
const productGallery = document.querySelector('.product-gallery');
const galleryThumbnails = document.querySelector('.gallery-thumbnails');
const galleryMain = document.querySelector('.gallery-main');
const productTitle = document.querySelector('.product-title');
const productPrice = document.querySelector('.product-price');
const supportLink = document.querySelector('.support-link');
const productAboutContent = document.querySelector('.product-about-content');
const productSpecsList = document.querySelector('.product-specs-list');
const productFeaturesList = document.querySelector('.product-features-list');
const discountContainer = document.querySelector('.discount-container');
const discountToggle = document.getElementById('discount-toggle');
const orderButton = document.querySelector('.order-button');
const orderModal = document.getElementById('order-modal');
const closeModalBtn = document.querySelector('.close-modal-btn');
const orderForm = document.getElementById('order-form');
const orderNameInput = document.getElementById('order-name');
const liveDemoBtn = document.querySelector('.live-demo-btn');
const imageZoomModal = document.getElementById('image-zoom-modal');
const closeZoomModalBtn = document.querySelector('.close-zoom-modal-btn');
const zoomedImage = imageZoomModal.querySelector('img');
const prevZoomBtn = document.getElementById('prev-zoom-btn');
const nextZoomBtn = document.getElementById('next-zoom-btn');

// --- START: BIẾN TOÀN CỤC CHO MODAL THÔNG BÁO ---
let messageModal, messageModalTitle, messageModalText, messageModalActions, confirmBtn, cancelBtn;
let confirmCallback = null;
// --- END: BIẾN TOÀN CỤC CHO MODAL THÔNG BÁO ---


// --- HÀM KHỞI TẠO CHÍNH ---
function initializePage() {
    gsap.to(".site-nav a", {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", delay: 0.5
    });
    initializeHeader();
    setupNavigation();
    initializeMessageModal(); // Thêm hàm khởi tạo modal
    const initialLink = document.querySelector('.site-nav a[data-target="#trangchu-panel"]');
    updateActiveLink(initialLink);
}


// --- KHỞI TẠO KHI TẢI TRANG ---
document.addEventListener("DOMContentLoaded", async () => {
    createHomepageAnimations();
    await initializeServicePanel();
});


// --- START: KHỞI TẠO VÀ HIỂN THỊ MODAL THÔNG BÁO ---
function initializeMessageModal() {
    messageModal = document.getElementById('message-modal');
    messageModalTitle = document.getElementById('message-modal-title');
    messageModalText = document.getElementById('message-modal-text');
    messageModalActions = document.getElementById('message-modal-actions');
    confirmBtn = document.getElementById('message-modal-confirm-btn');
    cancelBtn = document.getElementById('message-modal-cancel-btn');

    const closeModal = () => {
        messageModal.classList.remove('visible');
        if (confirmCallback) {
            confirmCallback = null;
        }
    };

    cancelBtn.addEventListener('click', closeModal);
    confirmBtn.addEventListener('click', () => {
        if (confirmCallback) {
            confirmCallback();
        }
        closeModal();
    });
    messageModal.addEventListener('click', (e) => {
        if (e.target === messageModal) {
            closeModal();
        }
    });
}

/**
 * Hiển thị một modal thông báo tùy chỉnh.
 * @param {string} text - Nội dung thông báo.
 * @param {string} [title='Thông báo'] - Tiêu đề của modal.
 * @param {boolean} [showConfirm=false] - Có hiển thị các nút xác nhận hay không.
 * @param {function} [callback=null] - Hàm sẽ được gọi khi nhấn nút 'Có'.
 */
function showMessage(text, title = 'Thông báo', showConfirm = false, callback = null) {
    messageModalTitle.textContent = title;
    messageModalText.textContent = text;
    confirmCallback = callback;

    if (showConfirm) {
        messageModalActions.style.display = 'flex';
        cancelBtn.textContent = 'Không';
        confirmBtn.style.display = 'inline-block';
    } else {
        messageModalActions.style.display = 'flex';
        cancelBtn.textContent = 'Đóng';
        confirmBtn.style.display = 'none';
    }

    messageModal.classList.add('visible');
}
// --- END: KHỞI TẠO VÀ HIỂN THỊ MODAL THÔNG BÁO ---


// --- CÁC HÀM XỬ LÝ DỮ LIỆU & API ---

/**
 * @description Nhóm một mảng sản phẩm phẳng thành một đối tượng được phân loại theo danh mục.
 * @param {Array} products - Mảng sản phẩm từ API.
 * @returns {Object} - Đối tượng sản phẩm đã được nhóm.
 */
function groupProductsByCategory(products) {
    return products.reduce((acc, product) => {
        const category = product.category || 'Uncategorized';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(product);
        return acc;
    }, {});
}

/**
 * @description Tải tất cả sản phẩm từ API, nhóm chúng và khởi tạo giao diện.
 */
async function loadAllProducts() {
    try {
        const response = await apiRequest('/products'); // GET request to /products
        
        if (!response || !response.data) throw new Error('Cấu trúc phản hồi API không hợp lệ');

        projectData = groupProductsByCategory(response.data);

        // Lấy tên các danh mục từ dữ liệu đã nhóm
        const projectNames = Object.keys(projectData);

        if (projectNames.length === 0) {
            projectSelect.innerHTML = '<option>Không tìm thấy dự án</option>';
            gallery.innerHTML = "<p>Không có sản phẩm nào được tìm thấy.</p>";
            return;
        }

        // Sắp xếp danh sách, ưu tiên "Website HTML" lên đầu
        const sortedProjectNames = [...projectNames].sort((a, b) => {
            if (a === "Website HTML") return -1;
            if (b === "Website HTML") return 1;
            return a.localeCompare(b);
        });
        
        // Tạo các <option> cho thẻ <select>
        projectSelect.innerHTML = sortedProjectNames.map(name => `<option value="${name}">${name}</option>`).join('');

        // Thiết lập dự án mặc định để hiển thị
        const defaultProject = "Website HTML";
        currentProject = projectNames.includes(defaultProject) ? defaultProject : sortedProjectNames[0];
        projectSelect.value = currentProject;

        renderGallery(projectData[currentProject]);
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu sản phẩm từ API:', error);
        gallery.innerHTML = "<p>Đã xảy ra lỗi khi tải sản phẩm. Vui lòng thử lại sau.</p>";
    }
}

// --- CÁC HÀM CÀI ĐẶT & GIAO DIỆN ---

function updateActiveLink(activeLink) {
    const siteNav = document.querySelector('.site-nav');
    if (!siteNav) return;
    const navLinks = siteNav.querySelectorAll('a');
    navLinks.forEach(link => link.classList.remove('active'));
    if (activeLink && activeLink.closest('.site-nav')) {
        activeLink.classList.add('active');
    }
}

function setupNavigation() {
    const container = document.querySelector("#horizontal-container");
    const panels = gsap.utils.toArray("#horizontal-container > .panel");
    const navLinks = gsap.utils.toArray(".logo, .site-nav a, .support-link");
    
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            updateActiveLink(link);

            const navToggle = document.querySelector('.nav-toggle');
            const siteNav = document.querySelector('.site-nav');
            if (siteNav && siteNav.classList.contains('nav-open')) {
                siteNav.classList.remove('nav-open');
                navToggle.classList.remove('nav-open');
            }
            
            const targetSelector = link.getAttribute("data-target");
            if (!targetSelector) return;
            
            if (targetSelector === '#dichvu-panel') {
                if (isDetailViewActive) {
                    gsap.to(backButton, { autoAlpha: 1, scale: 1, duration: 0.3, overwrite: 'auto' });
                } else {
                     gsap.to(backButton, { autoAlpha: 0, scale: 0.8, duration: 0.3, overwrite: 'auto' });
                }
            } else {
                gsap.to(backButton, { autoAlpha: 0, scale: 0.8, duration: 0.3, overwrite: 'auto' });
            }

            const targetPanel = document.querySelector(targetSelector);
            if (targetPanel) {
                if (targetPanel.id === 'trangchu-panel') {
                    document.querySelector('#trangchu-panel').scrollTop = 0;
                }
                const targetIndex = panels.indexOf(targetPanel);
                if (targetIndex === -1) return;
                
                gsap.to(container, {
                    x: -targetIndex * window.innerWidth,
                    duration: 1.2,
                    ease: "power3.inOut"
                });
            }
        });
    });
}

function createHomepageAnimations() {
    homeTl = gsap.timeline({ paused: true });
    const imgPositions = {
        img1: { x: '0%', y: '-10%', rotation: -15 },
        img2: { x: '20%', y: '10%', rotation: 0 },
        img3: { x: '40%', y: '-10%', rotation: 15 }
    };
    homeTl.fromTo('.img-1', { rotation: -90, x: '-100vw', y: '-50vh', opacity: 0 }, { rotation: imgPositions.img1.rotation, x: imgPositions.img1.x, y: imgPositions.img1.y, opacity: 1, duration: 1.2, ease: "power3.out" }, "start");
    homeTl.fromTo('.img-2', { rotation: -90, y: '-100vh', opacity: 0 }, { rotation: imgPositions.img2.rotation, x: imgPositions.img2.x, y: imgPositions.img2.y, opacity: 1, duration: 1.2, ease: "power3.out" }, "<0.2");
    homeTl.fromTo('.img-3', { rotation: 90, x: '100vw', y: '-50vh', opacity: 0 }, { rotation: imgPositions.img3.rotation, x: imgPositions.img3.x, y: imgPositions.img3.y, opacity: 1, duration: 1.2, ease: "power3.out" }, "<0.2");
    homeTl.fromTo('.home-text-content > *', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.2, duration: 0.8 }, "-=0.8");
    homeTl.play();
    ScrollTrigger.matchMedia({
        "(min-width: 993px)": function() {
            ScrollTrigger.create({ trigger: "#trangchu-panel-2", scroller: "#trangchu-panel", start: "top 85%", end: "bottom top", onEnter: () => homeTl.reverse(), onLeaveBack: () => homeTl.play() });
        },
        "(max-width: 992px)": function() {
            ScrollTrigger.create({ trigger: "#trangchu-panel-2", scroller: "#trangchu-panel", start: "top 70%", end: "bottom top", onEnter: () => homeTl.reverse(), onLeaveBack: () => homeTl.play() });
        }
    });
    panel2Tl = gsap.timeline({
        scrollTrigger: { trigger: "#trangchu-panel-2", scroller: "#trangchu-panel", start: "top 70%", toggleActions: "play none none reverse" },
        defaults: { duration: 1.2, ease: "power3.out" }
    });
    const img2Positions = { img4: { x: '0%', y: '10%', rotation: -15 }, img5: { x: '-20%', y: '30%', rotation: 0 }, img6: { x: '-40%', y: '10%', rotation: 15 } };
    panel2Tl.fromTo('.img-4', { rotation: -90, x: '-100vw', y: '-50vh', opacity: 0 }, { rotation: img2Positions.img4.rotation, x: img2Positions.img4.x, y: img2Positions.img4.y, opacity: 1 }, "start");
    panel2Tl.fromTo('.img-5', { rotation: -90, y: '-100vh', opacity: 0 }, { rotation: img2Positions.img5.rotation, x: img2Positions.img5.x, y: img2Positions.img5.y, opacity: 1 }, "<0.2");
    panel2Tl.fromTo('.img-6', { rotation: 90, x: '100vw', y: '-50vh', opacity: 0 }, { rotation: img2Positions.img6.rotation, x: img2Positions.img6.x, y: img2Positions.img6.y, opacity: 1 }, "<0.2");
    panel2Tl.fromTo('.home-text-content-2 > *', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.2, duration: 0.8 }, "-=0.8");
}

async function initializeServicePanel() {
    gsap.set(backButton, { autoAlpha: 0, scale: 0.8, pointerEvents: 'none' });
    gsap.set(productDetailContainer, { opacity: 0, pointerEvents: 'none' });

    await loadAllProducts();

    projectSelect.addEventListener('change', handleProjectChange);
    gallery.addEventListener('click', handleThumbnailClick);
    backButton.addEventListener('click', handleBackClick);
    closeServiceListBtn.addEventListener('click', handleCloseListClick);
    orderButton.addEventListener('click', () => {
        if (window.currentUser) {
            openOrderModal();
        } else {
            if (typeof openModal === 'function') {
                openModal(false, 'Vui lòng đăng nhập để đặt hàng.');
            } else {
                showMessage('Vui lòng đăng nhập để đặt hàng.');
            }
        }
    });
    closeModalBtn.addEventListener('click', closeOrderModal);
    orderModal.addEventListener('click', (e) => { if (e.target === orderModal) closeOrderModal(); });
    orderForm.addEventListener('submit', handleOrderSubmit);
    productGallery.addEventListener('click', handleGalleryClick);
    discountToggle.addEventListener('change', handleDiscountToggle);
    galleryMain.addEventListener('click', handleImageZoom);
    closeZoomModalBtn.addEventListener('click', closeImageZoom);
    imageZoomModal.addEventListener('click', (e) => {
        if (e.target === imageZoomModal) { closeImageZoom(); }
    });
    prevZoomBtn.addEventListener('click', () => updateZoomedImage(currentZoomIndex - 1));
    nextZoomBtn.addEventListener('click', () => updateZoomedImage(currentZoomIndex + 1));
    
    const kebabBtn = document.querySelector('.kebab-btn');
    const kebabDropdown = document.querySelector('.kebab-dropdown');
    const deleteProductBtn = document.getElementById('delete-product-btn-detail');
    const editProductBtn = document.getElementById('edit-product-btn-detail');

    if (kebabBtn && kebabDropdown) {
        kebabBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            kebabDropdown.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            kebabDropdown.classList.remove('active');
        });
    }
    
    if(deleteProductBtn) {
        deleteProductBtn.addEventListener('click', handleDeleteProduct);
    }
    
    if(editProductBtn) {
        editProductBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Kiểm tra xem `currentProductData` có tồn tại và hàm `populateAndShowEditForm` đã được khởi tạo chưa
            if (currentProductData && typeof populateAndShowEditForm === 'function') {
                // Gọi hàm toàn cục từ header.js để mở và điền form sửa
                populateAndShowEditForm(currentProductData);
            } else {
                console.error("Không thể mở form sửa: Dữ liệu sản phẩm hoặc hàm không tồn tại.");
                showMessage("Không thể thực hiện hành động này. Vui lòng thử lại.");
            }
        });
    }
}

function renderGallery(items) {
    if (!items || items.length === 0) {
        gallery.innerHTML = "<p>Không có mẫu nào cho danh mục này.</p>";
        return;
    }
    gallery.innerHTML = items.map(item => {
        let priceDisplay = '';
        if (item.cost) {
            const formattedCost = `${Number(item.cost).toLocaleString('vi-VN')}đ`;
            priceDisplay = `<div class="thumb-price">${formattedCost.replace('đ','k')}</div>`;
        }
        return `
            <div class="thumbnail-item" data-id="${item.id}">
                <img src="${item.cover_url}" alt="${item.title}" loading="lazy">
                ${priceDisplay}
                <div class="thumbnail-footer">
                    <span class="thumb-title">${item.title}</span>
                </div>
            </div>
        `;
    }).join('');
    galleryWrapper.scrollTop = 0;
}

function populateProductDetail(data) {
    currentProductData = data;
    productTitle.textContent = data.title;
    discountToggle.checked = false;
    if (isNaN(data.cost) || Number(data.cost) === 0) {
        productPrice.style.display = 'block';
        productPrice.textContent = data.cost === 0 ? "Liên hệ" : data.cost;
        discountContainer.style.display = 'none';
    } else {
        productPrice.style.display = 'block';
        productPrice.innerHTML = `${Number(data.cost).toLocaleString('vi-VN')}.000 VNĐ`;
        discountContainer.style.display = 'flex';
    }
    productAboutContent.textContent = data.about;
    if (liveDemoBtn) {
        liveDemoBtn.href = data.demo_link || '#';
        liveDemoBtn.style.display = data.demo_link ? 'flex' : 'none';
    }
    supportLink.setAttribute('data-target', '#lienhe-panel');
    const specs = data.parameter || '';
    productSpecsList.innerHTML = '';
    if (specs) {
        specs.split(',').forEach(spec => {
            const li = document.createElement('li');
            li.textContent = spec.trim();
            productSpecsList.appendChild(li);
        });
    }
    const features = data.feature || '';
    productFeaturesList.innerHTML = '';
    if (features) {
        features.split(',').forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature.trim();
            productFeaturesList.appendChild(li);
        });
    }
    galleryThumbnails.innerHTML = '';
    galleryMain.innerHTML = '';
	
    // START: MODIFIED SECTION
    // Xử lý imageGallery là một mảng các đối tượng {id, image_url}
    if (data.imageGallery && data.imageGallery.length > 0) {
        data.imageGallery.forEach((img, index) => { // img bây giờ là {id, image_url}
            const thumbButton = document.createElement('button');
            thumbButton.className = 'gallery-thumb-item';
            thumbButton.dataset.index = index;
            thumbButton.innerHTML = `<img src="${img.image_url}" alt="Thumbnail ${index + 1}">`;

            const mainImageItem = document.createElement('div');
            mainImageItem.className = 'gallery-main-item';
            mainImageItem.dataset.index = index;
            mainImageItem.innerHTML = `<img src="${img.image_url}" alt="Product image ${index + 1}">`;
            if (index === 0) {
                thumbButton.classList.add('active');
                mainImageItem.classList.add('active');
            }
            galleryThumbnails.appendChild(thumbButton);
            galleryMain.appendChild(mainImageItem);
        });
    } else {
        galleryMain.innerHTML = `<img src="images/logo.png" alt="Ảnh chính sản phẩm">`;
    }
    // END: MODIFIED SECTION
	
    const overlayButtons = document.createElement('div');
    overlayButtons.className = 'image-overlay-buttons';
    overlayButtons.innerHTML = `
        <button class="zoom-btn"><i class="fas fa-search-plus"></i></button>
        <a href="${data.demo_link || '#'}" target="_blank" class="live-demo-btn" style="display: ${data.demo_link ? 'flex' : 'none'};">Live Demo</a>
    `;
    galleryMain.appendChild(overlayButtons);
    productDetailContainer.scrollTop = 0;
}


// --- CÁC HÀM XỬ LÝ SỰ KIỆN ---

function handleDiscountToggle(e) {
    const isChecked = e.target.checked;
    const originalCost = Number(currentProductData.cost);
    if (isNaN(originalCost)) return;
    if (isChecked) {
        const discountedCost = originalCost * 0.8;
        productPrice.innerHTML = `<span class="new-price">${discountedCost.toLocaleString('vi-VN')}.000 VNĐ</span> <span class="old-price">${originalCost.toLocaleString('vi-VN')}.000 VNĐ</span>`;
    } else {
        productPrice.innerHTML = `${originalCost.toLocaleString('vi-VN')}.000 VNĐ`;
    }
}

function handleDeleteProduct(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!currentProductData || !currentProductData.id) {
        showMessage('Không tìm thấy thông tin sản phẩm để xóa.');
        return;
    }
    
    showMessage(
        'Bạn có chắc chắn muốn xóa dự án này không? Hành động này không thể hoàn tác.',
        'Xác nhận xóa',
        true,
        async () => {
            try {
                const response = await apiRequest(`/products/${currentProductData.id}`, 'DELETE');
                if (response && response.message === "Deleted successfully") {
                    showMessage('Đã xóa sản phẩm thành công!');
                    handleBackClick();
                    await loadAllProducts();
                } else {
                    throw new Error('Phản hồi từ server không hợp lệ.');
                }
            } catch (error) {
                console.error('Lỗi khi xóa sản phẩm:', error);
                showMessage(`Đã xảy ra lỗi khi xóa sản phẩm: ${error.message}`);
            }
        }
    );
}

function handleProjectChange(e) {
    currentProject = e.target.value;
    renderGallery(projectData[currentProject]);
}

async function handleThumbnailClick(e) {
    const clickedItem = e.target.closest('.thumbnail-item');
    if (!clickedItem || isAnimating) return;

    const productId = clickedItem.dataset.id;
    if (!productId) return;

    closeServiceListBtn.classList.remove('visible');
    isAnimating = true;
    isDetailViewActive = true;
    
    try {
        const [productDetailsResponse, productImagesResponse] = await Promise.all([
            apiRequest(`/products/${productId}`),
            apiRequest(`/products/${productId}/images`)
        ]);

        if (!productDetailsResponse || !productDetailsResponse.data) {
             throw new Error('Không thể tải chi tiết sản phẩm.');
        }

        const productDetails = productDetailsResponse.data;

        // START: MODIFIED SECTION
        // Giữ lại toàn bộ đối tượng ảnh (bao gồm id và image_url)
        const imagesData = productImagesResponse.data ? productImagesResponse.data : [];
        // END: MODIFIED SECTION
        
        const combinedProductData = {
            ...productDetails,
            imageGallery: imagesData // Gán mảng đối tượng ảnh
        };
        
        populateProductDetail(combinedProductData);
        
        const tl = gsap.timeline({ onComplete: () => { isAnimating = false; } });
        tl.to(serviceListContainer, { xPercent: -50, opacity: 0, duration: 0.4, ease: 'power2.in' })
          .set(serviceListContainer, { pointerEvents: 'none' })
          .set(productDetailContainer, { pointerEvents: 'auto' })
          .set(backButton, { pointerEvents: 'auto' })
          .to(productDetailContainer, { autoAlpha: 1, duration: 0.4 }, "-=0.2")
          .to(backButton, { autoAlpha: 1, scale: 1, duration: 0.3 }, "<");

    } catch (error) {
        console.error(`Lỗi khi tải chi tiết sản phẩm ID ${productId}:`, error);
        showMessage('Không thể tải chi tiết sản phẩm. Vui lòng thử lại.');
        isAnimating = false;
        isDetailViewActive = false;
    }
}


function handleBackClick() {
    if (isAnimating) return;
    isAnimating = true;
    isDetailViewActive = false;
    const tl = gsap.timeline({ onComplete: () => { isAnimating = false; } });
    tl.to([productDetailContainer, backButton], { autoAlpha: 0, duration: 0.3 })
      .set(productDetailContainer, { pointerEvents: 'none' })
      .set(backButton, { pointerEvents: 'none', scale: 0.8 })
      .set(serviceListContainer, { pointerEvents: 'auto' })
      .to(serviceListContainer, { xPercent: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
    closeServiceListBtn.classList.add('visible');
}

function handleCloseListClick() {
    if (isAnimating) return;
    isAnimating = true;
    isDetailViewActive = true;
    const tl = gsap.timeline({ onComplete: () => { isAnimating = false; } });
    closeServiceListBtn.classList.remove('visible');
    tl.to(serviceListContainer, { xPercent: -50, opacity: 0, duration: 0.4, ease: 'power2.in' })
      .set(serviceListContainer, { pointerEvents: 'none' })
      .set(productDetailContainer, { pointerEvents: 'auto' })
      .set(backButton, { pointerEvents: 'auto' })
      .to(productDetailContainer, { autoAlpha: 1, duration: 0.4 }, "-=0.2")
      .to(backButton, { autoAlpha: 1, scale: 1, duration: 0.3 }, "<");
}

function handleGalleryClick(e) {
    const clickedThumb = e.target.closest('.gallery-thumb-item');
    if (!clickedThumb) return;
    const index = clickedThumb.dataset.index;
    galleryThumbnails.querySelector('.active')?.classList.remove('active');
    const currentActiveMain = galleryMain.querySelector('.active');
    clickedThumb.classList.add('active');
    const nextActiveMain = galleryMain.querySelector(`.gallery-main-item[data-index="${index}"]`);
    if (currentActiveMain === nextActiveMain) return;
    gsap.to(currentActiveMain, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
            currentActiveMain.classList.remove('active');
            nextActiveMain.classList.add('active');
            gsap.to(nextActiveMain, { opacity: 1, duration: 0.2 });
        }
    });
}

function updateZoomedImage(index) {
    if (!currentProductData || !currentProductData.imageGallery) return;
    const gallery = currentProductData.imageGallery;
    if (index < 0) {
        currentZoomIndex = gallery.length - 1;
    } else if (index >= gallery.length) {
        currentZoomIndex = 0;
    } else {
        currentZoomIndex = index;
    }
    zoomedImage.src = gallery[currentZoomIndex].image_url;
    zoomedImage.parentElement.scrollTop = 0;
}

function handleImageZoom(e) {
    if (e.target.closest('.zoom-btn')) {
        const activeMainItem = galleryMain.querySelector('.gallery-main-item.active');
        if (activeMainItem) {
            const activeIndex = parseInt(activeMainItem.dataset.index, 10);
            updateZoomedImage(activeIndex);
            imageZoomModal.classList.add('visible');
            if (currentProductData.imageGallery && currentProductData.imageGallery.length > 1) {
                prevZoomBtn.classList.add('active');
                nextZoomBtn.classList.add('active');
            } else {
                prevZoomBtn.classList.remove('active');
                nextZoomBtn.classList.remove('active');
            }
        }
    }
}

function closeImageZoom() {
    imageZoomModal.classList.remove('visible');
    prevZoomBtn.classList.remove('active');
    nextZoomBtn.classList.remove('active');
}

function openOrderModal() {
    if (!currentProductData) return;
    orderNameInput.value = currentProductData.title;
    orderModal.classList.add('visible');
}
function closeOrderModal() { orderModal.classList.remove('visible'); }

function generateOrderID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

async function handleOrderSubmit(e) {
    e.preventDefault();

    const contactInput = document.getElementById('order-contact').value.trim();
    const phoneInput = document.getElementById('order-phone').value.trim();

    if (contactInput.includes('@') && !contactInput.toLowerCase().endsWith('@gmail.com')) {
        showMessage("Lỗi: Nếu bạn nhập email, vui lòng chỉ sử dụng địa chỉ @gmail.com.");
        return;
    }

    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phoneInput)) {
        showMessage("Lỗi: Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại bắt đầu bằng 0 và có đúng 10 chữ số.");
        return;
    }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.orderID = generateOrderID(); 
    try {
        await sendDiscordWebhook(data);
        closeOrderModal();
        e.target.reset();
        showMessage("Gửi yêu cầu thành công! Chúng tôi sẽ liên lạc lại cho bạn sớm nhất. Xin cảm ơn!");
    } catch (error) {
        console.error("Lỗi khi gửi Webhook:", error);
        showMessage("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    }
}

async function sendDiscordWebhook(data) {
    const embed = {
        title: "📢 Yêu Cầu Đặt Hàng Mới",
        color: 0x2ecc71, // Green
        fields: [
            { name: "Mã Đơn Hàng", value: `\`\`\`${data.orderID}\`\`\``, inline: false },
            { name: "Tên sản phẩm", value: data.orderName, inline: false },
            { name: "Thông tin liên lạc", value: data.orderContact, inline: false },
            { name: "Số điện thoại", value: `||${data.orderPhone}||`, inline: false },
            { name: "Nội dung yêu cầu", value: data.orderRequest || "Không có", inline: false }
        ],
        footer: { text: `Gửi lúc: ${new Date().toLocaleString('vi-VN')}` }
    };
    const payload = { username: "Bot Đơn Hàng", avatar_url: "https://i.imgur.com/4M34hi2.png", embeds: [embed] };
    const response = await fetch(discordWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (!response.ok) { throw new Error(`Could not send webhook. Status: ${response.status}`); }
}