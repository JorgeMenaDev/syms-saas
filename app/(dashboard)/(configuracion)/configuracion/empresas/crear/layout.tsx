import Breadcrumbs from '@/components/Breadcrumbs'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<section className='p-3'>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Dashboard', href: '/dashboard' },
					{ label: 'Configuracion', href: '#' },
					{
						label: 'Empresas',
						href: '/configuracion/empresas'
					},
					{
						label: 'Nueva Empresa',
						href: '/configuracion/empresas/crear',
						active: true
					}
				]}
			/>
			<div className='flex items-center justify-between space-y-2 my-14'>
				<div>
					<h2 className='text-2xl font-bold tracking-tight'>Formulario de nueva Empresa!</h2>
					<p className='text-muted-foreground'>En esta sección podrás crear una nueva Empresa.</p>
				</div>
			</div>

			{children}
		</section>
	)
}
