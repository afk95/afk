export default [
	{
		path: '/memberCenter',
		redirect: '/memberCenter/latelyOrder'
	},
	{
		path: '/memberCenter/mainCounter',
		name: 'MainCounter', // 个人中心
		redirect: '/memberCenter/latelyOrder',
		component: () => import('@/pages/memberCenter/MainCounter.vue'),
		children: [
			{
				path: '/memberCenter/infoData',
				name: 'InfoData', // 个人资料
				component: () => import('@/pages/memberCenter/InfoData.vue'),
			},
			{
				path: '/memberCenter/editPassword',
				name: 'EditPassword', // 更改密码
				component: () => import('@/pages/memberCenter/EditPassword.vue'),
			},
		]
	},
]