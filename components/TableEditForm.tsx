'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

// Define prop types for the component
interface DynamicTableEditFormProps {
	initialValues: Record<string, any>
	tableSchema: z.ZodObject<any, any, any>
	selectOptions: Array<{ name: string; options: Array<{ value: string; label: string }> }>
	onSubmit: (values: any) => void
}

const DynamicTableEditForm: React.FC<DynamicTableEditFormProps> = ({
	initialValues,
	tableSchema,
	selectOptions,
	onSubmit
}) => {
	// Define a form with initial values
	const form = useForm<any>({
		resolver: zodResolver(tableSchema),
		defaultValues: initialValues
	})

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				{/* Render form fields based on the table schema */}
				{Object.keys(tableSchema.shape).map((fieldName, index) => (
					<FormField
						key={index}
						control={form.control}
						name={fieldName}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{fieldName}</FormLabel>
								<FormControl>
									<Input placeholder={fieldName} {...field} />
								</FormControl>
								<FormDescription>{/* Add description if needed */}</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}

				{/* Render dynamic Select fields based on the provided selectOptions */}
				{selectOptions.map((select, index) => (
					<FormField
						key={index}
						control={form.control}
						name={select.name}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{select.name}</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder={`Select ${select.name}`} />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{select.options.map((option, optionIndex) => (
											<SelectItem key={optionIndex} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormDescription>{/* Add description if needed */}</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}

				{/* Submit button */}
				<Button type='submit'>Update Table Entry</Button>
			</form>
		</Form>
	)
}

export default DynamicTableEditForm
