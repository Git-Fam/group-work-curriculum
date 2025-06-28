// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         api: 'modern-compiler',
//       },
//     },
//   },
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
    // 以下を追加
    modules: {
      scopeBehaviour: 'global', // または 'global'、 'local' はデフォルトなので明示的に 'global' を試す
      // CSS Modulesを完全に無効にする直接的な設定は複雑なので、
      // ここではファイル命名規則に頼らないようにする
      // 具体的には、global.scssがglobal.module.scssのような名前になっていないか確認してください。
      // もしglobal.module.scssのような名前なら、global.scssに変更してください。
    },
  },
});
