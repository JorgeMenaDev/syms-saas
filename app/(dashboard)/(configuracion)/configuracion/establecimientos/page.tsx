import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { establecimientosColumns } from '@/components/data-table/columns/columns-establecimientos'
import { EstablecimientosFilters } from './_components/establecimientos-filters'
import { Suspense } from 'react'
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton'
import EstablecimientosDataTableWrapper from './_components/establecimientos-dataTable-wrapper'

export default async function EstablecimientosPage() {
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
							href='/configuracion/establecimientos/crear'
							className={cn(buttonVariants({ variant: 'outline' }), 'mt-4')}
						>
							Agregar establecimiento
						</Link>
					</div>
				</div>
				<Suspense
					fallback={<DataTableSkeleton filters={EstablecimientosFilters} data={[]} columns={establecimientosColumns} />}
				>
					<EstablecimientosDataTableWrapper />
				</Suspense>
			</div>
		</section>
	)
}
