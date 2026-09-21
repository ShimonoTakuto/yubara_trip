/* A dependency-free travel notebook. All place information comes from data.js. */
const categories = [
  { id: 'food', name: 'グルメ', sub: 'おいしい寄り道', en: 'TASTE', color: 'rust', icon: 'food' },
  { id: 'spots', name: 'スポット', sub: '湯のまちを、ぶらり', en: 'EXPLORE', color: 'sage', icon: 'mountain' },
  { id: 'stay', name: '宿', sub: 'お宿と、四つの湯', en: 'STAY', color: 'ochre', icon: 'inn' },
  { id: 'onsen', name: '温泉', sub: 'ゆっくり、ほっと', en: 'RELAX', color: 'blue', icon: 'bath' },
  { id: 'parking', name: '駐車場', sub: 'まち歩きの出発点', en: 'ARRIVE', color: 'olive', icon: 'car' },
  { id: 'katsuyama', name: '勝山町並み保存地区', sub: 'のれんをくぐる旅', en: 'WANDER', color: 'plum', icon: 'street' }
];
const drawings = {
 food: '<path d="M22 47h56q-3 24-28 24T22 47Z"/><path d="M19 43h62M38 76h24M66 20 31 36m40-9L34 41"/><path d="M41 23q-6-6 0-12m12 10q-6-6 0-12"/>',
 mountain: '<circle cx="73" cy="23" r="9"/><path d="M11 65 37 24l30 41M50 65l17-27 22 27M28 38l9 7 8-7M15 77q17-10 34 0t35 0"/><path d="M19 58v-9m-5 5h10"/>',
 inn: '<path d="m13 38 37-23 37 23M20 38h60v40H20ZM12 79h76M34 79V52h32v27M50 52v27M31 40h38"/><path d="M37 22v-9h26v9M26 47v9m48-9v9"/><path d="M42 59h4m8 0h4"/>',
 bath: '<path d="M15 52q35-15 70 0v18q-35 20-70 0ZM15 53q35 20 70 0M28 48q22-8 44 0M35 34q-10-9 0-17m15 19q-10-9 0-22m15 20q-10-9 0-17"/><path d="M24 65v8m14-4v9m25-9v9m13-13v8"/>',
 car: '<path d="m20 47 9-23h42l9 23M14 48h72v24H14ZM24 73v8h11v-8m30 0v8h11v-8M30 47l5-15h30l5 15M40 65h20"/><circle cx="27" cy="59" r="4"/><circle cx="73" cy="59" r="4"/><path d="M8 42h9m66 0h9"/>',
 street: '<path d="M11 80h78M18 80V31h64v49M12 31l11-14h54l11 14M27 40h46v22H27ZM27 80V62m23-22v22m23 0v18M35 62v18m29-18v18M20 23h60"/><path d="M28 41v17q5 5 11 0 5 5 11 0 5 5 11 0 5 5 11 0M36 25h28"/>'
};
const main = document.getElementById('main');
const icon = (kind, cls = '') => `<svg class="line-icon ${cls}" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${drawings[kind]}</svg>`;
const arrow = '<span aria-hidden="true">↗</span>';
const esc = str => String(str).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const scheduleKey = 'yubara-schedule';
const scheduleTimes = Array.from({length: 31}, (_, index) => {
 const minutes = 7 * 60 + index * 30;
 return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
});
let schedule = readSchedule();

function readSchedule() {
 try { return JSON.parse(localStorage.getItem(scheduleKey)) || []; }
 catch { return []; }
}

function saveSchedule() {
 localStorage.setItem(scheduleKey, JSON.stringify(schedule));
}

function placeById(id) {
 const [categoryId, index] = id.split(':');
 const category = categories.find(item => item.id === categoryId);
 return category ? {category, place: TRIP_DATA[categoryId][Number(index)]} : null;
}

function timeOptions(selected) {
 return scheduleTimes.map(time => `<option value="${time}" ${time === selected ? 'selected' : ''}>${time}</option>`).join('');
}

function dayOptions(selected) {
 return `<option value="tue" ${selected === 'tue' ? 'selected' : ''}>1日目（火）</option><option value="wed" ${selected === 'wed' ? 'selected' : ''}>2日目（水）</option>`;
}

