// Godmisoft CV Maker - Main Application
let currentTemplate = null;
let cvData = {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    portfolio: '',
    photo: null,
    summary: '',
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certifications: []
};

let deferredPrompt;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        init();
    }, 1500);
});

function init() {
    loadTemplateGrid();
    setupEventListeners();
    loadDataFromStorage();
    setupPWA();
}

// Setup PWA
function setupPWA() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(() => console.log('Service Worker registered'))
            .catch(err => console.error('Service Worker registration failed:', err));
    }
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        document.getElementById('installBtn').style.display = 'flex';
    });
    
    document.getElementById('installBtn').addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            deferredPrompt = null;
            document.getElementById('installBtn').style.display = 'none';
        }
    });
}

// Load templates into grid
function loadTemplateGrid() {
    const grid = document.getElementById('templateGrid');
    const modalGrid = document.getElementById('modalTemplateGrid');
    
    cvTemplates.forEach(template => {
        const card = createTemplateCard(template);
        grid.appendChild(card.cloneNode(true));
        modalGrid.appendChild(card.cloneNode(true));
    });
    
    // Add click listeners
    document.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', () => {
            const templateId = parseInt(card.dataset.id);
            selectTemplate(templateId);
        });
    });
}

function createTemplateCard(template) {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.dataset.id = template.id;
    card.dataset.category = template.category;
    
    // Color schemes based on category
    const categoryColors = {
        modern: ['#2563eb', '#667eea', '#3b82f6', '#6366f1', '#8b5cf6'],
        classic: ['#1f2937', '#374151', '#4b5563', '#6b7280', '#9ca3af'],
        creative: ['#ec4899', '#f59e0b', '#ef4444', '#10b981', '#8b5cf6'],
        business: ['#1e40af', '#0369a1', '#075985', '#1e3a8a', '#166534'],
        minimalist: ['#000000', '#2c2c2c', '#1a1a1a', '#333333', '#141414']
    };
    
    const colors = categoryColors[template.category] || categoryColors.modern;
    const colorIndex = (template.id - 1) % colors.length;
    const primaryColor = colors[colorIndex];
    
    // Create visual placeholder
    card.innerHTML = `
        <div class="template-preview">
            <div class="template-badge">${template.category}</div>
            <div class="template-placeholder" style="background: linear-gradient(135deg, ${primaryColor}15 0%, ${primaryColor}05 100%);">
                <div class="placeholder-header" style="background: ${primaryColor}; height: 60px; margin-bottom: 15px;"></div>
                <div class="placeholder-line" style="background: ${primaryColor}40; height: 8px; margin: 8px 20px; border-radius: 4px;"></div>
                <div class="placeholder-line" style="background: ${primaryColor}30; height: 8px; margin: 8px 20px; width: 70%; border-radius: 4px;"></div>
                <div style="margin: 20px;">
                    <div class="placeholder-section" style="background: ${primaryColor}20; height: 40px; margin: 10px 0; border-radius: 6px;"></div>
                    <div class="placeholder-section" style="background: ${primaryColor}20; height: 40px; margin: 10px 0; border-radius: 6px;"></div>
                    <div style="display: flex; gap: 8px; margin-top: 15px;">
                        <div style="background: ${primaryColor}; width: 50px; height: 20px; border-radius: 10px;"></div>
                        <div style="background: ${primaryColor}; width: 50px; height: 20px; border-radius: 10px;"></div>
                        <div style="background: ${primaryColor}; width: 50px; height: 20px; border-radius: 10px;"></div>
                    </div>
                </div>
                <div class="template-preview-label" style="position: absolute; bottom: 10px; right: 10px; background: white; padding: 5px 10px; border-radius: 5px; font-size: 11px; color: ${primaryColor}; font-weight: 600;">Click to Preview</div>
            </div>
        </div>
        <div class="template-info">
            <div class="template-name">${template.name}</div>
            <div class="template-category">${template.category.toUpperCase()}</div>
        </div>
    `;
    
    return card;
}

function selectTemplate(templateId) {
    currentTemplate = cvTemplates.find(t => t.id === templateId);
    if (currentTemplate) {
        localStorage.setItem('selectedTemplate', templateId);
        switchTab('editor');
        updatePreview();
        closeModal();
        showNotification('Template selected! Start editing your CV.');
    }
}

