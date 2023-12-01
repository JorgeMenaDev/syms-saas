export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Empresas = Database['public']['Tables']['empresas']['Row']

export interface Database {
	public: {
		Tables: {
			ciudades: {
				Row: {
					created_at: string
					id: number
					nombre: string
				}
				Insert: {
					created_at?: string
					id?: number
					nombre: string
				}
				Update: {
					created_at?: string
					id?: number
					nombre?: string
				}
				Relationships: []
			}
			empresas: {
				Row: {
					ciiu: number | null
					created_at: string
					direccion: string | null
					email: string | null
					id: number
					idCiudad: number | null
					idEstado: number | null
					idIndustria: number | null
					idRegion: number | null
					nombre: string
					representanteLegal: string | null
					rut: string
					telefono: string | null
				}
				Insert: {
					ciiu?: number | null
					created_at?: string
					direccion?: string | null
					email?: string | null
					id?: number
					idCiudad?: number | null
					idEstado?: number | null
					idIndustria?: number | null
					idRegion?: number | null
					nombre: string
					representanteLegal?: string | null
					rut: string
					telefono?: string | null
				}
				Update: {
					ciiu?: number | null
					created_at?: string
					direccion?: string | null
					email?: string | null
					id?: number
					idCiudad?: number | null
					idEstado?: number | null
					idIndustria?: number | null
					idRegion?: number | null
					nombre?: string
					representanteLegal?: string | null
					rut?: string
					telefono?: string | null
				}
				Relationships: []
			}
			establecimientos: {
				Row: {
					created_at: string
					direccion: string | null
					email: string | null
					id: number
					idCiudad: number | null
					idComuna: number | null
					idEncargado: number | null
					idRegion: number | null
					idTipoEstablecimiento: number | null
					nombre: string
					nopel: boolean | null
					respel: boolean | null
					telefono: string | null
				}
				Insert: {
					created_at?: string
					direccion?: string | null
					email?: string | null
					id?: number
					idCiudad?: number | null
					idComuna?: number | null
					idEncargado?: number | null
					idRegion?: number | null
					idTipoEstablecimiento?: number | null
					nombre: string
					nopel?: boolean | null
					respel?: boolean | null
					telefono?: string | null
				}
				Update: {
					created_at?: string
					direccion?: string | null
					email?: string | null
					id?: number
					idCiudad?: number | null
					idComuna?: number | null
					idEncargado?: number | null
					idRegion?: number | null
					idTipoEstablecimiento?: number | null
					nombre?: string
					nopel?: boolean | null
					respel?: boolean | null
					telefono?: string | null
				}
				Relationships: []
			}
			estadoEmpresas: {
				Row: {
					created_at: string
					id: number
					nombre: string
				}
				Insert: {
					created_at?: string
					id?: number
					nombre: string
				}
				Update: {
					created_at?: string
					id?: number
					nombre?: string
				}
				Relationships: []
			}
			estadoTransportistas: {
				Row: {
					created_at: string
					id: number
					nombre: string
				}
				Insert: {
					created_at?: string
					id?: number
					nombre: string
				}
				Update: {
					created_at?: string
					id?: number
					nombre?: string
				}
				Relationships: []
			}
			regiones: {
				Row: {
					created_at: string
					id: number
					nombre: string | null
				}
				Insert: {
					created_at?: string
					id?: number
					nombre?: string | null
				}
				Update: {
					created_at?: string
					id?: number
					nombre?: string | null
				}
				Relationships: []
			}
			tipoEstablecimientos: {
				Row: {
					created_at: string
					id: number
					nombre: string | null
				}
				Insert: {
					created_at?: string
					id?: number
					nombre?: string | null
				}
				Update: {
					created_at?: string
					id?: number
					nombre?: string | null
				}
				Relationships: []
			}
			transportistas: {
				Row: {
					autorizacion: number | null
					cantCamiones: number | null
					created_at: string
					direccion: string | null
					id: number
					idCiudad: number | null
					idComuna: number | null
					idEstado: number | null
					idRegion: number | null
					nombre: string
					representateLegal: string | null
					rut: string
				}
				Insert: {
					autorizacion?: number | null
					cantCamiones?: number | null
					created_at?: string
					direccion?: string | null
					id?: number
					idCiudad?: number | null
					idComuna?: number | null
					idEstado?: number | null
					idRegion?: number | null
					nombre: string
					representateLegal?: string | null
					rut: string
				}
				Update: {
					autorizacion?: number | null
					cantCamiones?: number | null
					created_at?: string
					direccion?: string | null
					id?: number
					idCiudad?: number | null
					idComuna?: number | null
					idEstado?: number | null
					idRegion?: number | null
					nombre?: string
					representateLegal?: string | null
					rut?: string
				}
				Relationships: []
			}
			users: {
				Row: {
					created_at: string
					id: string
					isAdmin: boolean
				}
				Insert: {
					created_at?: string
					id: string
					isAdmin?: boolean
				}
				Update: {
					created_at?: string
					id?: string
					isAdmin?: boolean
				}
				Relationships: [
					{
						foreignKeyName: 'users_id_fkey'
						columns: ['id']
						isOneToOne: true
						referencedRelation: 'users'
						referencedColumns: ['id']
					}
				]
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (Database['public']['Tables'] & Database['public']['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R
	  }
		? R
		: never
	: PublicTableNameOrOptions extends keyof (Database['public']['Tables'] & Database['public']['Views'])
	? (Database['public']['Tables'] & Database['public']['Views'])[PublicTableNameOrOptions] extends {
			Row: infer R
	  }
		? R
		: never
	: never

export type TablesInsert<
	PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I
	  }
		? I
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
	? Database['public']['Tables'][PublicTableNameOrOptions] extends {
			Insert: infer I
	  }
		? I
		: never
	: never

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U
	  }
		? U
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
	? Database['public']['Tables'][PublicTableNameOrOptions] extends {
			Update: infer U
	  }
		? U
		: never
	: never

export type Enums<
	PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof Database['public']['Enums']
	? Database['public']['Enums'][PublicEnumNameOrOptions]
	: never
