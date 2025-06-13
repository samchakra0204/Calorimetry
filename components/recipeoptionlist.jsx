import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import prompt from './../shared/prompt'
import { GenerateAIRecipe } from '../services/aiModel'
import LoadingDialogue from './loadingdialogue'
import { GenerateRecipeImage } from './../services/aiModel'
import { api } from './../convex/_generated/api'
import { useMutation } from 'convex/react'
import { UserContext } from './../context/userContext'
import { useRouter } from 'expo-router/build/hooks'

export default function recipeoptionlist({ recipeOption }) {
    const [loading, setLoading] = useState(false);
    const createRecipe = useMutation(api.recipe.createRecipe)
    const { user } = useContext(UserContext)
    const router = useRouter();
    /*const onRecipeOptionSelect = async (recipe) => {
        setLoading(true);
        try {
            const PROMPT = `RecipeName: ${recipe?.recipeName}\nDescription: ${recipe?.description}\n${prompt.GENERATE_COMPLETE_RECIPE_PROMPT}`;
            console.log(PROMPT);

            const result = await GenerateAIRecipe(PROMPT);
            console.log(result.choices[0].message);

            const fullContent = result.choices[0].message.content;
            console.log("AI response:\n", fullContent);

            const match = fullContent.match(/```json\s*([\s\S]*?)\s*```/);
            if (!match || match.length < 2) {
                throw new Error("No valid JSON block found in AI response.");
            }

            const extractjson = match[1].trim();
            const parsedjson = JSON.parse(extractjson);

            //const aiImageResp=await GenerateAIRecipe(parsedjson?.imageprompt)
            //console.log(aiImageResp?.data);
            try {
                const aiImageResp = await GenerateRecipeImage(parsedjson?.imageprompt);

                console.log("Full Image Response:", aiImageResp?.data); // log full response to understand structure

                // Check what field contains the image URL — adjust accordingly
                const imageUrl = aiImageResp?.data?.output || aiImageResp?.data?.image || aiImageResp?.data?.url;

                console.log("Image URL:", imageUrl);
                const saveRecipeResult = await createRecipe({
                    jsonData: parsedjson,
                    imageUrl: imageUrl,
                    recipeName: parsedjson?.recipeName,
                    uid: user?._id
                })
                console.log(saveRecipeResult);
            } catch (imgErr) {
                console.error("Image generation failed:", imgErr.response?.data || imgErr.message);
            }

            setLoading(false);

            // You can now use parsedjson, e.g. setFullRecipe(parsedjson);
        } catch (e) {
            setLoading(false);
            console.error("Error parsing recipe JSON:", e);
        }
    };*/
    /*const onRecipeOptionSelect = async (recipe) => {
        setLoading(true);
        try {
            const PROMPT = `RecipeName: ${recipe?.recipeName}\nDescription: ${recipe?.description}\n${prompt.GENERATE_COMPLETE_RECIPE_PROMPT}`;
            console.log(PROMPT);

            const result = await GenerateAIRecipe(PROMPT);
            const fullContent = result.choices[0].message.content;
            const jsonMatch = fullContent.match(/```(?:json)?\s*([\s\S]*?)```/i);
            const extractjson = jsonMatch ? jsonMatch[1].trim() : fullContent.trim();

            const parsedJSONResp = JSON.parse(extractjson); // ✅ Now this is valid JSON

            console.log(parsedJSONResp);
            const aiImageResp = await GenerateRecipeImage(parsedJSONResp?.imageprompt);
            console.log(aiImageResp?.data?.image);
            const saveRecipeResult = await createRecipe({
                jsonData: parsedJSONResp,
                imageUrl: aiImageResp?.data?.image,
                recipeName: String(parsedJSONResp?.recipeName || "Untitled"),
                uid: user?._id
            })
            console.log(saveRecipeResult);
            setLoading(false);
            /*console.log(result.choices[0].message);
    
            const fullContent = result.choices[0].message.content;
            console.log("AI response:\n", fullContent);
    
            // Directly parse the raw JSON response (no markdown expected)
            const extractjson = fullContent.trim();
            const parsedjson = JSON.parse(extractjson);
    
            try {
                const aiImageResp = await GenerateRecipeImage(parsedjson?.imageprompt);
                console.log("Full Image Response:", aiImageResp?.data);
    
                // Try known fields for image URL
                const imageUrl =
                    aiImageResp?.data?.output ||
                    aiImageResp?.data?.image ||
                    aiImageResp?.data?.url;
    
                console.log("Image URL:", imageUrl);
    
                const saveRecipeResult = await createRecipe({
                    jsonData: parsedjson,
                    imageUrl: imageUrl,
                    recipeName: parsedjson?.recipeName,
                    uid: user?._id,
                });
                console.log(saveRecipeResult);
        } catch (e) {
            setLoading(false);
            console.error("Error parsing recipe JSON:", e);
        }
    };*/

    const onRecipeOptionSelect = async (recipe) => {
        setLoading(true);
        try {
            const PROMPT = `RecipeName: ${recipe?.recipeName}\nDescription: ${recipe?.description}\n${prompt.GENERATE_COMPLETE_RECIPE_PROMPT}`;
            console.log(PROMPT);

            const result = await GenerateAIRecipe(PROMPT);
            const fullContent = result.choices[0].message.content;

            const jsonMatch = fullContent.match(/```(?:json)?\s*([\s\S]*?)```/i);
            const extractjson = jsonMatch ? jsonMatch[1].trim() : fullContent.trim();
            console.log("Extracted JSON String:\n", extractjson);

            const parsedJSONResp = JSON.parse(extractjson);
            console.log(parsedJSONResp);

            /* if (!parsedJSONResp?.imageprompt || typeof parsedJSONResp.imageprompt !== 'string') {
                 throw new Error("Missing or invalid image prompt.");
             }*/

            //const aiImageResp = await GenerateRecipeImage(parsedJSONResp.imageprompt);
            //console.log(aiImageResp?.data);
            /*let aiImageResp;
            try {
                aiImageResp = await GenerateRecipeImage(parsedJSONResp.imageprompt);
                console.log("AI Image Response:", aiImageResp?.data);
            } catch (imgErr) {
                console.error("Image generation error:", imgErr);
                throw imgErr; // re-throw to trigger outer catch
            }

            const imageUrl = aiImageResp?.data?.output || aiImageResp?.data?.image || aiImageResp?.data?.url;

            if (!imageUrl) {
                throw new Error("Image generation API did not return an image URL.");
            }*/

            const saveRecipeResult = await createRecipe({
                jsonData: parsedJSONResp,
                //imageUrl: imageUrl,
                recipeName: String(parsedJSONResp?.recipeName || "Untitled"),
                uid: user?._id
            });

            console.log(saveRecipeResult);

            setLoading(false); // success case
            /*router.push({
                pathname: '/recipe-detail',
                recipeId: saveRecipeResult
            });*/
            /*router.push({
                pathname: '/recipe-detail',
                query: { recipeId: saveRecipeResult }
            });*/
            router.push(`/recipe-detail?recipeId=${saveRecipeResult}`);

        } catch (e) {
            console.error("Error parsing recipe JSON or generating image:", e);
            alert("Failed to create recipe. Please try again.");
            setLoading(false); // error case
        }
    };


    return (
        <View style={{
            marginTop: 20
        }}>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold'
            }}>Select Recipe</Text>
            <View>
                {recipeOption?.map((item, index) => (
                    <TouchableOpacity
                        onPress={() => onRecipeOptionSelect(item)}
                        key={index} style={{
                            padding: 15,
                            borderWidth: 0.2,
                            borderRadius: 15,
                            marginTop: 15
                        }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}>{item?.recipeName}</Text>
                        <Text style={{
                            color: 'gray'
                        }}>{item?.description}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <LoadingDialogue loading={loading} />
        </View>
    )
}