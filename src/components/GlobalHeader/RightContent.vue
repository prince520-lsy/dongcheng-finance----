<template>
  <div :class="wrpCls">
    <a-switch @change="changMode" checked-children="深色模式" :checked="checked" un-checked-children="正常模式" />
    <!-- <avatar-dropdown :menu="showMenu" :current-user="userInfo" :class="prefixCls" /> -->
    <!-- <select-lang :class="prefixCls" /> -->
  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'
import SelectLang from '@/components/SelectLang'
import storage from 'store'
import { USER_INFO, TOGGLE_NAV_THEME } from '@/store/mutation-types'
import {mapState} from 'vuex'
export default {
  name: 'RightContent',
  components: {
    AvatarDropdown,
    SelectLang
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showMenu: true,
      checked:true,
      userInfo:null,
    }
  },
  computed: {
    ...mapState({
       currentUser:state=>state.user.info
    }),
    wrpCls () {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${(this.isMobile || !this.topMenu) ? 'light' : this.theme}`]: true
      }
    }
  },
  mounted () {
    // this.userInfo = JSON.parse(storage.get(USER_INFO))
    let isdark = storage.get(TOGGLE_NAV_THEME) ==='dark';
    this.changMode(isdark)
  },
  methods:{
     changMode(e){
       this.checked = e
       const themeStyle = document.getElementById('theme-style')
       if(e){
         themeStyle.href  = `/theme/drak.css`
         storage.set(TOGGLE_NAV_THEME,'dark')
         this.$store.commit(TOGGLE_NAV_THEME,'dark')
       }else{
         themeStyle.href  = `/theme/primary.css`
         storage.set(TOGGLE_NAV_THEME,'light')
         this.$store.commit(TOGGLE_NAV_THEME,'light')
       }
    }
  }
}
</script>
