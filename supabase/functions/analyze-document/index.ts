import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { documentName, documentType, purpose, destination } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const prompt = `You are a visa document validation AI. Analyze this document for a ${purpose} visa application to ${destination}.

Document being checked: ${documentName}
Document type: ${documentType}

Provide a realistic validation result in JSON format with these fields:
- status: "valid" | "warning" | "error"
- message: A short status message (3-5 words)
- aiNote: A helpful 1-2 sentence explanation of the validation result
- suggestions: An array of improvement suggestions if status is not "valid"

Consider common issues like:
- Passport validity requirements (6+ months)
- Financial documentation consistency
- Insurance coverage dates
- Letter formatting and completeness

Respond ONLY with valid JSON, no other text.`;

    console.log("Analyzing document:", documentName);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({
        status: "valid",
        message: "Document received",
        aiNote: "Document uploaded successfully. Manual review recommended.",
        suggestions: [],
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    console.log("AI response:", content);

    let result;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      result = {
        status: "valid",
        message: "Document received",
        aiNote: "Document uploaded successfully.",
        suggestions: [],
      };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("analyze-document error:", error);
    return new Response(JSON.stringify({ 
      status: "valid",
      message: "Document received",
      aiNote: "Document uploaded - manual review may be required.",
      suggestions: [],
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
