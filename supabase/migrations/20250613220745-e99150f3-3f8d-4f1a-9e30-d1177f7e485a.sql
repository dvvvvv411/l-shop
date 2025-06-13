
-- Add Malta shop configuration to shops table
INSERT INTO public.shops (
  id,
  name,
  company_name,
  company_address,
  company_postcode,
  company_city,
  company_phone,
  company_email,
  company_website,
  business_owner,
  court_name,
  registration_number,
  vat_number,
  is_default
) VALUES (
  gen_random_uuid(),
  'Malta Heating Oil',
  'Malta Energy Solutions Ltd',
  'Triq il-Kbira',
  'VLT 1234',
  'Valletta',
  '+356 2123 4567',
  'info@malta-heating-oil.com',
  'https://malta-heating-oil.com',
  'John Mifsud',
  'Malta Commercial Court',
  'C12345',
  'MT12345678',
  false
);

-- Add Malta domain mapping support (will be used in the hook)
-- This is just a reference comment for the domain mapping that will be added in the code
