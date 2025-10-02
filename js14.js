// script.js

// กำหนดขั้นตอนต่างๆ ในการเล่าเรื่อง (Story Flow)
const storySteps = [
    // START
    { type: 'text', content: 'เว็บไซต์นี้สร้างขึ้นเพื่อเป็นพื้นที่ให้กำลังใจคนที่กำลังเหนื่อยกับการเรียนหรือหมดไฟกับอนาคต' },
    { type: 'text', content: 'วันนี้ก็เป็นแค่วันธรรมดาอีกวันหนึ่งของการตามหาความฝันของใครหลายคน...' },
    
    // DREAM INPUT (Q1) - **ปรับคำพูด**
    { type: 'input', content: 'เธอมีความฝันอยากทำอะไร? เล่าให้เราฟังได้นะ', inputId: 'dream' },
    { type: 'text', content: 'ว้าว! สิ่งที่เธออยากทำมันมหัศจรรย์มากเลยนะ' },
    { type: 'text', content: 'ความฝันอันยิ่งใหญ่ในชีวิต' },
    
    // EXHAUSTION INPUT (Q2) - **ปรับคำพูด**
    { type: 'text', content: 'แล้ววันนี้... เธอเจออะไรที่ทำให้เหนื่อยหรือทุกข์ใจมั้ย?' },
    { type: 'input', content: 'หรือถ้าเธอรู้สึกเหนื่อยหรือท้อแท้กับอนาคต... ปล่อยมันออกมาตรงนี้ได้เลย เราพร้อมรับฟัง', inputId: 'exhaustion' }, 
    
    // EMPATHY - **ปรับคำพูด**
    { type: 'text', content: 'ขอบคุณนะที่ไว้ใจเล่าให้เราฟัง เธอคงแบกรับความรู้สึกนี้คนเดียวมาตลอดสินะ' },
    { type: 'text', content: 'ไม่เป็นไรนะ เราจะอยู่ตรงนี้ข้างๆ เธอเอง' },
    { type: 'text', content: 'ในวันที่เธอท้อแท้หรือรู้สึกหมดแรง' },
    { type: 'text', content: 'เธอไม่ต้องพยายามฝืนตัวเองมากไปหรอกนะ' },
    { type: 'text', content: 'เธอลองแหงนหน้ามองท้องฟ้าดูสิ...' },
    
    // CHOICE: SKY (Q3)
    { 
        type: 'choice', 
        content: 'วันนี้ท้องฟ้าที่เธอเห็นเป็นยังไงบ้าง?', 
        choices: [
            { text: '1. แดดจ้า ☀️', value: 'sun', nextStep: 14 },
            { text: '2. ฝนกำลังจะตก/ตกอยู่ 🌧️', value: 'rain', nextStep: 14 },
            { text: '3. ท้องฟ้าสดใส/ครึ้มๆ ✨', value: 'clear', nextStep: 14 }
        ],
        inputId: 'sky'
    },
    
    // CHOICE: FEELING (Q4)
    { 
        type: 'choice', 
        content: 'เธอรู้สึกดีขึ้นมั้ย?', 
        choices: [
            { text: '1. ดีขึ้นนิดหน่อย 😊', value: 'better', nextStep: 15 },
            { text: '2. ยังไม่ดีขึ้นเลย 🥺', value: 'not_better', nextStep: 15 }
        ],
        inputId: 'feel'
    },
    
    // SKY COMPARISON
    { type: 'text', content: 'เห็นมั้ย... ท้องฟ้าในแต่ละวันก็ไม่เหมือนกันสักวันหรอก' }, 
    { type: 'text', content: 'บางวันก็มีแดดออก' },
    { type: 'text', content: 'บางวันก็ปกคลุมไปด้วยเม็ดฝน' },
    { type: 'text', content: 'บางวันท้องฟ้าก็สดใส' },
    
    // SELF-COMPARISON
    { type: 'text', content: 'เช่นเดียวกับตัวเธอเอง...' },
    { type: 'text', content: 'บางวันก็มีเศร้าบ้าง' },
    { type: 'text', content: 'บางวันก็มีร้องไห้บ้าง' },
    { type: 'text', content: 'บางวันก็มีความสุขมาก' },
    
    // FINAL BOOST
    { type: 'text', content: 'เธออย่าคิดมากไปเลยนะ' },
    { type: 'text', content: 'พักบ้างถ้าเหนื่อย' },
    { type: 'text', content: 'ไม่ต้องฝืนตัวเองนะ' },
    { type: 'text', content: 'หาของอร่อยๆกิน ให้รางวัลตัวเอง' },
    { type: 'text', content: 'เราเชื่อว่าเธอจะก้าวผ่านช่วงเวลานี้ไปได้อย่างแน่นอน' },
    { type: 'text', content: 'สู้ๆ นะ เราเป็นกำลังใจให้เธออยู่ตรงนี้  ' }, 

    // FINAL BUTTON
    { type: 'final_button', content: 'พร้อมรับกำลังใจ' }
];

