import { NoDataAvailableMessage } from '@/components/NoDataAvailableMessage'
import { DataTable } from '@/components/data-table/DataTable'
import { EstablecimientosFilters } from './establecimientos-filters'
import { establecimientosColumns } from '@/components/data-table/columns/columns-establecimientos'
import { fetchEstablecimientos } from '@/services/data/actions/server/establecimientos/get-establecimientos'

export default async function EstablecimientosDataTableWrapper() {
	const establecimientos = await fetchEstablecimientos()

	console.log({ establecimientos })

	if (establecimientos === null) {
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
			<DataTable filters={EstablecimientosFilters} data={establecimientos} columns={establecimientosColumns} />
		</div>
	)
}
