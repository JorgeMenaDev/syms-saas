import React from 'react'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface ComboboxOption {
	value: string
	label: string
}

interface ComboboxProps {
	options: ComboboxOption[]
	value: string
	onChange: (value: string) => void
}

export const Combobox: React.FC<ComboboxProps> = ({ options, value, onChange }) => {
	const [open, setOpen] = React.useState(false)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant='outline' role='combobox' aria-expanded={open} className='w-full justify-between'>
					{value ? options.find(option => option.value === value)?.label : 'Select...'}
					<CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-full p-0'>
				<Command>
					<CommandInput placeholder='Search...' className='h-9' />
					<CommandEmpty>No option found.</CommandEmpty>
					<CommandGroup>
						{options.map(option => (
							<CommandItem
								key={option.value}
								value={option.value}
								onSelect={currentValue => {
									onChange(currentValue === value ? '' : currentValue)
									setOpen(false)
								}}
							>
								{option.label}
								<CheckIcon className={cn('ml-auto h-4 w-4', value === option.value ? 'opacity-100' : 'opacity-0')} />
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

// 'use client'

// import React from 'react'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import type * as z from 'zod'
// import { Button } from '@/components/ui/button'
// import { Form, FormField, FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { Combobox, ComboboxDemo } from './ComboboxDemo'

// export interface ConfigParameter {
// 	name: string
// 	label: string
// 	type: 'input' | 'select' | 'textarea' | 'combobox' // Specify the type of the field
// 	inputType?: 'text' | 'number' | 'email' | 'password' // Specify the input type for input type
// 	options?: Array<{ value: string; label: string }> | undefined // Options for select type
// 	placeholder?: string
// 	description?: string
// }

// interface DynamicTableEntryFormProps {
// 	tableSchema: z.ZodObject<any, any, any>
// 	configParameters: ConfigParameter[]
// 	onSubmit: (values: any) => void
// }

// export const TableEntryForm: React.FC<DynamicTableEntryFormProps> = ({ tableSchema, configParameters, onSubmit }) => {
// 	const form = useForm<any>({
// 		resolver: zodResolver(tableSchema)
// 	})

// 	return (
// 		<Form {...form}>
// 			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
// 				{configParameters.map((config, index) => (
// 					<FormField
// 						key={index}
// 						control={form.control}
// 						name={config.name}
// 						render={({ field }) => (
// 							<FormItem>
// 								<FormLabel>{config.label}</FormLabel>

// 								{/* inputs */}
// 								{config.type === 'input' && (
// 									<FormControl>
// 										<Input placeholder={config.placeholder} {...field} />
// 									</FormControl>
// 								)}

// 								{/* selects */}
// 								{config.type === 'select' && (
// 									<Select onValueChange={field.onChange} defaultValue={field.value}>
// 										<FormControl>
// 											<SelectTrigger>
// 												<SelectValue placeholder={`Selecciona ${config.name}`} />
// 											</SelectTrigger>
// 										</FormControl>
// 										<SelectContent>
// 											{config.options?.map((option, optionIndex) => (
// 												<SelectItem key={optionIndex} value={option.value}>
// 													{option.label}
// 												</SelectItem>
// 											))}
// 										</SelectContent>
// 									</Select>
// 								)}

// 								{/* combobox */}
// 								{config.type === 'combobox' && (
// 									<FormControl>
// 										<Combobox
// 											value={field.value}
// 											onChange={value => {
// 												form.setValue(config.name, value)
// 											}}
// 											options={[
// 												{
// 													value: 'next.js',
// 													label: 'Next.js'
// 												},
// 												{
// 													value: 'sveltekit',
// 													label: 'SvelteKit'
// 												},
// 												{
// 													value: 'nuxt.js',
// 													label: 'Nuxt.js'
// 												},
// 												{
// 													value: 'remix',
// 													label: 'Remix'
// 												},
// 												{
// 													value: 'astro',
// 													label: 'Astro'
// 												}
// 											]}
// 										/>
// 									</FormControl>
// 								)}

// 								{/* Add support for other types like textarea if needed */}
// 								<FormDescription>{config.description}</FormDescription>
// 								<FormMessage />
// 							</FormItem>
// 						)}
// 					/>
// 				))}

// 				<Button type='submit'>Add to Table</Button>
// 			</form>
// 		</Form>
// 	)
// }
