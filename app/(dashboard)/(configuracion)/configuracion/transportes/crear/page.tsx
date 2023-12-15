import { CrearTransportistaForm } from './_components/crear-transportista-form'
import { fetchCiudadesForSelect } from '@/services/data/actions/server/ciudades/fetchCiudades'
import { fetchRegionesForSelect } from '@/services/data/actions/server/regiones/fetchRegiones'

export default async function CrearEmpresaPage() {
	const [ciudades, regiones] = await Promise.all([fetchCiudadesForSelect(), fetchRegionesForSelect()])

	// this is very unlikely to happen, but to keep ts happy.
	if (ciudades === null || regiones === null) {
		return <div>Hubo un error al cargar los datos.</div>
	}

	return <CrearTransportistaForm ciudadesOptions={ciudades} regionesOptions={regiones} />
}
