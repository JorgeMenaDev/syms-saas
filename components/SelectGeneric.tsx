'use client'

import { SelectContent } from '@radix-ui/react-select'
import { Select, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import Link from 'next/link'
import { type FC } from 'react'

const ciudadesOptions = [
	{ value: '1', label: 'Santiago' },
	{ value: '2', label: 'Valparaiso' },
	{ value: '3', label: 'Concepcion' }
]

interface SelectGenericProps {
	form: any
}

export const SelectGeneric: FC<SelectGenericProps> = ({ form }) => {
	return (
		<FormField
			control={form.control}
			name='ciudad'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Ciudad</FormLabel>
					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder='Select a verified email to display' />
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
						You can manage email addresses in your <Link href='/examples/forms'>email settings</Link>.
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
