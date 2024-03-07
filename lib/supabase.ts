type ErrorMessages = Record<string, string>

// Define the dictionary of error messages
export const errorMessages: ErrorMessages = {
	empresas_rut_key: 'El RUT ya existe.',
	establecimientos_id_vu_key: 'El ID VU ya existe.',
	'invalid input syntax for type bigint':
		'El ID VU debe ser un numero. Si el problema persiste, o esto es algo no esperado, contacte a soporte.',
	default: 'Si el problema persiste, contacte a soporte.'
}

// Function to handle errors
export function handleSupabaseError(error: any) {
	if (error) {
		// Check if any error message includes a key from the dictionary
		const matchingKey = Object.keys(errorMessages).find(key => error.message.includes(key))
		const errorMessage = matchingKey ? errorMessages[matchingKey] : errorMessages.default

		return { error: errorMessage }
	}

	// If there is no error, return null
	return { error: null }
}
