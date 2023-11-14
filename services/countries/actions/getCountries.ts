import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

const cookieStore = cookies()
const supabase = createClient(cookieStore)

export async function getCountries() {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { data, error } = await supabase.from('countries').select()
		return data
	} catch (error) {
		console.log(error)
	}
}
