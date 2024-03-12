import {
	BarChartIcon,
	FileTextIcon,
	HomeIcon,
	UploadIcon,
	GearIcon,
	MagicWandIcon,
	ChatBubbleIcon
} from '@radix-ui/react-icons'

export const menu = [
	{
		text: 'Home',
		icon: <HomeIcon className='h-4 w-4' />,
		href: '/dashboard'
	},
	{
		text: 'Configuración',
		icon: <GearIcon className='h-4 w-4' />,
		href: '#',
		subSections: [
			{
				text: 'Mi perfil',
				href: '/configuracion/mi-perfil'
			},
			{
				text: 'Empresas',
				href: '/configuracion/empresas'
			},
			{
				text: 'Establecimientos',
				href: '/configuracion/establecimientos'
			},
			{
				text: 'Usuarios',
				href: '/configuracion/usuarios'
			},
			{
				text: 'Transportes',
				href: '/configuracion/transportes'
			},
			{
				text: 'Destinos',
				href: '/configuracion/destinos'
			},
			{
				text: 'Residuos no peligrosos',
				href: '/configuracion/residuos-no-peligrosos'
			},
			{
				text: 'Residuos peligrosos',
				href: '/configuracion/residuos-peligrosos'
			}
		]
	},
	{
		text: 'Estadistica',
		icon: <BarChartIcon className='h-4 w-4' />,
		href: '#',
		subSections: [
			{
				text: 'Residuos no peligrosos',
				href: '/estadistica/residuos-no-peligrosos'
			},
			{
				text: 'Residuos peligrosos',
				href: '/estadistica/residuos-peligrosos'
			}
		]
	},
	{
		text: 'Carga Datos',
		icon: <UploadIcon className='h-4 w-4' />,
		href: '#',
		subSections: [
			{
				text: 'Residuos no peligrosos',
				href: '/carga-datos/residuos-no-peligrosos'
			},
			{
				text: 'Residuos peligrosos',
				href: '/carga-datos/residuos-peligrosos'
			}
		]
	},
	{
		text: 'Informes',
		icon: <FileTextIcon className='h-4 w-4' />,
		href: '#',
		subSections: [
			{
				text: 'Residuos no peligrosos',
				href: '/informes/residuos-no-peligrosos'
			},
			{
				text: 'Residuos peligrosos',
				href: '/informes/residuos-peligrosos'
			}
		]
	},
	{
		text: 'AI',
		icon: <MagicWandIcon className='h-5 w-5' />,
		href: '#',
		subSections: [
			{
				text: 'Chat',
				href: '/ai',
				icon: <ChatBubbleIcon className='h-4 w-4' />
			}
		]
	}

	// {
	// 	text: 'Otros Registros',
	// 	icon: <ArchiveIcon className='h-4 w-4' />,
	// 	href: '#',
	// 	subSections: [
	// 		{
	// 			text: 'Nopels',
	// 			href: '/tablas/nopels'
	// 		},
	// 		{
	// 			text: 'Respels',
	// 			href: '/tablas/respels'
	// 		},
	// 		{
	// 			text: 'Camiones',
	// 			href: '/tablas/camiones',
	// 			icon: <IconTruck className='h-5 w-5' />
	// 		}
	// 	]
	// },
	// add a menu for AI - users will be able to ask questin against the db in the app
]
