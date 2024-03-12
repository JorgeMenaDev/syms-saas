'use client'

import { convertToCSV } from '@/utils/re-usable-functions/convert-to-csv'
import { CSVLink } from 'react-csv'
import { buttonVariants } from './ui/button'
import { DownloadIcon } from '@radix-ui/react-icons'

export function CsvButton({ name, data }: { name: string; data: any }) {
	const csvFileNameWithTodayDate = `${name}-${new Date().toLocaleDateString()}.csv`

	return (
		<CSVLink filename={csvFileNameWithTodayDate} data={convertToCSV(data)} className={`${buttonVariants()}}`}>
			<DownloadIcon className='h-5 w-5 mr-1' /> CSV
		</CSVLink>
	)
}
