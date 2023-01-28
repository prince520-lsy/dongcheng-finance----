<template>
  <div style="display: flex; justify-content: space-between;align-items:center">
    <div>
      <a-button size="small" type="primary" @click="NewAdd">新增项目</a-button>
    </div>
    <div class="contor-item">
      <a-button size="small" @click="recenterPosition">
        {{ opts.locale.Now }}
      </a-button>

      <span>{{ opts.locale['X-Scale'] }}</span>
      <div style="width: 100px">
        <a-slider :style="{ ...style['header-slider'] }" v-model="scale" :max="24" :min="2"></a-slider>
      </div>

      <span>{{ opts.locale['Y-Scale'] }}</span>
      <div style="width: 100px">
        <a-slider v-model="height" :max="100" :min="7"></a-slider>
      </div>

      <span>{{ opts.locale['Before/After'] }}</span>
      <div style="width: 100px">
        <a-slider v-model="scope" :max="31" :min="0"></a-slider>
      </div>

      <span>{{ opts.locale['Task list width'] }}</span>
      <div style="width: 100px">
        <a-slider v-model="divider" :max="100" :min="0"></a-slider>
      </div>

      <span>{{ opts.locale["Display task list"] }}  </span>
      <div >
           <a-switch
           v-model="root.state.options.taskList.display"
            ></a-switch>
      </div>

    </div>
  </div>

</template>

<script>

const defaultOptions = {
  title: {
    label: 'gantt-elastic',
    html: false,
  },
  locale: {
    Now: 'Now',
    'X-Scale': 'Zoom-X',
    'Y-Scale': 'Zoom-Y',
    'Task list width': 'Task list',
    'Before/After': 'Expand',
    'Display task list': 'Show task list',
  },
}
export default {
  name: 'GanttHeader',
  components: {},
  props: ['options', 'dynamicStyle'],
  inject: ['root'],
  data() {
    return {
      scaleTimeoutId: null,
      firstScale: false,
      localScale: 0,
      localHeight: 0,
      localBefore: 0,
      localPercent: 0,
      sliderOptions: {
        xScale: {
          value: 0,
        },
      },
      style: {},
      opts: {},
    }
  },
  created() {
    this.localScale = this.root.state.options.times.timeZoom
    this.localHeight = this.root.state.options.row.height
    this.localBefore = this.root.state.options.scope.before
    this.localPercent = this.root.state.options.taskList.percent
    this.sliderOptions.xScale.value = this.root.state.options.times.timeZoom
    this.opts = this.root.mergeDeep({}, defaultOptions, this.options)
  },
  methods: {
    NewAdd(){
     this.$emit('add',{type:1})
    },
    getImage() {
      this.root.getImage('image/png').then((imgB64) => {
        const link = document.createElement('a')
        link.href = imgB64
        link.download = 'gantt-elastic.png'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    },
    recenterPosition() {
      this.root.$emit('recenterPosition')
    },
    setScale(value) {
      if (this.scaleTimeoutId !== null) {
        clearTimeout(this.scaleTimeoutId)
        this.scaleTimeoutId = null
      }
      // debouncing
      if (this.firstScale) {
        this.scaleTimeoutId = setTimeout(() => {
          this.root.$emit('times-timeZoom-change', value)
          this.scaleTimeoutId = null
        }, 50)
      } else {
        this.root.$emit('times-timeZoom-change', value)
        this.firstScale = true
      }
    },
  },
  computed: {
    /**
     * If there is a component slot specified for header
     * @returns {bool}
     */
    beforeOptionsIsComponent() {
      const headerSlot = this.options.slots.header
      if (typeof headerSlot.beforeOptions === 'object' && !Array.isArray(headerSlot.beforeOptions)) {
        return true
      }
      return false
    },
    /**
     * If there is a slot with beforeOptions html content
     * @returns {bool}
     */
    beforeOptionsIsHtml() {
      if (typeof this.options.slots.header.beforeOptions === 'string') {
        return true
      }
      return false
    },
    scale: {
      get() {
        return this.localScale
      },
      set(value) {
        this.localScale = Number(value)
        this.setScale(this.localScale)
      },
    },
    height: {
      get() {
        return this.localHeight
      },
      set(value) {
        this.localHeight = Number(value)
        this.root.$emit('row-height-change', Number(value))
      },
    },
    scope: {
      get() {
        return this.localBefore
      },
      set(value) {
        this.localBefore = Number(value)
        this.root.$emit('scope-change', Number(value))
      },
    },
    divider: {
      get() {
        return this.localPercent
      },
      set(value) {
        this.localPercent = Number(value)
        this.root.$emit('taskList-width-change', Number(value))
      },
    },
  },
}
</script>
<style lang="less" scoped>
.contor-item {
  display: flex;
  align-items: center;

  font-size: 14px;
  span {
    margin: 0 10px 0 12px;
  }
}
</style>