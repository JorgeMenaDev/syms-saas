import Breadcrumbs from '@/components/Breadcrumbs'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<section className='p-3'>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Dashboard', href: '/dashboard' },
					{ label: 'Configuracion', href: '#' },
					{
						label: 'Usuarios',
						href: '/configuracion/usuarios',
						active: false
					},
					{
						label: 'Nuevo Usuario',
						href: '/configuracion/usuarios/crear',
						active: true
					}
				]}
			/>
			<div className='flex items-center justify-between space-y-2 my-14'>
				<div>
					<h2 className='text-2xl font-bold tracking-tight'>Formulario de nuevo Usuario</h2>
					<p className='text-muted-foreground mt-2'>En esta sección podrás crear un nuevo Usuario.</p>
				</div>
			</div>

			{children}
		</section>
	)
}
