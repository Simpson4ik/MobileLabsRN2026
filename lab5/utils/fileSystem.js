import { Directory, File, Paths } from "expo-file-system";

import { getExtension } from "@/utils/format";

export const ROOTS = {
  document: {
    key: "document",
    title: "Документи",
    description: "Постійне сховище застосунку",
    icon: "document-text",
    getDirectory: () => Paths.document,
  },
  cache: {
    key: "cache",
    title: "Кеш",
    description: "Тимчасові файли, система може їх очистити",
    icon: "time",
    getDirectory: () => Paths.cache,
  },
};

const FORBIDDEN_CHARS = /[\\/:*?"<>|]/;

export function splitPath(path) {
  return path ? String(path).split("/").filter(Boolean) : [];
}

export function joinPath(...parts) {
  return parts.flatMap(splitPath).join("/");
}

export function parentPath(path) {
  return splitPath(path).slice(0, -1).join("/");
}

export function getRoot(root) {
  return ROOTS[root] ?? ROOTS.document;
}

export function getDirectory(root, path) {
  const base = getRoot(root).getDirectory();
  const segments = splitPath(path);
  return segments.length ? new Directory(base, ...segments) : base;
}

export function getFile(root, path) {
  return new File(getRoot(root).getDirectory(), ...splitPath(path));
}

export function getStorageStats() {
  const total = Paths.totalDiskSpace;
  const free = Paths.availableDiskSpace;
  return { total, free, used: Math.max(total - free, 0) };
}

export function getRootSummary(root) {
  const directory = getRoot(root).getDirectory();
  if (!directory.exists) return { size: 0, count: 0 };
  return { size: directory.size ?? 0, count: directory.list().length };
}

function describe(item) {
  if (item instanceof Directory) {
    const info = item.info();
    return {
      name: item.name,
      isDirectory: true,
      size: info.size ?? null,
      modificationTime: info.modificationTime ?? null,
      itemsCount: item.list().length,
    };
  }
  return {
    name: item.name,
    isDirectory: false,
    size: item.size,
    modificationTime: item.modificationTime,
    extension: getExtension(item.name),
  };
}

export function listEntries(root, path) {
  const directory = getDirectory(root, path);
  if (!directory.exists) return [];
  return directory
    .list()
    .map(describe)
    .sort((a, b) => {
      if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1;
      return a.name.localeCompare(b.name, "uk", { sensitivity: "base" });
    });
}

export function validateName(name) {
  const trimmed = name.trim();
  if (!trimmed) return "Введіть назву";
  if (trimmed === "." || trimmed === "..") return "Недопустима назва";
  if (FORBIDDEN_CHARS.test(trimmed)) return 'Назва не може містити символи \\ / : * ? " < > |';
  if (trimmed.length > 100) return "Назва задовга (максимум 100 символів)";
  return null;
}

function entryExists(parent, name) {
  return new Directory(parent, name).exists || new File(parent, name).exists;
}

export function createFolder(root, path, name) {
  const parent = getDirectory(root, path);
  const folderName = name.trim();
  if (entryExists(parent, folderName)) {
    throw new Error(`«${folderName}» вже існує в цій папці`);
  }
  parent.createDirectory(folderName);
  return joinPath(path, folderName);
}

export function toTxtName(name) {
  const trimmed = name.trim();
  return trimmed.toLowerCase().endsWith(".txt") ? trimmed : `${trimmed}.txt`;
}

export async function createTextFile(root, path, name, content) {
  const parent = getDirectory(root, path);
  const fileName = toTxtName(name);
  if (entryExists(parent, fileName)) {
    throw new Error(`«${fileName}» вже існує в цій папці`);
  }
  const file = new File(parent, fileName);
  file.create();
  await file.write(content);
  return joinPath(path, fileName);
}

export async function readTextFile(root, path) {
  return getFile(root, path).text();
}

export async function writeTextFile(root, path, content) {
  await getFile(root, path).write(content);
}

export function deleteEntry(root, path, isDirectory) {
  const entry = isDirectory ? getDirectory(root, path) : getFile(root, path);
  if (!entry.exists) throw new Error("Об'єкт уже не існує");
  entry.delete();
}

export function getEntryInfo(root, path, isDirectory) {
  if (isDirectory) {
    const directory = getDirectory(root, path);
    const info = directory.info();
    return {
      exists: info.exists,
      name: directory.name,
      uri: directory.uri,
      size: info.size ?? null,
      modificationTime: info.modificationTime ?? null,
      itemsCount: info.exists ? directory.list().length : 0,
    };
  }
  const file = getFile(root, path);
  const info = file.info();
  return {
    exists: info.exists,
    name: file.name,
    uri: file.uri,
    extension: getExtension(file.name),
    size: info.size ?? null,
    modificationTime: info.modificationTime ?? null,
  };
}
