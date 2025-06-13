export default {
    CALORIES_PROMPT: `Based on Weight, Height, Gender, Goal give me calories and proteins need daily consider Age as 28 in JSON format and follow the schema: 
    {
        calories:<>,
        proteins:<>
    }`,
    //GENERATE_RECIPE_OPTION_PROMPT: `Depending on user instructions create 3 different recipe variant with recipe name with emoji, 2 line description and main ingredient list in JSON format with field recipe name, description, ingredients(without size) only, do not give me text response`,
    GENERATE_RECIPE_OPTION_PROMPT: `Depending on user instructions, create 3 different recipe variants. Each recipe should include:
- a recipeName with relevant emoji directly inside the string (e.g. "🍛 Chickpea Curry"),
- a 2-line description with emojis,
- and a list of main ingredients (no quantities).

Respond **only** with valid JSON, no markdown formatting (no \`\`\`json). The JSON array should contain objects with fields: recipeName, description, ingredients. Do not include any explanation, intro, or formatting. Just output raw JSON.`,

GENERATE_COMPLETE_RECIPE_PROMPT: `Based on the provided recipe name and description, generate a complete recipe object in the following JSON format:

{
  "recipeName": "string (include a relevant food or cuisine emoji, e.g. '🍝 Creamy Alfredo Pasta')",
  "description": "string (2-line appealing summary with relevant emojis)",
  "calories": number (approximate total calories for the full dish),
  "category": ["string"] (tags such as 'Indian', 'Vegan', 'Dinner', etc.),
  "cooktime": number (total cook time in minutes),
  "imageprompt": "string (a creative and visual prompt for generating an image of this dish)",
  "ingredients": [
    {
      "icon": "string (emoji representing the ingredient, e.g. '🧄')",
      "ingredients": "string (ingredient name)",
      "quantity": "string (e.g. '2 cups', '1 tsp')"
    }
  ],
  "serveto": number (total number of people the dish serves),
  "steps": [
    "string (step-by-step cooking instructions in clear, concise language)"
  ]
}

🛑 Respond only with valid **raw JSON**. Emoji should be included directly in the 'recipeName', 'description', and 'ingredients.icon' fields.`

}