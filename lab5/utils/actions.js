import { Alert } from "react-native";

import { deleteEntry } from "@/utils/fileSystem";
import { pluralize } from "@/utils/format";

// Нативний діалог підтвердження перед видаленням файлу або папки.
export function confirmDelete({ root, path, name, isDirectory, itemsCount = 0 }, onDeleted) {
  const details = isDirectory
    ? itemsCount > 0
      ? `Папку «${name}» буде видалено разом із вмістом (${pluralize(itemsCount, "об'єкт", "об'єкти", "об'єктів")}).`
      : `Порожню папку «${name}» буде видалено.`
    : `Файл «${name}» буде видалено.`;

  Alert.alert(isDirectory ? "Видалити папку?" : "Видалити файл?", `${details}\nЦю дію неможливо скасувати.`, [
    { text: "Скасувати", style: "cancel" },
    {
      text: "Видалити",
      style: "destructive",
      onPress: () => {
        try {
          deleteEntry(root, path, isDirectory);
          onDeleted?.();
        } catch (error) {
          Alert.alert("Не вдалося видалити", error.message);
        }
      },
    },
  ]);
}
