<template>
	<a-modal
	  title="选择地图"
	  :width="800"
	  :visible="dialogVisible"
	  :maskClosable="false"
		@ok="handleOk"
		@cancel="handleCancel"
	  cancelText="关闭"
    :zIndex="9999"
		:destroyOnClose="true"
	>
	    <div class="amap-page-container">
				 <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult" />
				 <el-amap
					 vid="amapDemo2"
					 :center="mapCenter"
					 :zoom="zoom"
					 class="amap-demo"
					 :events="events"
					 :plugin="plugin"
				 >
					 <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker.position" />
				 </el-amap>
				<div class="toolbar">
					 当前坐标: {{ lng }}, {{ lat }}
						 
					 地址: {{ address }}
				</div>
			 </div>

		
	</a-modal>
</template>

<script>
/**
 * 
 * 
 *  <Position ref="map" @getPos="getPos" :makerPosition=[115.854811,28.689709] address="江西省" />
 * 
 * 	this.$refs.map.open({
	*			lng:115.802828,
	*			lat:28.716811,
	*			address:'江西省'
	*		})
 * 
 *  getPos(e){console.log(e)}
 * 
 * 
 */


export default {
  name: 'AmapPage',
  props: {
		adr:{
			type: String,
			default: ''
		},
    makerPosition: {
      type: Array,
      default: () => {
        return [115.854811,28.689709]
      }
    }
  },
  data: function() {
    const self = this
    return {
			dialogVisible:false,
      zoom: 12,
      center: [0, 0],
      address: '',
      markers: [
        {
          position: this.makerPosition
        }
      ],
      searchOption: {
        city: '全国',
        citylimit: false
      },
      mapCenter: [121.59996, 31.197646],
      plugin: [{
        pName: 'ToolBar',
        events: {
          init(instance) {
          }
        }
      }],
      events: {
        click(e) {
          const { lng, lat } = e.lnglat
          self.lng = lng
          self.lat = lat
          self.markers[0].position = [lng, lat]
					
          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          geocoder.getAddress([lng, lat], function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                self.address = result.regeocode.formattedAddress
								console.log(self.address)
                self.$nextTick()
              }
            }
          })
        }
      },
      lng: 0,
      lat: 0
    }
  },
  created() {
    this.mapCenter = this.makerPosition
    this.lng = this.makerPosition[0]
    this.lat = this.makerPosition[1]
		this.address = this.adr
  },
  methods: {
		open(e){
			if(e){
				this.lng = e.lng
				this.lat = e.lat
				this.markers[0].position = [e.lng,e.lat]
				this.mapCenter = [e.lng,e.lat]
				this.address = e.address
			}
			this.dialogVisible = true
		},
		handleCancel(){
			this.dialogVisible = false
		},
		handleOk(){
			this.handleCancel()
			this.$emit('getPos',{
				lng: this.lng,
				lat: this.lat,
				address:this.address
			})
		},
    onSearchResult(pois) {
      let latSum = 0
      let lngSum = 0
			console.log(pois)
      if (pois.length > 0) {
        // pois.forEach(poi => {
        //   const { lng, lat } = poi
        //   lngSum += lng
        //   latSum += lat
        // })
        // const center = {
        //   lng: lngSum / pois.length,
        //   lat: latSum / pois.length
        // }
				
				
        this.mapCenter = [pois[0].lng, pois[0].lat]
				this.markers[0].position =[pois[0].lng, pois[0].lat]
				this.address = pois[0].name
      }
    },
    handleClose(done) {
      this.$emit('', false)
      this.$nextTick(() => {
        done()
      })
    },
    select() {
      this.$emit('update:makerPosition', this.markers[0].position)
    }
  }

}
</script>

<style lang="less" scoped>
    .amap-demo {
      // height: 580px;
			height: 500px;
    }
    .search-box {
      z-index: 999;
      margin-bottom: 20px;
			width:100%
    }
    .amap-page-container {
      position: relative;
    }
</style>