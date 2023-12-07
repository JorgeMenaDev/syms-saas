import { NoDataAvailableMessage } from '@/components/NoDataAvailableMessage'
import { fetchEmpresas } from '@/services/data/actions/server/empresas/get-empresas'

import ColumnsWrapper from './columns-wrapper'

export default async function EmpresasTable() {
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
			<ColumnsWrapper empresas={empresas} />
		</div>
	)
}
