import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native"
import { ref, onValue, push, remove, update } from 'firebase/database';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth } from "firebase/auth"

import { db, app } from "./src/firebaseConnection"

import TaskCard from './src/components/TaskCard';

export default function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState("")
  const [userId, setUserId] = useState("")
  const [loading, setLoading] = useState(true);
  const [todo, setTodo] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState('');

  const auth = getAuth(app)

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
    } finally {
      setPassword('');
    }

  }

  async function logar() {
    await signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        setUser(value.user.email)
        setUserId(value.user.uid)
        fetchUser(value.user.uid)
      })
      .catch((error) => {
        console.log(error)
        return
      })

    setEmail("")
    setPassword("")
  }
  const fetchUser = async (userKey) => {
    try {
      onValue(ref(db, `/tasks/${userKey}`), (querySnapShot) => {
        const todoData = querySnapShot.val() || {};
        console.log('Dados do usuário: ', todoData);
        setTodo(todoData);
        setLoading(false);
      });

    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  async function logout() {
    await signOut(auth)
    setUser("")
  }

  function addNewTodo() {
    push(ref(db, `/tasks/${userId}`), {
      deadline: '2023-11-25',
      finalizada: false,
      nome: newTask,
    });
    setNewTask('');
  }
  const removerTarefa = (id) => {
    const userRef = ref(db, `/tasks/${userId}/${id}`);
    remove(userRef)
      .then(() => {
        console.log(`removido`);
      })
      .catch((error) => {
        console.error(`Erro ao remover o usuário: ${error}`);
      });
  };

  const toggleCheckBox = (id, value) => {
    const userRef = ref(db, `/tasks/${userId}/${id}`);
    update(userRef, {
      finalizada: value
    })
      .then(() => {
        console.log(`removido`);
      })
      .catch((error) => {
        console.error(`Erro ao editar o usuário: ${error}`);
      });
  }

  const handleEdit = (id) => {
    setEditMode(true);
    setEditingId(id);
    setNewTask(todo[id].nome);
  }
  const cancelEdit = () => {
    setEditMode(false);
    setEditingId('');
    setNewTask('');
  }

  const saveEdit = () => {
    const userRef = ref(db, `/tasks/${userId}/${editingId}`);
    update(userRef, {
      nome: newTask
    })
      .then(() => {
        console.log(`removido`);
      })
      .catch((error) => {
        console.error(`Erro ao editar o usuário: ${error}`);
      });
    setEditMode(false);
    setNewTask('');
  }

  return (
    <View style={styles.container}>
      {
        user.length === 0 ? (
          <>
            <Text style={styles.texto}>Email</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid='transparent'
              onChangeText={(texto) => setEmail(texto)}
              value={email}
            />

            <Text style={styles.texto}>Senha</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid='transparent'
              onChangeText={(texto) => setPassword(texto)}
              value={password}
              secureTextEntry
            />

            <Button title='Acessar' onPress={logar} />
            <Button title="Cadastrar" onPress={cadastrar} />
          </>
        ) : (
          <>
            <Text
              style={{
                marginTop: 20,
                marginBottom: 20,
                fontSize: 23,
                textAlign: "center",
              }}
            >
              {user}
            </Text>
            <Button title='Logout' onPress={logout} />
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.container}>
                {loading ? (
                  <Text>Carregando...</Text>
                ) : (
                  Object.keys(todo).map((itemId) => (
                    <TaskCard id={itemId}
                      data={todo[`${itemId}`]}
                      handleDelete={removerTarefa}
                      handleCheckbox={toggleCheckBox}
                      handleEdit={handleEdit}
                    />
                  ))
                )}
                <TextInput
                  style={styles.input}
                  value={newTask}
                  onChangeText={(text) => setNewTask(text)}
                  placeholder="Nova Tarefa"
                />
                {
                  editMode ?
                    <>
                      <Button title='Salvar' onPress={saveEdit} />
                      <Button title='Cancelar' onPress={cancelEdit} />
                    </>
                    : <Button title='Adicionar' onPress={addNewTodo} />
                }

              </View>
            </ScrollView>
          </>
        )
      }
    </View>
  )
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
    borderColor: "#121212",
    height: 45,
    fontSize: 17,
  },
})
