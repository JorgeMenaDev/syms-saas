import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

export async function signOut() {
	await supabase.auth.signOut()
}
