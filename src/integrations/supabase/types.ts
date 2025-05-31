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
      bank_accounts: {
        Row: {
          account_holder: string
          bank_name: string
          bic: string
          created_at: string
          iban: string
          id: string
          is_default: boolean
          updated_at: string
        }
        Insert: {
          account_holder: string
          bank_name: string
          bic: string
          created_at?: string
          iban: string
          id?: string
          is_default?: boolean
          updated_at?: string
        }
        Update: {
          account_holder?: string
          bank_name?: string
          bic?: string
          created_at?: string
          iban?: string
          id?: string
          is_default?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: string
          created_at: string
          email: string
          id: string
          last_order_date: string | null
          name: string
          phone: string | null
          total_orders: number
          total_spent: number
          updated_at: string
        }
        Insert: {
          address: string
          created_at?: string
          email: string
          id?: string
          last_order_date?: string | null
          name: string
          phone?: string | null
          total_orders?: number
          total_spent?: number
          updated_at?: string
        }
        Update: {
          address?: string
          created_at?: string
          email?: string
          id?: string
          last_order_date?: string | null
          name?: string
          phone?: string | null
          total_orders?: number
          total_spent?: number
          updated_at?: string
        }
        Relationships: []
      }
      dashboard_stats: {
        Row: {
          conversion_rate: number
          created_at: string
          date: string
          id: string
          new_customers: number
          total_liters: number
          total_orders: number
          total_revenue: number
          updated_at: string
        }
        Insert: {
          conversion_rate?: number
          created_at?: string
          date?: string
          id?: string
          new_customers?: number
          total_liters?: number
          total_orders?: number
          total_revenue?: number
          updated_at?: string
        }
        Update: {
          conversion_rate?: number
          created_at?: string
          date?: string
          id?: string
          new_customers?: number
          total_liters?: number
          total_orders?: number
          total_revenue?: number
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          amount: number | null
          base_price: number | null
          billing_city: string | null
          billing_first_name: string | null
          billing_last_name: string | null
          billing_postcode: string | null
          billing_street: string | null
          created_at: string
          customer_address: string
          customer_email: string
          customer_name: string
          customer_phone: string | null
          delivery_city: string | null
          delivery_date: string | null
          delivery_date_display: string | null
          delivery_fee: number | null
          delivery_first_name: string | null
          delivery_last_name: string | null
          delivery_phone: string | null
          delivery_postcode: string | null
          delivery_street: string | null
          discount: number | null
          id: string
          liters: number
          notes: string | null
          order_number: string
          payment_method: string | null
          price_per_liter: number
          product: string | null
          request_id: string | null
          status: string
          supplier_id: string | null
          total_amount: number
          updated_at: string
          use_same_address: boolean | null
        }
        Insert: {
          amount?: number | null
          base_price?: number | null
          billing_city?: string | null
          billing_first_name?: string | null
          billing_last_name?: string | null
          billing_postcode?: string | null
          billing_street?: string | null
          created_at?: string
          customer_address: string
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          delivery_city?: string | null
          delivery_date?: string | null
          delivery_date_display?: string | null
          delivery_fee?: number | null
          delivery_first_name?: string | null
          delivery_last_name?: string | null
          delivery_phone?: string | null
          delivery_postcode?: string | null
          delivery_street?: string | null
          discount?: number | null
          id?: string
          liters: number
          notes?: string | null
          order_number: string
          payment_method?: string | null
          price_per_liter: number
          product?: string | null
          request_id?: string | null
          status?: string
          supplier_id?: string | null
          total_amount: number
          updated_at?: string
          use_same_address?: boolean | null
        }
        Update: {
          amount?: number | null
          base_price?: number | null
          billing_city?: string | null
          billing_first_name?: string | null
          billing_last_name?: string | null
          billing_postcode?: string | null
          billing_street?: string | null
          created_at?: string
          customer_address?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          delivery_city?: string | null
          delivery_date?: string | null
          delivery_date_display?: string | null
          delivery_fee?: number | null
          delivery_first_name?: string | null
          delivery_last_name?: string | null
          delivery_phone?: string | null
          delivery_postcode?: string | null
          delivery_street?: string | null
          discount?: number | null
          id?: string
          liters?: number
          notes?: string | null
          order_number?: string
          payment_method?: string | null
          price_per_liter?: number
          product?: string | null
          request_id?: string | null
          status?: string
          supplier_id?: string | null
          total_amount?: number
          updated_at?: string
          use_same_address?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      postcode_bundesland: {
        Row: {
          bundesland: string
          created_at: string
          id: string
          postcode_range_end: string
          postcode_range_start: string
        }
        Insert: {
          bundesland: string
          created_at?: string
          id?: string
          postcode_range_end: string
          postcode_range_start: string
        }
        Update: {
          bundesland?: string
          created_at?: string
          id?: string
          postcode_range_end?: string
          postcode_range_start?: string
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          address: string | null
          bundesland: string
          contact_person: string | null
          created_at: string
          email: string | null
          id: string
          is_active: boolean
          name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          bundesland: string
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean
          name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          bundesland?: string
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean
          name?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_supplier_by_postcode: {
        Args: { input_postcode: string }
        Returns: {
          supplier_id: string
          supplier_name: string
          contact_person: string
          email: string
          phone: string
          address: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
