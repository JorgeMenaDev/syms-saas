import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import UsuariosTable from './_components/usuarios-table'
import { Suspense } from 'react'
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton'

import { UsuariosFilters } from './_components/usuarios-filters'
import { skeletonCols } from '@/app/(dashboard)/(configuracion)/configuracion/empresas/_components/skeletons-columns'

export default async function UsuariosPage() {
	return (
		<section className='p-5 md:p-0'>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Dashboard', href: '/dashboard' },
					{ label: 'Configuracion', href: '#' },
					{
						label: 'Usuarios',
						href: '/configuracion/usuarios',
						active: true
					}
				]}
			/>
			<div className='h-full flex-1 flex-col space-y-8 mt-10 md:flex'>
				<div className='flex items-center justify-between space-y-2'>
					<div>
						<h2 className='text-2xl font-bold tracking-tight'>Lista de Usuarios</h2>
						<p className='text-muted-foreground'>
							En esta sección puedes ver y administrar los usuarios de la plataforma.
						</p>
						<Link href='/configuracion/empresas/crear' className={cn(buttonVariants({ variant: 'outline' }), 'mt-4')}>
							Nuevo Usuario
						</Link>
					</div>
				</div>

				<Suspense fallback={<DataTableSkeleton data={[]} filters={UsuariosFilters} columns={skeletonCols} />}>
					<UsuariosTable />
				</Suspense>
			</div>
		</section>
	)
}
