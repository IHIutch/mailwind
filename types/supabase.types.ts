export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
      }
      Block: {
        Row: {
          attributes: Json | null
          createdAt: string
          deletedAt: string | null
          id: number
          position: number
          templateId: number
          type: string
          updatedAt: string
          value: string | null
        }
        Insert: {
          attributes?: Json | null
          createdAt?: string
          deletedAt?: string | null
          id?: number
          position: number
          templateId: number
          type: string
          updatedAt?: string
          value?: string | null
        }
        Update: {
          attributes?: Json | null
          createdAt?: string
          deletedAt?: string | null
          id?: number
          position?: number
          templateId?: number
          type?: string
          updatedAt?: string
          value?: string | null
        }
      }
      Membership: {
        Row: {
          createdAt: string
          deletedAt: string | null
          id: number
          organizationId: number
          role: Database['public']['Enums']['MembershipRole']
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          deletedAt?: string | null
          id?: number
          organizationId: number
          role: Database['public']['Enums']['MembershipRole']
          updatedAt?: string
          userId: string
        }
        Update: {
          createdAt?: string
          deletedAt?: string | null
          id?: number
          organizationId?: number
          role?: Database['public']['Enums']['MembershipRole']
          updatedAt?: string
          userId?: string
        }
      }
      Organization: {
        Row: {
          createdAt: string
          deletedAt: string | null
          id: number
          name: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          deletedAt?: string | null
          id?: number
          name: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          deletedAt?: string | null
          id?: number
          name?: string
          updatedAt?: string
        }
      }
      Template: {
        Row: {
          createdAt: string
          deletedAt: string | null
          id: number
          membershipId: number
          organizationId: number | null
          title: string | null
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          deletedAt?: string | null
          id?: number
          membershipId: number
          organizationId?: number | null
          title?: string | null
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          deletedAt?: string | null
          id?: number
          membershipId?: number
          organizationId?: number | null
          title?: string | null
          updatedAt?: string
        }
      }
      User: {
        Row: {
          createdAt: string
          deletedAt: string | null
          id: string
          role: Database['public']['Enums']['GlobalRole']
          stripeCustomerId: string | null
          stripeSubscriptionId: string | null
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          deletedAt?: string | null
          id: string
          role: Database['public']['Enums']['GlobalRole']
          stripeCustomerId?: string | null
          stripeSubscriptionId?: string | null
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          deletedAt?: string | null
          id?: string
          role?: Database['public']['Enums']['GlobalRole']
          stripeCustomerId?: string | null
          stripeSubscriptionId?: string | null
          updatedAt?: string
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
      GlobalRole: 'SUPERADMIN' | 'CUSTOMER'
      MembershipRole: 'OWNER' | 'ADMIN' | 'USER'
    }
  }
}
