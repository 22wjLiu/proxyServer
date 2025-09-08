export default {
    '*.{js,ts,vue,json,css,md}': [
      'pnpm exec prettier --write',
      'pnpm exec eslint --fix'
    ]
  }