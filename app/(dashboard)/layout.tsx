import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { HeaderWithSideBar } from './_components/HeaderWithSideBar'

export const metadata = {
	title: 'Dashboard | Syms Residuos',
	description: 'Syms Residuos'
}

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const supabase = createServerComponentClient({ cookies })
	const {
		data: { session }
	} = await supabase.auth.getSession()

	if (!session?.user) {
		redirect('/login')
	}

	return <HeaderWithSideBar user={session?.user}>{children}</HeaderWithSideBar>
}
