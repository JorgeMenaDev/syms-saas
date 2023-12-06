import { EditarEstablecimientoFormWrapper } from './_components/editar-establecimiento-form-wrapper'
import Breadcrumbs from '@/components/Breadcrumbs'
import { fetchCiudadesForSelect } from '@/services/data/actions/server/ciudades/fetchCiudades'
import { fetchRegionesForSelect } from '@/services/data/actions/server/regiones/fetchRegiones'

import { fetchTiposDeEstablecimientosForSelect } from '@/services/data/actions/server/tipo-de-establecimientos/get-tipos-de-establecimientos'
import { fechEstablecimientoById } from '@/services/data/actions/server/establecimientos/get-establecimiento-by-id'

export default async function EditarEstablecimientoPage({ params }: { params: { id: string } }) {
	const [establecimiento, ciudades, regiones, tiposDeEstablecimientos] = await Promise.all([
		fechEstablecimientoById(params?.id),
		fetchCiudadesForSelect(),
		fetchRegionesForSelect(),
		fetchTiposDeEstablecimientosForSelect()
	])

	console.log('establecimiento', { establecimiento })
	// This is very unlikely to happen, but to keep ts happy
	if (establecimiento === null || ciudades === null || regiones === null || tiposDeEstablecimientos === null) {
		return (
			<p>Hubo un error al cargar los datos, por favor recarga la página. Si el error persiste contacta a soporte.</p>
		)
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
						label: 'Editar Empresa',
						href: `/configuracion/establecimientos/editar/${params?.id}`,
						active: true
					}
				]}
			/>
			<div className='flex items-center justify-between space-y-2 my-14'>
				<div>
					<h2 className='text-2xl font-bold tracking-tight'>Formulario de edición de empresa</h2>
					<p className='text-muted-foreground'>
						En esta sección podrás editar una empresa. Una vez que hayas terminado de editar, haz clic en el botón
						"Guardar" para guardar los cambios.
					</p>
				</div>
			</div>

			<EditarEstablecimientoFormWrapper
				establecimiento={establecimiento}
				tiposDeEstablecimientos={tiposDeEstablecimientos}
				ciudadesOptions={ciudades}
				regionesOptions={regiones}
			/>
		</section>
	)
}
