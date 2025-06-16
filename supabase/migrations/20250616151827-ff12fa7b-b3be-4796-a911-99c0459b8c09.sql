
-- First, let's see how many orders we're dealing with for this email
SELECT COUNT(*) as order_count, 
       string_agg(order_number, ', ') as order_numbers
FROM public.orders 
WHERE customer_email = 'nothing1337@rambler.ru' 
   OR customer_email_actual = 'nothing1337@rambler.ru';

-- Delete all related data for orders from this email address
-- We need to delete in the correct order due to foreign key constraints

-- Step 1: Delete order notes
DELETE FROM public.order_notes 
WHERE order_id IN (
  SELECT id FROM public.orders 
  WHERE customer_email = 'nothing1337@rambler.ru' 
     OR customer_email_actual = 'nothing1337@rambler.ru'
);

-- Step 2: Delete order status history
DELETE FROM public.order_status_history 
WHERE order_id IN (
  SELECT id FROM public.orders 
  WHERE customer_email = 'nothing1337@rambler.ru' 
     OR customer_email_actual = 'nothing1337@rambler.ru'
);

-- Step 3: Delete email sending logs
DELETE FROM public.email_sending_logs 
WHERE order_id IN (
  SELECT id FROM public.orders 
  WHERE customer_email = 'nothing1337@rambler.ru' 
     OR customer_email_actual = 'nothing1337@rambler.ru'
);

-- Step 4: Delete email logs
DELETE FROM public.email_logs 
WHERE order_id IN (
  SELECT id FROM public.orders 
  WHERE customer_email = 'nothing1337@rambler.ru' 
     OR customer_email_actual = 'nothing1337@rambler.ru'
);

-- Step 5: Delete bank account transactions
DELETE FROM public.bank_account_transactions 
WHERE order_id IN (
  SELECT id FROM public.orders 
  WHERE customer_email = 'nothing1337@rambler.ru' 
     OR customer_email_actual = 'nothing1337@rambler.ru'
);

-- Step 6: Delete invoices
DELETE FROM public.invoices 
WHERE order_id IN (
  SELECT id FROM public.orders 
  WHERE customer_email = 'nothing1337@rambler.ru' 
     OR customer_email_actual = 'nothing1337@rambler.ru'
);

-- Step 7: Finally delete the orders themselves
DELETE FROM public.orders 
WHERE customer_email = 'nothing1337@rambler.ru' 
   OR customer_email_actual = 'nothing1337@rambler.ru';

-- Show confirmation of deletion
SELECT 'Orders and related data for nothing1337@rambler.ru have been deleted' as result;
