// Єдине джерело правди для контактів і фактів. Змінюєш тут — оновлюється на всіх сторінках.
export const site = {
  name: 'Hotel 52',
  url: 'https://hotel52.od.ua/',
  stars: 3,
  built: 1848,
  address: {
    street: 'вул. Європейська, 52',
    formerly: 'колишня Катерининська',
    city: 'Одеса',
    zip: '65011',
    full: 'вул. Європейська (колишня Катерининська), 52, Одеса, 65011',
  },
  phones: [
    { label: '+380 48 725 28 15', href: 'tel:+380487252815' },
    { label: '+380 63 378 87 06', href: 'tel:+380633788706' },
  ],
  restoPhones: [
    { label: '+380 95 135 05 99', href: 'tel:+380951350599' },
    { label: '+380 48 722 88 99', href: 'tel:+380487228899' },
  ],
  email: 'info@hotel52.od.ua',
  checkin: '14:00',
  checkout: '12:00',
  breakfastHours: '8:00–11:00',
  breakfastPrice: 280,
  extraBedPrice: 600,
  minPrice: 1600,
  rating: { value: '4,5', num: 4.5, count: 151 },
  social: {
    instagram: { label: '@hotel_52_od', href: 'https://www.instagram.com/hotel_52_od/' },
    facebook: { label: 'hotel52.od.ua', href: 'https://www.facebook.com/hotel52.od.ua/' },
    tripadvisor: { label: 'TripAdvisor', href: 'https://www.tripadvisor.com/Hotel_Review-g295368-d3249999-Reviews-Hotel_52-Odessa_Odessa_Oblast.html' },
    google: { label: 'Google', href: 'https://www.google.com/maps/search/?api=1&query=Hotel+52+%D0%84%D0%B2%D1%80%D0%BE%D0%BF%D0%B5%D0%B9%D1%81%D1%8C%D0%BA%D0%B0+52+%D0%9E%D0%B4%D0%B5%D1%81%D0%B0' },
  },
  // Месенджери прив'язані до мобільного номера рецепції — підтвердити в клієнта
  messengers: {
    telegram: 'https://t.me/+380633788706',
    viber: 'viber://chat?number=%2B380633788706',
    whatsapp: 'https://wa.me/380633788706',
  },
  mapEmbed: 'https://www.google.com/maps?q=Hotel+52,+%D0%84%D0%B2%D1%80%D0%BE%D0%BF%D0%B5%D0%B9%D1%81%D1%8C%D0%BA%D0%B0+52,+%D0%9E%D0%B4%D0%B5%D1%81%D0%B0&z=16&output=embed',
  // Модуль бронювання Servio (той самий, що на поточному сайті)
  booking: { script: 'https://sbj.rkz.io/servio-booking.js?module_id=14&lang=uk' },
};

export const nav = [
  { href: 'index.html#nomery', label: 'Номери', key: 'rooms' },
  { href: 'restoran.html', label: 'Ресторан', key: 'restoran' },
  { href: 'aktsii.html', label: 'Акції', key: 'aktsii' },
  { href: 'posluhy.html', label: 'Послуги', key: 'posluhy' },
  { href: 'pro-nas.html', label: 'Про нас', key: 'pro-nas' },
  { href: 'kontakty.html', label: 'Контакти', key: 'kontakty' },
];

export const reviews = [
  { name: 'Anna D.', text: 'Гарний інтер\'єр, дуже чисто, персонал уважний, сніданок був смачний', initials: 'AD' },
  { name: 'Яна П.', text: 'Хороший готель, чистий, акуратний, ціни зовсім не високі', initials: 'ЯП' },
];

// Місця поруч. Хвилини — орієнтир у межах «10–15 хв» з брифу; уточнити в клієнта.
export const places = [
  { id: 'sobor', name: 'Свято-Троїцький собор', time: 'навпроти', note: 'арх. Ф. Фраполлі', x: 384, y: 272, side: 'r' },
  { id: 'pryvoz', name: 'Ринок Привоз', time: '700 м', note: 'носом почути', x: 150, y: 452, side: 'r' },
  { id: 'derybasivska', name: 'Дерибасівська', time: '≈10 хв', note: 'пішки', x: 514, y: 214, side: 'l' },
  { id: 'opera', name: 'Оперний театр', time: '≈12 хв', note: 'пішки', x: 626, y: 246, side: 'r' },
  { id: 'prymorskyi', name: 'Приморський бульвар', time: '≈15 хв', note: 'пішки', x: 566, y: 120, side: 'l' },
  { id: 'duke', name: 'Дюк', time: '≈15 хв', note: 'пішки', x: 646, y: 152, side: 'r' },
  { id: 'potemkin', name: 'Потьомкінські сходи', time: '≈15 хв', note: 'пішки', x: 724, y: 202, side: 'l' },
];

