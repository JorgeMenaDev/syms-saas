import { NoDataAvailableMessage } from '@/components/NoDataAvailableMessage'
import { fetchEstablecimientos } from '@/services/data/actions/server/establecimientos/get-establecimientos'
import ColumnsWrapper from './columns-wrapper'

export default async function EstablecimientosTable() {
	const establecimientos = await fetchEstablecimientos()

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
			<ColumnsWrapper establecimientos={establecimientos} />
		</div>
	)
}
