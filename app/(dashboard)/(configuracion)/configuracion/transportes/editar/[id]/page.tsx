import { EditarTransportistaForm } from './_components/editar-transportista-form'
import { fetchCiudadesForSelect } from '@/services/data/actions/server/ciudades/fetchCiudades'
import { fetchRegionesForSelect } from '@/services/data/actions/server/regiones/fetchRegiones'
import { fetchTransportistaById } from '@/services/data/actions/server/transportistas/get-transportista-by-id'

export default async function EditarTransportistaPage({ params }: { params: { id: string } }) {
	const [transportista, ciudades, regiones] = await Promise.all([
		fetchTransportistaById(params?.id),
		fetchCiudadesForSelect(),
		fetchRegionesForSelect()
	])

	// This is very unlikely to happen, but to keep ts happy
	if (transportista === null || ciudades === null || regiones === null) {
		return (
			<p>
				Hubo un error al cargar los datos del transportista, por favor intente de nuevo, si el error persiste contacte a
				soporte.
			</p>
		)
	}

	return <EditarTransportistaForm transportista={transportista} ciudadesOptions={ciudades} regionesOptions={regiones} />
}
