import { apiKey, secretKey } from '@/lib/open-api'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey })

export async function POST(req: Request) {
	const authHeader = req.headers.get('Authorization')

	const isAuth = cookies().get('supabase-auth-token') ?? authHeader === secretKey

	if (!isAuth) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
	}

	const request = await req.json()

	if (!request?.text) {
		return NextResponse.json({ message: 'Invalid request missing key.' }, { status: 422 })
	}

	try {
		const result = await openai.embeddings.create({
			input: request.text,
			model: 'text-embedding-ada-002'
		})

		const embedding = result.data[0].embedding
		const token = result.usage.total_tokens

		return NextResponse.json({
			token,
			embedding
		})
	} catch {
		return NextResponse.json({ message: 'Something went wrong' }, { status: 400 })
	}
}