let currentStepIndex = 0;
let userResponses = {}; 
let appContent;
let clickOverlay;
let mainContainer;

// ข้อความให้กำลังใจสำหรับแชร์ (สุ่ม)
const shareQuotes = [
    "“เธอไม่ได้อยู่คนเดียวนะ เราอยู่ข้างเธอเสมอ”",
    "“ไม่ต้องฝืนหรอกนะ พักบ้างนะคนเก่ง”",
    "“ยิ้มเยอะๆ นะคนเก่ง! เราเชื่อว่าเธอจะก้าวผ่านมันไปด้วยดี”",
    "“ท้องฟ้าในแต่ละวันยังไม่เหมือนกันเลย เธอเองก็มีวันที่เศร้าและสุขได้”",
    "“ไม่ต้องเก่งที่สุดก็ได้ แค่ไม่หยุดพยายามก็เก่งมากแล้ว”", 
    "“ถึงจะท้อ แต่ขอให้เธออย่าหมดหวังในตัวเองเลยนะ”" ,
    "“เธอไม่ได้เดินคนเดียวหรอก ยังมีคนเอาใจช่วยอยู่ตรงนี้”",
    "“สิ่งที่เธอทำตอนนี้ แม้เล็กน้อย แต่มันพาเธอไปสู่อนาคตได้แน่นอน”",
    "“เหนื่อยแล้วพักก่อนก็ได้ พรุ่งนี้ค่อยเริ่มใหม่”",
    "“ไม่เป็นไรนะ…วันนี้แค่ผ่านมาได้ก็คือเก่งแล้ว”",
    "“บางวันเราเดินช้า แต่ไม่เคยหยุดเดินก็ยังไปถึง”",
    "“ไม่ต้องรีบเก่งที่สุด แค่พยายามทุกวันก็เพียงพอ”",
    "“ไม่ต้องเปรียบเทียบตัวเองกับใคร เดินในจังหวะของตัวเองก็พอ”",
    "“อย่าโทษตัวเองที่เหนื่อย…ใครๆ ก็มีวันที่อ่อนแอเหมือนกัน”",
    "“แม้วันนี้มันหนัก แต่ทุกย่างก้าวยังมีค่าเสมอ”",
    "“เธออาจยังไม่เห็นความสำเร็จ แต่ทุกการเรียนรู้เก็บเป็นพลังในอนาคต”",
    "“ท้อได้ แต่อย่าหมดหวัง เพราะความฝันยังรออยู่ข้างหน้า”",
    "“ขอให้เธอเชื่อใจตัวเอง…เธอเก่งมากกว่าที่คิด”"
];
          
function getRandomShareQuote() {
    const index = Math.floor(Math.random() * shareQuotes.length);
    return shareQuotes[index];
}

// -------------------------------------
// Function: จัดการการแสดงผล
// -------------------------------------
// 📌 ทำให้ฟังก์ชันเหล่านี้เป็น Global เพื่อให้ HTML (ใน index.html) สามารถเรียกใช้ได้
window.handleInputSubmission = function(inputId, nextStepIndex) {
    const inputElement = document.getElementById(inputId);
    
    if (!inputElement || inputElement.value.trim() === '') {
        alert('กรุณาพิมพ์คำตอบของคุณก่อนนะ');
        return;
    }

    userResponses[inputId] = inputElement.value.trim();
    goToNextStep(nextStepIndex);
}

window.handleChoiceSubmission = function(inputId, value, nextStepIndex) {
    userResponses[inputId] = value;
    goToNextStep(nextStepIndex);
}

window.shareToClipboard = function(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert('คัดลอกข้อความเรียบร้อยแล้ว! นำไปวางใน Story หรือโพสต์ได้เลย 😉');
        }).catch(err => {
            prompt("ข้อความสำหรับแชร์ (กรุณาคัดลอกด้วยตนเอง):", text);
        });
    } else {
        prompt("ข้อความสำหรับแชร์ (กรุณาคัดลอกด้วยตนเอง):", text);
    }
}


