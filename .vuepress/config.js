import { defineUserConfig } from 'vuepress'

import { defaultTheme } from '@vuepress/theme-default'

import { pwaPlugin } from '@vuepress/plugin-pwa'
import { searchPlugin } from '@vuepress/plugin-search'

// lua接口文档全局定义
const coromega = [
	// 命令收发
	'/coromega_examples/命令收发api/coromega_cmd/',
	// 机器人
	'/coromega_examples/机器人和服务器信息/coromega_botUq/',
	// 系统功能
	'/coromega_examples/system/coromega_system/',
	// 菜单
	'/coromega_examples/菜单相关API/菜单相关API/',
	// 数据包
	'/coromega_examples/数据包监听相关API/数据包监听相关API/',
	// http
	'/coromega_examples/http相关/http/',
	// 存储
	'/coromega_examples/存储相关/cocomega_storage/',
	// cqhttp
	'/coromega_examples/cqhttp相关API/cqhttp相关API/',
	// 玩家与命令
	'/coromega_examples/玩家交互与命令方块API/cmd_player/',
	// 建造
	'/coromega_examples/方块和命令块放置相关/coromega_place_command_block/',
	// websocket
	'/coromega_examples/websocket/websocket/',
	// 跨插件通信
	'/coromega_examples/跨插件api调用/跨插件api调用/',
	// 导入器
	'/coromega_examples/导入器_strucure_canvas相关API/导入器_strucure_canvas相关API/',
	// 读取配置
	'/coromega_examples/配置读取和升级相关API/配置读取和升级/',
	// 代码分发保护
	'/coromega_examples/在分发时保护你的代码/在分发时保护你的代码/',
	// 密码_哈希_base64
	'/coromega_examples/密码_哈希_base64/密码_哈希_base64'
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
	description: 'lumega在线文档（NeOmega核心功能）',
	// 编译输出路径
	dest: `buildHtmlDocs`,
	// 使用 / 即无法使用 github项目pages。克隆仓库部署github.io 需要修改base路径名为：base:"/仓库名/"
	base: "./",
	theme: defaultTheme({
		/**
		 * 仓库地址
		 * 控制显示右上角的github地址
		 * 在github上编辑此页按钮依据此条配置生成
		 */
		// repo: 'CMA2401PT/neomega/',
		logo: "lumega.png",
		editLinkText: "在GitHub上编辑此页",
		docsDir: "docs",
		// 最近更新的文字
		lastUpdatedText: "最近更新",
		// 贡献者文字
		contributorsText: "贡献者",
		// 自定义导航栏
		navbar: [
			{
				text: '入门教程',
				link: '/coromega_examples/tutorial_for_amateur_60_min_blitz/tutorial_for_amateur_60_min_blitz/',
			},
			{
				text: '安装',
				link: '/install/',
			},
			{
				text: 'Lua接口',
				link: '/coromega_examples/',
				children: [
					{
						text: 'coromega',
						children: coromega
					}]
			}
		],
		// 自定义侧边栏
		sidebar: {
			'/coromega_examples/': [{
				text: 'coromega',
				link: '/coromega_examples/',
				children: coromega
			}]
		},
	}),

	plugins: [
		// pwa浏览器应用
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

