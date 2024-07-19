import { defineUserConfig } from 'vuepress'

import { defaultTheme } from '@vuepress/theme-default'

import { pwaPlugin } from '@vuepress/plugin-pwa'
import { searchPlugin } from '@vuepress/plugin-search'

// lua 接口文档全局定义
const coromega = [
	// 调试 lua 代码
	'/lua插件编写/调试lua代码/调试代码/',
	// 读取配置
	'/lua插件编写/配置读取和升级相关API/配置读取和升级/',
	// 菜单
	'/lua插件编写/菜单相关API/菜单相关API/',
	// 命令收发
	'/lua插件编写/命令收发api/coromega_cmd/',
	// 机器人
	'/lua插件编写/机器人和服务器信息/coromega_botUq/',
	// 玩家与命令
	'/lua插件编写/玩家交互与命令方块API/cmd_player/',
	// 建造
	'/lua插件编写/方块和命令块放置相关/coromega_place_command_block/',
	// 导入器
	'/lua插件编写/导入器_strucure_canvas相关API/导入器_strucure_canvas相关API/',
	// 数据包
	'/lua插件编写/数据包监听相关API/数据包监听相关API/',
	// 跨插件通信
	'/lua插件编写/跨插件api调用/跨插件api调用/',
	// 系统功能
	'/lua插件编写/system/coromega_system/',
	// 存储
	'/lua插件编写/存储相关/coromega_storage/',
	// cqhttp
	'/lua插件编写/cqhttp相关API/cqhttp相关API/',
	// http
	'/lua插件编写/http相关/http/',
	// websocket
	'/lua插件编写/websocket/websocket/',
	// 加密哈希Base64
	'/lua插件编写/密码_哈希_base64/密码_哈希_base64/',
	// 其他
	'/lua插件编写/其他/common/',
	// 代码分发保护
	'/lua插件编写/在分发时保护你的代码/在分发时保护你的代码/',
	// 软API
	'/lua插件编写/软API/软API/',
]


export default defineUserConfig({
	// 编译文件匹配规则
	pagePatterns: [
		// 默认值
		'**/*.md',
		'!.vuepress',
		'!node_modules',
		// 黑名单
		"!buildHtmlDocs",
		"!lua_modules",
		"!lua_components",
		"!lua_modules",
		// 白名单
	],
	lang: 'zh-CN',
	title: 'lumega',
	// 网站简介
	description: 'lumega 在线文档(NeOmega 核心功能)',
	// 编译输出路径
	dest: `buildHtmlDocs`,
	// 使用 / 即无法使用 github 项目 pages。克隆仓库部署 github.io 需要修改 base 路径名为：base:"/仓库名/"
	base: "./",
	theme: defaultTheme({
		/**
		 * 仓库地址
		 * 控制显示右上角的 github 地址
		 * 在 github 上编辑此页按钮依据此条配置生成
		 */
		repo: 'OmineDev/neomega-doc/',
		logo: "lumega.png",
		editLinkText: "在 GitHub 上编辑此页",
		// 最近更新的文字
		lastUpdatedText: "最近更新",
		// 贡献者文字
		contributorsText: "贡献者",
		// 自定义导航栏
		navbar: [
			{
				text: '安装 NeOmega',
				link: '/安装说明.md',
			},
			{
				text: '编写Lua插件:快速开始',
				link: '/lua插件编写/快速开始/60分钟闪电战.md',
			},
			{
				text: '编写Lua插件:调试代码',
				link: '/lua插件编写/调试lua代码/调试代码.md',
			},
			{
				text: '编写Lua插件:接口列表',
				link: '/lua插件编写/',
				children: [
					{
						text: 'coromega',
						children: coromega
					}]
			}
		],
		// 自定义侧边栏
		sidebar: {
			'/安装说明/': {
				text: '安装 NeOmega',
				link: '/安装说明.md',
			},
			'/lua插件编写/快速开始/60分钟闪电战/': {
				text: '编写Lua插件:快速开始',
				link: '/lua插件编写/快速开始/60分钟闪电战.md',
			},
			// lua插件编写
			'/lua%E6%8F%92%E4%BB%B6%E7%BC%96%E5%86%99/': [{
				text: '编写Lua插件:接口列表',
				// lua插件编写
				link: '/lua插件编写/',
				children: coromega
			}]
		},
	}),
	plugins: [
		// pwa 浏览器应用
		pwaPlugin({
			skipWaiting: true
		}),
		// 文档搜索
		searchPlugin({
			// 最大索引深度
			searchMaxSuggestions: 5,
			// 最大搜索条数
			maxSuggestions: 10,
			// 排除的页面
			//
		}),
	],
	head: [
		['link', {
			rel: 'manifest',
			href: '/manifest.webmanifest'
		}],
		['meta', {
			name: 'theme-color',
			content: '#0055ff'
		}],
	],
})