function renderStep(step) {
    let htmlContent = '';
    
    const isClickable = step.type === 'text' || step.type === 'final_button';
    if (isClickable) {
        clickOverlay.style.display = 'block';
        mainContainer.classList.add('clickable');
    } else {
        clickOverlay.style.display = 'none';
        mainContainer.classList.remove('clickable');
    }

    if (step.type === 'text') {
        htmlContent = `<p class="main-text">${step.content}</p>`;
    } 
    else if (step.type === 'input') {
        // **ปรับขนาดฟอนต์ให้ Input Text ดูเป็นมิตรขึ้น**
        htmlContent = `
            <p class="main-text" style="font-size: 1.8rem;">${step.content}</p>
            <div class="input-area">
                <textarea id="${step.inputId}" placeholder="พิมพ์คำตอบของคุณที่นี่..." autofocus></textarea>
            </div>
            <button class="button-primary" onclick="window.handleInputSubmission('${step.inputId}', ${currentStepIndex + 1})">ไปต่อ</button>
        `;
    }
    else if (step.type === 'choice') {
        let optionsHtml = step.choices.map(choice => 
            // 📌 เรียกใช้ window.handleChoiceSubmission()
            `<button class="option-button" onclick="window.handleChoiceSubmission('${step.inputId}', '${choice.value}', ${choice.nextStep || currentStepIndex + 1})">${choice.text}</button>`
        ).join('');
        
        htmlContent = `
            <p class="main-text" style="font-size: 1.8rem;">${step.content}</p>
            <div class="option-button-group">${optionsHtml}</div>
        `;
    }
    else if (step.type === 'final_button') {
        htmlContent = `
            <p class="main-text" style="font-size: 1.8rem;">ยิ้มเยอะๆ นะคนเก่ง 😊</p> 
            <button class="button-primary" onclick="showFinalScreen()">รับกำลังใจจากเรา</button>
        `;
        clickOverlay.style.display = 'none'; 
    }
    else if (step.type === 'final') {
        showFinalScreen();
        return;
    }

    appContent.innerHTML = htmlContent;
}

// -------------------------------------
// Function: จัดการการเปลี่ยนขั้นตอน (พร้อม Animation)
// -------------------------------------
function goToNextStep(nextIndex) {
    const nextStepIndex = nextIndex !== undefined ? nextIndex : currentStepIndex + 1;

    if (nextStepIndex >= storySteps.length) {
        if (storySteps[storySteps.length - 1].type !== 'final_button') {
            currentStepIndex = storySteps.length - 1; 
            renderStep(storySteps[currentStepIndex]);
            appContent.classList.add('visible');
            return;
        }
        return;
    }

    appContent.classList.remove('visible'); 

    setTimeout(() => {
        currentStepIndex = nextStepIndex;
        renderStep(storySteps[currentStepIndex]);
        appContent.classList.add('visible'); 
    }, 500); 
}

// -------------------------------------
// Function: หน้าสุดท้าย (จดหมายกำลังใจ + แชร์)
// -------------------------------------
function showFinalScreen() {
    const finalQuote = getRandomShareQuote();
    const shareText = `วันนี้ฉันได้พลังใจจากเว็บไซต์นี้: ${finalQuote} #พลังใจ #สู้ต่อไป #เราอยู่ข้างคุณ`;
    
    clickOverlay.style.display = 'none'; 
    mainContainer.classList.remove('clickable');

    appContent.classList.remove('visible'); 

    setTimeout(() => {
        // เนื้อหาจดหมาย - **แก้ไขตามที่คุณต้องการ**
        const letterContent = `
            <p style="font-weight: 600; font-size: 1.3rem;">จดหมายถึงคนเก่งของวันนี้ 💖</p>
            <p>เราได้ฟังเรื่องราวของเธอแล้วนะ</p>
            <p>ความรู้สึกของคุณมีค่ามาก และความอ่อนแอในวันนี้จะทำให้คุณแข็งแกร่งขึ้นในวันหน้า</p>
            <p><strong>จำไว้ว่า: ท้องฟ้ามีหลายสีสัน ชีวิตคุณก็เช่นกัน</strong></p>
            `;
        
        appContent.innerHTML = `
            <p class="main-text" style="font-size: 1.5rem; min-height: auto;">จดหมายกำลังใจจากเรา</p>
            <div class="letter-box">
                ${letterContent}
                <p style="font-weight: 600; margin-top: 15px;">กำลังใจพิเศษ: ${finalQuote}</p>
            </div>
            <button class="button-primary" onclick="window.shareToClipboard('${shareText}')">
                แชร์ข้อความกำลังใจนี้ไปลง Story 📋
            </button>
        `;
        appContent.classList.add('visible');
    }, 500);
}


// -------------------------------------
// Function: เริ่มต้นแอปเมื่อ DOM โหลดเสร็จแล้ว
// -------------------------------------
document.addEventListener('DOMContentLoaded', (event) => {
    appContent = document.getElementById('app-content');
    clickOverlay = document.getElementById('click-overlay');
    mainContainer = document.getElementById('main-container');

    // ผูก Event listener สำหรับการคลิกเพื่อเปลี่ยนข้อความ
    clickOverlay.addEventListener('click', () => {
        // ให้ทำงานเฉพาะเมื่อขั้นตอนปัจจุบันเป็น 'text' เท่านั้น
        if (storySteps[currentStepIndex].type === 'text') {
            goToNextStep();
        }
    });

    // เริ่มต้นที่ขั้นตอนแรก
    renderStep(storySteps[currentStepIndex]);
    appContent.classList.add('visible'); 
});