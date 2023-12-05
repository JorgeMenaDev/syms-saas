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

export interface EditTableEntryFormProps {
	tableSchema: z.ZodObject<any, any, any>
	configParameters: ConfigParameter[]
	initialValues: Record<string, any> // Initial values for pre-filling the form
	onSubmit: (values: any) => void
}

export const EditTableEntryForm: React.FC<EditTableEntryFormProps> = ({
	tableSchema,
	configParameters,
	initialValues,
	onSubmit
}) => {
	const form = useForm<any>({
		resolver: zodResolver(tableSchema),
		defaultValues: initialValues // Set default values for the form fields
	})

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
												<SelectValue placeholder={`Selecciona ${config.name}`} />
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

				<Button type='submit'>Actualizar</Button>
			</form>
		</Form>
	)
}
