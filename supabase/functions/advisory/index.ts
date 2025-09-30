import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AdvisoryRequest {
  query: string;
  language?: 'en' | 'ml';
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
      const { query, language = 'en' }: AdvisoryRequest = await req.json();

      // Call Lovable AI for agricultural advisory
      const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
      if (!LOVABLE_API_KEY) {
        throw new Error('LOVABLE_API_KEY is not configured');
      }

      const systemPrompt = language === 'ml' 
        ? `നിങ്ങൾ കേരളത്തിലെ കർഷകർക്കുള്ള ഒരു AI കൃഷി ഉപദേശകനാണ്. കേരളത്തിലെ കാലാവസ്ഥ, മണ്ണ്, പരമ്പരാഗത കൃഷി രീതികൾ എന്നിവയെക്കുറിച്ച് നിങ്ങൾക്ക് വിശദമായ അറിവുണ്ട്. വ്യക്തവും പ്രായോഗികവുമായ ഉപദേശം നൽകുക.`
        : `You are an AI agricultural advisor for farmers in Kerala, India. You have detailed knowledge about Kerala's climate, soil conditions, traditional farming practices, and modern agricultural techniques. Provide clear, practical advice for local farming conditions.`;

      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: query }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        if (response.status === 429) {
          return new Response(
            JSON.stringify({ error: 'Rate limits exceeded, please try again later.' }),
            { status: 429, headers: corsHeaders }
          );
        }
        if (response.status === 402) {
          return new Response(
            JSON.stringify({ error: 'Payment required, please add funds to your Lovable AI workspace.' }),
            { status: 402, headers: corsHeaders }
          );
        }
        const errorText = await response.text();
        console.error('AI gateway error:', response.status, errorText);
        return new Response(
          JSON.stringify({ error: 'AI gateway error' }),
          { status: 500, headers: corsHeaders }
        );
      }

      const aiResponse = await response.json();
      const answer = aiResponse.choices?.[0]?.message?.content || 'Unable to generate response';

      // Save query and response to database
      const { error: dbError } = await supabaseClient
        .from('advisory_queries')
        .insert({
          farmer_id: user.id,
          query_text: query,
          response: answer,
          language
        });

      if (dbError) {
        console.error('Database error:', dbError);
        // Continue even if database save fails
      }

      return new Response(
        JSON.stringify({
          ok: true,
          answer,
          language
        }),
        { headers: corsHeaders }
      );
    }

    if (req.method === 'GET') {
      // Get farmer's advisory history
      const { data: queries, error } = await supabaseClient
        .from('advisory_queries')
        .select('*')
        .eq('farmer_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Database error:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to fetch advisory history' }),
          { status: 500, headers: corsHeaders }
        );
      }

      return new Response(
        JSON.stringify({ ok: true, data: queries }),
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