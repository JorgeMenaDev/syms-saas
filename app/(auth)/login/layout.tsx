import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export const metadata = {
	title: 'Loki Dashboard - Login',
	description: 'Dashboard para Loki rent a car'
}

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
	const supabase = createServerComponentClient({ cookies })
	const {
		data: { session }
	} = await supabase.auth.getSession()

	console.log({ session })

	if (session) {
		redirect('/dashboard')
	}

	return (
		<section className='h-screen'>
			<div className='flex flex-col items-center justify-center'>{children}</div>
		</section>
	)
}
