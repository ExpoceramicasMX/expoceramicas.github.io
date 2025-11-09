/**
 * Supabase Database Types for Nuxt 3
 *
 * Purpose
 * - Provide a clean, extensible TypeScript schema for Supabase.
 * - Compatible with @nuxtjs/supabase and plain supabase-js.
 * - Allows adding your own tables, views, functions, and enums safely.
 *
 * Usage
 * - Import `Database` in your code and type your client:
 *   const client = useSupabaseClient<Database>() // with @nuxtjs/supabase
 *   // or: const client = createClient<Database>(url, key)
 *
 * How to add new tables
 * - Under `Database['public']['Tables']`, define a key for your table
 *   using `TableDefinition<Row, Insert, Update, Relationships>`.
 * - `Row` represents a row returned from SELECT.
 * - `Insert` represents minimal fields required for INSERT.
 * - `Update` represents fields allowed for UPDATE (all optional).
 * - `Relationships` (optional) describes foreign keys.
 *
 * Example (uncomment and adapt):
 *
 * export type Database = {
 *   public: {
 *     Tables: {
 *       products: TableDefinition<
 *         {
 *           id: number
 *           title: string
 *           price: number
 *           stock: number | null
 *           image: string | null
 *           description: string | null
 *           created_at: string
 *         },
 *         {
 *           title: string
 *           price: number
 *           stock?: number | null
 *           image?: string | null
 *           description?: string | null
 *         },
 *         {
 *           title?: string
 *           price?: number
 *           stock?: number | null
 *           image?: string | null
 *           description?: string | null
 *         },
 *         [
 *           Relationship<'products_brand_id_fkey', ['brand_id'], false, 'brands', ['id']>
 *         ]
 *       >
 *     },
 *     Views: {
 *       // Example view with only Row shape
 *       products_summary: ViewDefinition<{
 *         id: number
 *         title: string
 *         total_sales: number
 *       }>
 *     },
 *     Functions: {
 *       // Example function signature
 *       calculate_tax: FunctionDefinition<{ amount: number }, { tax: number }>
 *     },
 *     Enums: {
 *       order_status: 'pending' | 'paid' | 'shipped' | 'cancelled'
 *     }
 *   }
 * }
 */

// Basic JSON type used by Supabase function signatures
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Relationship descriptor (matches supabase-codegen shape)
export type Relationship<
  ForeignKeyName extends string,
  Columns extends readonly string[],
  IsOneToOne extends boolean,
  ReferencedRelation extends string,
  ReferencedColumns extends readonly string[]
> = {
  foreignKeyName: ForeignKeyName
  columns: Columns
  isOneToOne: IsOneToOne
  referencedRelation: ReferencedRelation
  referencedColumns: ReferencedColumns
}

// Generic table definition
export type TableDefinition<Row, Insert, Update, Relationships extends ReadonlyArray<unknown> = []> = {
  Row: Row
  Insert: Insert
  Update: Update
  Relationships: Relationships
}

// Generic view definition (views usually have only `Row`)
export type ViewDefinition<Row> = {
  Row: Row
}

// Generic function definition (Postgres RPC)
export type FunctionDefinition<Args extends Record<string, unknown> | null, Returns> = {
  Args: Args
  Returns: Returns
}

/**
 * Main Database schema
 * - Start with only the `public` schema.
 * - Add additional schemas (e.g., `storage`) as needed.
 */
export type Database = {
  public: {
    Tables: {
      // Add your tables here using `TableDefinition<...>` as in the example above
    }
    Views: {
      // Add your views here using `ViewDefinition<...>`
    }
    Functions: {
      // Add your functions here using `FunctionDefinition<Args, Returns>`
    }
    Enums: {
      // Add your enums here as string unions, e.g.:
      // user_role: 'admin' | 'editor' | 'customer'
    }
    // CompositeTypes (optional): { ... }
  }
}

/**
 * Reusable helpers for stronger typing in queries
 *
 * Usage:
 *   type ProductRow = Tables<'products'>
 *   type ProductInsert = TablesInsert<'products'>
 *   type ProductUpdate = TablesUpdate<'products'>
 */
export type SchemaName = keyof Database

export type TablesSchema<S extends SchemaName> = Database[S]['Tables']
export type ViewsSchema<S extends SchemaName> = Database[S]['Views']

export type TableNames<S extends SchemaName> = keyof TablesSchema<S> & string
export type ViewNames<S extends SchemaName> = keyof ViewsSchema<S> & string

// Direct helpers for the `public` schema
export type PublicTableNames = TableNames<'public'>
export type PublicViewNames = ViewNames<'public'>

// Row / Insert / Update helpers
export type Tables<T extends PublicTableNames> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends PublicTableNames> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends PublicTableNames> = Database['public']['Tables'][T]['Update']

// View row helper
export type Views<T extends PublicViewNames> = Database['public']['Views'][T]['Row']

/**
 * Tips
 * - Keep server-generated columns (e.g., `id`, `created_at`) out of `Insert`
 *   unless they are explicitly required.
 * - Mark nullable fields as `type | null` in `Row`.
 * - In `Update`, make all fields optional and preserve nullability.
 * - For Functions, prefer explicit `Args` objects and precise `Returns` shapes.
 */