import { fetchEmpresaById } from '@/services/data/actions/server/empresas/get-empresa-by-id'
import { EditarEmpresaForm } from './_components/editar-empresa-form'
import { fetchCiudadesForSelect } from '@/services/data/actions/server/ciudades/fetchCiudades'
import { fetchRegionesForSelect } from '@/services/data/actions/server/regiones/fetchRegiones'

import { fetchCiiusForSelect } from '@/services/data/actions/server/ciuus/fetchCiius'

// TODO: Add a 404 page
export default async function EditarEmpresaPage({ params }: { params: { id: string } }) {
	const [empresa, ciudades, regiones, ciius] = await Promise.all([
		fetchEmpresaById(params?.id),
		fetchCiudadesForSelect(),
		fetchRegionesForSelect(),
		fetchCiiusForSelect()
	])

	// This is very unlikely to happen, but to keep ts happy
	if (empresa === null || ciudades === null || regiones === null || ciius === null) {
		return <p>Empresa no encontrada</p>
	}

	return (
		<EditarEmpresaForm empresa={empresa} ciudadesOptions={ciudades} regionesOptions={regiones} ciiusOptions={ciius} />
	)
}
