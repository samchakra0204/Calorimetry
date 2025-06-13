/*import OpenAI from "openai"

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true
})


export const CalculateCaloriesAI=async(PROMPT) => await openai.chat.completions.create({
    model: "google/gemini-2.5-pro-exp-03-25:free",
    messages: [
      { role: "user", content: PROMPT }
    ],
  })*/

//console.log(completion.choices[0].message)

/*import OpenAI from "openai"

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY2,
})

 export const CalculateCaloriesAI=async(PROMPT) => await openai.chat.completions.create({
    model: "google/gemma-3-1b-it:free",
    messages: [
      { role: "user", content: PROMPT }
    ],
  })*/

//console.log(completion.choices[0].message)

import OpenAI from "openai"
import axios from "axios"

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY3,
  dangerouslyAllowBrowser: true
})

export const CalculateCaloriesAI = async (PROMPT) => await openai.chat.completions.create({
  model: "mistralai/devstral-small:free",
  messages: [
    { role: "user", content: PROMPT }
  ],
})

export const GenerateAIRecipe = async (PROMPT) => await openai.chat.completions.create({
  model: "mistralai/devstral-small:free",
  messages: [
    { role: "user", content: PROMPT }
  ],
})

const BASE_URL = 'https://aigurulab.tech';
export const GenerateRecipeImage = async (prompt) => await axios.post(BASE_URL + '/api/generate-image',
  {
    width: 1024,
    height: 1024,
    input: prompt,
    model: 'sdxl',//'flux'
    aspectRatio: "1:1"//Applicable to Flux model only
  },
  {
    headers: {
      'x-api-key': process.env.EXPO_PUBLIC_AIGURU_LAB_API_KEY, // Your API Key
      'Content-Type': 'application/json', // Content Type
    },
  })


//console.log(GenerateRecipeImage.data.image) //Output Result: Base 64 Image

/*import OpenAI from "openai"
import axios from "axios"

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY4,
  dangerouslyAllowBrowser: true
})

export const CalculateCaloriesAI = async (PROMPT) => await openai.chat.completions.create({
  model: "meta-llama/llama-3.3-8b-instruct:free",
  messages: [
    { role: "user", content: PROMPT }
  ],
})

export const GenerateAIRecipe = async (PROMPT) => await openai.chat.completions.create({
  model: "meta-llama/llama-3.3-8b-instruct:free",
  messages: [
    { role: "user", content: PROMPT }
  ],
})

const BASE_URL = 'https://aigurulab.tech';
export const GenerateRecipeImage = async (prompt) => await axios.post(BASE_URL + '/api/generate-image',
  {
    width: 1024,
    height: 1024,
    input: prompt,
    model: 'sdxl',//'flux'
    aspectRatio: "1:1"//Applicable to Flux model only
  },
  {
    headers: {
      'x-api-key': process.env.EXPO_PUBLIC_AIGURU_LAB_API_KEY, // Your API Key
      'Content-Type': 'application/json', // Content Type
    },
  })*/