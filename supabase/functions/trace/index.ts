import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    if (req.method === 'GET') {
      const url = new URL(req.url);
      const code = url.searchParams.get('code');
      const batchId = url.searchParams.get('batchId');
      const txHash = url.searchParams.get('txHash');

      let query = supabaseClient
        .from('produce')
        .select('*')
        .eq('status', 'verified');

      if (code) {
        // Parse QR code data
        const [parsedBatchId, parsedTxHash] = code.split('|');
        query = query.eq('batch_id', parsedBatchId);
      } else if (batchId) {
        query = query.eq('batch_id', batchId);
      } else {
        return new Response(
          JSON.stringify({ error: 'Missing code, batchId, or txHash parameter' }),
          { status: 400, headers: corsHeaders }
        );
      }

      const { data: produce, error } = await query.maybeSingle();

      if (error) {
        console.error('Database error:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to fetch produce data' }),
          { status: 500, headers: corsHeaders }
        );
      }

      if (!produce) {
        return new Response(
          JSON.stringify({ 
            ok: false, 
            error: 'Produce not found or not verified',
            status: 'Not Found'
          }),
          { status: 404, headers: corsHeaders }
        );
      }

      // Generate timeline
      const timeline = [
        {
          stage: 'Harvested',
          date: produce.harvest_date || produce.created_at,
          location: produce.location || 'Farm Location',
          status: 'completed'
        },
        {
          stage: 'Recorded on Blockchain',
          date: produce.created_at,
          location: 'Blockchain Network',
          status: 'completed'
        },
        {
          stage: 'Quality Verified',
          date: produce.created_at,
          location: 'AgriVerse Platform',
          status: 'completed'
        }
      ];

      return new Response(
        JSON.stringify({
          ok: true,
          farmer: produce.farmer_name,
          crop: produce.crop_type,
          harvestDate: produce.harvest_date,
          location: produce.location,
          batchId: produce.batch_id,
          txHash: produce.tx_hash,
          status: 'Verified',
          timeline,
          certificateUrl: produce.certificate_url,
          imageUrl: produce.image_url
        }),
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