// eslint.config.mjs
import js from '@eslint/js'
import * as tseslint from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import globals from 'globals'

export default tseslint.config(
  // 全局忽略
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/bin/**',
      'apps/proxy-server/**',
      'apps/dashboard/src/api/generated/**',
    ],
  },

  // 先给所有 .ts/.js 一个基础规则（不匹配 .vue）
  {
    files: ['apps/dashboard/**/*.{ts,js}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: { ...globals.browser, ...globals.node },
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended, // 非 type-checked 版本
    ],
  },

  // 专门处理 .vue（外层 vue-parser，内层脚本交给 TS 解析）
  {
    files: ['apps/dashboard/**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { vue },
    extends: [
      ...vue.configs['flat/recommended'], // ESLint 9 兼容的 Vue 推荐规则
    ],
    rules: {
      // 你要关掉的这条
      'vue/singleline-html-element-content-newline': 'off',
      // 通常一起放宽的几条（可选）
      'vue/max-attributes-per-line': 'off',
      'vue/html-self-closing': ['warn', {
        html: { void: 'always', normal: 'never', component: 'always' },
      }],
    },
  },
)
