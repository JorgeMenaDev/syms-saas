'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { type Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options'
import { DataTableFacetedFilter } from '@/components/data-table/data-table-faceted-filter'

interface DataTableToolbarProps<TData> {
	table: Table<TData>
	data?: any
}

function removeDuplicates(arr: any[]) {
	const uniqueValues = new Set()
	return arr.filter(obj => {
		if (!uniqueValues.has(obj.value)) {
			uniqueValues.add(obj.value)
			return true
		}
		return false
	})
}

export function EstablecimientosFilters<TData>({ table, data }: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0

	console.log({ data })

	const regionesOptions = data.map((item: any) => {
		return {
			value: item.region,
			label: item.region
		}
	})

	const regionesOptionsFiltered = removeDuplicates(regionesOptions)

	const ciudadesOptions = data.map((item: any) => {
		return {
			value: item.ciudad,
			label: item.ciudad
		}
	})

	const ciudadesOptionsFiltered = removeDuplicates(ciudadesOptions)

	return (
		<div className='flex items-center justify-between'>
			<div className='flex flex-1 items-center space-x-2'>
				<Input
					placeholder='Filtrar establecimientos...'
					value={(table.getColumn('nombre')?.getFilterValue() as string) ?? ''}
					onChange={event => table.getColumn('nombre')?.setFilterValue(event.target.value)}
					className='h-8 w-[150px] lg:w-[250px]'
				/>

				{table.getColumn('region') && (
					<DataTableFacetedFilter
						column={table.getColumn('region')}
						title='Regiones'
						options={regionesOptionsFiltered}
					/>
				)}

				{table.getColumn('ciudad') && (
					<DataTableFacetedFilter
						column={table.getColumn('ciudad')}
						title='Comunas'
						options={ciudadesOptionsFiltered}
					/>
				)}

				{table.getColumn('nopel') && (
					<DataTableFacetedFilter
						column={table.getColumn('nopel')}
						title='NOPEL'
						options={[
							{
								// @ts-expect-error - fix this later
								value: true,
								label: 'Activo'
							},
							{
								// @ts-expect-error - fix this later
								value: false,
								label: 'Inactivo'
							}
						]}
					/>
				)}

				{table.getColumn('respel') && (
					<DataTableFacetedFilter
						column={table.getColumn('respel')}
						title='RESPEL'
						options={[
							{
								// @ts-expect-error - fix this later
								value: true,
								label: 'Activo'
							},
							{
								// @ts-expect-error - fix this later
								value: false,
								label: 'Inactivo'
							}
						]}
					/>
				)}

				{isFiltered && (
					<Button
						variant='ghost'
						onClick={() => {
							table.resetColumnFilters()
						}}
						className='h-8 px-2 lg:px-3'
					>
						Reset
						<Cross2Icon className='ml-2 h-4 w-4' />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} />
		</div>
	)
}
