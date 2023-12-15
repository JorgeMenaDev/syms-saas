import Breadcrumbs from '@/components/Breadcrumbs'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<section className='p-3'>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Dashboard', href: '/dashboard' },
					{ label: 'Configuracion', href: '#' },
					{
						label: 'Transportistas',
						href: '/configuracion/transportes'
					},
					{
						label: 'Nuevo Transportista',
						href: '/configuracion/transportes/crear',
						active: true
					}
				]}
			/>
			<div className='flex items-center justify-between space-y-2 my-14'>
				<div>
					<h2 className='text-2xl font-bold tracking-tight'>Formulario de Transportista</h2>
					<p className='text-muted-foreground mt-2'>En esta sección puedes crear un nuevo transportista.</p>
				</div>
			</div>

			{children}
		</section>
	)
}
