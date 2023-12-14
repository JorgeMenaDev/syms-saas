import { fetchCiudadesForSelect } from '@/services/data/actions/server/ciudades/fetchCiudades'
import { fetchRegionesForSelect } from '@/services/data/actions/server/regiones/fetchRegiones'
import { CrearEstablecimientoForm } from './_components/crear-usuario-form'
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
		<CrearEstablecimientoForm
			ciudadesOptions={ciudades}
			regionesOptions={regiones}
			tiposDeEstablecimientos={tiposDeEstablecimientos}
		/>
	)
}
