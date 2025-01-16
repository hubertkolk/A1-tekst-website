'use server'

import OpenAI from 'openai'

export async function convertToNT1(text: string): Promise<{ success: boolean; result: string }> {
  console.log('OpenAI API Key status:', process.env.OPENAI_API_KEY ? 'Configured' : 'Missing');

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
  });

  const performConversion = async () => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {"role": "system", "content": "Je bent een taalexpert die teksten herschrijft naar A1-niveau Nederlands."},
          {"role": "user", "content": `Herschrijf de volgende tekst naar Nederlands op A1-niveau. Gebruik zinnen van maximaal 10 woorden, makkelijke en veelvoorkomende woorden, en houd de tekst eenvoudig en duidelijk. Vermijd passieve zinnen, lange opsommingen en moeilijke termen. Controleer na herschrijven of de tekst makkelijk te begrijpen is voor iemand met beperkte leesvaardigheid:\n\n${text}`}
        ],
      })
      return response.choices[0].message.content || 'Er is geen antwoord ontvangen van de AI.'
    } catch (error) {
      console.error('Error in OpenAI API call:', error)
      return 'We kunnen je tekst niet verwerken. Probeer een andere tekst.'
    }
  }

  try {
    // First conversion
    let result = await performConversion()
    
    // Second conversion
    result = await performConversion()
    
    return { success: true, result }
  } catch (error) {
    console.error('Error in convertToNT1:', error)
    return { 
      success: false, 
      result: 'Er is een onverwachte fout opgetreden. Sorry daarvoor. Probeer het later opnieuw.'
    }
  }
}

