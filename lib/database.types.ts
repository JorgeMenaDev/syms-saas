export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      ciudades: {
        Row: {
          created_at: string
          id: string
          nombre: string
          region_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          nombre: string
          region_id: string
        }
        Update: {
          created_at?: string
          id?: string
          nombre?: string
          region_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ciudades_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regiones"
            referencedColumns: ["id"]
          }
        ]
      }
      empresas: {
        Row: {
          ciiu: number
          created_at: string
          direccion: string
          email: string
          id: string
          id_ciudad: string | null
          id_estado_empresa: string | null
          id_industria: string
          id_region: string | null
          nombre: string
          representante_legal: string
          rut: string
          telefono: string
        }
        Insert: {
          ciiu: number
          created_at?: string
          direccion: string
          email: string
          id?: string
          id_ciudad?: string | null
          id_estado_empresa?: string | null
          id_industria: string
          id_region?: string | null
          nombre: string
          representante_legal: string
          rut: string
          telefono: string
        }
        Update: {
          ciiu?: number
          created_at?: string
          direccion?: string
          email?: string
          id?: string
          id_ciudad?: string | null
          id_estado_empresa?: string | null
          id_industria?: string
          id_region?: string | null
          nombre?: string
          representante_legal?: string
          rut?: string
          telefono?: string
        }
        Relationships: [
          {
            foreignKeyName: "empresas_id_ciudad_fkey"
            columns: ["id_ciudad"]
            isOneToOne: false
            referencedRelation: "ciudades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "empresas_id_estado_empresa_fkey"
            columns: ["id_estado_empresa"]
            isOneToOne: false
            referencedRelation: "estadoEmpresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "empresas_id_industria_fkey"
            columns: ["id_industria"]
            isOneToOne: false
            referencedRelation: "industrias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "empresas_id_region_fkey"
            columns: ["id_region"]
            isOneToOne: false
            referencedRelation: "regiones"
            referencedColumns: ["id"]
          }
        ]
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
          id: string
          nombre: string
        }
        Insert: {
          created_at?: string
          id?: string
          nombre: string
        }
        Update: {
          created_at?: string
          id?: string
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
      industrias: {
        Row: {
          created_at: string
          id: string
          nombre: string
        }
        Insert: {
          created_at?: string
          id?: string
          nombre: string
        }
        Update: {
          created_at?: string
          id?: string
          nombre?: string
        }
        Relationships: []
      }
      regiones: {
        Row: {
          created_at: string
          id: string
          nombre: string
        }
        Insert: {
          created_at?: string
          id?: string
          nombre: string
        }
        Update: {
          created_at?: string
          id?: string
          nombre?: string
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
      tiposUsuario: {
        Row: {
          created_at: string
          id: string
          nombre_tipo: string
        }
        Insert: {
          created_at?: string
          id?: string
          nombre_tipo: string
        }
        Update: {
          created_at?: string
          id?: string
          nombre_tipo?: string
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
      usuarios: {
        Row: {
          created_at: string
          email: string
          empresas: string[] | null
          id: string
          imagen: string | null
          tipo_de_usuario: string | null
        }
        Insert: {
          created_at?: string
          email: string
          empresas?: string[] | null
          id: string
          imagen?: string | null
          tipo_de_usuario?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          empresas?: string[] | null
          id?: string
          imagen?: string | null
          tipo_de_usuario?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usuarios_tipo_de_usuario_fkey"
            columns: ["tipo_de_usuario"]
            isOneToOne: false
            referencedRelation: "tiposUsuario"
            referencedColumns: ["id"]
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
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
