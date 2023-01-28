<template>
	<a-modal
	  title="选择地图"
	  :width="800"
	  :visible="dialogVisible"
	  :maskClosable="false"
		@ok="handleOk"
		@cancel="handleCancel"
	  cancelText="关闭"
	>
			<div style="display: flex;padding:10px 0;">
				<a-input v-model="key" placeholder="XX省XX市XX路/道XX号"></a-input>
				<a-button @click="searchAddress">搜索</a-button>
			</div>
	    <div style="width:100%;height:400px;border:#ccc solid 1px;" id="dituContent" ref="dituContent"></div>
			<p>{{address}}</p>
			<p>lat:{{lat}} lng:{{lng}}</p>
	</a-modal>
</template>

<script>
	import load from './loadScript.js'
	const cdnUrl = 'https://map.qq.com/api/js?v=2.exp&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77'
	let qq;
	export default {
	    name: 'qqMap',
	    props: {
	       
	    },
	    data() {
	        return {
						dialogVisible:true,
						map:null,
						marker:null,
						searchService:null,
						markers:[],
						key:'',
						lng:'',
						lat:'',
						address:''
	        }
	    },
	    mounted() {
	        this.init()
	    },
	  
	    methods: {
				open(e){
					if(e){
						this.lng = e.lng
						this.lat = e.lat
						var center = new qq.maps.LatLng(e.lng, e.lat);
						this.marker.setPosition(center)
						this.map.setCenter(center);
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
				searchAddress(){
					  this.clearOverlays(this.markers)
					 this.searchService.search(this.key);
				},
	        init() {
			
						load(cdnUrl,'qq',(err) => {
								if (err) {
										this.$message.error(err.message)
										return
								}
								setTimeout(()=>{
									this.initMap()
								},1000)
								qq = window.qq
						})
	        },
					clearOverlays(overlays) {
							var overlay;
							while (overlay = overlays.pop()) {
								overlay.setMap(null);
							}
						},
	        initMap() {
						console.log(window.qq)
						var center = new qq.maps.LatLng(39.908699, 116.397550);
						this.map = new  qq.maps.Map(
							this.$refs.dituContent,
							{
								center: center,
								zoom: 13
							}
						);
					 this.marker = new qq.maps.Marker({
								position: center,
								map: this.map
							});
						this.marker.setDraggable(true);
						this.markers = [];
						var latlngBounds = new qq.maps.LatLngBounds();
						
						let geocoder = new qq.maps.Geocoder();
						let that = this
						
						 geocoder.setComplete(function(result) {
						     that.address = result.detail.address
						 });
						
						qq.maps.event.addListener(that.map, 'click', function (e) {
							 that.marker.setPosition(new qq.maps.LatLng(e.latLng.lat, e.latLng.lng))
							 that.lng =e.latLng.lng;
							 that.lat = e.latLng.lat
							 geocoder.getAddress(e.latLng)
							}
						);
						qq.maps.event.addListener(that.marker, 'dragend', function(e) {
						 that.lng =e.latLng.lng;
						 that.lat = e.latLng.lat
						 geocoder.getAddress(e.latLng)
						 
						});
					
						
						
						
						
						this.searchService = new qq.maps.SearchService({
							map:that.map,
							//检索成功的回调函数
							complete: function (results) {
								//设置回调函数参数
								var pois = results.detail.pois;
								if(!pois){
									that.$message.error('未检索到相关地址')
									return
								}
								var infoWin = new qq.maps.InfoWindow({
									map: that.map
								});
								var latlngBounds = new qq.maps.LatLngBounds();
								for (var i = 0, l = pois.length; i < l; i++) {
									var poi = pois[i];
									//扩展边界范围，用来包含搜索到的Poi点
									latlngBounds.extend(poi.latLng);
			
									(function (n) {
										var new_marker = new qq.maps.Marker({
											position: pois[n].latLng,
											map: that.map
										});
										new_marker.setTitle(i + 1);
										that.markers.push(new_marker);
										qq.maps.event.addListener(new_marker, 'click', function () {
											infoWin.open();
											infoWin.setContent('<div style="width:280px;height:100px;">' + 'POI的ID为：' +
												pois[n].id + '，POI的名称为：' + pois[n].name + '，POI的地址为：' + pois[n].address + '，POI的类型为：' + pois[n].type + '</div>');
											infoWin.setPosition(pois[n].latLng);
										});
									})(i);
								}
								//调整地图视野
								that.map.fitBounds(latlngBounds);
							},
							//若服务请求失败，则运行以下函数
							error: function () {
								that.$message.error('未检索到相关地址')
							}
						})
						
			
					},

	    }
	}
	
	
</script>

<style>
</style>
