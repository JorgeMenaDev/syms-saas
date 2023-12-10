'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '../../../../../../components/data-table/data-table-column-header'
import { establecimientosColumns } from '@/services/data/actions/server/establecimientos/utils'

export const skeletonCols = establecimientosColumns.map(col => {
	return {
		accessorKey: col,
		header: ({ column }) => <DataTableColumnHeader column={column} title={col} />
	}
}) as Array<ColumnDef<any>>
