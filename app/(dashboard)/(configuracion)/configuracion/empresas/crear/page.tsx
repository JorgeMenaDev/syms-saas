import { CrearEmpresaForm } from './_components/crear-empresa-form'
import { fetchCiudadesForSelect } from '@/services/data/actions/server/ciudades/fetchCiudades'
import { fetchRegionesForSelect } from '@/services/data/actions/server/regiones/fetchRegiones'
import { fetchCiiusForSelect } from '@/services/data/actions/server/ciuus/fetchCiius'

export default async function CrearEmpresaPage() {
	const [ciudades, regiones, ciius] = await Promise.all([
		fetchCiudadesForSelect(),
		fetchRegionesForSelect(),
		fetchCiiusForSelect()
	])

	// this is very unlikely to happen, but to keep ts happy.
	if (ciudades === null || regiones === null || ciius === null) {
		return <div>Hubo un error al cargar los datos.</div>
	}

	return <CrearEmpresaForm ciudadesOptions={ciudades} regionesOptions={regiones} ciiusOptions={ciius} />
}
