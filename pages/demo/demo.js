// pages/demo/demo.js
const util = require('../../utils/util.js')

const Rpx = require("../../simplemap/utils/convert").rpxToPx
const SimpleMap = require("../../simplemap/simplemap").SimpleMap
const Layer = require("../../simplemap/layers/Layer")
const Widget = require("../../simplemap/widgets/Widget")

Page({

	marks: {},

	/**
	 * 页面的初始数据
	 */
	data: {
		top: "10%",
		results: [],
		showMap: true,
	},

	onInput: function (e) {
		const value = e.detail.value
		if (value != "") {
			const results = util.searchWord(value, this.allMarks, (o) => { return o.tag })
			if (e.type == "confirm") {
				if (results.length > 0) {
					this.setData({
						results: [],
						showMap: true
					})
					this.marks[results[0].tag].click()
				} else {
					wx.showToast({
						title: "无搜索结果",
						icon: "none"
					})
				}
			} else {
				this.setData({
					results: results,
					showMap: results.length == 0
				})
			}
		}
		this.searchValue = value
		return value
	},

	onSearch: function(e) {
		if (this.data.showMap) {
			if (this.searchValue != null && this.searchValue != "") {
				const results = util.searchWord(this.searchValue, this.allMarks, (o) => { return o.tag })
				if (results.length > 0) {
					this.setData({
						results: results,
						showMap: false
					})
				}else {
					wx.showToast({
						title: "无搜索结果",
						icon: "none"
					})
				}
			}
		} else {
			this.setData({
				results: [],
				showMap: true,
				searchValue: ""
			})
		}
	},

	selectResult: function(e) {
		this.setData({
			showMap: true
		})
		const tag = e.target.dataset.tag
		if (tag in this.marks){
			this.marks[tag].click()
		}
	},

	onMapReady: function (res) {
		console.log('地图准备完成', res.width, res.height)
		const map = res.map

		// 创建一个简单的地图背景层
		const mapLayer = new Layer.TileMapLayer(map, 1000, 1000)
		map.setMap(mapLayer)

		// 设置长按回调
		mapLayer.setLongTapCallback(e => {
			wx.showToast({
				icon: "none",
				title: "点击位置 x=" + e.x.toFixed(1) + " y=" + e.y.toFixed(1),
			})
		})

		// 配置缩放按钮
		const btnZoomIn = new Widget.ImageButton(map, map.width - Rpx(140), map.height - Rpx(336), "../../resource/zoom-in.png", Rpx(36), Rpx(36))
		const btnZoomOut = new Widget.ImageButton(map, map.width - Rpx(140), map.height - Rpx(220), "../../resource/zoom-out.png", Rpx(36), Rpx(36))
		btnZoomIn.setPadding(Rpx(20))
		btnZoomOut.setPadding(Rpx(20))
		btnZoomIn.setClickCallback(widget => {
			map.setZoom(map.getZoom() * 1.5)
		})
		btnZoomOut.setClickCallback(widget => {
			map.setZoom(map.getZoom() / 1.5)
		})

		const btnGroup = new Widget.ButtonGroup(map, map.width - Rpx(140), map.height - Rpx(256))
		btnGroup.setVerticalAlign("middle")
		btnGroup.addButton(btnZoomIn)
		btnGroup.addButton(btnZoomOut)
		map.addWidget(btnGroup)

		// 添加文字Logo
		const text = new Widget.Text(map, 10, map.height - 10, "简单地图演示")
		text.setTextColor("#333333")
		text.setTextBaseline("bottom")
		text.setTextAlign("left")
		map.addWidget(text)

		// 只创建一个 marker
		const that = this
		
		// 只有一个标记数据
		this.allMarks = [
			{ tag: "中心位置", x: 500, y: 500, min: 0.6, max: 3 }
		]
		
		// 确保 marks 对象存在
		this.marks = {}
		
		const m = this.allMarks[0]
		const mark = new Layer.MarkLayer(map, m.tag, m.x, m.y)
		mark.setVisibleZoom(m.min, m.max)
		mark.setTag(m.tag)
		mark.setTextColor("#ff0000")
		mark.setTextSize(14)
		mark.setTagPosition("bottom")
		
		// 关键修改：一开始就显示图标，让标记更明显
		mark.setIcon("../../resource/position.png", 24, 32)
		mark.setOffset(-12, -32)
		
		// 设置点击回调
		mark.setClickCallback((e) => {
			e.target.setTextSize(16)
			map.setLocation(e.target.x, e.target.y)
			map.setZoom(1.5)
			
			wx.showToast({
				icon: "none",
				title: "点击了: " + e.target.tag,
			})
		})
		
		map.addLayer(mark)
		this.marks[m.tag] = mark

		// 地图空白处点击清除标记样式
		mapLayer.setClickCallback(e => {
			mark.setTextSize(14)
		})

		// 关键修改：立即定位到标记位置
		console.log('立即定位到标记位置:', m.x, m.y)
		map.setLocation(m.x, m.y)
		map.setZoom(1.0)
		
		console.log('地图初始化完成，已添加1个标记')
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const mapOptions = {
			minZoom: 0.6,
			maxZoom: 3,
			slide: true,
			initX: 500,  // 设置初始位置为标记位置
			initY: 500,
			initZoom: 1.0 // 合适的缩放级别
		}
		const map = new SimpleMap(this, "map", mapOptions)
		map.setOnReadyCallback(this.onMapReady)
		this.map = map
	},

	onShow: function(){
		this.map.show()
	},
	
	onHide: function () {
		this.map.hide()
	},
	
	onUnload: function () {
		this.map.stop()
	}
})