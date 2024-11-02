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
      active_podcaster_sessions: {
        Row: {
          created_at: string
          id: number
          podcaster_id: number | null
          token: string
          updated_at: string
        }
        Insert: {
          created_at: string
          id?: number
          podcaster_id?: number | null
          token: string
          updated_at: string
        }
        Update: {
          created_at?: string
          id?: number
          podcaster_id?: number | null
          token?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "active_podcaster_sessions_podcaster_id_fkey"
            columns: ["podcaster_id"]
            isOneToOne: false
            referencedRelation: "podcasters"
            referencedColumns: ["id"]
          },
        ]
      }
      active_user_sessions: {
        Row: {
          created_at: string
          id: number
          token: string
          updated_at: string
          user_id: number | null
        }
        Insert: {
          created_at: string
          id?: number
          token: string
          updated_at: string
          user_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          token?: string
          updated_at?: string
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "active_user_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      followings: {
        Row: {
          id: number
          podcast_id: number
          starred: boolean
          user_id: number
        }
        Insert: {
          id?: number
          podcast_id: number
          starred?: boolean
          user_id: number
        }
        Update: {
          id?: number
          podcast_id?: number
          starred?: boolean
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "followings_podcast_id_fkey"
            columns: ["podcast_id"]
            isOneToOne: false
            referencedRelation: "podcasts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "followings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      migrations: {
        Row: {
          name: string
        }
        Insert: {
          name: string
        }
        Update: {
          name?: string
        }
        Relationships: []
      }
      podcasters: {
        Row: {
          created_at: string
          disabled: boolean | null
          id: number
          name: string
          password: string
          premium: boolean | null
          subscriptioncount: number
          updated_at: string
          username: string
          verified: boolean | null
        }
        Insert: {
          created_at: string
          disabled?: boolean | null
          id?: number
          name: string
          password: string
          premium?: boolean | null
          subscriptioncount?: number
          updated_at: string
          username: string
          verified?: boolean | null
        }
        Update: {
          created_at?: string
          disabled?: boolean | null
          id?: number
          name?: string
          password?: string
          premium?: boolean | null
          subscriptioncount?: number
          updated_at?: string
          username?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      podcasts: {
        Row: {
          created_at: string
          description: string | null
          followcount: number
          id: number
          name: string
          podcaster_id: number | null
          slug: string
          transcribed: boolean
          updated_at: string
          urls: string[]
        }
        Insert: {
          created_at: string
          description?: string | null
          followcount?: number
          id?: number
          name: string
          podcaster_id?: number | null
          slug: string
          transcribed?: boolean
          updated_at: string
          urls: string[]
        }
        Update: {
          created_at?: string
          description?: string | null
          followcount?: number
          id?: number
          name?: string
          podcaster_id?: number | null
          slug?: string
          transcribed?: boolean
          updated_at?: string
          urls?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "podcasts_podcaster_id_fkey"
            columns: ["podcaster_id"]
            isOneToOne: false
            referencedRelation: "podcasters"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          id: number
          paid: boolean
          podcaster_id: number
          user_id: number
        }
        Insert: {
          id?: number
          paid?: boolean
          podcaster_id: number
          user_id: number
        }
        Update: {
          id?: number
          paid?: boolean
          podcaster_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_podcaster_id_fkey"
            columns: ["podcaster_id"]
            isOneToOne: false
            referencedRelation: "podcasters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          disabled: boolean | null
          id: number
          name: string
          password: string
          podcast_id: number | null
          podcaster_id: number | null
          role: Database["public"]["Enums"]["enum_users_role"]
          updated_at: string
          username: string
          verified: boolean | null
        }
        Insert: {
          created_at: string
          disabled?: boolean | null
          id?: number
          name: string
          password: string
          podcast_id?: number | null
          podcaster_id?: number | null
          role?: Database["public"]["Enums"]["enum_users_role"]
          updated_at: string
          username: string
          verified?: boolean | null
        }
        Update: {
          created_at?: string
          disabled?: boolean | null
          id?: number
          name?: string
          password?: string
          podcast_id?: number | null
          podcaster_id?: number | null
          role?: Database["public"]["Enums"]["enum_users_role"]
          updated_at?: string
          username?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "users_podcast_id_fkey"
            columns: ["podcast_id"]
            isOneToOne: false
            referencedRelation: "podcasts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_podcaster_id_fkey"
            columns: ["podcaster_id"]
            isOneToOne: false
            referencedRelation: "podcasters"
            referencedColumns: ["id"]
          },
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
      enum_users_role: "admin" | "user" | "superuser"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
