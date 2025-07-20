// eslint.config.js

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react"; // Импортируем сам плагин React
import pluginReactHooks from "eslint-plugin-react-hooks";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier/flat"; // Используем flat версию
export default [
  // 1. Базовые настройки для всех файлов JS/TS/JSX
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: {
      react: pluginReact,
    },
    // Файлы, которые ESLint будет игнорировать
    ignores: ["node_modules/", "dist/", "build/", "*.config.js"],
    languageOptions: {
      globals: {
        ...globals.browser, // Глобальные переменные браузера
      },
      parser: tseslint.parser, // Использование TypeScript парсера
      parserOptions: {
        ecmaVersion: 2021, // Поддержка синтаксиса ES2021
        sourceType: "module", // Использование ES-модулей
        ecmaFeatures: {
          jsx: true, // Включение поддержки JSX
        },
        // Важно: Путь к вашему tsconfig.json для правил, требующих информации о типах
        project: ["./tsconfig.app.json", "./tsconfig.node.json"],
        tsconfigRootDir: import.meta.dirname, // Указываем корневую директорию для tsconfig
      },
    },
    // Настройки для плагина React (для автоматического определения версии React)
    settings: {
      react: {
        version: "detect", // Автоматически определяет версию React
      },
    },
  },

  // 2. Встроенные правила ESLint (eslint:recommended)
  pluginJs.configs.recommended,

  // 3. Правила TypeScript (plugin:@typescript-eslint/recommended)
  // Используем spread оператор для включения всех рекомендованных правил
  ...tseslint.configs.recommended,

  // 4. Правила React (plugin:react/recommended)
  // Важно: Здесь мы включаем рекомендованные правила React
  pluginReact.configs.flat.recommended,

  // 5. Правила React Hooks (plugin:react-hooks/recommended)
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], // Применяем только к этим файлам
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error", // Проверяет правила использования хуков
      "react-hooks/exhaustive-deps": "warn", // Проверяет зависимости useEffect и других хуков
    },
  },

  // 6. Отключение конфликтующих правил ESLint для Prettier (eslint-config-prettier)
  // Должен идти перед правилами Prettier
  eslintConfigPrettier,

  // 7. Правила Prettier (eslint-plugin-prettier) - должен быть последним
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], // Применяем только к этим файлам
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error", // Сообщает о проблемах форматирования как об ошибках
    },
  },

  // 8. Ваши собственные правила или переопределение существующих
  // Важно: Здесь мы отключаем react/react-in-jsx-scope ПОСЛЕ того, как оно было включено
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], // Применяем только к этим файлам
    rules: {
      // Отключить правило, которое требует импорта React в каждом JSX файле (для React 17+)
      "react/react-in-jsx-scope": "off",
    },
  },
];
