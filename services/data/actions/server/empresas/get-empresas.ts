import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const fetchEmpresas = async () => {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { data, error } = await supabase.from('empresas').select(
		`*,
			region: region_id(nombre),
			ciudad: ciudad_id(nombre),
			ciiu: ciiu_id(codigo)
		`
	)

	if (error) {
		console.error(error)
		return null
	}

	if (!data || data.length === 0) {
		return null
	}

	const empresas = data.map(empresa => {
		return {
			id: empresa.id,
			rut: empresa.rut,
			nombre: empresa.nombre,
			industria: empresa.industria,
			// @ts-expect-error error
			ciiu: empresa.ciiu.codigo,
			representanteLegal: empresa.representante_legal,
			correo: empresa.correo,
			telefono: empresa.telefono,
			direccion: empresa.direccion,
			// @ts-expect-error error
			region: empresa.region.nombre,
			// @ts-expect-error error
			ciudad: empresa.ciudad.nombre,
			estado: empresa.estado
		}
	})

	return empresas
}

export async function fetchEmpresasForSelect() {
	const empresas = await fetchEmpresas()
	if (!empresas) return null

	const empresasForSelect = empresas.map(empresa => ({
		value: empresa.id.toString(),
		label: empresa.nombre
	}))

	// sort city options by name by alphabetical order.
	const sortedArray = empresasForSelect.toSorted((a, b) => a.label.localeCompare(b.label))

	return sortedArray
}

// /**
//  * 	Function de utilidad, para obtener las ciudades en formato para select/dropdowns
//  */
// export const fetchCiudadesForSelect = async () => {
// 	const ciudades = await fetchCiudades()
// 	if (!ciudades) return null

// 	const ciudadesForSelect = ciudades.map(city => ({
// 		value: city.id.toString(),
// 		label: city.nombre,
// 		idRegion: city.id_region.toString()
// 	}))

// 	// sort city options by name by alphabetical order.
// 	const sortedArray = ciudadesForSelect.toSorted((a, b) => a.label.localeCompare(b.label))

// 	return sortedArray
// }
