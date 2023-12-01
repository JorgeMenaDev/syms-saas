import { fetchEmpresaById } from '@/services/data/actions/server/empresas/fetchEmpresaById'

export default async function editarEmpresaPage({ params }: { params: { id: string } }) {
	const { empresa } = await fetchEmpresaById(params?.id)
	console.log({ empresa })
	return <div>{params?.id}</div>
}
