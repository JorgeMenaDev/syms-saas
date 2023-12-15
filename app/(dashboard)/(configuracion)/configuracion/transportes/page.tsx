import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Suspense } from 'react'
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton'

import { TransportistasFilters } from './_components/transportistas-filters'
import { skeletonCols } from './_components/skeletons-columns'
import TransportistasTable from './_components/transportistas-table'

export default async function TransportistasPage() {
	return (
		<section className='p-5 md:p-0'>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Dashboard', href: '/dashboard' },
					{ label: 'Configuracion', href: '#' },
					{
						label: 'Transportistas',
						href: '/configuracion/transportistas',
						active: true
					}
				]}
			/>
			<div className='h-full flex-1 flex-col space-y-8 mt-10 md:flex'>
				<div className='flex items-center justify-between space-y-2'>
					<div>
						<h2 className='text-2xl font-bold tracking-tight'>Lista de Transportistas</h2>
						<p className='text-muted-foreground'>
							En esta sección puedes ver la lista de transportistas que tienes registrados en el sistema.
						</p>
						<Link
							href='/configuracion/transportes/crear'
							className={cn(buttonVariants({ variant: 'outline' }), 'mt-4')}
						>
							Nuevo Transportista
						</Link>
					</div>
				</div>

				<Suspense fallback={<DataTableSkeleton data={[]} filters={TransportistasFilters} columns={skeletonCols} />}>
					<TransportistasTable />
				</Suspense>
			</div>
		</section>
	)
}
