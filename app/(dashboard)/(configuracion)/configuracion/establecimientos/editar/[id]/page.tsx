import { EditarEstablecimientoForm } from './_components/editar-establecimiento-form'
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
		<EditarEstablecimientoForm
			establecimiento={establecimiento}
			tiposDeEstablecimientos={tiposDeEstablecimientos}
			ciudadesOptions={ciudades}
			regionesOptions={regiones}
		/>
	)
}
