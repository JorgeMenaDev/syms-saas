'use client'

import { convertToCSV } from '@/utils/re-usable-functions/convert-to-csv'
import { CSVLink } from 'react-csv'
import { buttonVariants } from './ui/button'

export function CsvButton({ name, data }: { name: string; data: any }) {
	const csvFileNameWithTodayDate = `${name}-${new Date().toLocaleDateString()}.csv`

	return (
		<CSVLink
			filename={csvFileNameWithTodayDate}
			data={convertToCSV(data)}
			className={`mb-3 ${buttonVariants({ variant: 'outline' })}}`}
		>
			Descargar CSV
		</CSVLink>
	)
}
