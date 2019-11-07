import React, { useState, useEffect } from 'react';
import { View, Text, Button, AsyncStorage, TextInput } from 'react-native'
import axios from 'axios'

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then((token) => {
                console.log('token: ', token)
                if (token) navigation.navigate('recepies')
            });
    }, [])

    const login = async function () {
        try {
            const { data } = await axios.post('http://192.168.0.11:3001/login', { email, password });
            console.log('token: ', data.token)
            AsyncStorage.setItem('token', data.token);
            navigation.navigate('recepies');
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <View>
            <Text>Inicio de Sesión</Text>
            <Text style={{ fontWeight: 'bold' }} >Usuario: </Text>
            <TextInput onChangeText={setEmail} value={email} />
            <Text style={{ fontWeight: 'bold' }} >Contraseña: </Text>
            <TextInput secureTextEntry onChangeText={setPassword} value={password} />
            <Button title='Iniciar Sesión' onPress={login} />
            <Button title='Registrarse' onPress={() => navigation.navigate('register')} />
        </View>
    );
}

/*<Button title='Registrarse' onPress={() => navigation.navigate('register')} />
    <Button title='Recetas' onPress={() => navigation.navigate('recepies')} />
    <Button title='Nueva Receta' onPress={() => navigation.navigate('newRecepie')} />
    <Button title='Nuevo Ingrediente' onPress={() => navigation.navigate('newIngridient')} />
    <Button title='Detalles de una Receta' onPress={() => navigation.navigate('recepieDetails')} />*/