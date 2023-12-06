import Breadcrumbs from '@/components/Breadcrumbs'

export default function Layout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
	return (
		<section className='p-3'>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Dashboard', href: '/dashboard' },
					{ label: 'Configuracion', href: '#' },
					{
						label: 'Establecimientos',
						href: '/configuracion/establecimientos'
					},
					{
						label: 'Editar Establecimiento',
						href: `/configuracion/establecimientos/editar/${params?.id}`,
						active: true
					}
				]}
			/>
			<div className='flex items-center justify-between space-y-2 my-14'>
				<div>
					<h2 className='text-2xl font-bold tracking-tight'>Formulario de edición de Establecimiento</h2>
					<p className='text-muted-foreground mt-2'>
						En esta sección podrás editar una establecimiento. Una vez que hayas terminado de editar, haz clic en el
						botón "Actualizar" para guardar los cambios.
					</p>
				</div>
			</div>

			{children}
		</section>
	)
}
