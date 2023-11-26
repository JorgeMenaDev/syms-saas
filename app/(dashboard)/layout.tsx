import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { Navbar } from './_components/Navbar'
import { DesktopSidebar } from './_components/DesktopSidebar'

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

	return (
		<div className='grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
			<DesktopSidebar />

			<div className='flex flex-col'>
				<Navbar user={session.user} />
				<section className='flex-1 flex items-center justify-center p-2 lg:p-4'>
					<div className='w-full h-full'>{children}</div>
				</section>
			</div>
		</div>
	)
}
