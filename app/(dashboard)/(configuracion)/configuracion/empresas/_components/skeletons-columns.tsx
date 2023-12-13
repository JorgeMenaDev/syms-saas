'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '../../../../../../components/data-table/data-table-column-header'
import { usuariosColumns } from '@/services/data/actions/server/usuarios/utils'

export const skeletonCols = usuariosColumns.map(col => {
	return {
		accessorKey: col,
		header: ({ column }) => <DataTableColumnHeader column={column} title={col} />
	}
}) as Array<ColumnDef<any>>
