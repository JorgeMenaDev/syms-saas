import { BarChartIcon, FileTextIcon, HomeIcon, UploadIcon, GearIcon, ArchiveIcon } from '@radix-ui/react-icons'

export const menu = [
	{
		text: 'Home',
		icon: <HomeIcon className='h-4 w-4' />,
		href: '/dashboard'
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
		text: 'Otros Registros',
		icon: <ArchiveIcon className='h-4 w-4' />,
		href: '#',
		subSections: [
			{
				text: 'nopels',
				href: '/tablas/nopels'
			},
			{
				text: 'respels',
				href: '/tablas/respels'
			}
		]
	}
]
