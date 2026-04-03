
const PANELS = ['crop','pest','weather','schemes','calendar'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTHS_TA = ['ஜன','பிப','மார்','ஏப்','மே','ஜூன்','ஜூல்','ஆக','செப்','அக்','நவ','டிச'];
const CUR_M = 2;

const CROPS = [
  {group:'Cereals',type:'cereal',zones:['delta','western','south','north'],name:'Paddy (Kuruvai)',ta:'குறுவை நெல்',months:[{m:5,t:'nursery'},{m:6,t:'sow'},{m:7,t:'grow'},{m:8,t:'grow'},{m:9,t:'harvest'}],tip:'Kuruvai season. Best in delta. Use SRI method to cut water use by 30%.'},
  {group:'Cereals',type:'cereal',zones:['delta','western','south','north'],name:'Paddy (Samba)',ta:'சம்பா நெல்',months:[{m:7,t:'nursery'},{m:8,t:'sow'},{m:9,t:'grow'},{m:10,t:'grow'},{m:11,t:'grow'},{m:0,t:'harvest'},{m:1,t:'harvest'}],tip:'Main season paddy. Samba fetches the best price. Harvest Jan–Feb.'},
  {group:'Cereals',type:'cereal',zones:['western','south','north'],name:'Maize',ta:'மக்காச்சோளம்',months:[{m:5,t:'sow'},{m:6,t:'grow'},{m:7,t:'grow'},{m:8,t:'harvest'},{m:10,t:'sow'},{m:11,t:'grow'},{m:0,t:'grow'},{m:1,t:'harvest'}],tip:'Two crops/year. High demand from poultry industry. Ready in 90–100 days.'},
  {group:'Cereals',type:'cereal',zones:['western','south','north'],name:'Ragi',ta:'ராகி',months:[{m:5,t:'sow'},{m:6,t:'grow'},{m:7,t:'grow'},{m:8,t:'harvest'},{m:9,t:'sow'},{m:10,t:'grow'},{m:11,t:'grow'},{m:0,t:'harvest'}],tip:'Drought-tolerant. Minimal inputs. Growing urban health food demand.'},
  {group:'Cash crops',type:'cash',zones:['western','south'],name:'Sugarcane',ta:'கரும்பு',months:[{m:0,t:'sow'},{m:1,t:'sow'},{m:2,t:'grow'},{m:3,t:'grow'},{m:4,t:'grow'},{m:5,t:'grow'},{m:6,t:'grow'},{m:7,t:'grow'},{m:8,t:'grow'},{m:9,t:'grow'},{m:10,t:'grow'},{m:11,t:'harvest'}],tip:'Plant Jan–Feb for Dec harvest. Ratoon crop saves 40% input cost vs replanting.'},
  {group:'Cash crops',type:'cash',zones:['western','south','north'],name:'Cotton',ta:'பருத்தி',months:[{m:5,t:'sow'},{m:6,t:'grow'},{m:7,t:'grow'},{m:8,t:'grow'},{m:9,t:'harvest'},{m:10,t:'harvest'},{m:11,t:'harvest'}],tip:'Kharif crop. Intercrop with green gram to fix soil nitrogen.'},
  {group:'Cash crops',type:'cash',zones:['western','south'],name:'Turmeric',ta:'மஞ்சள்',months:[{m:4,t:'sow'},{m:5,t:'grow'},{m:6,t:'grow'},{m:7,t:'grow'},{m:8,t:'grow'},{m:9,t:'grow'},{m:10,t:'grow'},{m:11,t:'grow'},{m:0,t:'harvest'},{m:1,t:'harvest'}],tip:'Plant May–June. Harvest after 8–9 months. Erode district premium turmeric market.'},
  {group:'Pulses & Oilseeds',type:'pulse',zones:['western','south','north','delta'],name:'Groundnut',ta:'நிலக்கடலை',months:[{m:5,t:'sow'},{m:6,t:'grow'},{m:7,t:'grow'},{m:8,t:'harvest'},{m:10,t:'sow'},{m:11,t:'grow'},{m:0,t:'grow'},{m:1,t:'harvest'}],tip:'Fixes nitrogen — no fertilizer needed after groundnut. Two seasons possible.'},
  {group:'Pulses & Oilseeds',type:'pulse',zones:['western','south','north'],name:'Black gram (Urad)',ta:'உளுந்து',months:[{m:5,t:'sow'},{m:6,t:'grow'},{m:7,t:'harvest'},{m:9,t:'sow'},{m:10,t:'grow'},{m:11,t:'harvest'}],tip:'Short 70–80 days. Excellent intercrop with sugarcane. Improves soil health.'},
  {group:'Pulses & Oilseeds',type:'pulse',zones:['western','south','north'],name:'Sesame',ta:'எள்',months:[{m:5,t:'sow'},{m:6,t:'grow'},{m:7,t:'grow'},{m:8,t:'harvest'}],tip:'Drought-tolerant. Very low input cost. High oil content varieties fetch premium price.'},
  {group:'Vegetables',type:'vegetable',zones:['western','south','north'],name:'Tomato',ta:'தக்காளி',months:[{m:5,t:'nursery'},{m:6,t:'sow'},{m:7,t:'grow'},{m:8,t:'harvest'},{m:9,t:'nursery'},{m:10,t:'sow'},{m:11,t:'grow'},{m:0,t:'harvest'}],tip:'Two crops/year. Time harvest for Oct–Nov or Feb–Apr to avoid peak glut.'},
  {group:'Vegetables',type:'vegetable',zones:['western','south','north'],name:'Brinjal',ta:'கத்தரிக்காய்',months:[{m:5,t:'nursery'},{m:6,t:'sow'},{m:7,t:'grow'},{m:8,t:'harvest'},{m:9,t:'harvest'},{m:10,t:'nursery'},{m:11,t:'sow'},{m:0,t:'grow'},{m:1,t:'harvest'}],tip:'Year-round with proper irrigation. Pusa Purple Long variety gives high yield.'},
  {group:'Vegetables',type:'vegetable',zones:['western','south','north'],name:'Okra (Bhindi)',ta:'வெண்டைக்காய்',months:[{m:1,t:'sow'},{m:2,t:'grow'},{m:3,t:'harvest'},{m:5,t:'sow'},{m:6,t:'grow'},{m:7,t:'harvest'}],tip:'Quick 45–60 days. Good market price in summer. Tolerates mild drought.'},
  {group:'Fruits',type:'fruit',zones:['western','south'],name:'Banana',ta:'வாழைப்பழம்',months:[{m:5,t:'sow'},{m:6,t:'grow'},{m:7,t:'grow'},{m:8,t:'grow'},{m:9,t:'grow'},{m:10,t:'grow'},{m:11,t:'grow'},{m:0,t:'grow'},{m:1,t:'grow'},{m:2,t:'harvest'}],tip:'Plant June–July, harvest in 11–12 months. Drip irrigation saves 50% water.'},
  {group:'Fruits',type:'fruit',zones:['south','western'],name:'Coconut',ta:'தேங்காய்',months:[{m:5,t:'sow'},{m:6,t:'grow'},{m:7,t:'grow'},{m:8,t:'grow'},{m:9,t:'grow'},{m:10,t:'grow'},{m:11,t:'grow'},{m:0,t:'grow'},{m:1,t:'grow'},{m:2,t:'grow'},{m:3,t:'grow'},{m:4,t:'grow'}],tip:'Plant June–September. Intercrop with vegetables in early years for income.'},
];

function showPanel(id) {
  PANELS.forEach((p,i) => {
    document.getElementById('panel-'+p).classList.remove('active');
    document.querySelectorAll('.feat-btn')[i].classList.remove('active');
  });
  document.getElementById('panel-'+id).classList.add('active');
  document.querySelectorAll('.feat-btn')[PANELS.indexOf(id)].classList.add('active');
  if (id === 'calendar') renderCal();
}

function setLang(lang) {
  document.querySelectorAll('.lang-btn').forEach((b,i) => b.classList.toggle('active',['both','en','ta'][i]===lang));
  document.querySelectorAll('.feat-label-ta,.ta-lbl').forEach(el => el.style.display = lang==='en'?'none':'');
}

function setLoading(btnId,respId,textId,on) {
  document.getElementById(btnId).disabled = on;
  const box = document.getElementById(respId);
  if (on) { box.classList.add('visible'); document.getElementById(textId).innerHTML = '<span class="loading-dots"><span></span><span></span><span></span></span>'; }
  else { box.classList.remove('visible'); }
}

function renderResp(textId, content) {
  document.getElementById(textId).innerHTML = content
    .replace(/\n\n/g,'<br><br>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\*(.*?)\*/g,'<em>$1</em>');
}

async function callGemini(sys, msg, textId, btnId, respId) {
  setLoading(btnId, respId, textId, true);
  document.getElementById(respId).classList.add('visible');
  document.getElementById(textId).innerHTML = '<span class="loading-dots"><span></span><span></span><span></span></span>';
  try {
    const apiKey = "AIzaSyDhZZxx8GgTEHLbdywasDEzbCR9ZzqqxaU"; // Replace with your actual Google API key
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        systemInstruction: {parts: [{text: sys}]},
        contents: [{parts: [{text: msg}]}],
        generationConfig: {maxOutputTokens: 1000}
      })
    });
    const data = await res.json();
    if (data.error) {
      document.getElementById(textId).innerHTML = '<em style="color:var(--c400)">Error: ' + (data.error.message || 'Unknown error') + '</em>';
    } else {
      const text = data.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('')||'Unable to get response.';
      renderResp(textId, text);
    }
  } catch(e) {
    document.getElementById(textId).innerHTML = '<em style="color:var(--c400)">Connection error. Please try again.</em>';
  }
  document.getElementById(btnId).disabled = false;
}