// Event Listeners
function setupEventListeners() {
    // Navigation tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchTab(tabName);
        });
    });
    
    // Personal info inputs
    ['fullName', 'jobTitle', 'email', 'phone', 'address', 'linkedin', 'portfolio', 'summary'].forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            element.addEventListener('input', (e) => {
                cvData[field] = e.target.value;
                saveToStorage();
                updatePreview();
            });
        }
    });
    
    // Photo upload
    document.getElementById('photoUpload').addEventListener('change', handlePhotoUpload);
    
    // Dynamic lists
    document.getElementById('addExperience').addEventListener('click', () => addExperience());
    document.getElementById('addEducation').addEventListener('click', () => addEducation());
    document.getElementById('addSkill').addEventListener('click', () => addSkill());
    document.getElementById('addLanguage').addEventListener('click', () => addLanguage());
    document.getElementById('addCertification').addEventListener('click', () => addCertification());
    
    // Action buttons
    document.getElementById('saveData').addEventListener('click', exportData);
    document.getElementById('loadData').addEventListener('click', importData);
    document.getElementById('clearData').addEventListener('click', clearAllData);
    
    // Preview buttons
    document.getElementById('changeTemplate').addEventListener('click', openTemplateModal);
    document.getElementById('previewChangeTemplate').addEventListener('click', openTemplateModal);
    document.getElementById('downloadPDF').addEventListener('click', downloadPDF);
    document.getElementById('previewDownloadPDF').addEventListener('click', downloadPDF);
    document.getElementById('printCV').addEventListener('click', () => window.print());
    
    // Template filters
    document.querySelectorAll('.filter-btn, .modal-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            filterTemplates(filter, e.target);
        });
    });
    
    // Template search
    document.getElementById('templateSearch').addEventListener('input', (e) => {
        searchTemplates(e.target.value);
    });
    
    // Modal close
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target.id === 'templateModal') closeModal();
    });
}

// Switch tabs
function switchTab(tabName) {
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}Tab`).classList.add('active');
    
    if (tabName === 'editor' || tabName === 'preview') {
        if (!currentTemplate) {
            showNotification('Please select a template first!', 'warning');
            switchTab('templates');
        } else {
            updatePreview();
        }
    }
}

// Photo upload
function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            cvData.photo = event.target.result;
            const preview = document.getElementById('photoPreview');
            preview.innerHTML = `<img src="${cvData.photo}" alt="Photo">`;
            saveToStorage();
            updatePreview();
        };
        reader.readAsDataURL(file);
    }
}

// Add Experience
function addExperience() {
    const experience = {
        position: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
    };
    cvData.experience.push(experience);
    renderExperienceList();
    saveToStorage();
    updatePreview();
}

function renderExperienceList() {
    const list = document.getElementById('experienceList');
    list.innerHTML = '';
    
    cvData.experience.forEach((exp, index) => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="list-item-header">
                <strong>Experience ${index + 1}</strong>
                <button class="remove-btn" onclick="removeExperience(${index})">Remove</button>
            </div>
            <input type="text" value="${exp.position}" placeholder="Position" class="form-input" onchange="updateExperience(${index}, 'position', this.value)">
            <input type="text" value="${exp.company}" placeholder="Company" class="form-input" onchange="updateExperience(${index}, 'company', this.value)">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <input type="text" value="${exp.startDate}" placeholder="Start Date" class="form-input" onchange="updateExperience(${index}, 'startDate', this.value)">
                <input type="text" value="${exp.endDate}" placeholder="End Date" class="form-input" onchange="updateExperience(${index}, 'endDate', this.value)">
            </div>
            <textarea placeholder="Description" class="form-textarea" rows="3" onchange="updateExperience(${index}, 'description', this.value)">${exp.description}</textarea>
        `;
        list.appendChild(item);
    });
}

function updateExperience(index, field, value) {
    cvData.experience[index][field] = value;
    saveToStorage();
    updatePreview();
}

function removeExperience(index) {
    cvData.experience.splice(index, 1);
    renderExperienceList();
    saveToStorage();
    updatePreview();
}

// Add Education
function addEducation() {
    const education = {
        degree: '',
        institution: '',
        year: ''
    };
    cvData.education.push(education);
    renderEducationList();
    saveToStorage();
    updatePreview();
}

