window.TRIP_DATA = {
  ui: {
    brand: 'Telegram Mini App',
    weather: { temp: '+30°', feels: 'Ощущается +33°', text: 'Сейчас на Пхукете', subtext: 'Ясно, идеальная погода для пляжей' }
  },
  trips: [{
    id: 'phuket-2026',
    title: 'Пхукет · 13–27 ноября',
    subtitle: 'Наше идеальное путешествие для двоих',
    heroImage: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    heroNote: 'Good vibes Phuket ♡',
    startDate: '13 ноября',
    endDate: '27 ноября',
    overview: { duration: '14 дней', couple: 'Романтический трип', transport: 'road trips', transportSub: 'Аренда авто / скутер' },
    days: [
      {date:'14 ноября',shortDate:'14 ноя',weekday:'Пт',area:'Patong / Freedom',title:'Freedom Beach + закат',budget:'฿2.5–4k',transport:'такси / Bolt',distance:'26 км',image:'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=900',items:['Freedom Beach — пляж','Обед в Mor Mu Dong','Karon Viewpoint — смотровая','Закат на Promthep'],stops:[
        {time:'09:30',name:'Freedom Beach',type:'beach',lat:7.8799,lng:98.2750,note:'Белый песок и раннее купание.',image:'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=900',description:'Один из самых красивых и уединённых пляжей Пхукета. Белоснежный песок, бирюзовая вода и тропические джунгли. Добраться можно на авто или лодке.'},
        {time:'13:00',name:'Mor Mu Dong',type:'food',lat:7.8435,lng:98.3839,note:'Southern Thai и морепродукты.',image:'https://images.pexels.com/photos/4871115/pexels-photo-4871115.jpeg?auto=compress&cs=tinysrgb&w=900',description:'Легендарный ресторан с атмосферой локального Пхукета и отличными seafood блюдами.'},
        {time:'16:00',name:'Karon Viewpoint',type:'view',lat:7.7908,lng:98.3061,note:'Вид на три бухты.',image:'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=900',description:'Классическая смотровая юго-запада острова: Kata Noi, Kata и Karon в одном кадре.'},
        {time:'17:30',name:'Promthep Cape',type:'view',lat:7.7599,lng:98.3062,note:'Закат в золотой час.',image:'https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=900',description:'Самая известная закатная точка Пхукета. Лучше приезжать заранее.'}
      ]},
      {date:'15 ноября',shortDate:'15 ноя',weekday:'Сб',area:'Old Town',title:'Старый город Пхукета',budget:'฿2–3.5k',transport:'такси / пешком',distance:'12 км',image:'https://images.pexels.com/photos/3584439/pexels-photo-3584439.jpeg?auto=compress&cs=tinysrgb&w=900',items:['Завтрак в Raya','Прогулка по Old Phuket Town','Lard Yai Market','Ужин в Tu Kab Khao'],stops:[
        {time:'09:30',name:'Raya Restaurant',type:'food',lat:7.8834,lng:98.3887,note:'Поздний завтрак.',image:'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=900',description:'Популярный ресторан в старом городе — хороший старт для гастрономического дня.'},
        {time:'11:00',name:'Old Phuket Town',type:'culture',lat:7.8848,lng:98.3894,note:'Цветные улочки и кофе.',image:'https://images.pexels.com/photos/2474689/pexels-photo-2474689.jpeg?auto=compress&cs=tinysrgb&w=900',description:'Сино-португальская архитектура, галереи, кофейни и неспешная прогулка.'},
        {time:'18:00',name:'Lard Yai Market',type:'market',lat:7.8855,lng:98.3898,note:'Street food и сувениры.',image:'https://images.pexels.com/photos/2291367/pexels-photo-2291367.jpeg?auto=compress&cs=tinysrgb&w=900',description:'Воскресный ночной маркет с local food, музыкой и живой атмосферой.'},
        {time:'20:00',name:'Tu Kab Khao',type:'food',lat:7.8852,lng:98.3871,note:'Южно-тайская кухня.',image:'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=900',description:'Один из самых приятных ресторанов старого города с локальными блюдами.'}
      ]},
      {date:'16 ноября',shortDate:'16 ноя',weekday:'Вс',area:'Kata / Karon',title:'Kata Noi + спокойный sunset',budget:'฿2–4k',transport:'такси',distance:'22 км',image:'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=900',items:['Kata Noi Beach','After Beach Bar','Karon Viewpoint'],stops:[
        {time:'10:00',name:'Kata Noi Beach',type:'beach',lat:7.8029,lng:98.2985,note:'Компактный и красивый пляж.',image:'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=900',description:'Один из самых приятных пляжей юго-западного побережья.'},
        {time:'16:00',name:'Karon Viewpoint',type:'view',lat:7.7908,lng:98.3061,note:'Смотровая в golden hour.',image:'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=900',description:'Лучшее место, чтобы увидеть три бухты за один раз.'},
        {time:'18:00',name:'After Beach Bar',type:'night',lat:7.7954,lng:98.3030,note:'Лёгкий вечер с видом.',image:'https://images.pexels.com/photos/4552177/pexels-photo-4552177.jpeg?auto=compress&cs=tinysrgb&w=900',description:'Расслабленный бар на склоне, куда стоит заехать на sunset.'}
      ]},
      {date:'17 ноября',shortDate:'17 ноя',weekday:'Пн',area:'Phi Phi',title:'Phi Phi Islands',budget:'฿5–10k',transport:'тур',distance:'полный день',image:'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=900',items:['Phi Phi','Pileh Lagoon','Bamboo Island'],stops:[{time:'05:30',name:'Phi Phi Islands',type:'tour',lat:7.7407,lng:98.7784,note:'Sunrise small-group tour.',image:'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=900',description:'Бирюзовые лагуны, белый песок и лучшее море среди классических экскурсий.'}]},
      {date:'20 ноября',shortDate:'20 ноя',weekday:'Чт',area:'South',title:'Nai Harn → Ya Nui → Windmill',budget:'฿1.8–3.5k',transport:'🛵 scooter',distance:'45 мин в пути',image:'https://images.pexels.com/photos/164041/pexels-photo-164041.jpeg?auto=compress&cs=tinysrgb&w=900',items:['Nai Harn Beach','Ya Nui Beach','Windmill Viewpoint'],stops:[
        {time:'10:00',name:'Nai Harn Beach',type:'beach',lat:7.7782,lng:98.3060,note:'Купание и длинный пляж.',image:'https://images.pexels.com/photos/164041/pexels-photo-164041.jpeg?auto=compress&cs=tinysrgb&w=900',description:'Один из любимых пляжей экспатов на Пхукете.'},
        {time:'12:30',name:'Ya Nui Beach',type:'beach',lat:7.7672,lng:98.3062,note:'Снорклинг и фото.',image:'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=900',description:'Маленькая бухта между Nai Harn и Promthep, очень милая и фотогеничная.'},
        {time:'16:30',name:'Windmill Viewpoint',type:'view',lat:7.7660,lng:98.3058,note:'Закат на юге острова.',image:'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=900',description:'Один из самых красивых видов на закат на Пхукете.'}
      ]}
    ]
  }],
  food:[
    {name:'Mor Mu Dong',kind:'Тайская кухня · Морепродукты',price:'฿฿',area:'Rawai / Chalong',lat:7.8435,lng:98.3839,image:'https://images.pexels.com/photos/4871115/pexels-photo-4871115.jpeg?auto=compress&cs=tinysrgb&w=900'},
    {name:'One Chun',kind:'Южно-тайская кухня · Локальная',price:'฿฿',area:'Phuket Town',lat:7.8862,lng:98.3880,image:'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=900'},
    {name:'Campus Coffee',kind:'Спешелти кофе · Завтраки',price:'฿',area:'Old Town',lat:7.8850,lng:98.3899,image:'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=900'},
    {name:'Raya Restaurant',kind:'Популярное кафе / ресторан',price:'฿฿',area:'Old Town',lat:7.8834,lng:98.3887,image:'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=900'},
    {name:'Tu Kab Khao',kind:'Тайская кухня',price:'฿฿',area:'Old Town',lat:7.8852,lng:98.3871,image:'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=900'},
    {name:'Rawai Seafood Market',kind:'Seafood market',price:'฿฿',area:'Rawai',lat:7.7753,lng:98.3272,image:'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=900'}
  ]
};
