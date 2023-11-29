import Link from 'next/link'
import { SubMenu } from './SubMenu'
import { BarChartIcon, FileTextIcon, HomeIcon, UploadIcon, GearIcon } from '@radix-ui/react-icons'

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
				text: 'Empresa',
				href: '/configuracion/empresa'
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
	}
]

export function DesktopSidebar() {
	return (
		<div className='hidden border-r bg-zinc-100/40 lg:block dark:bg-zinc-800/40'>
			<div className='flex h-full max-h-screen flex-col gap-2'>
				<div className='flex h-[60px] items-center border-b px-6'>
					<Link className='flex items-center gap-2 text-primary font-semibold' href='/dashboard'>
						{/* <RyclinIcon />
						Syms Residuos */}
						<img src='./logo4.png' className='w-20' />
					</Link>
				</div>
				<div className='flex-1 overflow-auto py-2'>
					<nav className='grid items-start px-4 text-sm font-medium'>
						{menu.map((item, index) =>
							item.subSections ? (
								<SubMenu key={index} item={item} />
							) : (
								<Link
									key={index}
									className='flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:text-zinc-50'
									href={item.href}
								>
									{item.icon}
									{item.text}
								</Link>
							)
						)}
					</nav>
				</div>
			</div>
		</div>
	)
}
