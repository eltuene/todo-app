import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import the necessary Firebase auth functions

import {db, app} from './src/firebaseConnection';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function cadastrar() {
    const auth = getAuth(app); // Get the Auth object from your Firebase connection

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert('Usuario criado: ' + user.email);
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        alert('Sua senha deve ter pelo menos 6 caracteres');
      } else if (error.code === 'auth/invalid-email') {
        alert('Email inválido');
      } else {
        alert('Ops, algo deu errado: ' + error.message);
      }
    }

    setEmail('');
    setPassword('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Email</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={(texto) => setEmail(texto)}
        value={email}
      />

      <Text style={styles.texto}>Senha</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={(texto) => setPassword(texto)}
        value={password}
      />

      <Button title="Cadastrar" onPress={cadastrar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  texto: {
    fontSize: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#121212',
    height: 45,
    fontSize: 17,
  },
});