import { NoDataAvailableMessage } from '@/components/NoDataAvailableMessage'

import ColumnsWrapper from './columns-wrapper'
import { fetchTransportistas } from '@/services/data/actions/server/transportistas/get-transportistas'

export default async function TransportistasTable() {
	const transportistas = await fetchTransportistas()

	if (transportistas === null) {
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
			<ColumnsWrapper transportistas={transportistas} />
		</div>
	)
}
