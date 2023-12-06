'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export interface ConfigParameter {
	name: string
	label: string
	type: 'input' | 'select' | 'textarea' // Specify the type of the field
	inputType?: 'text' | 'number' | 'email' | 'password' // Specify the input type for input type
	options?: Array<{ value: string; label: string }> | undefined // Options for select type
	placeholder?: string
	description?: string
}

interface DynamicTableEntryFormProps {
	tableSchema: z.ZodObject<any, any, any>
	configParameters: ConfigParameter[]
	onSubmit: (values: any) => Promise<boolean | undefined>
	initialValues?: any
}

export const TableEntryForm: React.FC<DynamicTableEntryFormProps> = ({
	initialValues,
	tableSchema,
	configParameters,
	onSubmit
}) => {
	const form = useForm<any>({
		resolver: zodResolver(tableSchema),
		defaultValues: initialValues
	})

	function handleSubmit(values: any) {
		onSubmit(values)
			.then(ok => {
				if (ok) form.reset()
			})
			.catch(() => {}) // <-- this is to keep ts happy - we did all the error handling already.
	}

	return (
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

								{/* inputs */}
								{config.type === 'input' && (
									<FormControl>
										<Input placeholder={config.placeholder} {...field} />
									</FormControl>
								)}

								{/* selects */}
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

								{/* Add support for other types like textarea if needed */}
								<FormDescription>{config.description}</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}

				<Button type='submit'>Crear</Button>
			</form>
		</Form>
	)
}
