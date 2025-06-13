
-- Insert Malta shop into the shops table
INSERT INTO public.shops (
  name,
  company_name,
  business_owner,
  company_address,
  company_postcode,
  company_city,
  company_phone,
  company_email,
  company_website,
  vat_number,
  court_name,
  registration_number,
  is_default
) VALUES (
  'Malta Heating Oil',
  'Malta Energy Solutions Ltd',
  'John Mifsud',
  'Triq il-Mediterran 45',
  'VLT 1234',
  'Valletta',
  '+356 2123 4567',
  'info@maltaheat.com',
  'https://maltaheat.com',
  'MT12345678',
  'Malta Business Registry',
  'C12345',
  false
);
