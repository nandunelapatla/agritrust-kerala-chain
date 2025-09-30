-- Create produce table for tracking agricultural products
CREATE TABLE public.produce (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farmer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  batch_id TEXT NOT NULL UNIQUE,
  crop_type TEXT NOT NULL,
  harvest_date DATE,
  location TEXT,
  farmer_name TEXT NOT NULL,
  certificate_url TEXT,
  image_url TEXT,
  tx_hash TEXT NOT NULL,
  qr_data TEXT NOT NULL,
  qr_image TEXT NOT NULL,
  status TEXT DEFAULT 'verified' CHECK (status IN ('verified', 'pending', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index on batch_id for QR lookups
CREATE INDEX idx_produce_batch_id ON public.produce(batch_id);
CREATE INDEX idx_produce_tx_hash ON public.produce(tx_hash);

-- Enable RLS
ALTER TABLE public.produce ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Farmers can view their own produce" 
ON public.produce 
FOR SELECT 
USING (auth.uid() = farmer_id);

CREATE POLICY "Farmers can create their own produce" 
ON public.produce 
FOR INSERT 
WITH CHECK (auth.uid() = farmer_id);

CREATE POLICY "Farmers can update their own produce" 
ON public.produce 
FOR UPDATE 
USING (auth.uid() = farmer_id);

CREATE POLICY "Public can view verified produce for tracing" 
ON public.produce 
FOR SELECT 
USING (status = 'verified');

-- Create advisory queries table
CREATE TABLE public.advisory_queries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farmer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  query_text TEXT NOT NULL,
  response TEXT NOT NULL,
  language TEXT DEFAULT 'en' CHECK (language IN ('en', 'ml')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.advisory_queries ENABLE ROW LEVEL SECURITY;

-- Create policies for advisory queries
CREATE POLICY "Farmers can view their own queries" 
ON public.advisory_queries 
FOR SELECT 
USING (auth.uid() = farmer_id);

CREATE POLICY "Farmers can create queries" 
ON public.advisory_queries 
FOR INSERT 
WITH CHECK (auth.uid() = farmer_id);

-- Create farmer profiles table
CREATE TABLE public.farmer_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  farm_size DECIMAL,
  primary_crops TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.farmer_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for farmer profiles
CREATE POLICY "Farmers can view their own profile" 
ON public.farmer_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Farmers can create their own profile" 
ON public.farmer_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Farmers can update their own profile" 
ON public.farmer_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_produce_updated_at
  BEFORE UPDATE ON public.produce
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_farmer_profiles_updated_at
  BEFORE UPDATE ON public.farmer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();