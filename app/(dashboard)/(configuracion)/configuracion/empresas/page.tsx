import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import EmpresasDataTableWrapper from './_components/empresas-dataTable-wrapper'
import { Suspense } from 'react'
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton'

import { EmpresasFilters } from './_components/empresas-filters'
import { empresasColumns } from '@/components/data-table/columns/columns-empresas'

// export const dynamic = 'force-dynamic'

export default async function EmpresasPage() {
	return (
		<section>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Dashboard', href: '/dashboard' },
					{ label: 'Configuracion', href: '#' },
					{
						label: 'Empresas',
						href: '/configuracion/empresas',
						active: true
					}
				]}
			/>
			<div className='hidden h-full flex-1 flex-col space-y-8 mt-10 md:flex'>
				<div className='flex items-center justify-between space-y-2'>
					<div>
						<h2 className='text-2xl font-bold tracking-tight'>Lista de empresas!</h2>
						<p className='text-muted-foreground'>
							En esta sección podrás revisar las empresas que tienes registradas en el sistema.
						</p>
						<Link href='/configuracion/empresas/crear' className={cn(buttonVariants({ variant: 'outline' }), 'mt-4')}>
							Nueva Empresa
						</Link>
					</div>
				</div>

				<Suspense fallback={<DataTableSkeleton data={[]} filters={EmpresasFilters} columns={empresasColumns} />}>
					<EmpresasDataTableWrapper />
				</Suspense>
			</div>
		</section>
	)
}
