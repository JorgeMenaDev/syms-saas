'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type ConfigParameter } from './TableEntryForm'
import { Card } from './ui/card'
import { toast } from 'sonner'

export interface EditTableEntryFormProps {
	tableSchema: z.ZodObject<any, any, any>
	configParameters: ConfigParameter[]
	initialValues: Record<string, any> // Initial values for pre-filling the form
	onSubmit: (values: any) => Promise<boolean | undefined>
}

export const EditTableEntryForm: React.FC<EditTableEntryFormProps> = ({
	tableSchema,
	configParameters,
	initialValues,
	onSubmit
}) => {
	const [loading, setLoading] = React.useState(false)
	const form = useForm<any>({
		resolver: zodResolver(tableSchema),
		defaultValues: initialValues // Set default values for the form fields
	})

	function handleSubmit(values: any) {
		console.log({ values })
		setLoading(true)
		const toastId = toast.loading('Creando...')

		onSubmit(values)
			.then(() => {})
			.catch(() => {}) // <-- this is to keep ts happy - we did all the error handling already.
			.finally(() => {
				toast.dismiss(toastId)
				setLoading(false)
			})
	}

	return (
		<Card className='w-full border-0 p-5'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
					{configParameters.map((config, index) => (
						<FormField
							key={index}
							control={form.control}
							name={config.name}
							render={({ field }) => (
								<FormItem>
									<FormLabel>{config.label}</FormLabel>

									{config.type === 'input' && (
										<FormControl>
											<Input placeholder={config.placeholder} {...field} />
										</FormControl>
									)}

									{config.type === 'select' && (
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder={`Selecciona ${config.placeholder}`} />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{config.options?.map((option, optionIndex) => (
													<SelectItem key={optionIndex} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}

									<FormDescription>{config.description}</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}

					<Button disabled={loading} type='submit'>
						Actualizar
					</Button>
				</form>
			</Form>
		</Card>
	)
}