async function callGeminiWithVision(sys, msg, base64Image, mimeType, textId, btnId, respId) {
  setLoading(btnId, respId, textId, true);
  document.getElementById(respId).classList.add('visible');
  document.getElementById(textId).innerHTML = '<span class="loading-dots"><span></span><span></span><span></span></span>';
  try {
    const apiKey = "AIzaSyDhZZxx8GgTEHLbdywasDEzbCR9ZzqqxaU"; // Replace with your actual Google API key
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        systemInstruction: {parts: [{text: sys}]},
        contents: [{
          parts: [
            {text: msg},
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Image
              }
            }
          ]
        }],
        generationConfig: {maxOutputTokens: 1000}
      })
    });
    const data = await res.json();
    if (data.error) {
      document.getElementById(textId).innerHTML = '<em style="color:var(--c400)">Error: ' + (data.error.message || 'Unknown error') + '</em>';
    } else {
      const text = data.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('')||'Unable to get response.';
      renderResp(textId, text);
    }
  } catch(e) {
    document.getElementById(textId).innerHTML = '<em style="color:var(--c400)">Connection error. Please try again.</em>';
  }
  document.getElementById(btnId).disabled = false;
}

function askCrop() {
  const sys = `You are an expert agricultural advisor for Tamil Nadu, India. Help small farmers (under 5 acres) maximize productivity WITHOUT increasing costs. Give practical advice suited to Tamil Nadu's climate. Always suggest low-cost or free alternatives. Include Tamil translations for key terms. Prioritize organic/biological methods over chemicals.`;
  const msg = `District: ${document.getElementById('crop-district').value}\nSoil: ${document.getElementById('crop-soil').value}\nLand: ${document.getElementById('crop-land').value} acres\nWater: ${document.getElementById('crop-water').value}\nPrevious crop: ${document.getElementById('crop-prev').value||'not specified'}\nConcern: ${document.getElementById('crop-concern').value||'none'}\n\nRecommend: (1) Best crops for next season, (2) Low-cost soil improvement steps, (3) One key productivity tip.`;
  callGemini(sys, msg, 'crop-response-text','crop-btn','crop-response');
}

