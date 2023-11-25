// import { SiteHeader } from '@/components/SiteHeader'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { TestHeaderWithSideBar } from '@/components/TestHeaderWithSideBar'

export const metadata = {
	title: 'Dashboard | Syms Residuos',
	description: 'Syms Residuos'
}

export const dynamic = 'force-dynamic'

export default async function ProductsLayout({ children }: { children: React.ReactNode }) {
	const supabase = createServerComponentClient({ cookies })
	const {
		data: { session }
	} = await supabase.auth.getSession()

	if (!session?.user) {
		redirect('/login')
	}

	return (
		<>
			<TestHeaderWithSideBar user={session?.user}>{children}</TestHeaderWithSideBar>
		</>
	)
}
