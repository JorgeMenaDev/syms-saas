'use client'

import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

// 1. Create a schema for your form.
const formSchema = z.object({
	direccion: z
		.string({
			required_error: 'La direccion es requerida.'
		})
		.min(3, {
			message: 'La direccion debe tener al menos 3 caracteres.'
		}),
	email: z
		.string({
			required_error: 'El email es requerido.'
		})
		.email({
			message: 'El email debe ser valido.'
		}),
	ciudad: z.string({
		required_error: 'La ciudad es requerida.'
	}),
	estado: z.string({
		required_error: 'El estado es requerido.'
	}),
	industria: z.string({
		required_error: 'La industria es requerida.'
	}),
	region: z.string({
		required_error: 'La region es requerida.'
	}),
	nombre: z
		.string({
			required_error: 'El nombre es requerido.'
		})
		.min(3, {
			message: 'El nombre debe tener al menos 3 caracteres.'
		}),
	representanteLegal: z
		.string({
			required_error: 'El representante legal es requerido.'
		})
		.min(3, {
			message: 'El representante legal debe tener al menos 3 caracteres.'
		}),
	rut: z
		.string({
			required_error: 'El rut es requerido.'
		})
		.min(6, {
			message: 'El rut debe tener al menos 6 caracteres.'
		}),
	telefono: z
		.string({
			required_error: 'El telefono es requerido.'
		})
		.min(9, {
			message: 'El telefono debe tener al menos 9 caracteres.'
		})
})

const ciudadesOptions = [
	{ value: '1', label: 'Santiago' },
	{ value: '2', label: 'Valparaiso' },
	{ value: '3', label: 'Concepcion' }
]

const estadosOptions = [
	{ value: '1', label: 'Activo' },
	{ value: '2', label: 'Inactivo' }
]

const industriasOptions = [
	{ value: '1', label: 'Mineria' },
	{ value: '2', label: 'Pesca' },
	{ value: '3', label: 'Agricultura' }
]

const regionesOptions = [
	{ value: '1', label: 'Metropolitana' },
	{ value: '2', label: 'Valparaiso' },
	{ value: '3', label: 'Bio Bio' },
	{ value: '4', label: 'Araucania' }
]

export function NewEmpresaForm() {
	// 2. Define a form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema)
	})

	// 3. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log({ values })
		toast("You've updated your profile!")
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='nombre'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre</FormLabel>
							<FormControl>
								<Input placeholder='nombre' {...field} />
							</FormControl>
							<FormDescription>Aca va el nombre de la empresa</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder='email' {...field} />
							</FormControl>
							<FormDescription>El email de la empresa, este sera el email de contacto para el usuario.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='ciudad'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ciudad</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Seleciona una ciudad' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{ciudadesOptions.map((option, index) => (
										<SelectItem key={index} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>
								Si quieres ver la lista de ciudades con sus detalles puedes ir a{' '}
								<Link className='border-b border-primary' href='/examples/forms'>
									este link
								</Link>
								.{/* You can manage email addresses in your <Link href='/examples/forms'>email settings</Link>. */}
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='estado'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Estado</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Seleciona un estado' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{estadosOptions.map((option, index) => (
										<SelectItem key={index} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>
								Si quieres ver la lista de estados con sus detalles puedes ir a{' '}
								<Link className='border-b border-primary' href='/examples/forms'>
									este link
								</Link>
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='industria'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Industria</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Seleciona un estado' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{industriasOptions.map((option, index) => (
										<SelectItem key={index} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>
								Si quieres ver la lista de industrias con sus detalles puedes ir a{' '}
								<Link className='border-b border-primary' href='/examples/forms'>
									este link
								</Link>
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='region'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Region</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Seleciona una region' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{regionesOptions.map((option, index) => (
										<SelectItem key={index} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>
								Si quieres ver la lista de regiones con sus detalles puedes ir a{' '}
								<Link className='border-b border-primary' href='/examples/forms'>
									este link
								</Link>
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='telefono'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Telefono</FormLabel>
							<FormControl>
								<Input placeholder='Telefono' className='resize-none' {...field} />
							</FormControl>
							<FormDescription>
								El telefono de la empresa, este sera el telefono de contacto para el usuario.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='direccion'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Direccion</FormLabel>
							<FormControl>
								<Input placeholder='Direccion' className='resize-none' {...field} />
							</FormControl>
							<FormDescription>La direccion de la empresa.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='rut'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rut</FormLabel>
							<FormControl>
								<Input placeholder='Rut' className='resize-none' {...field} />
							</FormControl>
							<FormDescription>El rut de la empresa.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='representanteLegal'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Representante Legal</FormLabel>
							<FormControl>
								<Input placeholder='Representante Legal' className='resize-none' {...field} />
							</FormControl>
							<FormDescription>El representante legal de la empresa.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit'>Crear Empresa</Button>
			</form>
		</Form>
	)
}