function askPest() {
  const fileInput = document.getElementById('pest-photo');
  
  // Check if image is uploaded
  if (fileInput && fileInput.files && fileInput.files.length > 0) {
    // Image is uploaded - use Vision API
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const base64Image = e.target.result.split(',')[1]; // Remove data:image/...;base64, prefix
      const mimeType = file.type || 'image/jpeg';
      const symptoms = document.getElementById('pest-symptoms').value || 'general';
      
      const sys = `You are a plant pathologist specializing in Tamil Nadu agriculture. Analyze the uploaded image and symptoms. Prioritize CHEAP or FREE biological/organic treatments. Suggest homemade remedies (neem oil, panchagavya, buttermilk spray) wherever applicable. Include Tamil names for pests/diseases. First identify the pest/disease from the image, then give treatment.`;
      
      const msg = `Crop: ${document.getElementById('pest-crop').value||'unspecified'}\nStage: ${document.getElementById('pest-stage').value}\nSymptoms: ${symptoms}\nArea affected: ${document.getElementById('pest-area').value}\n\nAnalyze the photo and identify the pest/disease. Suggest 2–3 low-cost treatments and prevention methods.`;
      
      callGeminiWithVision(sys, msg, base64Image, mimeType, 'pest-response-text', 'pest-btn', 'pest-response');
    };
    
    reader.readAsDataURL(file);
  } else {
    // No image - use regular text API
    const sys = `You are a plant pathologist specializing in Tamil Nadu agriculture. Prioritize CHEAP or FREE biological/organic treatments. Suggest homemade remedies (neem oil, panchagavya, buttermilk spray) wherever applicable. Include Tamil names for pests/diseases. First name the issue, then give treatment.`;
    const msg = `Crop: ${document.getElementById('pest-crop').value||'unspecified'}\nStage: ${document.getElementById('pest-stage').value}\nSymptoms: ${document.getElementById('pest-symptoms').value||'general'}\nArea affected: ${document.getElementById('pest-area').value}\n\nIdentify pest/disease, suggest 2–3 low-cost treatments, advise on prevention.`;
    callGemini(sys, msg, 'pest-response-text','pest-btn','pest-response');
  }
}