export const services = [
  { icon: 'glass', title: 'Банкети та свята', text: 'Дні народження, весілля, корпоративи — у Restaurant 52.' },
  { icon: 'cloche', title: 'Кейтеринг', text: 'Привеземо одеську кухню на ваш захід.' },
  { icon: 'board', title: 'Конференц-зал', text: 'Для зустрічей, презентацій і навчань.' },
  { icon: 'plane', title: 'Трансфер з аеропорту', text: '15 хвилин — і ви на Європейській.' },
  { icon: 'ticket', title: 'Квитки', text: 'Допоможемо з квитками — скажіть лише куди.' },
  { icon: 'umbrella', title: 'Допомога з пляжем', text: 'Підкажемо, куди і як дістатися до моря.' },
  { icon: 'paw', title: 'Можна з тваринами', text: 'Хвостатим теж треба у відпустку.' },
  { icon: 'calendarCheck', title: 'Довге проживання', text: 'Знижка, якщо залишаєтесь надовго.' },
  { icon: 'group', title: 'Групи', text: 'Розмістимо команду, хор чи весільних гостей.' },
  { icon: 'elevator', title: 'Ліфт', text: 'Валізи по сходах тягати не доведеться.' },
  { icon: 'shelter', title: 'Обладнане укриття', text: 'Меблі, світло, вода і Wi-Fi.' },
  { icon: 'clock', title: 'Рецепція 24/7', text: 'Заселимо хоч о четвертій ранку.' },
];

export const promos = [
  {
    slug: 'romantychnyi-vechir',
    photo: 'promo-1',
    tag: '−10%',
    date: '14 лютого',
    title: 'Романтичний вечір',
    text: 'Знижка 10% на 14 лютого. Номер для двох, лебеді з рушників і Одеса за вікном.',
    cta: 'Забронювати',
    href: 'bronyuvannya.html',
  },
  {
    slug: 'novorichna-nich-2027',
    photo: 'resto-1',
    tag: 'Новий рік',
    date: '31 грудня',
    title: 'Новорічна ніч 2027 у Restaurant 52',
    text: 'Зустрічаємо 2027-й по-одеськи: смачно, весело і з ялинкою. Столики — за телефоном ресторану.',
    cta: 'Забронювати столик',
    href: 'tel:+380951350599',
  },
];

export const posts = [
  { title: 'Бандитська Одеса', tag: 'Історія', text: 'Легенди старих одеських вулиць — з легким холодком по спині.', href: 'https://hotel52.od.ua/banditska-odesa/', pattern: 'chevron' },
  { title: 'Кухня по-одеськи', tag: 'Їжа', text: 'Що їсти в Одесі, щоб потім було що згадати. І що замовити в нас на сніданок.', href: 'https://hotel52.od.ua/kuhnja-po-odeski/', pattern: 'tiles', photo: 'resto-11' },
  { title: 'Історія катакомб', tag: 'Історія', text: 'Під Одесою — ще одна Одеса. Розповідаємо, звідки вона взялася.', href: 'https://hotel52.od.ua/istorija-odeskih-katakomb/', pattern: 'dots' },
  { title: 'Історія Катерининської вулиці', tag: 'Наша вулиця', text: 'Вулиця, на якій з 1848 року стоїть наш будинок.', href: 'https://hotel52.od.ua/istorija-odniiei-z-najkrasivishih-vulic-katerininska/', pattern: 'lines', photo: 'fasad' },
  { title: 'Екскурсії Одесою', tag: 'Маршрути', text: 'Обираємо маршрут під ваш настрій — і під погоду.', href: 'https://hotel52.od.ua/ekskursii-po-odesi/', pattern: 'chevron' },
  { title: 'Похмурий день з дітьми', tag: 'З дітьми', text: 'Що робити в Одесі, коли море відпочиває, а діти — ні.', href: 'https://hotel52.od.ua/jak-provesti-pohmurij-den-z-ditmi-v-nashomu-misti/', pattern: 'dots' },
];
