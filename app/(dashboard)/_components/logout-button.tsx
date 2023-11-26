'use client'

import { Button } from '@/components/ui/button'
import { signOut } from '@/services/auth/actions/client/signOut'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function LogoutButton() {
	const router = useRouter()

	async function handleLogout() {
		toast.promise(signOut, {
			loading: 'logeando...',
			finally: () => {
				router.refresh()
			}
		})
	}

	return (
		<Button onClick={handleLogout} variant='secondary'>
			Logout
		</Button>
	)
}
