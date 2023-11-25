'use client'

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/k2wyRrp4lOI
 */
import { Button } from '@/components/ui/button'

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { useState } from 'react'
import { UpdateDataset } from './_components/UpdateDataset'

const options = [
	{ value: 'option1', label: 'Option 1' },
	{ value: 'option2', label: 'Option 2' },
	{ value: 'option3', label: 'Option 3' }
]

export default function DataImporterPage() {
	const [selectedOption, setSelectedOption] = useState<null | string>(null)
	const [datasetSchema, setDatasetSchema] = useState<null | string>(null)

	function handleOptionChange(option: string) {
		setSelectedOption(option)
	}

	function handleLoadDatasetSchema() {
		setDatasetSchema('schema')
	}

	return (
		<div className='min-h-screen bg-white dark:bg-zinc-900'>
			<div className='container mx-auto py-8 px-4 md:px-6 lg:px-8'>
				<div className='text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6'>Data Importer</div>
				<div className='flex flex-col gap-2 lg:flex-row lg:gap-6'>
					<Select onValueChange={handleOptionChange}>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Selecciona' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{options.map((option, index) => (
									<SelectItem key={index} value={option.value}>
										{option.label}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
					<Button variant='default' disabled={!selectedOption} onClick={handleLoadDatasetSchema}>
						Cargar Opciones
					</Button>
				</div>
				{datasetSchema && <UpdateDataset />}
			</div>
		</div>
	)
}
