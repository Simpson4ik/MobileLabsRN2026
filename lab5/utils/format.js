const UNITS = ["Б", "КБ", "МБ", "ГБ", "ТБ"];

export function formatBytes(bytes) {
  if (bytes == null || Number.isNaN(bytes)) return "—";
  if (bytes < 1024) return `${bytes} ${UNITS[0]}`;

  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < UNITS.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value < 10 ? 2 : 1)} ${UNITS[unit]}`;
}

export function formatDate(timestamp) {
  if (!timestamp) return "—";
  const date = new Date(timestamp);
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}, ${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}`;
}

const FILE_TYPES = {
  txt: "Текстовий документ",
  md: "Документ Markdown",
  json: "Дані JSON",
  log: "Журнал подій",
  csv: "Таблиця CSV",
  jpg: "Зображення JPEG",
  jpeg: "Зображення JPEG",
  png: "Зображення PNG",
  pdf: "Документ PDF",
  mp3: "Аудіо MP3",
  mp4: "Відео MP4",
  zip: "Архів ZIP",
};

export function getExtension(name) {
  const dot = name.lastIndexOf(".");
  return dot > 0 ? name.slice(dot + 1).toLowerCase() : "";
}

export function getFileType(name) {
  const ext = getExtension(name);
  if (!ext) return "Файл без розширення";
  return FILE_TYPES[ext] ?? `Файл .${ext}`;
}

export function pluralize(count, one, few, many) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return `${count} ${one}`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${count} ${few}`;
  return `${count} ${many}`;
}
