// generate-data.js

const fs = require('fs');
const path = require('path');

const templatesPath = path.join(__dirname, 'templates');
const outputFilePath = path.join(__dirname, 'data.json');
const projectData = {};

function capitalizeFirstLetter(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function parseTxtFile(projectPath) {
    const txtFilePath = path.join(projectPath, 'text.txt');
    const details = {}; 

    try {
        if (fs.existsSync(txtFilePath)) {
            const content = fs.readFileSync(txtFilePath, 'utf-8');
            const parts = content.split('@@').filter(p => p.trim() !== '');

            for (let i = 0; i < parts.length; i += 2) {
                const key = parts[i]?.trim();
                const value = parts[i + 1]?.trim();
                if (key && value) {
                    details[key] = value;
                }
            }
        }
    } catch (error) {
        console.error(`Lỗi đọc file chi tiết cho ${projectPath}:`, error);
    }
    return details;
}

console.log('Bắt đầu quét thư mục templates...');

try {
    const categories = fs.readdirSync(templatesPath, { withFileTypes: true })
                         .filter(dirent => dirent.isDirectory())
                         .map(dirent => dirent.name);

    categories.forEach(category => {
        projectData[category] = [];
        const categoryPath = path.join(templatesPath, category);
        const projects = fs.readdirSync(categoryPath, { withFileTypes: true })
                           .filter(dirent => dirent.isDirectory())
                           .map(dirent => dirent.name);
        
        projects.forEach(project => {
            const projectPath = path.join(categoryPath, project);
            
            const details = parseTxtFile(projectPath);

            // --- THAY ĐỔI: Lấy tất cả các file ảnh .avif ---
            const imageFiles = fs.readdirSync(projectPath)
                                 .filter(file => file.endsWith('.jpg'))
                                 .sort((a, b) => { // Sắp xếp theo số thứ tự
                                    const numA = parseInt(a.match(/\d+/)?.[0] || 0);
                                    const numB = parseInt(b.match(/\d+/)?.[0] || 0);
                                    return numA - numB;
                                 });

            const imageGallery = imageFiles.map(file => `templates/${category}/${project}/${file}`);

            const finalProject = {
                ...details,
                title: details.title || capitalizeFirstLetter(project),
                imageUrl: imageGallery.length > 0 ? imageGallery[0] : 'placeholder.jpg', // Ảnh đại diện là ảnh đầu tiên
                imageGallery: imageGallery // Mảng chứa tất cả ảnh
            };

            if (!finalProject.cost) finalProject.cost = "Liên hệ";

            projectData[category].push(finalProject);
        });
    });

    fs.writeFileSync(outputFilePath, JSON.stringify(projectData, null, 2));
    console.log(`✅ File data.json đã được tạo thành công với dữ liệu chi tiết!`);

} catch (error) {
    console.error('❌ Lỗi khi tạo file data.json:', error);
}