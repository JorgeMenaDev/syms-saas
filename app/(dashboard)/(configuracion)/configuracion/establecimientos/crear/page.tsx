import { fetchCiudadesForSelect } from '@/services/data/actions/server/ciudades/fetchCiudades'
import { fetchRegionesForSelect } from '@/services/data/actions/server/regiones/fetchRegiones'
import { CrearEstablecimientoForm } from './_components/crear-establecimiento-form'
import { fetchTiposDeEstablecimientosForSelect } from '@/services/data/actions/server/tipo-de-establecimientos/get-tipos-de-establecimientos'
import { fetchEmpresasForSelect } from '@/services/data/actions/server/empresas/get-empresas'

export default async function CrearEstablecimientoPage() {
	const [ciudades, regiones, tiposDeEstablecimientos, empresas] = await Promise.all([
		fetchCiudadesForSelect(),
		fetchRegionesForSelect(),
		fetchTiposDeEstablecimientosForSelect(),
		fetchEmpresasForSelect()
	])

	// this is very unlikely to happen, but to keep ts happy.
	if (ciudades === null || regiones === null || tiposDeEstablecimientos === null || empresas === null) {
		return <div>Hubo un error al cargar los datos, porfavor contact al administrador</div>
	}

	return (
		<CrearEstablecimientoForm
			ciudadesOptions={ciudades}
			regionesOptions={regiones}
			empresasOptions={empresas}
			tiposDeEstablecimientos={tiposDeEstablecimientos}
		/>
	)
}
