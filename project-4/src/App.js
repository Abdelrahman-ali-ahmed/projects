import { useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { AddTodoAction ,RemoveTodoAction} from './redux/action/TodoAction';

function App() {
  const[todo,setTodo]=useState();
  const dispatch=useDispatch();
  const state=useSelector(state =>state.Todo)
  const {todos}=state;
  const handelChange=(e)=>{
    setTodo(e.target.value)

  };
  const handelSubmit=(e)=>{

    e.preventDefault();
    dispatch(AddTodoAction(todo));
    ;
  }
  const handelDelete=(todo)=>{
    dispatch(RemoveTodoAction(todo));
  }
 


  return (
    <div className="App">
      <header className="App-header">
      <h2>Todolist</h2> 
    <form  onSubmit={handelSubmit}>
     <input placeholder='enter a todo' style={{
width: 350,
padding: 10,
borderRadius: 20,
border: "none",
fontSize: 20,
  }}
  onChange={handelChange}/>
     <button type='submit'style={{borderRadius:25,
        padding:10,
        border:"1xp solid white",
        color:"white",
        backgroundColor:"orangered"}} > Go</button>
    </form>
    <ul className='allTodos'>
      {todos&& todos.map((t)=>( 
      <li key={t.id} className='singleTodo'>
        <span className='todoText'> {t.todo}</span>
        <button style={{borderRadius:25,
        padding:10,
        border:"1xp solid white",
        color:"white",
        backgroundColor:"orangered"}}
        onClick={()=>handelDelete(t)}>
          Delete
        </button>
      </li>))}
     
    </ul>
      </header>
    </div>
  );
}

export default App;
