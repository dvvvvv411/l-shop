
-- First, let's see how many orders we're dealing with
SELECT COUNT(*) as order_count, 
       string_agg(order_number, ', ') as order_numbers
FROM public.orders 
WHERE customer_email = 'westfalenamin@gmail.com' 
   OR customer_email_actual = 'westfalenamin@gmail.com';

-- Delete all related data for orders from this email address
-- We need to delete in the correct order due to foreign key constraints

-- Step 1: Delete order notes
DELETE FROM public.order_notes 
WHERE order_id IN (
  SELECT id FROM public.orders 
  WHERE customer_email = 'westfalenamin@gmail.com' 
     OR customer_email_actual = 'westfalenamin@gmail.com'
);

-- Step 2: Delete order status history
DELETE FROM public.order_status_history 
WHERE order_id IN (
  SELECT id FROM public.orders 
  WHERE customer_email = 'westfalenamin@gmail.com' 
     OR customer_email_actual = 'westfalenamin@gmail.com'
);

-- Step 3: Delete email sending logs
DELETE FROM public.email_sending_logs 
WHERE order_id IN (
  SELECT id FROM public.orders 
  WHERE customer_email = 'westfalenamin@gmail.com' 
     OR customer_email_actual = 'westfalenamin@gmail.com'
);

-- Step 4: Delete email logs (if any)
DELETE FROM public.email_logs 
WHERE order_id IN (
  SELECT id FROM public.orders 
  WHERE customer_email = 'westfalenamin@gmail.com' 
     OR customer_email_actual = 'westfalenamin@gmail.com'
);

-- Step 5: Delete bank account transactions
DELETE FROM public.bank_account_transactions 
WHERE order_id IN (
  SELECT id FROM public.orders 
  WHERE customer_email = 'westfalenamin@gmail.com' 
     OR customer_email_actual = 'westfalenamin@gmail.com'
);

-- Step 6: Delete invoices
DELETE FROM public.invoices 
WHERE order_id IN (
  SELECT id FROM public.orders 
  WHERE customer_email = 'westfalenamin@gmail.com' 
     OR customer_email_actual = 'westfalenamin@gmail.com'
);

-- Step 7: Finally delete the orders themselves
DELETE FROM public.orders 
WHERE customer_email = 'westfalenamin@gmail.com' 
   OR customer_email_actual = 'westfalenamin@gmail.com';

-- Show confirmation of deletion
SELECT 'Orders and related data for westfalenamin@gmail.com have been deleted' as result;
