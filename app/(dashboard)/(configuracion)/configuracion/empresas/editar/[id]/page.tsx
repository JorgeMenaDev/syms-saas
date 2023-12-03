import { fetchEmpresaById } from '@/services/data/actions/server/empresas/fetchEmpresaById'
import { EditEmpresaFormWrapper } from './_components/edit-empresa-form-wrapper'
import Breadcrumbs from '@/components/Breadcrumbs'
import { fetchCiudades } from '@/services/data/actions/server/ciudades/fetchCiudades'
import { fetchRegiones } from '@/services/data/actions/server/regiones/fetchRegiones'
import { fetchIndustrias } from '@/services/data/actions/server/industrias/fetchIndustrias'
import { fetchEstadoDeEmpresas } from '@/services/data/actions/server/estado-de-empresas/fetchEstadosDeEmpresas'

export default async function editarEmpresaPage({ params }: { params: { id: string } }) {
	const [{ empresa }, { ciudades }, { regiones }, { industrias }, { estados }] = await Promise.all([
		fetchEmpresaById(params?.id),
		fetchCiudades(),
		fetchRegiones(),
		fetchIndustrias(),
		fetchEstadoDeEmpresas()
	])

	console.log({ estados })

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
				estadosOptions={estados}
				ciudadesOptions={ciudades}
				regionesOptions={regiones}
				industriasOptions={industrias}
			/>
		</section>
	)
}
