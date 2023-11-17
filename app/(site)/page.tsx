import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { DataTable } from '../tasks/components/data-table'
import { promises as fs } from 'fs'
import path from 'path'
import { z } from 'zod'
import { taskSchema } from '../tasks/data/schema'
import { columns } from '../tasks/components/columns'
import { HomePageHero } from './_components/Hero'

// import { getCountries } from '@/services/countries/actions/getCountries'

// Simulate a database read for tasks.
async function getTasks() {
	const data = await fs.readFile(path.join(process.cwd(), 'app/tasks/data/tasks.json'))

	const tasks = JSON.parse(data.toString())

	return z.array(taskSchema).parse(tasks)
}

export default async function Page() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: countries } = await supabase.from('countries').select()
	const tasks = await getTasks()
	console.log(countries)

	return (
		<div className='flex-1 w-full flex flex-col gap-20 items-center'>
			<HomePageHero />
			{/* <nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
				<div className='w-full max-w-4xl flex justify-between items-center p-3 text-sm'>
					<div>🚀 Syms!</div>
				</div>
			</nav>

			<div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
				<div className='flex items-center justify-between space-y-2'>
					<div>
						<h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
						<p className='text-muted-foreground'>Here&apos;s a list of your tasks for this month!</p>
					</div>
				</div>
				<DataTable data={tasks} columns={columns} />
			</div>

			<footer className='w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs'>
				<p>
					Powered by{' '}
					<a
						href='https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs'
						target='_blank'
						className='font-bold hover:underline'
						rel='noreferrer'
					>
						Supabase
					</a>
				</p>
			</footer> */}
		</div>
	)
}
