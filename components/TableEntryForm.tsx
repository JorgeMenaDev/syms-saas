'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from './ui/card'
import { toast } from 'sonner'

export interface ConfigParameter {
	name: string
	label: string
	type: 'input' | 'select' | 'textarea' // Specify the type of the field
	inputType?: 'text' | 'number' | 'email' | 'password' // Specify the input type for input type
	options?: Array<{ value: string; label: string; idRegion?: string }> | undefined // Options for select type
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
	const cityOptions = configParameters.find(config => config.name === 'ciudad')?.options ?? []
	const [loading, setLoading] = React.useState(false)
	const [selectedRegion, setSelectedRegion] = React.useState<string | null>(null)
	const [selectedCity, setSelectedCity] = React.useState<string | null>(null)
	const [citiesOptions, setCitiesOptions] = React.useState(cityOptions)

	const form = useForm<any>({
		resolver: zodResolver(tableSchema),
		defaultValues: initialValues
	})

	function handleSubmit(values: any) {
		setLoading(true)
		const toastId = toast.loading('Creando...')

		onSubmit(values)
			.then(ok => {
				if (ok) form.reset()
			})
			.catch(() => {}) // <-- this is to keep ts happy - we did all the error handling already.
			.finally(() => {
				toast.dismiss(toastId)
				setLoading(false)
			})
	}

	const configParametersWithRegionAndCity = configParameters.filter(
		config => config.name === 'region' || config.name === 'ciudad'
	)

	const configParametersWithoutRegionAndCity = configParameters.filter(
		config => config.name !== 'region' && config.name !== 'ciudad'
	)

	React.useEffect(() => {
		// if user select a city first, then a region, we want to keep the city selected only if it belongs to the region
		const city = cityOptions.find(option => option.value === selectedCity)
		const cityBelongsToRegion = city?.idRegion === selectedRegion

		if (!cityBelongsToRegion) {
			form.setValue('ciudad', '')
		}

		if (cityOptions && selectedRegion !== null) {
			const cityOptionsForRegion = cityOptions.filter(option => option.idRegion === selectedRegion)

			setCitiesOptions(cityOptionsForRegion)
		}
	}, [selectedRegion])

	return (
		<Card className='w-full border-0 lg:p-5'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
					{configParametersWithoutRegionAndCity.map((config, index) => (
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
											<Input placeholder={config.placeholder} {...field} type={config.inputType} />
										</FormControl>
									)}

									{/* selects */}
									{config.type === 'select' && config.name !== 'region' && config.name !== 'ciudad' && (
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

									{/* ********************* REGION AND CITIES */}

									{/* Add support for other types like textarea if needed */}
									<FormDescription>{config.description}</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}

					{configParametersWithRegionAndCity.map((config, index) => (
						<FormField
							key={index}
							control={form.control}
							name={config.name}
							render={({ field }) => (
								<>
									{config.name === 'ciudad' && (
										<FormItem>
											<FormLabel>{config.label}</FormLabel>
											<Select
												onValueChange={value => {
													setSelectedCity(value)
													field.onChange(value)
												}}
												value={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder={`Selecciona ${config.placeholder}`} />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{citiesOptions.map((option, optionIndex) => (
														<SelectItem key={optionIndex} value={option.value}>
															{option.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>

											<FormDescription>{config.description}</FormDescription>
											<FormMessage />
										</FormItem>
									)}

									{config.name === 'region' && (
										<FormItem>
											<FormLabel>{config.label}</FormLabel>

											<Select
												onValueChange={value => {
													setSelectedRegion(value)
													field.onChange(value)
												}}
												value={field.value}
											>
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

											<FormDescription>{config.description}</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								</>
							)}
						/>
					))}

					<Button disabled={loading} type='submit'>
						Crear
					</Button>
				</form>
			</Form>
		</Card>
	)
}
