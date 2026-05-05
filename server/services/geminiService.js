const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Analyzes a civic issue photo using Gemini Vision API
 * @param {string} imageUrl 
 * @returns {Promise<{ category: string, severity: number, description: string, suggested_department: string }>}
 */
const analyzeIssuePhoto = async (imageUrl) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Fetch the image from the URL to send as part of the request
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    const base64Data = Buffer.from(buffer).toString('base64');

    const prompt = `You are a civic issue classifier. Given a photo, return ONLY a raw JSON object (no markdown, no backticks) with these fields: category (one of: pothole, streetlight, garbage, manhole, waterlogging, other), severity (integer 1–5), description (one sentence), suggested_department (string).`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: 'image/jpeg',
        },
      },
    ]);

    const responseText = result.response.text();
    
    // Attempt to parse JSON (cleaning potential markdown noise if Gemini includes it despite prompt)
    const cleanedJson = responseText.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanedJson);
  } catch (error) {
    console.error('[Gemini Service Error]:', error);
    // Sensible defaults if AI fails or parsing fails
    return {
      category: 'other',
      severity: 3,
      description: 'Civic issue detected.',
      suggested_department: 'General Maintenance',
    };
  }
};

module.exports = { analyzeIssuePhoto };
