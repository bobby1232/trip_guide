const DATA = window.TRIP_DATA;
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  try { tg.setHeaderColor?.('#ffffff'); tg.setBackgroundColor?.('#f7f9fb'); } catch {}
}

const app = document.getElementById('app');
const pageTitle = document.getElementById('pageTitle');
const bottomNav = document.getElementById('bottomNav');
const detailsModal = document.getElementById('detailsModal');
const detailsBody = document.getElementById('detailsBody');
const modalClose = document.getElementById('modalClose');

let selectedTrip = DATA.trips[0];
let selectedDay = 0;
let currentTab = 'home';
let saved = new Set(JSON.parse(localStorage.getItem('trip_saved') || '[]'));

const HOTEL = {
  name: 'Наш отель',
  type: 'hotel',
  area: 'Patong',
  time: 'База поездки',
  note: 'Стартовая точка всех наземных дней. Скутер берём с первого дня.',
  description: 'Наш отель — база поездки. Карточка Google Maps сохранена по вашей ссылке. Когда добавим точные координаты, маршруты дня будут автоматически строиться от отеля и обратно.',
  mapsUrl: 'https://maps.app.goo.gl/juRu2CZuPYQ8htsE9',
  image: selectedTrip.heroImage
};

function esc(s=''){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function haptic(){try{tg?.HapticFeedback?.impactOccurred('light')}catch{}}
function saveState(){localStorage.setItem('trip_saved', JSON.stringify([...saved]))}
function navUrl(stop){return `https://www.google.com/maps/dir/?api=1&destination=${stop.lat},${stop.lng}`}
function routeUrl(day){const s=day.stops||[];if(!s.length)return '#';const o=s[0],d=s[s.length-1];const wp=s.slice(1,-1).map(x=>`${x.lat},${x.lng}`).join('|');return `https://www.google.com/maps/dir/?api=1&origin=${o.lat},${o.lng}&destination=${d.lat},${d.lng}${wp?`&waypoints=${encodeURIComponent(wp)}`:''}`}
function effectiveTransport(day){const t=String(day.transport||'').toLowerCase();if(t.includes('экскурс')||t.includes('тур'))return day.transport;if(day.date==='27 ноября')return '🛵 скутер + возврат / трансфер';return '🛵 скутер'}
function markerEmoji(type){return ({beach:'🏖',food:'🍜',cafe:'☕',view:'🌅',tour:'🚤',night:'🍸',market:'🛍️',spa:'💆',nature:'🌿',culture:'🏛',hotel:'🏨'}[type]||'📍')}
function labelType(type){return ({beach:'Пляж',food:'Еда',cafe:'Кафе',view:'Смотровая',tour:'Экскурсия',night:'Бар / вечер',market:'Маркет',spa:'SPA',nature:'Природа',culture:'Культура',hotel:'Отель'}[type]||'Место')}
function stopKey(day,stop){return `${day.date||''}:${stop.name}`}
function allStops(){return selectedTrip.days.flatMap(d=>d.stops.map(s=>({...s,date:d.date,area:d.area,_day:d})))}
function setTitle(v){pageTitle.textContent=v}

function setupTelegramButton(text,fn){if(!tg?.MainButton)return;try{tg.MainButton.offClick?.(window.__tgMainHandler||(()=>{}))}catch{};window.__tgMainHandler=fn;tg.MainButton.setText(text).show();tg.MainButton.onClick(fn)}
function clearTelegramButton(){try{tg?.MainButton?.hide()}catch{}}

function openDetails(stop,day){
  const key = stop.type==='hotel' ? 'hotel:base' : stopKey(day,stop);
  const isSaved = saved.has(key);
  const canNavigate = Number.isFinite(stop.lat) && Number.isFinite(stop.lng);
  const transport = stop.type==='hotel' ? '🛵 скутер с первого дня' : effectiveTransport(day);
  detailsBody.innerHTML = `
    <div class="modal-hero" style="background-image:url('${esc(stop.image||selectedTrip.heroImage)}')">
      <div class="modal-top-row"><span class="modal-badge">${markerEmoji(stop.type)} ${labelType(stop.type)}</span><button class="modal-heart" id="modalSaveBtn">${isSaved?'♥':'♡'}</button></div>
    </div>
    <div class="modal-content">
      <h2>${esc(stop.name)}</h2>
      <div class="rating-row"><span>${esc(stop.area||day.area||'Пхукет')}</span>${stop.time?`<span>•</span><span>${esc(stop.time)}</span>`:''}</div>
      <p class="modal-description">${esc(stop.description||stop.note||'')}</p>
      <div class="info-list">
        <div>📍 ${esc(stop.area||day.area||'Пхукет')}</div>
        <div>🛵 ${esc(transport)}</div>
        ${stop.time?`<div>🕒 ${esc(stop.time)}</div>`:''}
      </div>
      <div class="actions modal-actions">
        <button class="secondary" id="modalSaveAction">${isSaved?'♥ Сохранено':'♡ Сохранить'}</button>
        ${canNavigate?'<button class="primary" id="modalGoAction">Навигация</button>':''}
      </div>
      ${stop.mapsUrl?'<button class="maps-open-btn" id="modalMapsAction">Открыть в Google Maps</button>':''}
    </div>`;
  detailsModal.classList.add('open');
  document.body.classList.add('no-scroll');
  const toggle=()=>{saved.has(key)?saved.delete(key):saved.add(key);saveState();openDetails(stop,day)};
  document.getElementById('modalSaveBtn').onclick=toggle;
  document.getElementById('modalSaveAction').onclick=toggle;
  const go=document.getElementById('modalGoAction');if(go)go.onclick=()=>window.open(navUrl(stop),'_blank');
  const maps=document.getElementById('modalMapsAction');if(maps)maps.onclick=()=>window.open(stop.mapsUrl,'_blank');
}
function closeDetails(){detailsModal.classList.remove('open');document.body.classList.remove('no-scroll')}
modalClose.onclick=closeDetails;detailsModal.addEventListener('click',e=>{if(e.target===detailsModal)closeDetails()});

function renderHome(){
  setTitle('Пхукет');
  const trip=selectedTrip,d=trip.days[selectedDay],w=DATA.ui.weather;
  app.innerHTML=`
    <section class="hero-card">
      <div class="hero-image" style="background-image:url('${esc(trip.heroImage)}')">
        <div class="mini-brand">✈ ${esc(DATA.ui.brand)}</div>
        <div class="hero-title-wrap"><h2>${esc(trip.title)}</h2><p>${esc(trip.subtitle)}</p></div>
        <div class="hero-note">${esc(trip.heroNote)}</div>
      </div>
      <div class="weather-card"><div class="weather-big">☀ ${esc(w.temp)}</div><div class="weather-meta"><div>${esc(w.feels)}</div><strong>${esc(w.text)}</strong><span>${esc(w.subtext)}</span></div></div>
      <article class="hotel-base-card" id="hotelBaseCard"><div class="hotel-icon">🏨</div><div><small>БАЗА ПОЕЗДКИ</small><strong>Наш отель · Patong</strong><span>Скутер с первого дня · нажмите, чтобы открыть карточку</span></div><div class="hotel-chevron">›</div></article>
      <div class="overview-row">
        <div class="overview-pill"><span>📅</span><div><strong>${esc(trip.overview.duration)}</strong><small>${esc(trip.startDate)}–${esc(trip.endDate)}</small></div></div>
        <div class="overview-pill"><span>👫</span><div><strong>вдвоём</strong><small>${esc(trip.overview.couple)}</small></div></div>
        <div class="overview-pill"><span>🛵</span><div><strong>road trips</strong><small>Скутер с первого дня</small></div></div>
      </div>
      <div class="actions hero-actions"><button class="primary" id="goRouteBtn">Поехать по маршруту</button><button class="secondary" id="openMapBtn">Карта</button></div>
    </section>
    <section class="section padded-top">
      <div class="section-head"><h3>План по дням</h3><span class="muted-mini">нажмите на место → карточка</span></div>
      <div class="day-strip compact">${trip.days.map((x,i)=>`<button class="day-chip ${i===selectedDay?'active':''}" data-day="${i}"><span>${esc(x.weekday)}</span><strong>${esc(x.shortDate||x.date)}</strong></button>`).join('')}</div>
      <article class="day-card feature"><img src="${esc(d.image)}" class="day-photo" alt=""><div class="day-content"><div class="day-card-top"><div class="day-num">${selectedDay+1}</div><div><div class="day-meta">${esc(d.date)} · ${esc(d.weekday)}</div><h3>${esc(d.title)}</h3></div></div><div class="day-grid"><div>${d.items.map((item,idx)=>`<div class="list-row"><span>${['🏖️','🍴','📍','🌅'][idx]||'•'}</span><div>${esc(item)}</div></div>`).join('')}</div><div class="day-side"><div class="stat-box"><strong>${esc(effectiveTransport(d))}</strong><small>транспорт</small></div><div class="stat-box"><strong>${esc(d.budget)}</strong><small>на двоих</small></div></div></div></div></article>
      <div class="stop-list">${d.stops.map((s,i)=>`<article class="stop-card" data-stop-index="${i}"><img src="${esc(s.image)}" class="stop-thumb" alt=""><div class="stop-main"><div class="stop-time">${esc(s.time)}</div><h4>${esc(s.name)}</h4><p>${esc(s.note)}</p><div class="stop-actions"><button class="ghost open-card" data-stop="${i}">Открыть карточку</button><button class="ghost save-stop" data-stop="${i}">${saved.has(stopKey(d,s))?'♥':'♡'} Сохранить</button></div></div></article>`).join('')}</div>
    </section>`;
  document.querySelectorAll('[data-day]').forEach(b=>b.onclick=()=>{selectedDay=+b.dataset.day;haptic();renderHome()});
  document.querySelectorAll('[data-stop-index]').forEach(el=>el.onclick=e=>{if(e.target.closest('button'))return;openDetails(d.stops[+el.dataset.stopIndex],d)});
  document.querySelectorAll('.open-card').forEach(b=>b.onclick=e=>{e.stopPropagation();openDetails(d.stops[+b.dataset.stop],d)});
  document.querySelectorAll('.save-stop').forEach(b=>b.onclick=e=>{e.stopPropagation();const s=d.stops[+b.dataset.stop],k=stopKey(d,s);saved.has(k)?saved.delete(k):saved.add(k);saveState();renderHome()});
  document.getElementById('hotelBaseCard').onclick=()=>openDetails(HOTEL,{date:'',area:HOTEL.area,transport:'🛵 скутер'});
  document.getElementById('goRouteBtn').onclick=()=>window.open(routeUrl(d),'_blank');
  document.getElementById('openMapBtn').onclick=()=>switchTab('map');
  setupTelegramButton(`Маршрут · ${d.shortDate}`,()=>window.open(routeUrl(d),'_blank'));
}

function renderMap(){
  setTitle('Карта');clearTelegramButton();
  const filters=['all','beach','food','culture','view','tour'];
  app.innerHTML=`<section class="section map-section"><div class="map-filter">${filters.map((f,i)=>`<button data-filter="${f}" class="${i===0?'active':''}">${f==='all'?'Все':labelType(f)}</button>`).join('')}</div><div id="map"></div></section>`;
  setTimeout(()=>{
    const map=L.map('map',{zoomControl:false}).setView([7.93,98.33],10);L.control.zoom({position:'topright'}).addTo(map);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);const layer=L.layerGroup().addTo(map);const source=allStops();
    function draw(filter='all'){layer.clearLayers();const shown=source.filter(s=>filter==='all'||s.type===filter);shown.forEach(s=>{const icon=L.divIcon({html:`<div class="marker-badge">${markerEmoji(s.type)}</div>`,className:'',iconSize:[38,38]});const marker=L.marker([s.lat,s.lng],{icon}).addTo(layer);marker.on('click',()=>openDetails(s,s._day))});if(shown.length)map.fitBounds(L.latLngBounds(shown.map(s=>[s.lat,s.lng])),{padding:[28,28],maxZoom:11})}
    draw();document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('active'));b.classList.add('active');draw(b.dataset.filter)});
  },0);
}

