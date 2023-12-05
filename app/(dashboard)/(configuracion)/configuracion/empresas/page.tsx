import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { DataTable } from '@/components/data-table/DataTable'
import { empresasColumns } from '@/components/data-table/columns/columns-empresas'
import { fetchEmpresas } from '@/services/data/actions/server/empresas/get-empresas'
import { DataTableToolbar } from './_components/data-table-toolbar'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default async function ConfiguracionEmpresaPage() {
	const { empresas } = await fetchEmpresas()

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
						<Link href='/configuracion/empresas/nueva' className={cn(buttonVariants({ variant: 'outline' }), 'mt-4')}>
							Agregar empresa
						</Link>
					</div>
				</div>
				{empresas === null ? (
					<div className='flex items-center justify-center h-full'>
						<div className='flex flex-col items-center space-y-4'>No hay empresas registradas.</div>
					</div>
				) : (
					<div className='relative py-14 pr-11'>
						<DataTable filters={DataTableToolbar} data={empresas} columns={empresasColumns} />
					</div>
				)}
			</div>
		</section>
	)
}
