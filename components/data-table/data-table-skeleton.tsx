'use client'

import * as React from 'react'
import {
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { DataTablePagination } from './data-table-pagination'

interface DataTableProps<TData, TValue> {
	columns: Array<ColumnDef<TData, TValue>>
	data: TData[]
	filters?: React.ComponentType<{ table: any; data: any }>
}

export function DataTableSkeleton<TData, TValue>({ columns, data, filters: Filters }: DataTableProps<TData, TValue>) {
	const [rowSelection, setRowSelection] = React.useState({})
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const [sorting, setSorting] = React.useState<SortingState>([])

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters
		},
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues()
	})

	return (
		<div className='relative py-14 pr-11'>
			<div className='space-y-4'>
				{Filters && <Filters table={table} data={data} />}
				<div className='rounded-md border'>
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map(headerGroup => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map(header => {
										return (
											<TableHead key={header.id} colSpan={header.colSpan}>
												{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
											</TableHead>
										)
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell colSpan={columns.length} className='h-24 text-center'>
									<div className='h-8 mt-5 bg-gray-200 rounded animate-pulse' />
									<div className='h-8 mt-5 bg-gray-200 rounded animate-pulse' />
									<div className='h-8 mt-5 bg-gray-200 rounded animate-pulse' />
									<div className='h-8 mt-5 bg-gray-200 rounded animate-pulse' />
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>

				<DataTablePagination table={table} />
			</div>
		</div>
	)
}
