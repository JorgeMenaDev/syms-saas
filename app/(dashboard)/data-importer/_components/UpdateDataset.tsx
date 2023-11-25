'use client'

import { TabsTrigger, TabsList, TabsContent, Tabs } from '@/components/ui/tabs'
import { CardTitle, CardDescription, Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GoalsService } from '@/services/countries/actions/client/fetchGoals'
import { useEffect } from 'react'

const goalsService = new GoalsService()

export function UpdateDataset() {
	useEffect(() => {
		goalsService
			.fetchGoals()
			.then(res => {
				console.log({ res })
			})
			.catch(err => {
				console.log({ err })
			})
	}, [])

	return (
		<div className='mt-8'>
			<Tabs defaultValue='create'>
				<TabsList className='mb-4'>
					<TabsTrigger value='create'>Create an Empty Template</TabsTrigger>
					<TabsTrigger value='edit'>Edit an Existing Dataset</TabsTrigger>
				</TabsList>
				<TabsContent value='create'>
					<Card className='p-6'>
						<CardTitle>Create a New Template</CardTitle>
						<CardDescription>
							To create a new template, start by defining the fields and types. You can add as many fields as you need.
						</CardDescription>
						<Button className='mt-4' variant='secondary'>
							Start Creating
						</Button>
					</Card>
				</TabsContent>
				<TabsContent value='edit'>
					<Card className='p-6'>
						<CardTitle>Edit an Existing Dataset</CardTitle>
						<CardDescription>
							Select a dataset from your library to start editing. You can modify fields, types and values.
						</CardDescription>
						<Button className='mt-4' variant='secondary'>
							Start Editing
						</Button>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
