import Breadcrumbs from '@/components/Breadcrumbs'
import { PerfilFormWrapper } from './_components/perfil-form-wrapper'
import { fetchUserProfile } from '@/services/data/actions/server/user/fetchUserProfile'

export default async function PerfilPage() {
	const { user } = await fetchUserProfile()

	return (
		<section className='p-3'>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Dashboard', href: '/dashboard' },
					{ label: 'Configuracion', href: '#' },
					{
						label: 'Mi Perfil',
						href: '/configuracion/mi-perfil',
						active: true
					}
				]}
			/>
			<div className='flex items-center justify-between space-y-2 my-14'>
				<div>
					<h2 className='text-2xl font-bold tracking-tight'>Perfil de usuario</h2>
					<p className='text-muted-foreground'>
						En esta sección podrás ver y editar tu perfil de usuario. En este momento el perfil es de solo lectura.
					</p>
				</div>
			</div>
			{user === null ? <div>No se pudo cargar el perfil</div> : <PerfilFormWrapper user={user} />}
		</section>
	)
}
