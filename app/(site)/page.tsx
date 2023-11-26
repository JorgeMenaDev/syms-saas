import { SiteHeaderWithNoAuth } from '@/components/SiteHeaderWithNoAuth'
import { HomePageHero } from './_components/Hero'

export default function MainPageHome() {
	return (
		<>
			<SiteHeaderWithNoAuth />
			<div className='flex-1 w-full flex flex-col gap-20 items-center'>
				<HomePageHero />
			</div>
		</>
	)
}
