import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export const metadata = {
	title: 'Iniciar sesión | Syms Residuos',
	description: 'Syms Residuos'
}

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
	const supabase = createServerComponentClient({ cookies })
	const {
		data: { session }
	} = await supabase.auth.getSession()

	if (session) {
		redirect('/dashboard')
	}

	return (
		<section className='h-screen'>
			<div className='flex flex-col items-center justify-center'>{children}</div>
		</section>
	)
}
