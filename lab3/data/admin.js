const photo = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=60`;

const PHOTO_IDS = [
  "1546069901-ba9599a7e63c",
  "1565299624946-b28f40a0ae38",
  "1567620905732-2d1ec7ab7445",
  "1482049016688-2d3e1b311543",
  "1512621776951-a57141f2eefd",
  "1540189549336-e6e99c3679fe",
  "1555939594-58d7cb561ad1",
  "1504674900247-0877df9cc836",
  "1473093295043-cdd812d0e601",
  "1476224203421-9ac39bcb3327",
];

const NEWS_TITLES = [
  "Новий кампус відкрито для студентів",
  "Конкурс наукових робіт стартує восени",
  "Команда університету виграла турнір",
  "Виставка студентських проєктів",
  "Оновлено графік бібліотеки",
  "Гранти на стажування в Європі",
  "Відкрито набір на курси з програмування",
  "Фестиваль культури відбувся в ЖПУ",
  "Нова лабораторія робототехніки",
  "Зустріч з випускниками факультету",
];

const NEWS_CATEGORIES = ["Технології", "Освіта", "Спорт", "Культура", "Наука"];
export const NEWS_STATUSES = ["Опубліковано", "Чернетка", "На перевірці"];
export const USER_STATUSES = ["Активний", "Заблокований"];
export const USER_ROLES = ["Адміністратор", "Редактор", "Автор"];
export const NEWS_CATEGORY_LIST = NEWS_CATEGORIES;

export const LOG_EVENTS = {
  login: "Вхід у систему",
  logout: "Вихід із системи",
  newsCreated: "Створення новини",
  newsUpdated: "Редагування новини",
  newsDeleted: "Видалення новини",
  userStatusChanged: "Зміна статусу користувача",
};

const FIRST_NAMES = ["Олена", "Андрій", "Марія", "Дмитро", "Наталія", "Богдан", "Ірина", "Максим", "Софія", "Юрій"];
const LAST_NAMES = ["Коваленко", "Шевченко", "Бондаренко", "Мельник", "Ткаченко", "Кравчук", "Гриценко", "Польовий", "Лисенко", "Федоренко"];

const pad = (value) => String(value).padStart(2, "0");

export const formatDate = (iso) => {
  const date = new Date(iso);
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
};

export const formatTime = (iso) => {
  const date = new Date(iso);
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const dateFor = (index) => new Date(2026, 9, 1 + (index % 28), 8 + (index % 10), (index * 7) % 60).toISOString();

export const generateNews = (count = 60) =>
  Array.from({ length: count }, (_, index) => ({
    id: String(index + 1),
    title: `${NEWS_TITLES[index % NEWS_TITLES.length]} №${index + 1}`,
    category: NEWS_CATEGORIES[index % NEWS_CATEGORIES.length],
    status: NEWS_STATUSES[index % NEWS_STATUSES.length],
    image: photo(PHOTO_IDS[index % PHOTO_IDS.length]),
    text: `Повний текст новини №${index + 1}. Тут описано подію, учасників і основні результати. Новина підготовлена редакцією порталу.`,
    createdAt: dateFor(index),
  }));

export const generateUsers = (count = 60) =>
  Array.from({ length: count }, (_, index) => ({
    id: String(index + 1),
    name: `${FIRST_NAMES[index % FIRST_NAMES.length]} ${LAST_NAMES[(index * 3) % LAST_NAMES.length]}`,
    email: `user${index + 1}@portal.ua`,
    role: USER_ROLES[index % USER_ROLES.length],
    status: index % 5 === 4 ? "Заблокований" : "Активний",
  }));

export const generateLogs = (count = 60) =>
  Array.from({ length: count }, (_, index) => {
    const events = Object.values(LOG_EVENTS);
    const event = events[index % events.length];
    return {
      id: `seed-${index + 1}`,
      event,
      actor: `user${(index % 10) + 1}@portal.ua`,
      target: event.includes("новини") ? NEWS_TITLES[index % NEWS_TITLES.length] : "",
      createdAt: dateFor(index),
    };
  });