function renderEducationList() {
    const list = document.getElementById('educationList');
    list.innerHTML = '';
    
    cvData.education.forEach((edu, index) => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="list-item-header">
                <strong>Education ${index + 1}</strong>
                <button class="remove-btn" onclick="removeEducation(${index})">Remove</button>
            </div>
            <input type="text" value="${edu.degree}" placeholder="Degree" class="form-input" onchange="updateEducation(${index}, 'degree', this.value)">
            <input type="text" value="${edu.institution}" placeholder="Institution" class="form-input" onchange="updateEducation(${index}, 'institution', this.value)">
            <input type="text" value="${edu.year}" placeholder="Year" class="form-input" onchange="updateEducation(${index}, 'year', this.value)">
        `;
        list.appendChild(item);
    });
}

function updateEducation(index, field, value) {
    cvData.education[index][field] = value;
    saveToStorage();
    updatePreview();
}

function removeEducation(index) {
    cvData.education.splice(index, 1);
    renderEducationList();
    saveToStorage();
    updatePreview();
}

// Add Skill
function addSkill() {
    const skill = { name: '' };
    cvData.skills.push(skill);
    renderSkillsList();
    saveToStorage();
    updatePreview();
}

function renderSkillsList() {
    const list = document.getElementById('skillsList');
    list.innerHTML = '';
    
    cvData.skills.forEach((skill, index) => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="list-item-header">
                <input type="text" value="${skill.name}" placeholder="Skill name" class="form-input" style="margin: 0;" onchange="updateSkill(${index}, this.value)">
                <button class="remove-btn" onclick="removeSkill(${index})">Remove</button>
            </div>
        `;
        list.appendChild(item);
    });
}

function updateSkill(index, value) {
    cvData.skills[index].name = value;
    saveToStorage();
    updatePreview();
}

function removeSkill(index) {
    cvData.skills.splice(index, 1);
    renderSkillsList();
    saveToStorage();
    updatePreview();
}

// Add Language
function addLanguage() {
    const language = { name: '', level: '' };
    cvData.languages.push(language);
    renderLanguagesList();
    saveToStorage();
    updatePreview();
}

function renderLanguagesList() {
    const list = document.getElementById('languagesList');
    list.innerHTML = '';
    
    cvData.languages.forEach((lang, index) => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="list-item-header">
                <strong>Language ${index + 1}</strong>
                <button class="remove-btn" onclick="removeLanguage(${index})">Remove</button>
            </div>
            <input type="text" value="${lang.name}" placeholder="Language" class="form-input" onchange="updateLanguage(${index}, 'name', this.value)">
            <select class="form-select" onchange="updateLanguage(${index}, 'level', this.value)">
                <option value="">Proficiency Level</option>
                <option value="Native" ${lang.level === 'Native' ? 'selected' : ''}>Native</option>
                <option value="Fluent" ${lang.level === 'Fluent' ? 'selected' : ''}>Fluent</option>
                <option value="Professional" ${lang.level === 'Professional' ? 'selected' : ''}>Professional</option>
                <option value="Intermediate" ${lang.level === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
                <option value="Basic" ${lang.level === 'Basic' ? 'selected' : ''}>Basic</option>
            </select>
        `;
        list.appendChild(item);
    });
}

function updateLanguage(index, field, value) {
    cvData.languages[index][field] = value;
    saveToStorage();
    updatePreview();
}

function removeLanguage(index) {
    cvData.languages.splice(index, 1);
    renderLanguagesList();
    saveToStorage();
    updatePreview();
}

// Add Certification
function addCertification() {
    const cert = { name: '', issuer: '', year: '' };
    cvData.certifications.push(cert);
    renderCertificationsList();
    saveToStorage();
    updatePreview();
}

function renderCertificationsList() {
    const list = document.getElementById('certificationsList');
    list.innerHTML = '';
    
    cvData.certifications.forEach((cert, index) => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="list-item-header">
                <strong>Certification ${index + 1}</strong>
                <button class="remove-btn" onclick="removeCertification(${index})">Remove</button>
            </div>
            <input type="text" value="${cert.name}" placeholder="Certification Name" class="form-input" onchange="updateCertification(${index}, 'name', this.value)">
            <input type="text" value="${cert.issuer}" placeholder="Issuing Organization" class="form-input" onchange="updateCertification(${index}, 'issuer', this.value)">
            <input type="text" value="${cert.year}" placeholder="Year" class="form-input" onchange="updateCertification(${index}, 'year', this.value)">
        `;
        list.appendChild(item);
    });
}

function updateCertification(index, field, value) {
    cvData.certifications[index][field] = value;
    saveToStorage();
    updatePreview();
}

function removeCertification(index) {
    cvData.certifications.splice(index, 1);
    renderCertificationsList();
    saveToStorage();
    updatePreview();
}