function scheduleMarkup() {
 const dayMarkup = (day, label) => `<section class="schedule-day"><div class="schedule-day-heading"><div><span class="eyebrow">${day === 'tue' ? 'DAY 01' : 'DAY 02'}</span><h3>${label}</h3></div><span>${schedule.filter(item => item.day === day).length}件</span></div><div class="schedule-track">${schedule.filter(item => item.day === day).sort((a,b) => a.start.localeCompare(b.start)).map(item => {
  const found = item.custom ? {category: {name: '自由入力'}, place: {name: item.title}} : placeById(item.placeId);
   if (!found) return '';
  return `<article class="schedule-item"><div class="schedule-time"><select data-schedule-id="${item.id}" data-field="day" aria-label="日程">${dayOptions(item.day)}</select><select data-schedule-id="${item.id}" data-field="start" aria-label="開始時刻">${timeOptions(item.start)}</select><span>〜</span><select data-schedule-id="${item.id}" data-field="end" aria-label="終了時刻">${timeOptions(item.end)}</select></div><div class="schedule-item-main"><span>${esc(found.category.name)}</span><strong>${esc(found.place.name)}</strong></div><button class="schedule-remove" type="button" data-remove-schedule="${item.id}" aria-label="${esc(found.place.name)}を予定から削除">×</button></article>`;
 }).join('') || '<p class="schedule-empty">カードを追加すると、ここに予定が並びます。</p>'}</div></section>`;
 return `<section class="schedule-section" id="schedule" aria-labelledby="schedule-title"><div class="section-heading schedule-heading"><div><p class="eyebrow">旅の予定表</p><h2 id="schedule-title">火曜と水曜、どこへ行く？</h2></div><span class="section-counter">7:00 — 22:00</span></div><p class="schedule-lead">気になるカードを追加して、時間を並べ替えよう。</p><details class="custom-schedule"><summary>＋ 自由入力で予定を追加</summary><form id="custom-schedule-form"><label>予定名<input name="title" type="text" placeholder="例：ホテルにチェックイン" required maxlength="80"></label><label>日程<select name="day">${dayOptions('tue')}</select></label><div class="custom-time"><label>開始<select name="start">${timeOptions('09:00')}</select></label><span>〜</span><label>終了<select name="end">${timeOptions('10:00')}</select></label></div><button type="submit">予定を追加</button></form></details><div class="schedule-days">${dayMarkup('tue', '1日目　火')}${dayMarkup('wed', '2日目　水')}</div></section>`;
}

function renderSchedule() {
 const scheduleRoot = document.getElementById('schedule');
 if (scheduleRoot) scheduleRoot.outerHTML = scheduleMarkup();
}

function addToSchedule(placeId) {
 const found = placeById(placeId);
 if (!found || schedule.some(item => item.placeId === placeId)) return;
 const day = found.place.tue === '×' && found.place.wed !== '×' ? 'wed' : 'tue';
 const dayItems = schedule.filter(item => item.day === day);
 const start = scheduleTimes[Math.min(dayItems.length * 2, scheduleTimes.length - 3)];
 const end = scheduleTimes[scheduleTimes.indexOf(start) + 2];
 schedule.push({id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, placeId, day, start, end, custom: false});
 saveSchedule();
 renderSchedule();
}

function addCustomSchedule(title, day, start, end) {
 const dayItems = schedule.filter(item => item.day === day);
 const defaultStart = scheduleTimes[Math.min(dayItems.length * 2, scheduleTimes.length - 3)];
 const startIndex = scheduleTimes.indexOf(start || defaultStart);
 const safeStart = startIndex >= 0 ? scheduleTimes[startIndex] : defaultStart;
 const endIndex = scheduleTimes.indexOf(end);
 const safeEnd = endIndex > startIndex ? scheduleTimes[endIndex] : scheduleTimes[Math.min(startIndex + 2, scheduleTimes.length - 1)];
 schedule.push({id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, title, day, start: safeStart, end: safeEnd, custom: true});
 saveSchedule();
 renderSchedule();
}

document.addEventListener('change', event => {
 const control = event.target.closest('[data-schedule-id]');
 if (!control) return;
 const item = schedule.find(entry => entry.id === control.dataset.scheduleId);
 if (!item) return;
 item[control.dataset.field] = control.value;
 if (control.dataset.field === 'start' && item.start >= item.end) {
   item.end = scheduleTimes[Math.min(scheduleTimes.indexOf(item.start) + 1, scheduleTimes.length - 1)];
 }
 if (control.dataset.field === 'end' && item.end <= item.start) {
   item.start = scheduleTimes[Math.max(scheduleTimes.indexOf(item.end) - 1, 0)];
 }
 saveSchedule();
 renderSchedule();
});

