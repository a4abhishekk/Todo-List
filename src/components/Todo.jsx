import React,{useEffect, useRef, useState} from 'react';
import todo_icon from '../assets/todo_icon.png';
import TodoItems from './TodoItems';

const Todo = () => {

    const [todoList, setTodoList]=useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")):[]);

    const inputRef = useRef();

    const add = () => {
        const inputText = inputRef.current.value.trim();

        if(inputText === ""){
            return;
        }

        const newTodo = {
            id: Date.now(), 
            text: inputText,
            isComplete: false,
        }
        setTodoList((prev)=> [...prev,newTodo]);
        inputRef.current.value = "";
    }

    const deleteTodo = (id) => {
        setTodoList((prvTodos) => {
          return prvTodos.filter((todo) => todo.id !== id)
        })
    }

    const toggle = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.map((todo) => {
                if(todo.id === id) {
                    return { ...todo, isComplete: !todo.isComplete }
                }
                return todo;
            })
        })
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todoList));
    }, [todoList]);

    return (
        <div className='bg-white w-full max-w-md flex flex-col p-7 min-h-[550px] rounded-xl shadow-lg'>
            <div className='flex items-center gap-2 mt-7'>
                <img className='w-8' src={todo_icon} alt=""/>
                <h1 className='text-3xl font-semibold'>To-Do List</h1>
            </div>

            <div className='flex items-center my-7 bg-gray-200 rounded-full p-2'>
                <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder-gray-600' type='text' placeholder='Add Your Task'/>
                <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-12 text-white text-lg font-medium cursor-pointer hover:bg-orange-500 transition duration-300 ease-in-out ml-2'>Add +</button>
            </div>

            {/* todo list */}
            <div className='flex-1 overflow-y-auto'>
                {todoList.map((item,index) => {
                    return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle} />
                })}
            </div>
        </div>
    );
}

export default Todo;
