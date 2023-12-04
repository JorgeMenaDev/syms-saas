'use client'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type * as z from 'zod'

import { Form, FormField, FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type ConfigParameter } from './TableEntryForm'

export interface ReadOnlyTableEntryFormProps {
	tableSchema: z.ZodObject<any, any, any>
	configParameters: ConfigParameter[]
	initialValues: Record<string, any> // Initial values for pre-filling the form
}

export const ReadOnlyTableEntryForm: React.FC<ReadOnlyTableEntryFormProps> = ({
	tableSchema,
	configParameters,
	initialValues
}) => {
	const form = useForm<any>({
		resolver: zodResolver(tableSchema),
		defaultValues: initialValues, // Set default values for the form fields
		shouldUnregister: false // Keep fields registered for read-only form
	})

	return (
		<Form {...form}>
			<form className='space-y-8'>
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
										<Input placeholder={config.placeholder} readOnly value={initialValues[config.name]} />
									</FormControl>
								)}

								{config.type === 'textarea' && (
									<FormControl>
										<textarea
											placeholder={config.placeholder}
											readOnly
											value={initialValues[config.name]}
											className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm'
										/>
									</FormControl>
								)}

								<FormDescription>{config.description}</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}
			</form>
		</Form>
	)
}