document.addEventListener('click', event => {
 const addButton = event.target.closest('[data-add-schedule]');
 if (addButton) {
   addToSchedule(addButton.dataset.addSchedule);
   addButton.textContent = '予定に追加済み';
   addButton.disabled = true;
   return;
 }
 const removeButton = event.target.closest('[data-remove-schedule]');
 if (removeButton) {
   schedule = schedule.filter(item => item.id !== removeButton.dataset.removeSchedule);
   saveSchedule();
   renderSchedule();
 }
});

document.addEventListener('submit', event => {
 const form = event.target.closest('#custom-schedule-form');
 if (!form) return;
 event.preventDefault();
 const data = new FormData(form);
 addCustomSchedule(data.get('title').trim(), data.get('day'), data.get('start'), data.get('end'));
});

function photoMarkup(place, className) {
 if (!place.photo) return '';
 return `<img class="${className}" src="${esc(place.photo.src)}" alt="${esc(place.photo.alt)}" width="800" height="500" loading="lazy" decoding="async">`;
}

function photoSources(places) {
 const photos = places.filter(place => place.photo);
 if (!photos.length) return '';
 return `<details class="photo-sources"><summary>写真の出典</summary><ul>${photos.map(place => `<li><a href="${esc(place.photo.source)}" target="_blank" rel="noopener noreferrer">${esc(place.name)} <span>— ${esc(place.photo.credit)} ↗</span></a></li>`).join('')}</ul></details>`;
}

const categoryPhoto = category => TRIP_DATA[category.id][{spots:3,katsuyama:1}[category.id] || 0];

function landscape() {
 return `<svg class="landscape" viewBox="0 0 680 340" fill="none" aria-hidden="true">
 <circle cx="526" cy="80" r="44" fill="#be6b50" opacity=".75"/>
 <path d="M0 182 60 140q15-14 30 0l27 23 84-109q17-24 38 0l64 80 29-23q18-13 32 4l87 74 31-25q22-16 42 5l88 59H0Z" fill="#c0c5ad"/>
 <path d="m110 220 170-110q17-12 35 4l70 68 85-58q14-9 27 5l125 92 58-20v130H0V245Z" fill="#879b83"/>
 <path d="M0 250q167-72 333 4t347-19v105H0Z" fill="#526e60"/>
 <path d="M286 252q129 3 93 21t-110 23q-66 19 81 44h129q-184-27-91-43t20-30q-31-13-122-15" fill="#dedecb"/>
 <g stroke="#e5e4d2" stroke-width="2" opacity=".65"><path d="M107 276q10-6 0-17t0-20m16 31q10-6 0-17t0-20m394 57q10-6 0-17t0-20m16 31q10-6 0-17t0-20"/></g>
 <g fill="#ece1c9" stroke="#465d51" stroke-width="2"><path d="M65 294v-27h89v27Zm-9-27 23-15h59l25 15Z"/><path d="M487 298v-22h65v22Zm-9-22 20-13h43l20 13Z"/></g>
 <g stroke="#7c7962" stroke-width="3"><path d="M80 276v16m12-16v16m12-16v16m12-16v16m12-16v16m12-16v16m357-6h43"/></g>
 </svg>`;
}

function renderHome() {
 document.title = '湯原日和 — はんざきと、湯めぐり。';
 main.innerHTML = `<section class="hero" aria-labelledby="hero-title">
 <div class="hero-copy"><p class="eyebrow"><span></span>美作の湯、のんびり旅。</p><h1 id="hero-title">湯けむりに、<br>心ほどける。</h1><p class="hero-description">おいしい寄り道も、小さな発見も。<br>はんざきとめぐる、湯原と勝山。</p><div class="hero-label">湯原温泉 <i>と</i> 勝山</div></div>
 <div class="hero-art">${landscape()}<span class="vertical-label">本日、湯めぐり日和。</span><div class="hero-mascot"><span class="mascot-bubble">のんびり、いこう。</span><img src="assets/hanzaki.svg" alt="頭に手ぬぐいをのせた、にっこり笑うはんざき" width="260" height="190"></div></div>
 </section>
 <section class="category-section" aria-labelledby="category-title"><div class="section-heading"><div><p class="eyebrow">旅のもくじ</p><h2 id="category-title">さて、どこへ行こう。</h2></div><span class="section-counter">六つの楽しみ</span></div>
 <div class="category-grid">${categories.map((c,i)=>`<a class="category-card ${c.color}" href="#${c.id}"><div class="category-top"><span class="category-number">0${i+1} <span> / ${c.en}</span></span><span class="round-arrow" aria-hidden="true">↗</span></div>${photoMarkup(categoryPhoto(c),'category-photo')}<div class="category-bottom"><div><h3 class="${c.id==='katsuyama'?'long-title':''}">${c.id === 'katsuyama' ? '<span>勝山町並み</span><wbr><span>保存地区</span>' : c.name}</h3><p>${c.sub}</p></div><span class="place-count">${TRIP_DATA[c.id].length}<small>${c.id==='stay'?'項目':'件'}</small></span></div></a>`).join('')}</div>
 </section><aside class="hanzaki-note"><img src="assets/hanzaki.svg" alt="" width="90" height="66"><div><span>旅のおとも、はんざきです。</span><p>気になるカードをひらいて、次の寄り道を見つけよう。</p></div><span class="note-flower" aria-hidden="true">✳</span></aside>${scheduleMarkup()}${expenseMarkup()}${photoSources(categories.map(categoryPhoto))}`;
}

