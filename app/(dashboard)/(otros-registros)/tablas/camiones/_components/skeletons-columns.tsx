'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '../../../../../../components/data-table/data-table-column-header'
import { camionesColumns } from '../utils'

export const skeletonCols = camionesColumns.map(col => {
	return {
		accessorKey: col,
		header: ({ column }) => <DataTableColumnHeader column={column} title={col} />
	}
}) as Array<ColumnDef<any>>
