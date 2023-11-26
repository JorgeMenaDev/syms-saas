import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

export async function signIn({ email, password }: { email: string; password: string }) {
	const { error } = await supabase.auth.signInWithPassword({
		email,
		password
	})

	if (error) console.error(error)

	return { error }
}
