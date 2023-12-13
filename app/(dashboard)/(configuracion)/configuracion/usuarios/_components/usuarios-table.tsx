import { NoDataAvailableMessage } from '@/components/NoDataAvailableMessage'

import ColumnsWrapper from './columns-wrapper'
import { fetchUsuarios } from '@/services/data/actions/server/usuarios/get-usuarios'

export default async function UsuariosTable() {
	const usuarios = await fetchUsuarios()

	if (usuarios === null) {
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
			<ColumnsWrapper usuarios={usuarios} />
		</div>
	)
}
