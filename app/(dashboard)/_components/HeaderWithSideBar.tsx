import { type User } from '@supabase/supabase-js'
import { DesktopSidebar } from './DesktopSidebar'
import { Navbar } from './Navbar'

export function HeaderWithSideBar({ user, children }: { user: User; children: React.ReactNode }) {
	return (
		<div className='grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
			<DesktopSidebar />

			<Navbar user={user}>{children}</Navbar>
		</div>
	)
}
