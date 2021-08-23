import {useContext, useState} from 'react'
import {FirebaseContext} from './index'
import {useAuthState, useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {useCollection} from 'react-firebase-hooks/firestore'


const App = () => {
  const {firebase, auth, db} = useContext(FirebaseContext);
  const [email, setEmail] = useState ('')
  const [password, setPassword] = useState ('')
  const [message, setMessage] = useState ('')

  const [user, loading, error] = useAuthState(auth)

  const [login, loadingCreateUser, errorCreateUser] = useCreateUserWithEmailAndPassword(auth)
  const [snapshot, loadingDB, errorDB] = useCollection(db.collection('message'))


  const authGoogle = async () => await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  const signOut = async () => {await auth.signOut()}
  const addedDB = async () => {await db.collection('message').doc().set({message, uid: user.uid });
      setMessage ('')
  }
  const deleted = async id => db.collection('message').doc(id).delete()

  if (errorCreateUser) return <h2 style = {{color: 'red'}}>Error ... {error.message}</h2>
  if (loading) return <h2>Loading ...</h2>
  if (user) return (
    <>
      <h2>Your name: {user.displayName || 'You have no name'}</h2>
      <button onClick={signOut}> Sign-Out </button>
      <br/>
      <input type = "text" value={message} onChange = {e => setMessage(e.target.value)}/>
      <button onClick = {addedDB}> AddedDB </button>
      <br/>

      {errorDB && <h3 style = {{color: 'red'}}>{errorDB.message}</h3>}
      {loadingDB && <h3>Loading...</h3>}
      {snapshot && snapshot.docs.length !==0 && snapshot.docs.map(doc => (
        <div style={{border: '1px solid black'}} key = {doc.id}>
          <h5> {doc.data().message}</h5>
          <button onClick={()=> deleted(doc.id)}>Deleted</button>
        </div>
      ))}
    </>
  )

  return (
    <div className="App">
      <h2>You are no register</h2>
      <input 
        placeholder ={'email'}
        type = "text"
        value = {email}
        onChange = {e => setEmail(e.target.value)}
        />
      <br/>
      <input 
        placeholder ={'password'}
        type = "password"
        value = {password}
        onChange = {e => setPassword(e.target.value)}
      />
      <br/>
      <button onClick ={authGoogle}> Enter with Google</button>
      <br/>
      <button onClick ={()=>login(email, password)}> Enter with Email</button>
    </div>
  );
}

export default App;
