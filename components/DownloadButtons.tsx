import { CsvButton } from './CsvButton'
import { ExcelButton } from './ExcelButton'

export function DownloadButtons({ data, name }: { data: any; name: string }) {
	return (
		<div className='flex items-center mb-3 gap-2'>
			<CsvButton name={name} data={data} />
			<ExcelButton name={name} data={data} />
		</div>
	)
}
