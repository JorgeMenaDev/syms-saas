import { NoDataAvailableMessage } from '@/components/NoDataAvailableMessage'
import { DataTable } from '@/components/data-table/DataTable'
import { fetchEmpresas } from '@/services/data/actions/server/empresas/get-empresas'
import { EmpresasFilters } from './empresas-filters'
import { empresasColumns } from '@/components/data-table/columns/columns-empresas'

export default async function EmpresasDataTableWrapper() {
	const empresas = await fetchEmpresas()

	if (empresas === null) {
		return (
			<div className='flex items-center justify-center h-full'>
				<div className='flex flex-col items-center space-y-4'>
					<NoDataAvailableMessage />
				</div>
			</div>
		)
	}

	return (
		<div className='relative py-14 pr-11'>
			<DataTable filters={EmpresasFilters} data={empresas} columns={empresasColumns} />
		</div>
	)
}
