import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  {
    plugins: { prettier: pluginPrettier },
    rules: {
      'prettier/prettier': 'error', // Вызывает ошибку, если код не отформатирован по Prettier
      'linebreak-style': ['error', 'windows'],
      // https://eslint.vuejs.org/rules/valid-v-slot
      'vue/valid-v-slot': [
        'error',
        {
          allowModifiers: true,
        },
      ],
      // Порядок расположения аттрибутов
      // https://eslint.vuejs.org/rules/attributes-order
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            ['UNIQUE', 'SLOT'],
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'ATTR_DYNAMIC',
            'ATTR_STATIC',
            'ATTR_SHORTHAND_BOOL',
            'EVENTS',
            'CONTENT',
          ],
          alphabetical: false,
        },
      ],
      // Правило для указания name в script
      // Bad: name: 'my-component'
      // Good: name: 'MyComponent'
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      // https://eslint.vuejs.org/rules/custom-event-name-casing
      'vue/custom-event-name-casing': ['error', 'camelCase'],
      // https://eslint.vuejs.org/rules/prop-name-casing
      'vue/prop-name-casing': ['error', 'camelCase'],
      // https://eslint.vuejs.org/rules/attribute-hyphenation
      'vue/attribute-hyphenation': ['error', 'always'],
      // https://eslint.vuejs.org/rules/multi-word-component-names
      'vue/multi-word-component-names': ['error', { ignores: ['App', 'Login'] }],
      // https://eslint.vuejs.org/rules/v-on-event-hyphenation
      'vue/v-on-event-hyphenation': [
        'error',
        'always',
        {
          autofix: true,
        },
      ],
      'vue/order-in-components': [
        'warn',
        {
          order: [
            'el',
            'name',
            'key',
            'parent',
            'functional',
            ['delimiters', 'comments'],
            ['components', 'directives', 'filters'],
            'extends',
            'mixins',
            ['provide', 'inject'],
            'ROUTER_GUARDS',
            'layout',
            'middleware',
            'validate',
            'scrollToTop',
            'transition',
            'loading',
            'inheritAttrs',
            'model',
            ['props', 'propsData'],
            'emits',
            'setup',
            'asyncData',
            'data',
            'fetch',
            'head',
            'computed',
            'watch',
            'watchQuery',
            'LIFECYCLE_HOOKS',
            'methods',
            ['template', 'render'],
            'renderError',
          ],
        },
      ],
      // https://eslint.vuejs.org/rules/v-slot-style.html
      'vue/v-slot-style': [
        'error',
        {
          atComponent: 'longform',
          default: 'shorthand',
          named: 'shorthand',
        },
      ],
      // https://eslint.vuejs.org/rules/component-name-in-template-casing.html
      'vue/component-name-in-template-casing': [
        'error',
        'kebab-case',
        {
          registeredComponentsOnly: true,
          ignores: [],
        },
      ],
      // https://eslint.vuejs.org/rules/match-component-file-name.html
      'vue/match-component-file-name': [
        'error',
        {
          extensions: ['vue'],
          shouldMatchCase: true,
        },
      ],
      // https://eslint.vuejs.org/rules/no-side-effects-in-computed-properties
      'vue/no-side-effects-in-computed-properties': 'error',
      // https://eslint.vuejs.org/rules/require-component-is
      'vue/require-component-is': 'error',
      // https://eslint.vuejs.org/rules/require-default-prop
      'vue/require-default-prop': 'error',
      // https://eslint.vuejs.org/rules/require-explicit-emits.html
      'vue/require-explicit-emits': [
        'warn',
        {
          allowProps: false,
        },
      ],
      // Пока добавим, как перейдем на script setup - уберем
      // https://eslint.vuejs.org/rules/component-options-name-casing
      'vue/component-options-name-casing': ['error', 'PascalCase'],
      // https://eslint.vuejs.org/rules/no-deprecated-data-object-declaration
      'vue/no-deprecated-data-object-declaration': 'error',
      // https://eslint.vuejs.org/rules/no-useless-template-attributes.html
      'vue/no-useless-template-attributes': 'warn',
      // https://eslint.vuejs.org/rules/no-template-key
      'vue/no-template-key': 'error',
      // https://eslint.vuejs.org/rules/no-unused-components
      'vue/no-unused-components': 'warn',
      // https://eslint.vuejs.org/rules/no-unused-vars
      'vue/no-unused-vars': ['error'],
      // https://eslint.vuejs.org/rules/no-v-text-v-html-on-component
      'vue/no-v-text-v-html-on-component': 'error',
      // https://eslint.vuejs.org/rules/no-template-shadow.html
      'vue/no-template-shadow': 'warn',
      // https://eslint.vuejs.org/rules/require-prop-types.html
      'vue/require-prop-types': 'error',
    },
  },
  prettier, // Отключает конфликтующие правила форматирования
];

