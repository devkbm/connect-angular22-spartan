export const data = {
	user: {
		name: 'spartan',
		email: 'hello@spartan.com',
		avatar: '/assets/avatar.png',
	},
	navMain: [
		{
			title: 'Home',
			url: '/home/edit',
			icon: 'lucideSquareTerminal',
			isActive: true,
			items: [
				{
					title: 'History',
					url: '/home/edit'
				},
				{
					title: 'Starred',
					url: '/system/company',
				},
				{
					title: 'Settings',
					url: '.',
				},
			],
		},
		{
			title: 'System',
			url: '/system',
			icon: 'lucideBot',
			items: [
				{
					title: 'Genesis',
					url: '.',
				},
				{
					title: 'Explorer',
					url: '.',
				},
				{
					title: 'Quantum',
					url: '.',
				},
			],
		},
		{
			title: 'GRW',
			url: '/grw',
			icon: 'lucideBookOpen',
			items: [
				{
					title: 'Introduction',
					url: '.',
				},
				{
					title: 'Get Started',
					url: '.',
				},
				{
					title: 'Tutorials',
					url: '.',
				},
				{
					title: 'Changelog',
					url: '.',
				},
			],
		},
		{
			title: 'Settings',
			url: '.',
			icon: 'lucideSettings2',
			items: [
				{
					title: 'General',
					url: '.',
				},
				{
					title: 'Team',
					url: '.',
				},
				{
					title: 'Billing',
					url: '.',
				},
				{
					title: 'Limits',
					url: '.',
				},
			],
		},
	],
	navSecondary: [
		{
			title: 'Support',
			url: '.',
			icon: 'lucideLifeBuoy',
		},
		{
			title: 'Feedback',
			url: '.',
			icon: 'lucideSend',
		},
	],
	projects: [
		{
			name: 'Design Engineering',
			url: '.',
			icon: 'lucideFrame',
		},
		{
			name: 'Sales & Marketing',
			url: '.',
			icon: 'lucideChartPie',
		},
		{
			name: 'Travel',
			url: '.',
			icon: 'lucideMap',
		},
	],
};
