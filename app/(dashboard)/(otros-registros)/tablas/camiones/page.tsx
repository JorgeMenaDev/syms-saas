import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Suspense } from 'react'
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton'

import { CamionesFilters } from './_components/camiones-filters'
import { skeletonCols } from './_components/skeletons-columns'
import CamionesTable from './_components/camiones-table'

export default async function CamionesPage({ searchParams }: { searchParams?: { id?: string } }) {
	const id = searchParams?.id ?? null

	return (
		<section className='p-5 md:p-0'>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Dashboard', href: '/dashboard' },
					{ label: 'Configuracion', href: '#' },
					{
						label: 'Camiones',
						href: '/tablas/camiones',
						active: true
					}
				]}
			/>
			<div className='h-full flex-1 flex-col space-y-8 mt-10 md:flex'>
				<div className='flex items-center justify-between space-y-2'>
					<div>
						<h2 className='text-2xl font-bold tracking-tight'>Lista de Camiones</h2>
						<p className='text-muted-foreground'>
							En esta sección puedes ver la lista de camiones que tienes registrados en el sistema.
						</p>
						<Link href='/configuracion/empresas/crear' className={cn(buttonVariants({ variant: 'outline' }), 'mt-4')}>
							Nuevo Camion
						</Link>
					</div>
				</div>

				<Suspense fallback={<DataTableSkeleton data={[]} filters={CamionesFilters} columns={skeletonCols} />}>
					<CamionesTable id={id} />
				</Suspense>
			</div>
		</section>
	)
}
