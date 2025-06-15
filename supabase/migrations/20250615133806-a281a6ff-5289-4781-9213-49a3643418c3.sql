
-- Add customer_language column to orders table
ALTER TABLE public.orders 
ADD COLUMN customer_language text DEFAULT 'de';

-- Add a comment to describe the column
COMMENT ON COLUMN public.orders.customer_language IS 'Language preference for the customer (de, en, fr, it, etc.)';
