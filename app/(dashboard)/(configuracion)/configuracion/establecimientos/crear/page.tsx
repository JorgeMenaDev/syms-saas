import Breadcrumbs from '@/components/Breadcrumbs'
import { fetchCiudadesForSelect } from '@/services/data/actions/server/ciudades/fetchCiudades'
import { fetchRegionesForSelect } from '@/services/data/actions/server/regiones/fetchRegiones'
import { CrearEstablecimientoFormWrapper } from './_components/crear-establecimiento-form-wrapper'
import { fetchTiposDeEstablecimientosForSelect } from '@/services/data/actions/server/tipo-de-establecimientos/get-tipos-de-establecimientos'

export default async function CrearEstablecimientoPage() {
	const [ciudades, regiones, tiposDeEstablecimientos] = await Promise.all([
		fetchCiudadesForSelect(),
		fetchRegionesForSelect(),
		fetchTiposDeEstablecimientosForSelect()
	])

	// this is very unlikely to happen, but to keep ts happy.
	if (ciudades === null || regiones === null || tiposDeEstablecimientos === null) {
		return <div>Hubo un error al cargar los datos.</div>
	}

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
						label: 'Nuevo Establecimiento',
						href: '/configuracion/establecimientos/crear',
						active: true
					}
				]}
			/>
			<div className='flex items-center justify-between space-y-2 my-14'>
				<div>
					<h2 className='text-2xl font-bold tracking-tight'>Formulario de nuevo Establecimiento!</h2>
					<p className='text-muted-foreground'>En esta sección podrás crear un nuevo Establecimiento.</p>
				</div>
			</div>

			<CrearEstablecimientoFormWrapper
				ciudadesOptions={ciudades}
				regionesOptions={regiones}
				tiposDeEstablecimientos={tiposDeEstablecimientos}
			/>
		</section>
	)
}
