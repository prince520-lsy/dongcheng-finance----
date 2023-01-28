<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-config-provider>
</template>

<script>
import { domTitle, setDocumentTitle } from '@/utils/domUtil'
import { i18nRender } from '@/locales'

export default {
  data () {
    return {
    }
  },
  // 整体缩放
  // mounted(){
  //  document.documentElement.style.zoom= document.documentElement.clientWidth/1920
  //  	window.addEventListener('resize',function(){
	// 		location.reload()
	// 	})
  // },
  computed: {
    locale () {
      // 只是为了切换语言时，更新标题
      const { title } = this.$route.meta
      title && (setDocumentTitle(`${i18nRender(title)} - ${domTitle}`))

      return this.$i18n.getLocaleMessage(this.$store.getters.lang).antLocale
    }
  }
}
</script>
<style >
@import "./assets/base.css";

.ant-layout-footer{display: none;}
.ant-menu-dark.ant-menu-submenu-popup{
  z-index: 1600;
}
.ant-select-dropdown{
   z-index: 1600  !important;
}
.ant-pro-basicLayout-content{margin:5px 10px !important;}
.ant-pro-global-header-index-right .ant-pro-global-header-index-action:hover {
		background-color: #fff!important;
}
.my-head{
  display: flex;border-left: 4px solid var(--primary-color);padding: 10px;background: #fff;justify-content: space-between;align-items: center;
}
.drawer-tit{
  display: flex;justify-content: space-between;padding:20px 10px;border-bottom: 1px solid #f2f2f2;
}
  .scroll::-webkit-scrollbar{ width:4px;}
  .scroll::-webkit-scrollbar-track{background: #f2f2f2;border-radius:2px;}
  .scroll::-webkit-scrollbar-thumb{background: #c1daff;border-radius:10px;}
  .scroll::-webkit-scrollbar-thumb:hover{background: #999;}
  .scroll::-webkit-scrollbar-corner{background: #179a16;}
</style>