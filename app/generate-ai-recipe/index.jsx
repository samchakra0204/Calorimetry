import { View, Text, Platform, TextInput } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import Button from './../../components/button'
import { GenerateAIRecipe } from '../../services/aiModel';
import prompt from '../../shared/prompt';
import RecipeOptionList from './../../components/recipeoptionlist'

export default function GenerateAiRecipe() {
    const [input, setInput] = useState();
    const [loading, setLoading] = useState(false);
    const [recipeOption, setRecipeOption] = useState([])
    const GenerateRecipeOptions = async () => {
        setLoading(true);
        //try {
        /*const PROMPT=input+prompt.GENERATE_RECIPE_OPTION_PROMPT;
        const result = await GenerateRecipeOptionsAI(PROMPT);
        console.log(result.choices[0].message)
        const extractjson=(result.choices[0].message.content).replace('```json', '').replace('```', '');
        const parsedjson=JSON.parse(extractjson);
        console.log(parsedjson);
        setRecipeOption(parsedjson);
        setLoading(false);*/
        /*const PROMPT = input + prompt.GENERATE_RECIPE_OPTION_PROMPT;
        const result = await GenerateAIRecipe(PROMPT);
        console.log(/```[\s\S]*$/, '')        // remove everything after ```
            .trim();

        const parsedjson = JSON.parse(extractjson); // will preserve emojis
        console.log(parconsole.log(result.choices[0].message);

        const fullContent = result.choices[0].message.content;

        // This version allows anything around the ```json ... ``` block, but only extracts the actual JSON
        const extractjson = fullContent
            .replace(/^[\s\S]*?```json/, '')   // remove everything before ```json
            .replasedjson);

        setRecipeOption(parsedjson);
        setLoading(false);

    } catch (e) {
        setLoading(false);
        console.log(e);
    }*/
        try {
            const PROMPT = input + prompt.GENERATE_RECIPE_OPTION_PROMPT;
            /*const result = await GenerateAIRecipe(PROMPT);
            console.log(result.choices[0].message);

            const fullContent = result.choices[0].message.content;

            // Cleanly extract JSON inside ```json ... ```
            const extractjson = fullContent
                .replace(/^[\s\S]*?```json/, '')   // remove everything before ```json
                .replace(/```[\s\S]*$/, '')        // remove everything after ```
                .trim();

            const parsedjson = JSON.parse(extractjson); // will preserve emojis
            console.log(parsedjson);

            setRecipeOption(parsedjson);
            setLoading(false);*/
            const result = await GenerateAIRecipe(PROMPT);
            const extractjson = (result.choices[0].message.content);
            const parsedJSONResp = JSON.parse(extractjson);
            console.log(parsedJSONResp);
            setRecipeOption(parsedJSONResp);
            setLoading(false);

        } catch (e) {
            setLoading(false);
            console.log(e);
        }

    }
    return (
        <View style={{
            paddingTop: Platform.OS == 'ios' ? 50 : 50,
            padding: 20
        }}>
            <Text style={{
                fontSize: 30,
                fontWeight: 'bold'
            }}>AI Recipe Generator</Text>
            <Text style={{
                marginTop: 5,
                color: 'gray',
                fontSize: 16
            }}>Generate Personalized Recipes using AI</Text>
            <TextInput style={style.textArea}
                onChangeText={(value) => setInput(value)}
                placeholder='Enter Ingredients or Recipe Name' />
            <View style={{
                marginTop: 25
            }}>
                <Button title={'Generate Recipe'}
                    onPress={GenerateRecipeOptions}
                    loading={loading}
                />
            </View>
            {recipeOption?.length > 0 && <RecipeOptionList recipeOption={recipeOption} />}
        </View>
    )
}

const style = StyleSheet.create({
    textArea: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        fontSize: 20,
        marginTop: 15,
        height: 150,
        textAlignVertical: 'top',
        backgroundColor: 'white'
    }
})