import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginImport from "eslint-plugin-import";

export default [
    {
        files: ["**/*.{js,jsx}"],
        plugins: {
            react: pluginReact,
            import: pluginImport,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                __DEV__: "readonly",
                formData: "readonly",
                fetch: "readonly",
                navigator: "readonly",
                alert: "readonly",
                process: "readonly",
                require: "readonly",
                console: "readonly",
                module: "readonly",
                __dirname: "readonly",
            },
        },
        settings: {
            react: { version: "detect" },
            "import/resolver": {
                node: {
                    extensions: [".js", ".jsx", ".ts", ".tsx", ".native.js"]
                }
            }
        },
        rules: {
            ...js.configs.recommended.rules,
            "no-unused-vars": "warn",
            "no-undef": "error",
            "react/jsx-uses-react": "error",
            "react/jsx-uses-vars": "error",
            "react/prop-types": "off",
            "react/react-in-jsx-scope": "off",
            "import/no-unresolved": "error",
            "import/named": "error",
        },
    },
];