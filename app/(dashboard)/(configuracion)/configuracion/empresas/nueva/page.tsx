import Breadcrumbs from '@/components/Breadcrumbs'
import { NewEmpresaFormWrapper } from './_components/new-form-wrapper'
import { fetchCiudades } from '@/services/data/actions/server/ciudades/fetchCiudades'
import { fetchRegiones } from '@/services/data/actions/server/regiones/fetchRegiones'
import { fetchIndustrias } from '@/services/data/actions/server/industrias/fetchIndustrias'
import { fetchEstadoDeEmpresas } from '@/services/data/actions/server/estado-de-empresas/fetchEstadosDeEmpresas'
import { fetchCiius } from '@/services/data/actions/server/ciuus/fetchCiius'

export default async function NuevaEmpresaPage() {
	const [{ ciudades }, { regiones }, { industrias }, { estados }, { ciius }] = await Promise.all([
		fetchCiudades(),
		fetchRegiones(),
		fetchIndustrias(),
		fetchEstadoDeEmpresas(),
		fetchCiius()
	])

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
						label: 'Nueva Empresa',
						href: '/configuracion/empresas/nueva',
						active: true
					}
				]}
			/>
			<div className='flex items-center justify-between space-y-2 my-14'>
				<div>
					<h2 className='text-2xl font-bold tracking-tight'>Formulario de nueva empresa!</h2>
					<p className='text-muted-foreground'>En esta sección podrás crear una nueva empresa.</p>
				</div>
			</div>

			<NewEmpresaFormWrapper
				estadosOptions={estados}
				ciudadesOptions={ciudades}
				regionesOptions={regiones}
				industriasOptions={industrias}
				ciiusOptions={ciius}
			/>
		</section>
	)
}
