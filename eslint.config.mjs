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
      'apps/dashboard/src/api/generated/**', // openapi 生成代码（可选忽略）
    ],
  },

  // 仅 dashboard 前端
  // 1) 处理 .vue：外层用 vue-eslint-parser，内部脚本交给 ts 解析
  {
    files: ['apps/dashboard/**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,           // 让 <script lang="ts"> 用 TS 解析器
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      globals: { ...globals.browser, ...globals.node },
    },
    extends: [
      ...vue.configs['flat/recommended'],  // Vue 推荐规则（兼容 ESLint 9）
      ...tseslint.configs.recommended,     // TS 基础规则（不启用 type-checked 版本，简单稳定）
    ],
    rules: {
      // 你的自定义规则…
    },
  },

  // 2) 处理纯 ts/js 文件
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
      ...tseslint.configs.recommended,
    ],
  },
)