function renderFood(){
  setTitle('Еда и места');clearTelegramButton();
  app.innerHTML=`<section class="section"><div class="section-head"><h3>Кафе, рестораны, бары</h3><span class="muted-mini">тап → карточка объекта</span></div><div class="place-list">${DATA.food.map((p,i)=>`<article class="place-card" data-food="${i}"><img src="${esc(p.image)}" class="place-photo" alt=""><div class="place-overlay"></div><button class="save place-save" data-i="${i}">${saved.has('food:'+p.name)?'♥':'♡'}</button><div class="place-content"><h3>${esc(p.name)}</h3><div class="place-rating">${esc(p.kind)}</div><div class="place-meta">📍 ${esc(p.area)} · ${esc(p.price)}</div></div></article>`).join('')}</div></section>`;
  document.querySelectorAll('[data-food]').forEach(el=>el.onclick=e=>{if(e.target.classList.contains('place-save'))return;const p=DATA.food[+el.dataset.food];openDetails({...p,type:'food',note:p.kind,description:p.description||p.kind},{date:'',area:p.area,transport:'🛵 скутер'})});
  document.querySelectorAll('.place-save').forEach(b=>b.onclick=e=>{e.stopPropagation();const p=DATA.food[+b.dataset.i],k='food:'+p.name;saved.has(k)?saved.delete(k):saved.add(k);saveState();renderFood()});
}

