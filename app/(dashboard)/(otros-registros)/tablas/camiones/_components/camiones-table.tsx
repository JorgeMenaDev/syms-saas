import { NoDataAvailableMessage } from '@/components/NoDataAvailableMessage'
import ColumnsWrapper from './columns-wrapper'
import { fetchCamionesByTransportistaId, fetchCamioness } from '@/services/data/actions/server/camiones/get-camiones'

export default async function CamionesTable({ id }: { id?: string | null }) {
	const camiones = id ? await fetchCamionesByTransportistaId(id) : await fetchCamioness()

	console.log({ id, camiones })

	if (camiones === null) {
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
			<ColumnsWrapper camiones={camiones} />
		</div>
	)
}
