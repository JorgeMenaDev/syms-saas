export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      camiones: {
        Row: {
          año_camion: string
          año_resolucion: string
          autoridad: string
          autoriza: string | null
          camion: string
          capacidad_carga: string
          comentario: string | null
          correo: string
          created_at: string
          documento: string
          estado: boolean
          id: string
          modelo: string
          patente: string
          representante_legal: string
          resolucion: string
          rut: string
          telefono: string
          vigencia: string
        }
        Insert: {
          año_camion: string
          año_resolucion: string
          autoridad: string
          autoriza?: string | null
          camion: string
          capacidad_carga: string
          comentario?: string | null
          correo: string
          created_at?: string
          documento: string
          estado: boolean
          id?: string
          modelo: string
          patente: string
          representante_legal: string
          resolucion: string
          rut: string
          telefono: string
          vigencia: string
        }
        Update: {
          año_camion?: string
          año_resolucion?: string
          autoridad?: string
          autoriza?: string | null
          camion?: string
          capacidad_carga?: string
          comentario?: string | null
          correo?: string
          created_at?: string
          documento?: string
          estado?: boolean
          id?: string
          modelo?: string
          patente?: string
          representante_legal?: string
          resolucion?: string
          rut?: string
          telefono?: string
          vigencia?: string
        }
        Relationships: []
      }
      ciius: {
        Row: {
          codigo: number
          created_at: string
          id: string
          nombre: string
        }
        Insert: {
          codigo: number
          created_at?: string
          id?: string
          nombre: string
        }
        Update: {
          codigo?: number
          created_at?: string
          id?: string
          nombre?: string
        }
        Relationships: []
      }
      ciudades: {
        Row: {
          id: number
          id_pais: number
          id_region: number
          nombre: string
        }
        Insert: {
          id?: number
          id_pais: number
          id_region: number
          nombre: string
        }
        Update: {
          id?: number
          id_pais?: number
          id_region?: number
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "ciudades_id_pais_fkey"
            columns: ["id_pais"]
            isOneToOne: false
            referencedRelation: "paises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ciudades_id_region_fkey"
            columns: ["id_region"]
            isOneToOne: false
            referencedRelation: "regiones"
            referencedColumns: ["id"]
          }
        ]
      }
      documents: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          token: number | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          token?: number | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          token?: number | null
        }
        Relationships: []
      }
      empresas: {
        Row: {
          ciiu_id: string
          ciudad_id: number
          correo: string
          created_at: string
          direccion: string
          establecimientos: string[] | null
          estado: boolean
          id: string
          industria: string
          nombre: string
          region_id: number
          representante_legal: string
          rut: string
          telefono: string
        }
        Insert: {
          ciiu_id: string
          ciudad_id: number
          correo: string
          created_at?: string
          direccion: string
          establecimientos?: string[] | null
          estado: boolean
          id?: string
          industria: string
          nombre: string
          region_id: number
          representante_legal: string
          rut: string
          telefono: string
        }
        Update: {
          ciiu_id?: string
          ciudad_id?: number
          correo?: string
          created_at?: string
          direccion?: string
          establecimientos?: string[] | null
          estado?: boolean
          id?: string
          industria?: string
          nombre?: string
          region_id?: number
          representante_legal?: string
          rut?: string
          telefono?: string
        }
        Relationships: [
          {
            foreignKeyName: "empresas_ciiu_id_fkey"
            columns: ["ciiu_id"]
            isOneToOne: false
            referencedRelation: "ciius"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "empresas_ciudad_id_fkey"
            columns: ["ciudad_id"]
            isOneToOne: false
            referencedRelation: "ciudades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "empresas_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regiones"
            referencedColumns: ["id"]
          }
        ]
      }
      establecimientos: {
        Row: {
          ciudad_id: number
          codigo_interno: string | null
          correo: string
          created_at: string
          direccion: string
          empresa_id: string | null
          encargado: string
          id: string
          id_vu: number
          nombre: string
          nopel: boolean
          region_id: number
          respel: boolean
          telefono: string
          tipo_establecimiento_id: string
          usuarios: string[] | null
        }
        Insert: {
          ciudad_id: number
          codigo_interno?: string | null
          correo: string
          created_at?: string
          direccion: string
          empresa_id?: string | null
          encargado: string
          id?: string
          id_vu: number
          nombre: string
          nopel: boolean
          region_id: number
          respel: boolean
          telefono: string
          tipo_establecimiento_id: string
          usuarios?: string[] | null
        }
        Update: {
          ciudad_id?: number
          codigo_interno?: string | null
          correo?: string
          created_at?: string
          direccion?: string
          empresa_id?: string | null
          encargado?: string
          id?: string
          id_vu?: number
          nombre?: string
          nopel?: boolean
          region_id?: number
          respel?: boolean
          telefono?: string
          tipo_establecimiento_id?: string
          usuarios?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "establecimientos_ciudad_id_fkey"
            columns: ["ciudad_id"]
            isOneToOne: false
            referencedRelation: "ciudades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "establecimientos_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regiones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "establecimientos_tipo_establecimiento_id_fkey"
            columns: ["tipo_establecimiento_id"]
            isOneToOne: false
            referencedRelation: "tipoEstablecimientos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_establecimientos_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          }
        ]
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
      nopel: {
        Row: {
          codigo_ler_id: string | null
          created_at: string
          id: string
          nombre_especifico: string
          nombre_general: string
          tipo_establecimiento_id: string
          tipo_residuo_id: string | null
        }
        Insert: {
          codigo_ler_id?: string | null
          created_at?: string
          id?: string
          nombre_especifico: string
          nombre_general: string
          tipo_establecimiento_id: string
          tipo_residuo_id?: string | null
        }
        Update: {
          codigo_ler_id?: string | null
          created_at?: string
          id?: string
          nombre_especifico?: string
          nombre_general?: string
          tipo_establecimiento_id?: string
          tipo_residuo_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nopel_tipo_establecimiento_id_fkey"
            columns: ["tipo_establecimiento_id"]
            isOneToOne: false
            referencedRelation: "tipoEstablecimientos"
            referencedColumns: ["id"]
          }
        ]
      }
      paises: {
        Row: {
          id: number
          nombre: string | null
        }
        Insert: {
          id?: number
          nombre?: string | null
        }
        Update: {
          id?: number
          nombre?: string | null
        }
        Relationships: []
      }
      regiones: {
        Row: {
          id: number
          id_pais: number
          nombre: string
        }
        Insert: {
          id?: number
          id_pais: number
          nombre: string
        }
        Update: {
          id?: number
          id_pais?: number
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "regiones_id_pais_fkey"
            columns: ["id_pais"]
            isOneToOne: false
            referencedRelation: "paises"
            referencedColumns: ["id"]
          }
        ]
      }
      tipoEstablecimientos: {
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
      tipoResiduos: {
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
          camiones: string[] | null
          ciudad_id: number
          created_at: string
          direccion: string
          estado: boolean
          id: string
          razon_social: string
          region_id: number
          representante_legal: string
          rut: string
        }
        Insert: {
          autorizacion?: number | null
          camiones?: string[] | null
          ciudad_id: number
          created_at?: string
          direccion: string
          estado: boolean
          id?: string
          razon_social: string
          region_id: number
          representante_legal: string
          rut: string
        }
        Update: {
          autorizacion?: number | null
          camiones?: string[] | null
          ciudad_id?: number
          created_at?: string
          direccion?: string
          estado?: boolean
          id?: string
          razon_social?: string
          region_id?: number
          representante_legal?: string
          rut?: string
        }
        Relationships: [
          {
            foreignKeyName: "transportistas_ciudad_id_fkey"
            columns: ["ciudad_id"]
            isOneToOne: false
            referencedRelation: "ciudades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transportistas_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regiones"
            referencedColumns: ["id"]
          }
        ]
      }
      usuarios: {
        Row: {
          accion: boolean
          activo: boolean
          created_at: string
          email: string
          empresas: string[] | null
          establecimientos: string[] | null
          id: string
          imagen: string | null
          nombre: string | null
          telefono: string | null
          tipo_de_usuario_id: string
        }
        Insert: {
          accion?: boolean
          activo?: boolean
          created_at?: string
          email: string
          empresas?: string[] | null
          establecimientos?: string[] | null
          id: string
          imagen?: string | null
          nombre?: string | null
          telefono?: string | null
          tipo_de_usuario_id: string
        }
        Update: {
          accion?: boolean
          activo?: boolean
          created_at?: string
          email?: string
          empresas?: string[] | null
          establecimientos?: string[] | null
          id?: string
          imagen?: string | null
          nombre?: string | null
          telefono?: string | null
          tipo_de_usuario_id?: string
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
            foreignKeyName: "usuarios_tipo_de_usuario_id_fkey"
            columns: ["tipo_de_usuario_id"]
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
