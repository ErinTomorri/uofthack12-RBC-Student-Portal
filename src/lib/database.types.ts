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
      transactions: {
        Row: {
          id: string
          user_id: string
          amount: number
          type: 'deposit' | 'withdrawal'
          category: 'salary' | 'shopping' | 'food' | 'transport' | 'entertainment' | 'utilities' | 'other'
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          type: 'deposit' | 'withdrawal'
          category: 'salary' | 'shopping' | 'food' | 'transport' | 'entertainment' | 'utilities' | 'other'
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          type?: 'deposit' | 'withdrawal'
          category?: 'salary' | 'shopping' | 'food' | 'transport' | 'entertainment' | 'utilities' | 'other'
          description?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: 'success' | 'warning' | 'info'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type: 'success' | 'warning' | 'info'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: 'success' | 'warning' | 'info'
          created_at?: string
        }
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
  }
} 