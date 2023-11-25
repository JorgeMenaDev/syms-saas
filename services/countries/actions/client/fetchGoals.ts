import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export class GoalsService {
	async fetchGoals() {
		const supabase = createClientComponentClient()

		const { data } = await supabase.from('goals').select()

		return {
			data
		}
	}
}
