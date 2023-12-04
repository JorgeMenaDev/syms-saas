import Breadcrumbs from '@/components/Breadcrumbs'
import { NewEmpresaFormWrapper } from './_components/new-form-wrapper'
import { fetchCiudadesForSelect } from '@/services/data/actions/server/ciudades/fetchCiudades'
import { fetchRegionesForSelect } from '@/services/data/actions/server/regiones/fetchRegiones'
import { fetchCiiusForSelect } from '@/services/data/actions/server/ciuus/fetchCiius'

export default async function NuevaEmpresaPage() {
	const [ciudades, regiones, ciius] = await Promise.all([
		fetchCiudadesForSelect(),
		fetchRegionesForSelect(),
		fetchCiiusForSelect()
	])

	// this is very unlikely to happen, but to keep ts happy.
	if (ciudades === null || regiones === null || ciius === null) {
		return <div>Hubo un error al cargar los datos.</div>
	}

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
						href: '/configuracion/empresas/nueva',
						active: true
					}
				]}
			/>
			<div className='flex items-center justify-between space-y-2 my-14'>
				<div>
					<h2 className='text-2xl font-bold tracking-tight'>Formulario de nueva empresa!</h2>
					<p className='text-muted-foreground'>En esta sección podrás crear una nueva empresa.</p>
				</div>
			</div>

			<NewEmpresaFormWrapper ciudadesOptions={ciudades} regionesOptions={regiones} ciiusOptions={ciius} />
		</section>
	)
}
