# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar) and disable Vetur


/src/utils 管理网络请求

/src/api 管理网络请求
/src/store 管理状态
/src/router 管理路由
/src/components 管理组件


/src/compomnets/SvgIcon/index.vue
/src/plugins/icons.js
都是管理svg的，svg标签用法：在/assets/icons新建文件，再复制粘贴svg代码，就可以在组件中使用了，参照/src/components/AdminView.vue 85行
<svg class="icon" aria-hidden="true" style="margin: auto;">
            <use xlink:href="#icon-return"></use></svg>
其中"#icon-return"，“return”要与文件名一致