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
	onSubmit: (values: any) => void
}

export const TableEntryForm: React.FC<DynamicTableEntryFormProps> = ({ tableSchema, configParameters, onSubmit }) => {
	const form = useForm<any>({
		resolver: zodResolver(tableSchema)
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

								{/* inputs */}
								{config.type === 'input' && (
									<FormControl>
										<Input placeholder={config.placeholder} {...field} />
									</FormControl>
								)}

								{/* selects */}
								{config.type === 'select' && (
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder={`Select ${config.name}`} />
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

				<Button type='submit'>Add to Table</Button>
			</form>
		</Form>
	)
}
