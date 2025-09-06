import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [".history/**", "build/**", "node_modules/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { 
      react: pluginReact, 
      "react-hooks": hooksPlugin, 
      import: importPlugin 
    },
    languageOptions: { 
      parserOptions: { 
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2022,
        sourceType: "module"
      } 
    },
    settings: {
      react: {
        version: "19.0.0"
      }
    },
    rules: {
      // React rules
      "react/jsx-uses-react": "off", // Not needed with new JSX transform
      "react/react-in-jsx-scope": "off", // Not needed with new JSX transform
      "react/jsx-uses-vars": "error",
      "react/display-name": "off", // Not needed for most components
      "react/prop-types": "off", // Using TypeScript instead
      "react/no-unescaped-entities": "error",
      
      // React Hooks rules
      ...hooksPlugin.configs.recommended.rules,
      
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_" 
      }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-require-imports": "error",
      
      // General rules
      "no-unused-vars": "off", // Use TypeScript version instead
    },
  },
  { 
    languageOptions: { 
      globals: { 
        ...globals.browser,
        ...globals.node 
      } 
    } 
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