// Update Preview
function updatePreview() {
    if (!currentTemplate) return;
    
    const preview = currentTemplate.generate(cvData);
    document.getElementById('livePreview').innerHTML = preview;
    document.getElementById('fullPreview').innerHTML = preview;
}

// Storage
function saveToStorage() {
    localStorage.setItem('cvData', JSON.stringify(cvData));
}

function loadDataFromStorage() {
    const savedData = localStorage.getItem('cvData');
    if (savedData) {
        cvData = JSON.parse(savedData);
        populateForm();
    }
    
    const savedTemplateId = localStorage.getItem('selectedTemplate');
    if (savedTemplateId) {
        currentTemplate = cvTemplates.find(t => t.id === parseInt(savedTemplateId));
    }
}

function populateForm() {
    document.getElementById('fullName').value = cvData.fullName || '';
    document.getElementById('jobTitle').value = cvData.jobTitle || '';
    document.getElementById('email').value = cvData.email || '';
    document.getElementById('phone').value = cvData.phone || '';
    document.getElementById('address').value = cvData.address || '';
    document.getElementById('linkedin').value = cvData.linkedin || '';
    document.getElementById('portfolio').value = cvData.portfolio || '';
    document.getElementById('summary').value = cvData.summary || '';
    
    if (cvData.photo) {
        document.getElementById('photoPreview').innerHTML = `<img src="${cvData.photo}" alt="Photo">`;
    }
    
    renderExperienceList();
    renderEducationList();
    renderSkillsList();
    renderLanguagesList();
    renderCertificationsList();
    updatePreview();
}

// Export/Import
function exportData() {
    const dataStr = JSON.stringify(cvData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-cv-data.json';
    link.click();
    showNotification('CV data exported successfully!');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                cvData = JSON.parse(event.target.result);
                saveToStorage();
                populateForm();
                updatePreview();
                showNotification('CV data imported successfully!');
            } catch (error) {
                showNotification('Error importing data. Please check the file.', 'error');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function clearAllData() {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
        cvData = {
            fullName: '',
            jobTitle: '',
            email: '',
            phone: '',
            address: '',
            linkedin: '',
            portfolio: '',
            photo: null,
            summary: '',
            experience: [],
            education: [],
            skills: [],
            languages: [],
            certifications: []
        };
        saveToStorage();
        populateForm();
        updatePreview();
        showNotification('All data cleared!');
    }
}

// Download PDF
async function downloadPDF() {
    if (!currentTemplate) {
        showNotification('Please select a template first!', 'warning');
        return;
    }
    
    // Validate required fields
    if (!cvData.email || cvData.email.trim() === '') {
        showNotification('Email address is required! Please fill in your email.', 'error');
        document.getElementById('email').focus();
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cvData.email)) {
        showNotification('Please enter a valid email address!', 'error');
        document.getElementById('email').focus();
        return;
    }
    
    if (!cvData.fullName || cvData.fullName.trim() === '') {
        showNotification('Full name is required!', 'warning');
        document.getElementById('fullName').focus();
        return;
    }
    
    showNotification('Generating PDF... Please wait.');
    
    const element = document.getElementById('fullPreview');
    const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true
    });
    
    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`${cvData.fullName || 'CV'}_Resume.pdf`);
    
    showNotification('PDF downloaded successfully! ✓');
}

// Template filters
function filterTemplates(category, button) {
    const allButtons = button.parentElement.querySelectorAll('.filter-btn, .modal-filter-btn');
    allButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    const cards = document.querySelectorAll('.template-card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function searchTemplates(query) {
    const cards = document.querySelectorAll('.template-card');
    const searchLower = query.toLowerCase();
    
    cards.forEach(card => {
        const name = card.querySelector('.template-name').textContent.toLowerCase();
        const category = card.dataset.category.toLowerCase();
        
        if (name.includes(searchLower) || category.includes(searchLower)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Modal
function openTemplateModal() {
    document.getElementById('templateModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('templateModal').style.display = 'none';
}

// Notifications
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#ef4444'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Make functions global for onclick handlers
window.removeExperience = removeExperience;
window.updateExperience = updateExperience;
window.removeEducation = removeEducation;
window.updateEducation = updateEducation;
window.removeSkill = removeSkill;
window.updateSkill = updateSkill;
window.removeLanguage = removeLanguage;
window.updateLanguage = updateLanguage;
window.removeCertification = removeCertification;
window.updateCertification = updateCertification;
