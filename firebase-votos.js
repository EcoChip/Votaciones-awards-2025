// Importa estas funciones al inicio de tu archivo JS:
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAK2Y32FiR6cMh7Xl_cE0hjzqqryj7dtd4",
  authDomain: "votaciones-awards.firebaseapp.com",
  projectId: "votaciones-awards",
  storageBucket: "votaciones-awards.firebasestorage.app",
  messagingSenderId: "685121135221",
  appId: "1:685121135221:web:5ebbf9b9574da673438e3c",
  measurementId: "G-M0JVTXNPF7"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Ejemplo: agregar un voto
async function agregarVoto(nombreVotante, amigo, opciones) {
  try {
    await addDoc(collection(db, "votos"), {
      nombreVotante,
      amigo,
      opciones,
      fecha: new Date()
    });
    console.log("Voto agregado!");
  } catch (e) {
    console.error("Error al agregar voto: ", e);
  }
}

// Ejemplo: obtener todos los votos
async function obtenerVotos() {
  const votos = [];
  const querySnapshot = await getDocs(collection(db, "votos"));
  querySnapshot.forEach((doc) => {
    votos.push({ id: doc.id, ...doc.data() });
  });
  return votos;
}

// Ejemplo: eliminar todos los votos (para reiniciar)
async function eliminarTodosVotos() {
  const querySnapshot = await getDocs(collection(db, "votos"));
  for (const doc of querySnapshot.docs) {
    await deleteDoc(doc.ref);
  }
  console.log("Todos los votos eliminados.");
}
