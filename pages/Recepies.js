import React, { useState, useEffect } from 'react';
import { View, Text, AsyncStorage, FlatList } from 'react-native'
import axios from 'axios'

export default function Recepies() {
    const [recipes, setRecipes] = useState([{ name: "ajiaco", description: "Sopa de ajiaco", id: "test1" }, { name: "cuchuco", description: "Sopa de cuchuco", id: "test2" }])
    const [count, setCount] = useState(0);
    const [sessionToken, setToken] = useState("")

    useEffect(() => {
        setCount(1);
        AsyncStorage.getItem('token')
            .then((token) => {
                setToken(token);
                console.log("Token before request: ", token)
                axios.get(
                    'http://192.168.0.11:3001/recipe',
                    {
                        headers: {
                            "authorization": token
                        }
                    }
                )
                    .then((response) => {
                        const arr = response.data;
                        console.log("Response from server:", arr)
                        console.log(setRecipes)
                        setRecipes((state) => arr);
                        console.log("Recipes: ", recipes);
                    },
                        (error) => {
                            console.log(error.response.status)
                        }
                    );
            });


    }, [])

    return (
        <View>
            <Text>Recetas, count {count}</Text>
            <FlatList
                data={recipes.map(recipe => ({ ...recipe, key: recipe.id }))}
                renderItem={recipe => {
                    <>
                        <Text style={{ fontWeight: 'bold' }} >{recipe.name}</Text>
                        <Text>{recipe.description}</Text>
                    </>
                }}
            />
        </View>
    );
}