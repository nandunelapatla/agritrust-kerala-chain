import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ProduceRequest {
  farmer: string;
  crop: string;
  harvestDate?: string;
  location?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabaseClient.auth.getUser(token);

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: corsHeaders }
      );
    }

    if (req.method === 'POST') {
      const { farmer, crop, harvestDate, location }: ProduceRequest = await req.json();

      // Generate batch ID
      const batchId = `BATCH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Generate demo blockchain hash (keccak256 simulation)
      const txHash = `0x${Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map(b => b.toString(16).padStart(2, '0')).join('')}`;

      // Generate QR data
      const qrData = `${batchId}|${txHash}`;
      
      // Generate QR code (simple SVG for demo - in production use proper QR library)
      const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <rect width="200" height="200" fill="white"/>
        <text x="100" y="100" text-anchor="middle" font-size="12" fill="black">QR: ${batchId}</text>
      </svg>`;
      const qrImage = `data:image/svg+xml;base64,${encode(svgContent)}`;

      // Save to database
      const { data: produce, error } = await supabaseClient
        .from('produce')
        .insert({
          farmer_id: user.id,
          batch_id: batchId,
          crop_type: crop,
          harvest_date: harvestDate,
          location: location,
          farmer_name: farmer,
          tx_hash: txHash,
          qr_data: qrData,
          qr_image: qrImage,
          status: 'verified'
        })
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to save produce data' }),
          { status: 500, headers: corsHeaders }
        );
      }

      return new Response(
        JSON.stringify({
          ok: true,
          batchId,
          txHash,
          qrImage,
          data: produce
        }),
        { headers: corsHeaders }
      );
    }

    if (req.method === 'GET') {
      // Get farmer's produce
      const { data: produce, error } = await supabaseClient
        .from('produce')
        .select('*')
        .eq('farmer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Database error:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to fetch produce data' }),
          { status: 500, headers: corsHeaders }
        );
      }

      return new Response(
        JSON.stringify({ ok: true, data: produce }),
        { headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: corsHeaders }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: corsHeaders }
    );
  }
});