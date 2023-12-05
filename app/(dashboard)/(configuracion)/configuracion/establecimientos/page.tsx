import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { DataTable } from '@/components/data-table/DataTable'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { fetchEstablecimientos } from '@/services/data/actions/server/establecimientos/get-establecimientos'
import { establecimientosColumns } from '@/components/data-table/columns/columns-establecimientos'
import { EstablecimientosFilters } from './_components/establecimientos-filters'

export default async function EstablecimientosPage() {
	const establecimientos = await fetchEstablecimientos()

	return (
		<section>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Dashboard', href: '/dashboard' },
					{ label: 'Configuracion', href: '#' },
					{
						label: 'Establecimientos',
						href: '/configuracion/establecimientos',
						active: true
					}
				]}
			/>
			<div className='hidden h-full flex-1 flex-col space-y-8 mt-10 md:flex'>
				<div className='flex items-center justify-between space-y-2'>
					<div>
						<h2 className='text-2xl font-bold tracking-tight'>Lista de establecimientos!</h2>
						<p className='text-muted-foreground'>
							En esta sección podrás revisar los establecimientos que tienes registradas en el sistema.
						</p>
						<Link
							href='/configuracion/establecimientos/nuevo'
							className={cn(buttonVariants({ variant: 'outline' }), 'mt-4')}
						>
							Agregar establecimiento
						</Link>
					</div>
				</div>
				{establecimientos === null ? (
					<div className='flex items-center justify-center h-full'>
						<div className='flex flex-col items-center space-y-4'>No hay establecimientos registrados.</div>
					</div>
				) : (
					<div className='relative py-14 pr-11'>
						<DataTable filters={EstablecimientosFilters} data={establecimientos} columns={establecimientosColumns} />
					</div>
				)}
			</div>
		</section>
	)
}
