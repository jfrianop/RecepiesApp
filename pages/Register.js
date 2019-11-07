import React, { useState, useEffect } from 'react';
import { View, Text, Button, AsyncStorage, TextInput } from 'react-native'
import axios from 'axios'

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async function () {
        try {
            const token = await axios.post('http://192.168.0.11:3001/register', { email, password });
            AsyncStorage.setItem('token', token);
            navigation.navigate('recepies');
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then((token) => {
                console.log('token: ', token)
                if (token) navigation.navigate('recepies')
            });
    }, [])

    return (
        <View>
            <Text>Inicio de Sesión</Text>
            <Text style={{ fontWeight: 'bold' }} >Usuario: </Text>
            <TextInput onChangeText={setEmail} value={email} />
            <Text style={{ fontWeight: 'bold' }} >Contraseña: </Text>
            <TextInput secureTextEntry onChangeText={setPassword} value={password} />
            <Button title='Registrarse' onPress={login} />
        </View>
    );
}