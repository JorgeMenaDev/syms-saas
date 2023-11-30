import Breadcrumbs from '@/components/Breadcrumbs'

export default async function NuevaEmpresaPage() {
	return (
		<section>
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
						href: '/configuracion/empresas/nueva',
						active: true
					}
				]}
			/>
		</section>
	)
}
