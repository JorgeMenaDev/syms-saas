'use client'
import { Input } from '@/components/ui/input'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useRef, useState } from 'react'

import { stripIndent, oneLine } from 'common-tags'
export default function Search() {
	const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>

	const [questions, setQuestion] = useState<string[]>([])
	const [answers, setAnswer] = useState<string[]>([])
	const [loading, setLoading] = useState(false)

	const supabase = createClientComponentClient()

	const toastError = (message = 'Something went wrong') => {
		// toast({
		// 	title: 'Fail to create embedding',
		// 	description: message
		// })
		// TODO: add toast
	}

	const handleSearch = async () => {
		setLoading(true)
		const searchText = inputRef.current.value

		if (searchText?.trim()) {
			setQuestion(currentQuestion => [...currentQuestion, searchText])

			const res = await fetch(location.origin + '/embedding', {
				method: 'POST',
				body: JSON.stringify({ text: searchText.replace(/\n/g, ' ') })
			})

			if (res.status !== 200) {
				toastError()
			} else {
				const data = await res.json()

				const { data: documents } = await supabase.rpc('match_documents', {
					query_embedding: data.embedding,
					match_threshold: 0.8,
					match_count: 10
				})

				let tokenCount = 0
				let contextText = ''
				for (let i = 0; i < documents.length; i++) {
					const document = documents[i]
					const content = document.content
					tokenCount += document.token

					if (tokenCount > 1500) {
						break
					}
					contextText += `${content.trim()}\n--\n`
				}
				if (contextText) {
					const prompt = generatePrompt(contextText, searchText)
					await generateAnswer(prompt)
				} else {
					setAnswer(currentAnswer => [
						...currentAnswer,
						'Sorry there is no context related to this question. Please ask something about Sokheng'
					])
				}
			}
		}
		inputRef.current.value = ''
		setLoading(false)
	}

	const generateAnswer = async (prompt: string) => {
		const res = await fetch(location.origin + '/chat', {
			method: 'POST',
			body: JSON.stringify({ prompt })
		})
		if (res.status !== 200) {
			toastError()
		} else {
			const data = await res.json()
			setAnswer(currentAnswer => [...currentAnswer, data.choices[0].text])
		}
	}

	const generatePrompt = (contextText: string, searchText: string) => {
		const prompt = stripIndent`${oneLine`
    You are a very enthusiastic DailyAI representative who loves
    to help people! Given the following sections from the DailyAI
    documentation, answer the question using only that information,
    outputted in markdown format. If you are unsure and the answer
    is not explicitly written in the documentation, say
    "Sorry, I don't know how to help with that."`}

    Context sections:
    ${contextText}

    Question: """
    ${searchText}
    """

    Answer as markdown (including related code snippets if available):
  `
		return prompt
	}

	return (
		<>
			<div className='flex-1 h-80vh overflow-y-auto space-y-10'>
				<div className='flex items-center justify-between border-b pb-3'>
					<div className='flex items-center gap-2'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='icon icon-tabler icon-tabler-robot'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							strokeWidth='2'
							stroke='currentColor'
							fill='none'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path stroke='none' d='M0 0h24v24H0z' fill='none' />
							<path d='M6 4m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z' />
							<path d='M12 2v2' />
							<path d='M9 12v9' />
							<path d='M15 12v9' />
							<path d='M5 16l4 -2' />
							<path d='M15 14l4 2' />
							<path d='M9 18h6' />
							<path d='M10 8v.01' />
							<path d='M14 8v.01' />
						</svg>
						<h1>Chatea con AI </h1>
					</div>
					<p className='text-sm text-gray-500'>Aqui podras hacer preguntas sobre el sistema.</p>
				</div>
				{questions.map((question, index) => {
					const answer = answers[index]

					const isLoading = loading && !answer

					return (
						<div className='space-y-3' key={index}>
							<div className='flex items-center gap-2 text-indigo-500'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='icon icon-tabler icon-tabler-user-question'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									strokeWidth='2'
									stroke='currentColor'
									fill='none'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path stroke='none' d='M0 0h24v24H0z' fill='none' />
									<path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' />
									<path d='M6 21v-2a4 4 0 0 1 4 -4h3.5' />
									<path d='M19 22v.01' />
									<path d='M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483' />
								</svg>
								<h1>{question}</h1>
							</div>
							{isLoading ? <h1>Loading...</h1> : <p>{answer}</p>}
						</div>
					)
				})}
			</div>
			<Input
				ref={inputRef}
				placeholder='Escribe tu pregunta aqui'
				className='p-5'
				onKeyDown={e => {
					if (e.key === 'Enter') {
						void handleSearch()
					}
				}}
			/>
		</>
	)
}
