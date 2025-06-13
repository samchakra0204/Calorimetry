/*import { View, Text, FlatList } from 'react-native'
import React from 'react'

export default function RecipeIngredients({ RecipeDetail }) {
    const ingredients = (RecipeDetail?.jsonData)?.ingredients??[];
    console.log(ingredients);
    return (
        <View style={{
            marginTop: 15
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>Ingredients</Text>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>{ingredients?.length}</Text>
            </View>
            <FlatList
                data={ingredients}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5
                        }}>
                            <Text style={{
                                padding: 4,
                                fontSize: 23,
                                backgroundColor: 'white',
                                borderRadius: 99
                            }}>{item?.icon}</Text>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: '600'
                            }}>{item?.ingredients}</Text>
                        </View>
                        <Text style={{
                            color: 'gray',
                            fontSize: 16
                        }}>{item?.quantity}</Text>
                    </View>
                )}
            />
        </View>
    )
}*/

import { View, Text, FlatList } from 'react-native';
import React from 'react';

export default function RecipeIngredients({ RecipeDetail }) {
    const ingredients = RecipeDetail?.jsonData?.ingredients ?? [];

    if (!Array.isArray(ingredients)) {
        console.warn("Ingredients is not an array:", ingredients);
        return null;
    }

    console.log(ingredients);

    return (
        <View style={{ marginTop: 15 }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ingredients</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{ingredients.length}</Text>
            </View>

            <FlatList
                data={ingredients}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            columnGap: 8  // or use marginLeft if 'gap' doesn't work
                        }}>
                            <Text style={{
                                padding: 4,
                                fontSize: 23,
                                backgroundColor: 'white',
                                borderRadius: 99
                            }}>{item?.icon ?? '🍽️'}</Text>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: '600'
                            }}>{item?.ingredients ?? 'Unnamed'}</Text>
                        </View>
                        <Text style={{
                            color: 'gray',
                            fontSize: 16
                        }}>{item?.quantity ?? '-'}</Text>
                    </View>
                )}
            />
        </View>
    );
}
