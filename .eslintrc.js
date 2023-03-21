module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: [
        '@typescript-eslint',
        'react'
    ],
    rules: {
        "react/react-in-jsx-scope": "off",
    },
    root: true,
    settings: {
        react: {
            version: "18.2"
        }
    },
    ignorePatterns: ["**/*rc.js", "**/*.config.js"],
    
}