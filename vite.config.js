import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    // 开发或生产环境服务的公共基础路径。合法的值包括以下几种：
    // 绝对 URL 路径名，例如 /foo/
    // 完整的 URL，例如 https://foo.com/
    // 空字符串或 ./（用于嵌入形式的开发）
    base: '/',
    define: {
        // 环境变量
        'process.env': {}
    },
    server: {
        //服务器主机名
        host: "0.0.0.0",
        //端口号
        port: '3000',
        // 设为 true 时若端口已被占用则会直接退出，
        // 而不是尝试下一个可用端口
        strictPort: false,
        //自定义代理规则
        proxy: {
            // 选项写法
            "/ptshop": {
                target: 'http://xx:8080/xx', // 后端
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/ptshop/, '')
            },
        },
    },
    //构建
    build: {
        //浏览器兼容性  "esnext"|"modules"
        // target: "modules",
        //输出路径
        outDir: "dist",
        //生成静态资源的存放路径
        assetsDir: "assets",
        //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
        assetsInlineLimit: 0,
        // //启用/禁用 CSS 代码拆分
        // cssCodeSplit: true,
        // //构建后是否生成 source map 文件
        sourcemap: true,
        // //自定义底层的 Rollup 打包配置
        rollupOptions: {
            output: {
                chunkFileNames: 'static/js/[name]-[hash].js',
                entryFileNames: 'static/js/[name]-[hash].js',
                assetFileNames: 'static/img/[name]-[hash].[ext]',
            }
        },
        // //@rollup/plugin-commonjs 插件的选项
        // commonjsOptions: {},
        // //构建的库
        // lib: {},
        // //当设置为 true，构建后将会生成 manifest.json 文件
        // manifest: false,
        // //设置为 false 可以禁用最小化混淆，
        // //或是用来指定使用哪种混淆器
        // //boolean | 'terser' | 'esbuild'
        // minify: "terser",
        // //传递给 Terser 的更多 minify 选项。
        // terserOptions: {},
        // //设置为 false 来禁用将构建后的文件写入磁盘
        // write: true,
        // //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
        // emptyOutDir: true,
        // //启用/禁用 brotli 压缩大小报告
        // brotliSize: true,
        // //chunk 大小警告的限制
        // chunkSizeWarningLimit: 500
    },
    resolve: {
        // 配置别名
        alias: [
            {
                find: '@',
                replacement: resolve(__dirname, 'src'),
            },
            {
                find: '~@',
                replacement: resolve(__dirname, 'src'),
            }
        ],
    },
    css: {
        // css预处理器
        preprocessorOptions: {
            scss: {
                charset: false,
                // additionalData: '@import "./src/assets/style/global.scss";',
            },
        },
        // loaderOptions: {
        //     css: {},
        //     postcss: {
        //         plugins: [
        //             require('postcss-px2rem')({
        //                 remUnit: 37.5
        //             })
        //         ]
        //     }
        // }
    },
    plugins: [vue()],
})
