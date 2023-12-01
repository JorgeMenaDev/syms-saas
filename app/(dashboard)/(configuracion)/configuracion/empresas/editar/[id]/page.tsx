import { fetchEmpresaById } from '@/services/data/actions/server/empresas/fetchEmpresaById'
import { EditEmpresaFormWrapper } from './_components/edit-empresa-form-wrapper'
import Breadcrumbs from '@/components/Breadcrumbs'

function mapApiToForm(empresaFromSupabase: any) {
	return {
		direccion: empresaFromSupabase.direccion,
		email: empresaFromSupabase.email,
		ciudad: empresaFromSupabase.idCiudad?.toString(), // Assuming you want to convert to string
		estado: empresaFromSupabase.idEstado?.toString(),
		industria: empresaFromSupabase.idIndustria?.toString(),
		region: empresaFromSupabase.idRegion?.toString(),
		nombre: empresaFromSupabase.nombre,
		representanteLegal: empresaFromSupabase.representanteLegal,
		rut: empresaFromSupabase.rut,
		telefono: empresaFromSupabase.telefono
	}
}

export default async function editarEmpresaPage({ params }: { params: { id: string } }) {
	const { empresa } = await fetchEmpresaById(params?.id)

	console.log({ empresa })

	const initialValues = mapApiToForm(empresa)

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

			<EditEmpresaFormWrapper empresa={initialValues} />
		</section>
	)
}
