// 50 Professional CV Templates - Godmisoft CV Maker

// Template configuration with color schemes
const templateConfigs = {
    modern: [
        { colors: { primary: '#2563eb', secondary: '#64748b', accent: '#f8fafc' } },
        { colors: { primary: '#667eea', secondary: '#764ba2', accent: '#f0f9ff' } },
        { colors: { primary: '#1e3a8a', secondary: '#93c5fd', accent: '#dbeafe' } },
        { colors: { primary: '#3b82f6', secondary: '#6b7280', accent: '#eff6ff' } },
        { colors: { primary: '#22d3ee', secondary: '#0f172a', accent: '#1e293b' } },
        { colors: { primary: '#0ea5e9', secondary: '#1e40af', accent: '#e0f2fe' } },
        { colors: { primary: '#06b6d4', secondary: '#475569', accent: '#cffafe' } },
        { colors: { primary: '#14b8a6', secondary: '#0d9488', accent: '#ccfbf1' } },
        { colors: { primary: '#6366f1', secondary: '#4f46e5', accent: '#e0e7ff' } },
        { colors: { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#ede9fe' } }
    ],
    classic: [
        { colors: { primary: '#1f2937', secondary: '#6b7280', accent: '#f3f4f6' } },
        { colors: { primary: '#374151', secondary: '#9ca3af', accent: '#f9fafb' } },
        { colors: { primary: '#111827', secondary: '#4b5563', accent: '#e5e7eb' } },
        { colors: { primary: '#4b5563', secondary: '#d1d5db', accent: '#ffffff' } },
        { colors: { primary: '#1e293b', secondary: '#64748b', accent: '#f1f5f9' } },
        { colors: { primary: '#0f172a', secondary: '#475569', accent: '#e2e8f0' } },
        { colors: { primary: '#334155', secondary: '#94a3b8', accent: '#f8fafc' } },
        { colors: { primary: '#18181b', secondary: '#71717a', accent: '#fafafa' } },
        { colors: { primary: '#27272a', secondary: '#a1a1aa', accent: '#f4f4f5' } },
        { colors: { primary: '#3f3f46', secondary: '#d4d4d8', accent: '#ffffff' } }
    ],
    creative: [
        { colors: { primary: '#ec4899', secondary: '#f472b6', accent: '#fce7f3' } },
        { colors: { primary: '#f59e0b', secondary: '#fbbf24', accent: '#fef3c7' } },
        { colors: { primary: '#ef4444', secondary: '#f87171', accent: '#fee2e2' } },
        { colors: { primary: '#10b981', secondary: '#34d399', accent: '#d1fae5' } },
        { colors: { primary: '#8b5cf6', secondary: '#a78bfa', accent: '#ede9fe' } },
        { colors: { primary: '#f97316', secondary: '#fb923c', accent: '#ffedd5' } },
        { colors: { primary: '#06b6d4', secondary: '#22d3ee', accent: '#cffafe' } },
        { colors: { primary: '#d946ef', secondary: '#e879f9', accent: '#fae8ff' } },
        { colors: { primary: '#84cc16', secondary: '#a3e635', accent: '#ecfccb' } },
        { colors: { primary: '#14b8a6', secondary: '#2dd4bf', accent: '#ccfbf1' } }
    ],
    business: [
        { colors: { primary: '#1e40af', secondary: '#3b82f6', accent: '#dbeafe' } },
        { colors: { primary: '#0369a1', secondary: '#0ea5e9', accent: '#e0f2fe' } },
        { colors: { primary: '#075985', secondary: '#0284c7', accent: '#f0f9ff' } },
        { colors: { primary: '#1e3a8a', secondary: '#2563eb', accent: '#e0e7ff' } },
        { colors: { primary: '#312e81', secondary: '#4f46e5', accent: '#eef2ff' } },
        { colors: { primary: '#3730a3', secondary: '#6366f1', accent: '#e0e7ff' } },
        { colors: { primary: '#166534', secondary: '#16a34a', accent: '#dcfce7' } },
        { colors: { primary: '#15803d', secondary: '#22c55e', accent: '#f0fdf4' } },
        { colors: { primary: '#0f766e', secondary: '#14b8a6', accent: '#f0fdfa' } },
        { colors: { primary: '#134e4a', secondary: '#2dd4bf', accent: '#ccfbf1' } }
    ],
    minimalist: [
        { colors: { primary: '#000000', secondary: '#666666', accent: '#f5f5f5' } },
        { colors: { primary: '#2c2c2c', secondary: '#7a7a7a', accent: '#fafafa' } },
        { colors: { primary: '#1a1a1a', secondary: '#8c8c8c', accent: '#ffffff' } },
        { colors: { primary: '#333333', secondary: '#999999', accent: '#f0f0f0' } },
        { colors: { primary: '#0a0a0a', secondary: '#6d6d6d', accent: '#f9f9f9' } },
        { colors: { primary: '#141414', secondary: '#787878', accent: '#fcfcfc' } },
        { colors: { primary: '#1f1f1f', secondary: '#858585', accent: '#f7f7f7' } },
        { colors: { primary: '#242424', secondary: '#919191', accent: '#f3f3f3' } },
        { colors: { primary: '#121212', secondary: '#6a6a6a', accent: '#fefefe' } },
        { colors: { primary: '#1c1c1c', secondary: '#7f7f7f', accent: '#f6f6f6' } }
    ]
};

const cvTemplates = [];

// Generate 50 templates (10 per category)
Object.keys(templateConfigs).forEach((category, catIndex) => {
    templateConfigs[category].forEach((config, idx) => {
        const id = catIndex * 10 + idx + 1;
        const { primary, secondary, accent } = config.colors;
        
        cvTemplates.push({
            id: id,
            name: `${category.charAt(0).toUpperCase() + category.slice(1)} ${idx + 1}`,
            category: category,
            generate: (data) => generateTemplate(data, primary, secondary, accent, category, idx)
        });
    });
});

// Template generator function
function generateTemplate(data, primary, secondary, accent, category, variant) {
    const layouts = {
        modern: [
            // Variant 0-2: Header styles
            (d, p, s, a) => `
                <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; background: white;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 30px;">
                        <div style="flex: 1;">
                            <h1 style="color: ${p}; font-size: 36px; margin: 0 0 5px 0;">${d.fullName || 'Your Name'}</h1>
                            <h2 style="color: ${s}; font-size: 20px; font-weight: normal; margin: 0;">${d.jobTitle || 'Your Job Title'}</h2>
                        </div>
                        ${d.photo ? `<img src="${d.photo}" style="width: 120px; height: 120px; border-radius: 60px; object-fit: cover; border: 4px solid ${p};">` : ''}
                    </div>
                    ${generateContactSection(d, p, a)}
                    ${generateSummarySection(d, p)}
                    ${generateExperienceSection(d, p, s)}
                    ${generateEducationSection(d, p, s)}
                    ${generateSkillsSection(d, p)}
                </div>
            `,
            (d, p, s, a) => `
                <div style="font-family: 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; background: white;">
                    <div style="background: linear-gradient(135deg, ${p} 0%, ${s} 100%); color: white; padding: 60px 40px;">
                        <h1 style="font-size: 42px; margin: 0 0 10px 0;">${d.fullName || 'Your Name'}</h1>
                        <h2 style="font-size: 24px; font-weight: normal; margin: 0;">${d.jobTitle || 'Your Job Title'}</h2>
                    </div>
                    <div style="padding: 40px;">
                        ${generateContactSection(d, s, a)}
                        ${generateSummarySection(d, p)}
                        ${generateExperienceSection(d, p, s)}
                        ${generateEducationSection(d, p, s)}
                        ${generateSkillsSection(d, p)}
                    </div>
                </div>
            `,
            (d, p, s, a) => `
                <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background: white; display: flex;">
                    <div style="width: 35%; background: ${p}; color: white; padding: 40px 25px;">
                        ${d.photo ? `<div style="text-align: center; margin-bottom: 30px;"><img src="${d.photo}" style="width: 150px; height: 150px; border-radius: 75px; object-fit: cover; border: 4px solid white;"></div>` : ''}
                        <h3 style="font-size: 16px; margin-bottom: 15px; border-bottom: 2px solid white; padding-bottom: 8px;">CONTACT</h3>
                        ${d.email ? `<p style="font-size: 13px; margin: 8px 0;">📧 ${d.email}</p>` : ''}
                        ${d.phone ? `<p style="font-size: 13px; margin: 8px 0;">📱 ${d.phone}</p>` : ''}
                        ${generateSkillsSidebar(d)}
                    </div>
                    <div style="width: 65%; padding: 40px 35px;">
                        <h1 style="color: ${p}; font-size: 32px; margin: 0 0 8px 0;">${d.fullName || 'Your Name'}</h1>
                        <h2 style="color: ${s}; font-size: 18px; font-weight: normal; margin: 0 0 25px 0;">${d.jobTitle || 'Your Job Title'}</h2>
                        ${generateSummarySection(d, p)}
                        ${generateExperienceSection(d, p, s)}
                        ${generateEducationSection(d, p, s)}
                    </div>
                </div>
            `
        ],
        classic: [
            (d, p, s, a) => `
                <div style="font-family: 'Times New Roman', serif; max-width: 800px; margin: 0 auto; padding: 50px; background: white;">
                    <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid ${p}; padding-bottom: 20px;">
                        <h1 style="color: ${p}; font-size: 32px; margin: 0 0 10px 0; text-transform: uppercase;">${d.fullName || 'Your Name'}</h1>
                        <h2 style="color: ${s}; font-size: 16px; font-weight: normal; margin: 0;">${d.jobTitle || 'Your Job Title'}</h2>
                        <div style="margin-top: 15px; color: ${s}; font-size: 14px;">
                            ${d.email ? `${d.email}` : ''} ${d.phone ? ` | ${d.phone}` : ''} ${d.address ? ` | ${d.address}` : ''}
                        </div>
                    </div>
                    ${generateSummarySection(d, p)}
                    ${generateExperienceSection(d, p, s)}
                    ${generateEducationSection(d, p, s)}
                    ${generateSkillsSection(d, p)}
                </div>
            `
        ],
        creative: [
            (d, p, s, a) => `
                <div style="font-family: 'Comic Sans MS', cursive; max-width: 800px; margin: 0 auto; background: ${a}; padding: 30px;">
                    <div style="background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                        <div style="text-align: center; margin-bottom: 30px;">
                            ${d.photo ? `<img src="${d.photo}" style="width: 140px; height: 140px; border-radius: 70px; object-fit: cover; border: 5px solid ${p}; margin-bottom: 20px;">` : ''}
                            <h1 style="color: ${p}; font-size: 38px; margin: 0 0 10px 0;">${d.fullName || 'Your Name'}</h1>
                            <h2 style="color: ${s}; font-size: 22px; font-weight: normal; margin: 0;">${d.jobTitle || 'Your Job Title'}</h2>
                        </div>
                        ${generateContactSection(d, s, a)}
                        ${generateSummarySection(d, p)}
                        ${generateExperienceSection(d, p, s)}
                        ${generateEducationSection(d, p, s)}
                        ${generateSkillsSection(d, p)}
                    </div>
                </div>
            `
        ],
        business: [
            (d, p, s, a) => `
                <div style="font-family: 'Arial', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; background: white; border: 3px solid ${p};">
                    <div style="background: ${p}; color: white; padding: 30px; margin: -40px -40px 30px -40px;">
                        <h1 style="font-size: 34px; margin: 0 0 8px 0;">${d.fullName || 'Your Name'}</h1>
                        <h2 style="font-size: 20px; font-weight: normal; margin: 0; opacity: 0.9;">${d.jobTitle || 'Your Job Title'}</h2>
                    </div>
                    ${generateContactSection(d, s, a)}
                    ${generateSummarySection(d, p)}
                    ${generateExperienceSection(d, p, s)}
                    ${generateEducationSection(d, p, s)}
                    ${generateSkillsSection(d, p)}
                </div>
            `
        ],
        minimalist: [
            (d, p, s, a) => `
                <div style="font-family: 'Helvetica', sans-serif; max-width: 800px; margin: 0 auto; padding: 50px; background: white;">
                    <h1 style="color: ${p}; font-size: 28px; margin: 0 0 5px 0; font-weight: 300;">${d.fullName || 'Your Name'}</h1>
                    <h2 style="color: ${s}; font-size: 16px; font-weight: 300; margin: 0 0 20px 0;">${d.jobTitle || 'Your Job Title'}</h2>
                    <div style="border-top: 1px solid ${s}; padding-top: 20px; margin-bottom: 30px;">
                        ${d.email ? `<span style="color: ${s}; font-size: 13px; margin-right: 15px;">${d.email}</span>` : ''}
                        ${d.phone ? `<span style="color: ${s}; font-size: 13px; margin-right: 15px;">${d.phone}</span>` : ''}
                    </div>
                    ${generateSummarySection(d, p)}
                    ${generateExperienceSection(d, p, s)}
                    ${generateEducationSection(d, p, s)}
                    ${generateSkillsSection(d, p)}
                </div>
            `
        ]
    };
    
    const categoryLayouts = layouts[category] || layouts.modern;
    const layoutIndex = variant % categoryLayouts.length;
    return categoryLayouts[layoutIndex](data, primary, secondary, accent);
}

// Helper functions for generating sections
function generateContactSection(data, secondary, accent) {
    if (!data.email && !data.phone && !data.address) return '';
    return `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 25px; padding: 15px; background: ${accent}; border-radius: 8px;">
            ${data.email ? `<div style="color: ${secondary}; font-size: 14px;">📧 ${data.email}</div>` : ''}
            ${data.phone ? `<div style="color: ${secondary}; font-size: 14px;">📱 ${data.phone}</div>` : ''}
            ${data.address ? `<div style="color: ${secondary}; font-size: 14px;">📍 ${data.address}</div>` : ''}
            ${data.linkedin ? `<div style="color: ${secondary}; font-size: 14px;">🔗 LinkedIn</div>` : ''}
        </div>
    `;
}

function generateSummarySection(data, primary) {
    if (!data.summary) return '';
    return `
        <div style="margin-bottom: 25px;">
            <h3 style="color: ${primary}; font-size: 16px; margin-bottom: 12px; text-transform: uppercase;">Professional Summary</h3>
            <p style="line-height: 1.7; color: #374151; font-size: 14px;">${data.summary}</p>
        </div>
    `;
}

function generateExperienceSection(data, primary, secondary) {
    if (!data.experience || data.experience.length === 0) return '';
    return `
        <div style="margin-bottom: 25px;">
            <h3 style="color: ${primary}; font-size: 16px; margin-bottom: 15px; text-transform: uppercase;">Work Experience</h3>
            ${data.experience.map(exp => `
                <div style="margin-bottom: 18px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                        <h4 style="color: #1f2937; margin: 0; font-size: 14px; font-weight: 600;">${exp.position || ''}</h4>
                        <span style="color: ${secondary}; font-size: 12px;">${exp.startDate || ''} - ${exp.endDate || 'Present'}</span>
                    </div>
                    <p style="color: ${secondary}; margin: 0 0 8px 0; font-size: 13px;">${exp.company || ''}</p>
                    ${exp.description ? `<p style="color: #4b5563; line-height: 1.6; font-size: 13px;">${exp.description}</p>` : ''}
                </div>
            `).join('')}
        </div>
    `;
}

function generateEducationSection(data, primary, secondary) {
    if (!data.education || data.education.length === 0) return '';
    return `
        <div style="margin-bottom: 25px;">
            <h3 style="color: ${primary}; font-size: 16px; margin-bottom: 15px; text-transform: uppercase;">Education</h3>
            ${data.education.map(edu => `
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #1f2937; margin: 0 0 5px 0; font-size: 14px; font-weight: 600;">${edu.degree || ''}</h4>
                    <p style="color: ${secondary}; margin: 0; font-size: 13px;">${edu.institution || ''} • ${edu.year || ''}</p>
                </div>
            `).join('')}
        </div>
    `;
}

function generateSkillsSection(data, primary) {
    if (!data.skills || data.skills.length === 0) return '';
    return `
        <div style="margin-bottom: 20px;">
            <h3 style="color: ${primary}; font-size: 16px; margin-bottom: 15px; text-transform: uppercase;">Skills</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${data.skills.map(skill => `
                    <span style="background: ${primary}; color: white; padding: 6px 14px; border-radius: 15px; font-size: 12px;">${skill.name || ''}</span>
                `).join('')}
            </div>
        </div>
    `;
}

function generateSkillsSidebar(data) {
    if (!data.skills || data.skills.length === 0) return '';
    return `
        <div style="margin-top: 25px;">
            <h3 style="font-size: 16px; margin-bottom: 15px; border-bottom: 2px solid white; padding-bottom: 8px;">SKILLS</h3>
            ${data.skills.map(skill => `<p style="font-size: 13px; margin: 10px 0; padding: 8px; background: rgba(255,255,255,0.2); border-radius: 5px;">${skill.name || ''}</p>`).join('')}
        </div>
    `;
}
