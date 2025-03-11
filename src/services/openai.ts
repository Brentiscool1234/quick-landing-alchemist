
interface GenerationParams {
  keywords: string[];
  city: string;
  state: string;
  tone?: string;
  companyName?: string;
}

interface GeneratedContent {
  introduction: string;
  whyUs: string;
  thingsToDo: string;
  faq: {
    question: string;
    answer: string;
  }[];
}

let openaiApiKey = '';

export const setOpenAIApiKey = (apiKey: string) => {
  openaiApiKey = apiKey;
};

export const getOpenAIApiKey = () => {
  return openaiApiKey;
};

export async function generateLandingContent(params: GenerationParams): Promise<GeneratedContent> {
  const { keywords, city, state, tone = 'professional', companyName = '' } = params;
  
  if (!openaiApiKey) {
    throw new Error('OpenAI API key is not set. Please provide your API key.');
  }
  
  console.log("Generating content with params:", params);
  
  const companyNamePrompt = companyName ? `for "${companyName}"` : 'for a local business';
  
  const prompt = `Create conversational, easy-to-read landing page content ${companyNamePrompt} in ${city}, ${state} focused on ${keywords.join(", ")}.
  
  Keep the content simple, friendly, and approachable. Avoid repetition, jargon, and fancy words. Use short paragraphs and everyday language that's easy to understand.
  
  Use a ${tone} tone throughout the content.
  
  Include the following sections:
  1. Introduction (brief welcoming section about services in ${city}, ${state})
  2. Why Us section (straightforward benefits of using ${companyName ? companyName : "our services"} in ${city})
  3. Things to do in ${city}, ${state} section (helpful local information in a conversational style)
  4. FAQ section (4 questions and answers with direct, simple responses)
  
  For each section, naturally include:
  - The main keyword "${keywords[0]}" 
  - Secondary keywords: ${keywords.slice(1).join(", ")}
  - Location terms: "${city}", "${state}"
  ${companyName ? `- The company name "${companyName}" where it makes sense` : ''}
  
  Format the response as JSON with the following structure:
  {
    "introduction": "...",
    "whyUs": "...",
    "thingsToDo": "...",
    "faq": [
      {
        "question": "...",
        "answer": "..."
      },
      ...
    ]
  }`;
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You create conversational, easy-to-read content that sounds natural and friendly. Use simple language, short sentences, and avoid jargon or repetition."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
        response_format: { type: "json_object" }
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API Error: ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    
    // Parse the response
    try {
      const content = JSON.parse(data.choices[0].message.content || "{}");
      return content as GeneratedContent;
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      throw new Error("Failed to parse the generated content. Please try again.");
    }
  } catch (error) {
    console.error("Error generating content with OpenAI:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to generate content. Please try again.");
  }
}

// Fallback mock function in case the API call fails or for testing
export async function generateMockLandingContent(params: GenerationParams): Promise<GeneratedContent> {
  const { keywords, city, state, companyName = '' } = params;
  
  console.log("Using MOCK content with params:", params);
  
  // This is where you would make the actual API call to OpenAI
  // For now, we'll simulate a delay and return mock data
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const companyText = companyName ? companyName : 'our business';
  
  // Generate mock data based on the provided parameters
  return {
    introduction: `Welcome to ${companyText}'s ${keywords.join(", ")} services in ${city}, ${state}! We specialize in providing top-quality ${keywords.join(", ")} services tailored to the unique needs of ${city} residents. With years of experience serving the ${city} area, we understand the local challenges and opportunities. Our team is committed to delivering exceptional ${keywords[0]} solutions that make a difference for the people of ${city}, ${state}. Whether you're looking for ${keywords.join(" or ")} services, we're here to help with professional, reliable, and affordable options right here in ${city}.`,
    
    whyUs: `When it comes to ${keywords[0]} services in ${city}, ${state}, ${companyText}'s local expertise sets us apart. We combine industry-leading practices with deep knowledge of ${city}'s specific needs. Our team has been serving the ${city} community for years, building strong relationships with local residents and businesses. We understand the unique characteristics of ${state} and particularly ${city}, allowing us to provide tailored solutions that address your specific challenges. Our commitment to quality, transparency, and customer satisfaction has made us the preferred provider of ${keywords.join(", ")} services throughout ${city} and surrounding areas in ${state}. Choose ${companyText} for reliable, efficient, and locally-focused ${keywords[0]} services.`,
    
    thingsToDo: `${city}, ${state} offers numerous attractions and activities for residents and visitors alike. Explore the beautiful parks and natural areas in and around ${city}, where you can enjoy outdoor recreation all year round. The downtown area of ${city} features local shops, restaurants, and cultural venues that showcase the unique character of this ${state} community. Don't miss the seasonal festivals and community events that bring together the people of ${city} in celebration. For history buffs, ${city} has several historical sites and museums that highlight the rich heritage of this ${state} region. Whether you're interested in outdoor adventures, cultural experiences, family activities, or culinary exploration, ${city}, ${state} has something special to offer everyone.`,
    
    faq: [
      {
        question: `What areas in ${city}, ${state} does ${companyName ? companyName : "your business"} serve?`,
        answer: `We proudly serve all neighborhoods and districts throughout ${city}, ${state}, including the downtown area, suburban communities, and surrounding regions. Our service area covers the entire ${city} metropolitan area, ensuring comprehensive coverage for all your ${keywords[0]} needs regardless of your specific location within ${city}.`
      },
      {
        question: `How long has ${companyName ? companyName : "your business"} been providing ${keywords.join(", ")} services in ${city}?`,
        answer: `We've been a trusted provider of ${keywords.join(", ")} services in ${city}, ${state} for over 10 years, building a solid reputation based on reliability, expertise, and customer satisfaction. During this time, we've developed deep knowledge of ${city}'s unique characteristics and requirements, allowing us to deliver superior ${keywords[0]} services tailored to local needs.`
      },
      {
        question: `What makes ${companyName ? companyName + "'s" : "your"} ${keywords[0]} services unique in ${city}, ${state}?`,
        answer: `Our ${keywords[0]} services stand out in ${city}, ${state} because we combine industry-leading practices with deep local knowledge. We understand the specific challenges and opportunities in ${city}, from the local regulations to the community preferences. Our team consists of ${city} residents who are passionate about serving their community, and we regularly participate in local events and initiatives to stay connected with the people of ${city}, ${state}.`
      },
      {
        question: `Do you offer consultations for ${keywords[0]} services in ${city}, ${state}?`,
        answer: `Yes, we offer comprehensive consultations for all our ${keywords[0]} services in ${city}, ${state}. Our local experts will meet with you at your ${city} location to assess your specific needs and provide personalized recommendations. These consultations are designed to help ${city} residents understand their options and make informed decisions about their ${keywords[0]} requirements. Contact us today to schedule your personalized consultation in ${city}, ${state}.`
      }
    ]
  };
}
