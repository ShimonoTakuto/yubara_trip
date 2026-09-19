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
 </section><aside class="hanzaki-note"><img src="assets/hanzaki.svg" alt="" width="90" height="66"><div><span>旅のおとも、はんざきです。</span><p>気になるカードをひらいて、次の寄り道を見つけよう。</p></div><span class="note-flower" aria-hidden="true">✳</span></aside>${photoSources(categories.map(categoryPhoto))}`;
}

function dayBadge(day, value) {
 const state = value.startsWith('〇') || value.startsWith('○') ? 'open' : value === '×' ? 'closed' : 'unknown';
 return `<div class="day-badge ${state}"><span>${day}</span><strong>${esc(value)}</strong></div>`;
}

function placeCard(place, index, category) {
 const url = /^https:\/\/www\.google\.com\/maps\//.test(place.map) ? place.map : '';
 const isStay = category.id === 'stay';
 return `<article class="place-card" style="--order:${Math.min(index,6)}">${photoMarkup(place,'place-photo')}<div class="place-heading"><span class="place-index">${String(index+1).padStart(2,'0')}</span><div>${!isStay && place.type?`<p class="place-type">${esc(place.type)}</p>`:''}<h2>${esc(place.name)}</h2></div>${icon(category.icon,'place-icon')}</div>
 ${isStay ? '' : `<div class="place-time"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></svg><div><span>営業時間・利用時間</span><p>${esc(place.hours)}</p></div></div>
 <div class="place-details">${dayBadge('火',place.tue)}${dayBadge('水',place.wed)}</div>`}
 ${url?`<a class="map-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(place.name)}をGoogle マップで開く（新しいタブ）"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>Google マップで見る</span>${arrow}</a>`:'<p class="map-unavailable">マップURL：不明</p>'}</article>`;
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
