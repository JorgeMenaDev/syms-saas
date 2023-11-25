'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

function kgToPounds(kilograms: number) {
	// Conversion factor: 1 kilogram = 2.20462 pounds
	const pounds = kilograms * 2.20462
	return pounds
}

// Define Zod schema for form validation
const WeightFormSchema = z.object({
	weight: z.string({
		required_error: 'Please enter your weight in kilograms.'
	}),
	selectedGoal: z.string({
		required_error: 'Please select a weight-related goal.'
	}),
	unit: z.string({
		required_error: 'Please select a unit.'
	})
})

interface WeightGoal {
	goal: string
	number: number
}

// Define the array of weight-related goals
const weightGoals: WeightGoal[] = [
	{ goal: 'Extreme Weight Gain: Significant', number: 21 },
	{ goal: 'Extreme Weight Gain: Moderate', number: 20 },
	{ goal: 'Extreme Weight Gain: Slight', number: 19 },
	{ goal: 'Moderate Weight Gain: Significant', number: 18 },
	{ goal: 'Moderate Weight Gain: Moderate', number: 17 },
	{ goal: 'Moderate Weight Gain: Slight', number: 16 },
	{ goal: 'Maintain Weight: High', number: 15 },
	{ goal: 'Maintain Weight: Moderate', number: 14 },
	{ goal: 'Maintain Weight: Low', number: 13 },
	{ goal: 'Moderate Weight Loss: Significant', number: 12 },
	{ goal: 'Moderate Weight Loss: Moderate', number: 11 },
	{ goal: 'Moderate Weight Loss: Slight', number: 10 },
	{ goal: 'Extreme Weight Loss: Significant', number: 9 },
	{ goal: 'Extreme Weight Loss: Moderate', number: 8 },
	{ goal: 'Extreme Weight Loss: Slight', number: 7 }
]

interface WeightFormData {
	weight: string
	selectedGoal: string
	unit: string
}

export default function WeightForm() {
	const [calories, setCalories] = useState(0)
	const [protein, setProtein] = useState(0)
	const form = useForm<WeightFormData>({
		resolver: zodResolver(WeightFormSchema)
	})

	function onSubmit(data: WeightFormData) {
		// Add your logic for handling the form data submission

		const { weight, selectedGoal, unit } = data
		console.log({ weight, selectedGoal, number: weightGoals.find(({ goal }) => goal === selectedGoal)?.number })

		const weightNumber = unit === 'kg' ? kgToPounds(Number(weight)) : Number(weight)
		const goal = weightGoals.find(({ goal }) => goal === selectedGoal)

		if (goal) {
			const calories = weightNumber * goal.number
			console.log('Calories:', calories)
			toast.message('Your plan has been created! Here are your next steps:', {
				description: `Your total daily calories are ${calories}.`
			})

			setCalories(calories)
			setProtein(weightNumber * 1)
		}
	}

	return (
		<section className='w-full py-20 px-12'>
			<div className='container px-4 md:px-6'>
				<div className='grid gap-6'>
					<div>
						<p>
							<strong>Disclaimer:</strong> This app is not intended to be a substitute for professional medical advice,
							diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with
							any questions you may have regarding a medical condition. Never disregard professional medical advice or
							delay in seeking it because of something you have read on this app.
						</p>
					</div>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
							<div className='grid grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name='weight'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Enter Your Weight</FormLabel>
											<FormControl>
												<Input
													{...field}
													type='number'
													placeholder='Enter your weight in pounds'
													className='w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300'
												/>
											</FormControl>
											<FormDescription>Please enter your current weight in pounds.</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='unit'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Choose Your Weight Unit</FormLabel>
											<Select onValueChange={field.onChange} defaultValue='pounds'>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select a unit' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value='kg'>kg</SelectItem>
													<SelectItem value='pounds'>pounds</SelectItem>
												</SelectContent>
												<FormDescription>Select a unit.</FormDescription>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name='selectedGoal'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Choose Your Weight-Related Goal</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select a goal' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{weightGoals.map(({ goal, number }) => (
													<SelectItem key={number} value={goal}>
														{goal}
													</SelectItem>
												))}
											</SelectContent>
											<FormDescription>Select a goal and we will provide a personalized plan for you.</FormDescription>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type='submit'>Submit</Button>
						</form>
					</Form>

					{calories > 0 && (
						<>
							<div>
								<p>Calories: {calories}</p>
								<p>Protein goal: {protein}</p>
							</div>
							<div>
								<p>
									The secret is: Eat your protein goal a day, e.g 100g of protein a day, which is 400 calories. Then you
									can eat whatever you want to fill the rest of your calories.
								</p>
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	)
}
