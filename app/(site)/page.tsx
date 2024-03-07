import { SiteHeaderWithNoAuth } from '@/components/SiteHeaderWithNoAuth'
import { HomePageHero } from './_components/Hero'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function MainPageHome() {
	const supabase = createServerComponentClient({ cookies })
	const {
		data: { session }
	} = await supabase.auth.getSession()

	if (session?.user) {
		redirect('/dashboard')
	}

	return (
		<div id='main-container' className=''>
			<SiteHeaderWithNoAuth />
			<div className='flex-1 w-full flex flex-col gap-20 items-center'>
				<HomePageHero />
			</div>
		</div>
	)
}
