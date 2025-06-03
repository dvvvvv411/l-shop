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
      bank_account_transactions: {
        Row: {
          amount: number
          bank_account_id: string
          created_at: string
          id: string
          order_id: string
          transaction_date: string
          updated_at: string
        }
        Insert: {
          amount: number
          bank_account_id: string
          created_at?: string
          id?: string
          order_id: string
          transaction_date?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          bank_account_id?: string
          created_at?: string
          id?: string
          order_id?: string
          transaction_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bank_account_transactions_bank_account_id_fkey"
            columns: ["bank_account_id"]
            isOneToOne: false
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_account_transactions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_accounts: {
        Row: {
          account_holder: string
          bank_name: string
          bic: string
          created_at: string
          daily_limit: number | null
          iban: string
          id: string
          is_default: boolean
          system_name: string
          updated_at: string
        }
        Insert: {
          account_holder: string
          bank_name: string
          bic: string
          created_at?: string
          daily_limit?: number | null
          iban: string
          id?: string
          is_default?: boolean
          system_name: string
          updated_at?: string
        }
        Update: {
          account_holder?: string
          bank_name?: string
          bic?: string
          created_at?: string
          daily_limit?: number | null
          iban?: string
          id?: string
          is_default?: boolean
          system_name?: string
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
      email_configurations: {
        Row: {
          created_at: string
          from_email: string
          from_name: string
          id: string
          is_active: boolean
          order_confirmation_template_id: string | null
          reply_to: string | null
          send_order_confirmation: boolean
          shop_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          from_email: string
          from_name: string
          id?: string
          is_active?: boolean
          order_confirmation_template_id?: string | null
          reply_to?: string | null
          send_order_confirmation?: boolean
          shop_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          from_email?: string
          from_name?: string
          id?: string
          is_active?: boolean
          order_confirmation_template_id?: string | null
          reply_to?: string | null
          send_order_confirmation?: boolean
          shop_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_configurations_order_confirmation_template_id_fkey"
            columns: ["order_confirmation_template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_configurations_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      email_logs: {
        Row: {
          created_at: string
          email_type: string
          error_message: string | null
          id: string
          order_id: string | null
          recipient_email: string
          sent_at: string | null
          status: string
          subject: string
        }
        Insert: {
          created_at?: string
          email_type: string
          error_message?: string | null
          id?: string
          order_id?: string | null
          recipient_email: string
          sent_at?: string | null
          status?: string
          subject: string
        }
        Update: {
          created_at?: string
          email_type?: string
          error_message?: string | null
          id?: string
          order_id?: string | null
          recipient_email?: string
          sent_at?: string | null
          status?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_logs_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          created_at: string
          html_content: string
          id: string
          is_active: boolean
          name: string
          shop_id: string | null
          subject: string
          text_content: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          html_content: string
          id?: string
          is_active?: boolean
          name: string
          shop_id?: string | null
          subject: string
          text_content?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          html_content?: string
          id?: string
          is_active?: boolean
          name?: string
          shop_id?: string | null
          subject?: string
          text_content?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_templates_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_sequences: {
        Row: {
          created_at: string
          id: string
          last_number: number
          updated_at: string
          year: number
        }
        Insert: {
          created_at?: string
          id?: string
          last_number?: number
          updated_at?: string
          year: number
        }
        Update: {
          created_at?: string
          id?: string
          last_number?: number
          updated_at?: string
          year?: number
        }
        Relationships: []
      }
      invoices: {
        Row: {
          created_at: string
          file_name: string | null
          file_url: string | null
          id: string
          invoice_date: string
          invoice_number: string
          order_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          file_name?: string | null
          file_url?: string | null
          id?: string
          invoice_date: string
          invoice_number: string
          order_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          file_name?: string | null
          file_url?: string | null
          id?: string
          invoice_date?: string
          invoice_number?: string
          order_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_email_templates: {
        Row: {
          created_at: string
          html_content: string
          id: string
          is_active: boolean
          smtp_config_id: string | null
          subject: string
          template_type: string
          text_content: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          html_content: string
          id?: string
          is_active?: boolean
          smtp_config_id?: string | null
          subject?: string
          template_type?: string
          text_content?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          html_content?: string
          id?: string
          is_active?: boolean
          smtp_config_id?: string | null
          subject?: string
          template_type?: string
          text_content?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_email_templates_smtp_config_id_fkey"
            columns: ["smtp_config_id"]
            isOneToOne: false
            referencedRelation: "smtp_configurations"
            referencedColumns: ["id"]
          },
        ]
      }
      order_notes: {
        Row: {
          created_at: string
          created_by: string
          id: string
          message: string
          order_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          id?: string
          message: string
          order_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          message?: string
          order_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_order_notes_order_id"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_status_history: {
        Row: {
          changed_by: string
          created_at: string
          id: string
          new_status: string
          notes: string | null
          old_status: string | null
          order_id: string
        }
        Insert: {
          changed_by?: string
          created_at?: string
          id?: string
          new_status: string
          notes?: string | null
          old_status?: string | null
          order_id: string
        }
        Update: {
          changed_by?: string
          created_at?: string
          id?: string
          new_status?: string
          notes?: string | null
          old_status?: string | null
          order_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_order_status_history_order_id"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount: number | null
          bank_account_id: string | null
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
          invoice_date: string | null
          invoice_file_url: string | null
          invoice_number: string | null
          liters: number
          notes: string | null
          order_number: string
          origin_domain: string | null
          payment_method: string | null
          price_per_liter: number
          processed_by: string | null
          product: string | null
          request_id: string | null
          shop_id: string | null
          status: string
          supplier_id: string | null
          total_amount: number
          updated_at: string
          use_same_address: boolean | null
        }
        Insert: {
          amount?: number | null
          bank_account_id?: string | null
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
          invoice_date?: string | null
          invoice_file_url?: string | null
          invoice_number?: string | null
          liters: number
          notes?: string | null
          order_number: string
          origin_domain?: string | null
          payment_method?: string | null
          price_per_liter: number
          processed_by?: string | null
          product?: string | null
          request_id?: string | null
          shop_id?: string | null
          status?: string
          supplier_id?: string | null
          total_amount: number
          updated_at?: string
          use_same_address?: boolean | null
        }
        Update: {
          amount?: number | null
          bank_account_id?: string | null
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
          invoice_date?: string | null
          invoice_file_url?: string | null
          invoice_number?: string | null
          liters?: number
          notes?: string | null
          order_number?: string
          origin_domain?: string | null
          payment_method?: string | null
          price_per_liter?: number
          processed_by?: string | null
          product?: string | null
          request_id?: string | null
          shop_id?: string | null
          status?: string
          supplier_id?: string | null
          total_amount?: number
          updated_at?: string
          use_same_address?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_bank_account_id_fkey"
            columns: ["bank_account_id"]
            isOneToOne: false
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
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
      shop_settings: {
        Row: {
          bank_bic: string | null
          bank_iban: string | null
          bank_name: string | null
          company_address: string
          company_city: string
          company_email: string | null
          company_name: string
          company_phone: string | null
          company_postcode: string
          company_website: string | null
          created_at: string
          id: string
          invoice_footer_text: string | null
          tax_number: string | null
          updated_at: string
          vat_number: string | null
        }
        Insert: {
          bank_bic?: string | null
          bank_iban?: string | null
          bank_name?: string | null
          company_address?: string
          company_city?: string
          company_email?: string | null
          company_name?: string
          company_phone?: string | null
          company_postcode?: string
          company_website?: string | null
          created_at?: string
          id?: string
          invoice_footer_text?: string | null
          tax_number?: string | null
          updated_at?: string
          vat_number?: string | null
        }
        Update: {
          bank_bic?: string | null
          bank_iban?: string | null
          bank_name?: string | null
          company_address?: string
          company_city?: string
          company_email?: string | null
          company_name?: string
          company_phone?: string | null
          company_postcode?: string
          company_website?: string | null
          created_at?: string
          id?: string
          invoice_footer_text?: string | null
          tax_number?: string | null
          updated_at?: string
          vat_number?: string | null
        }
        Relationships: []
      }
      shops: {
        Row: {
          business_owner: string | null
          company_address: string
          company_city: string
          company_email: string | null
          company_name: string
          company_phone: string | null
          company_postcode: string
          company_website: string | null
          court_name: string | null
          created_at: string
          id: string
          is_default: boolean
          name: string
          registration_number: string | null
          updated_at: string
          vat_number: string | null
        }
        Insert: {
          business_owner?: string | null
          company_address: string
          company_city: string
          company_email?: string | null
          company_name: string
          company_phone?: string | null
          company_postcode: string
          company_website?: string | null
          court_name?: string | null
          created_at?: string
          id?: string
          is_default?: boolean
          name: string
          registration_number?: string | null
          updated_at?: string
          vat_number?: string | null
        }
        Update: {
          business_owner?: string | null
          company_address?: string
          company_city?: string
          company_email?: string | null
          company_name?: string
          company_phone?: string | null
          company_postcode?: string
          company_website?: string | null
          court_name?: string | null
          created_at?: string
          id?: string
          is_default?: boolean
          name?: string
          registration_number?: string | null
          updated_at?: string
          vat_number?: string | null
        }
        Relationships: []
      }
      smtp_configurations: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          resend_api_key: string
          sender_email: string
          sender_name: string
          shop_id: string | null
          shop_url: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          resend_api_key: string
          sender_email: string
          sender_name?: string
          shop_id?: string | null
          shop_url: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          resend_api_key?: string
          sender_email?: string
          sender_name?: string
          shop_id?: string | null
          shop_url?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "smtp_configurations_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
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
      check_daily_limit: {
        Args: {
          account_id: string
          transaction_amount: number
          check_date?: string
        }
        Returns: boolean
      }
      generate_invoice_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_daily_bank_account_usage: {
        Args: { account_id: string; check_date?: string }
        Returns: number
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
