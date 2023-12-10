'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function deleteEstablecimientoById(id: string) {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { status, data, error } = await supabase.from('establecimientos').delete().eq('id', id)
	console.log({ status, data, error })

	if (error) return { ok: false }

	// revalidate cache for this path
	revalidatePath('/configuracion/establecimientos')

	return { ok: true }
}
