'use client'

import { Button } from '@/components/ui/button'
import { signIn } from '@/services/auth/actions/client/signIn'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export function LoginForm() {
	const [loading, setLoading] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const router = useRouter()

	const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!email || !password) return toast('Please fill all the fields.')

		setLoading(true)

		const toastId = toast.loading('Iniciando sesión...')
		const { error } = await signIn({ email, password })

		if (error) {
			toast(error.message)
			setLoading(false)
			return
		}

		router.push('/dashboard')
		router.refresh()
		toast.dismiss(toastId)
	}

	useEffect(() => {
		return () => {
			setLoading(false)
		}
	}, [])

	return (
		<div className='flex justify-center h-screen items-center'>
			<form
				className='h-auto flex flex-col w-full justify-center gap-2 text-foreground shadow-md rounded-md p-8'
				onSubmit={handleSignIn}
			>
				<label className='text-md' htmlFor='email'>
					Correo
				</label>
				<input
					className='rounded-md px-4 py-2 bg-inherit border mb-6'
					name='email'
					onChange={e => {
						setEmail(e.target.value)
					}}
					value={email}
					placeholder='you@example.com'
				/>
				<label className='text-md' htmlFor='password'>
					Contraseña
				</label>
				<input
					className='rounded-md px-4 py-2 bg-inherit border mb-6'
					type='password'
					name='password'
					onChange={e => {
						setPassword(e.target.value)
					}}
					value={password}
					placeholder='••••••••'
				/>

				<Button disabled={loading} type='submit'>
					{loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
				</Button>
			</form>
		</div>
	)
}
