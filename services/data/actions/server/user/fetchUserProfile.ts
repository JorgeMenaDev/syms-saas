import { type UserProfile } from '@/types/user'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const fetchUserProfile = async (): Promise<{ user: UserProfile | null }> => {
	const supabaseClient = createServerComponentClient<Database>({ cookies })

	try {
		const {
			data: { user }
		} = await supabaseClient.auth.getUser()

		if (!user?.id) {
			return { user: null }
		}

		const { data: userData } = await supabaseClient
			.from('usuarios')
			.select('*, tipo_de_usuario(nombre_tipo)')
			.eq('id', user.id)
		const userDetails = userData?.[0] ?? null

		if (!userDetails) {
			return { user: null }
		}

		const userProfile: UserProfile = {
			id: userDetails.id,
			email: userDetails.email,
			// @ts-expect-error supabase wasn't able to infer the type of this property
			tipo: userDetails.tipo_de_usuario.nombre_tipo,
			empresas: userDetails.empresas,
			imagen: userDetails.imagen
		}

		return { user: userProfile }
	} catch (error) {
		// Handle errors appropriately (logging, reporting, etc.)
		console.error('Error fetching user profile:', error)
		return { user: null }
	}
}
