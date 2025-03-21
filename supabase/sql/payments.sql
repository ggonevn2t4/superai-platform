
-- Create a table to track payment attempts
CREATE TABLE IF NOT EXISTS public.payment_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  amount NUMERIC NOT NULL,
  reference TEXT NOT NULL UNIQUE,
  payment_method TEXT NOT NULL,
  plan_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add RLS policies to secure payment attempts
ALTER TABLE public.payment_attempts ENABLE ROW LEVEL SECURITY;

-- Users can view their own payment attempts
CREATE POLICY "Users can view their own payment attempts" ON public.payment_attempts
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own payment attempts
CREATE POLICY "Users can insert their own payment attempts" ON public.payment_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Only authenticated users can access payment attempts
CREATE POLICY "Authenticated users can access payment attempts" ON public.payment_attempts
  FOR ALL USING (auth.role() = 'authenticated');

-- Add indexes for performance
CREATE INDEX payment_attempts_user_id_idx ON public.payment_attempts (user_id);
CREATE INDEX payment_attempts_reference_idx ON public.payment_attempts (reference);
