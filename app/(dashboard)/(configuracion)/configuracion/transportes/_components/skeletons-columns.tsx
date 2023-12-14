'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '../../../../../../components/data-table/data-table-column-header'
import { transportistasColumns } from '@/services/data/actions/server/transportistas/utils'

export const skeletonCols = transportistasColumns.map(col => {
	return {
		accessorKey: col,
		header: ({ column }) => <DataTableColumnHeader column={column} title={col} />
	}
}) as Array<ColumnDef<any>>