function renderSaved(){
  setTitle('Сохранено');clearTelegramButton();const items=[];selectedTrip.days.forEach(d=>d.stops.forEach(s=>{const k=stopKey(d,s);if(saved.has(k))items.push({item:s,day:d,key:k})}));DATA.food.forEach(p=>{const k='food:'+p.name;if(saved.has(k))items.push({item:{...p,type:'food'},day:{date:'',area:p.area,transport:'🛵 скутер'},key:k})});if(saved.has('hotel:base'))items.unshift({item:HOTEL,day:{date:'',area:HOTEL.area,transport:'🛵 скутер'},key:'hotel:base'});
  app.innerHTML=items.length?`<section class="section"><div class="saved-list">${items.map((x,i)=>`<article class="saved-card" data-saved="${i}"><img src="${esc(x.item.image||selectedTrip.heroImage)}" alt=""><div class="saved-content"><h3>${esc(x.item.name)}</h3><p>${esc(x.item.area||x.day.area)}</p><div class="saved-actions"><button class="ghost open-saved" data-i="${i}">Карточка</button><button class="ghost remove-saved" data-i="${i}">Удалить</button></div></div></article>`).join('')}</div></section>`:`<div class="empty-state"><div class="empty-icon">♡</div><h3>Пока пусто</h3><p>Сохраняйте места — они появятся здесь.</p></div>`;
  document.querySelectorAll('[data-saved]').forEach(el=>el.onclick=e=>{if(e.target.closest('button'))return;const x=items[+el.dataset.saved];openDetails(x.item,x.day)});document.querySelectorAll('.open-saved').forEach(b=>b.onclick=e=>{e.stopPropagation();const x=items[+b.dataset.i];openDetails(x.item,x.day)});document.querySelectorAll('.remove-saved').forEach(b=>b.onclick=e=>{e.stopPropagation();saved.delete(items[+b.dataset.i].key);saveState();renderSaved()});
}

function switchTab(tab){currentTab=tab;bottomNav.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));if(tab==='home')renderHome();if(tab==='map')renderMap();if(tab==='food')renderFood();if(tab==='saved')renderSaved();haptic()}
bottomNav.querySelectorAll('button').forEach(b=>b.onclick=()=>switchTab(b.dataset.tab));document.getElementById('favoritesBtn').onclick=()=>switchTab('saved');renderHome();
