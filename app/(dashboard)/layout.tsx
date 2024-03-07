import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { Navbar } from './_components/Navbar'
import { DesktopSidebar } from './_components/DesktopSidebar'
import { Footer } from './_components/Footer'

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
		<div id='dashboard-container' className='grid min-h-screen w-full lg:grid-cols-[220px_1fr]'>
			<DesktopSidebar />

			<div className='flex flex-col w-full'>
				<Navbar user={session.user} />
				<section className='flex-1 flex items-center justify-center p-2 lg:p-8'>
					{/* Children is each page within (dashboard directory) */}
					<div className='w-full h-full'>{children}</div>
				</section>
				<Footer />
			</div>
		</div>
	)
}
