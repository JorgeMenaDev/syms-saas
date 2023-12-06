import { Skeleton } from '@/components/ui/skeleton'
import { CardHeader, CardContent, CardFooter, Card } from '@/components/ui/card'

export function FormSkeleton() {
	return (
		<Card className='w-full border-0 p-5'>
			<CardHeader>
				<Skeleton className='h-4 w-32' />
			</CardHeader>
			<CardContent className='space-y-4'>
				<div className='space-y-2'>
					<Skeleton className='h-4 w-20' />
					<Skeleton className='h-8 w-full' />
				</div>
				<div className='space-y-2'>
					<Skeleton className='h-4 w-20' />
					<Skeleton className='h-8 w-full' />
				</div>
				<div className='space-y-2'>
					<Skeleton className='h-4 w-20' />
					<Skeleton className='h-8 w-full' />
				</div>
				<div className='space-y-2'>
					<Skeleton className='h-4 w-20' />
					<Skeleton className='h-8 w-full' />
				</div>
				<div className='space-y-2'>
					<Skeleton className='h-4 w-20' />
					<Skeleton className='h-8 w-full' />
				</div>
				<div className='space-y-2'>
					<Skeleton className='h-4 w-20' />
					<Skeleton className='h-8 w-full' />
				</div>
			</CardContent>
			<CardFooter>
				<Skeleton className='h-10 w-[130px]' />
			</CardFooter>
		</Card>
	)
}