function dayBadge(day, value) {
 const state = value.startsWith('〇') || value.startsWith('○') ? 'open' : value === '×' ? 'closed' : 'unknown';
 return `<div class="day-badge ${state}"><span>${day}</span><strong>${esc(value)}</strong></div>`;
}

function placeCard(place, index, category) {
 const url = /^https:\/\/www\.google\.com\/maps\//.test(place.map) ? place.map : '';
 const isStay = category.id === 'stay';
 const placeId = `${category.id}:${index}`;
 const isScheduled = schedule.some(item => item.placeId === placeId);
 return `<article class="place-card" style="--order:${Math.min(index,6)}">${photoMarkup(place,'place-photo')}<div class="place-heading"><span class="place-index">${String(index+1).padStart(2,'0')}</span><div>${!isStay && place.type?`<p class="place-type">${esc(place.type)}</p>`:''}<h2>${esc(place.name)}</h2></div>${icon(category.icon,'place-icon')}</div>
 ${isStay ? '' : `<div class="place-time"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></svg><div><span>営業時間・利用時間</span><p>${esc(place.hours)}</p></div></div>
 <div class="place-details">${dayBadge('火',place.tue)}${dayBadge('水',place.wed)}</div>`}
 <button class="schedule-add" type="button" data-add-schedule="${placeId}" ${isScheduled ? 'disabled' : ''}>${isScheduled ? '予定に追加済み' : '＋ 予定に追加'}</button>${url?`<a class="map-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(place.name)}をGoogle マップで開く（新しいタブ）"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>Google マップで見る</span>${arrow}</a>`:'<p class="map-unavailable">マップURL：不明</p>'}</article>`;
}

function renderCategory(category) {
 document.title = `${category.name} | 湯原日和`;
 main.innerHTML = `<section class="detail-view ${category.color}"><a class="back-link" href="#"><span aria-hidden="true">←</span> 旅のもくじへ</a><div class="detail-heading"><div><p class="eyebrow">${category.en} · ${category.sub}</p><h1 tabindex="-1">${category.name}</h1><p class="detail-count">${TRIP_DATA[category.id].length}つの${category.id==='stay'?'お宿・お風呂':'寄り道'}を、しおりに。</p></div><div class="detail-emblem">${icon(category.icon)}</div></div>
 <nav class="category-tabs" aria-label="ジャンル">${categories.map(c=>`<a href="#${c.id}" ${c.id===category.id?'aria-current="page"':''}>${c.name}</a>`).join('')}</nav>
 <div class="list-toolbar"><span>立ち寄り先</span>${category.id==='stay'?'':'<small>〇 営業　× 休業　不明 未確認</small>'}</div>
 <div class="place-grid">${TRIP_DATA[category.id].map((p,i)=>placeCard(p,i,category)).join('')}</div>
 ${photoSources(TRIP_DATA[category.id])}
 <div class="detail-end"><img src="assets/hanzaki.svg" alt="" width="100" height="73"><p>ひと息ついて、次の寄り道へ。</p><a href="#">旅のもくじへ戻る <span aria-hidden="true">↗</span></a></div></section>`;
}

function renderRoute(focus = false) {
 const category = categories.find(c=>`#${c.id}` === location.hash);
 if (category) renderCategory(category); else renderHome();
 window.scrollTo({top:0,behavior:'instant'});
 if(focus) {
   const heading = main.querySelector('h1');
   heading.setAttribute('tabindex','-1');
   heading.focus({preventScroll:true});
 }
}
window.addEventListener('hashchange',()=>renderRoute(true));
renderRoute();