function askWeather() {
  const sys = `You are a farm planning expert for Tamil Nadu. Current: Northeast monsoon active (March 2026), Coimbatore region, 27°C, 74% humidity, 18mm rainfall last 7 days. Give practical activity schedules. Warn about weather risks. Suggest how to use monsoon water efficiently.`;
  const msg = `Crop: ${document.getElementById('wx-crop').value||'mixed crops'}\nPlanning: ${document.getElementById('wx-period').value}\nRegion: Coimbatore/Western Tamil Nadu\n\nGive a concise farm activity schedule with weather-specific tips to protect crop and save input costs.`;
  callGemini(sys, msg, 'wx-response-text','wx-btn','wx-response');
}

function askSchemes() {
  const sys = `You are a government scheme advisor for Tamil Nadu farmers. Know all central and state agricultural schemes. Explain eligibility simply. Provide step-by-step application guidance. Suggest cost-saving practices. Mention free government services. Include key Tamil terms.`;
  const msg = document.getElementById('scheme-query').value || 'What government schemes are available for Tamil Nadu farmers?';
  callGemini(sys, msg, 'scheme-response-text','scheme-btn','scheme-response');
}

function renderCal() {
  const zone = document.getElementById('cal-zone').value;
  const type = document.getElementById('cal-type').value;
  const crops = CROPS.filter(c => (zone==='all'||c.zones.includes(zone)) && (type==='all'||c.type===type));

  const hdr = document.getElementById('cal-month-header');
  hdr.innerHTML = '<div></div>' + MONTHS.map((m,i) =>
    `<div class="month-lbl${i===CUR_M?' cur':''}">${m}<br><span style="font-family:'Noto Serif Tamil',sans-serif;font-size:8px">${MONTHS_TA[i]}</span></div>`
  ).join('');

  const body = document.getElementById('cal-body');
  body.innerHTML = '';
  let lastGroup = '';

  crops.forEach(crop => {
    if (crop.group !== lastGroup) {
      lastGroup = crop.group;
      const sec = document.createElement('div');
      sec.className = 'cal-section-row';
      sec.innerHTML = `<div class="cal-section-title">${crop.group}</div>`;
      body.appendChild(sec);
    }
    const row = document.createElement('div');
    row.className = 'crop-row';
    const nc = document.createElement('div');
    nc.className = 'crop-name';
    nc.innerHTML = `${crop.name}<span class="crop-name-ta">${crop.ta}</span>`;
    row.appendChild(nc);

    for (let m = 0; m < 12; m++) {
      const entry = crop.months.find(x => x.m === m);
      const cell = document.createElement('div');
      if (!entry) {
        cell.className = 'ccell-empty';
      } else {
        const prev = crop.months.find(x => x.m === m-1);
        const next = crop.months.find(x => x.m === m+1);
        let rClass = '';
        if (!prev && !next) rClass = 'rb';
        else if (!prev) rClass = 'rl';
        else if (!next) rClass = 'rr';
        cell.className = `ccell ccell-${entry.t} ${rClass}${m===CUR_M?' cur-bar':''}`;
        cell.addEventListener('click', () => showCalTip(crop, m, entry.t));
      }
      row.appendChild(cell);
    }
    body.appendChild(row);
  });
}

function showCalTip(crop, month, type) {
  const tip = document.getElementById('cal-tip');
  const labels = {sow:'Sowing month',grow:'Growing phase',harvest:'Harvest time',nursery:'Nursery phase',ratoon:'Ratoon crop'};
  document.getElementById('ctt-crop').textContent = crop.name;
  document.getElementById('ctt-ta').textContent = crop.ta;
  document.getElementById('ctt-body').innerHTML = `<strong>${MONTHS[month]}:</strong> ${labels[type]}<br><br>${crop.tip}`;
  tip.classList.add('show');
}

document.addEventListener('click', e => {
  if (!e.target.classList.contains('ccell')) {
    const t = document.getElementById('cal-tip');
    if (t && !t.contains(e.target)) t.classList.remove('show');
  }
});

renderCal();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}