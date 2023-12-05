import { fetchEmpresaById } from '@/services/data/actions/server/empresas/fetchEmpresaById'
import { EditEmpresaFormWrapper } from './_components/edit-empresa-form-wrapper'
import Breadcrumbs from '@/components/Breadcrumbs'
import { fetchCiudadesForSelect } from '@/services/data/actions/server/ciudades/fetchCiudades'
import { fetchRegionesForSelect } from '@/services/data/actions/server/regiones/fetchRegiones'

import { fetchCiiusForSelect } from '@/services/data/actions/server/ciuus/fetchCiius'

export default async function editarEmpresaPage({ params }: { params: { id: string } }) {
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

	console.log('empresa', { empresa })

	return (
		<section className='p-3'>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Dashboard', href: '/dashboard' },
					{ label: 'Configuracion', href: '#' },
					{
						label: 'Empresas',
						href: '/configuracion/empresas'
					},
					{
						label: 'Editar Empresa',
						href: `/configuracion/empresas/editar/${params?.id}`,
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

			<EditEmpresaFormWrapper
				empresa={empresa}
				ciudadesOptions={ciudades}
				regionesOptions={regiones}
				ciiusOptions={ciius}
			/>
		</section>
	)
}
