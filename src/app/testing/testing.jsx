'use client'

import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import ToggleCompleted from './ToggleCompleted'

export default function Testing(){

    const [todos, setTodos] = useState([])

    useEffect(() => {
        fetchTodos()
    }, [todos.completed])

    const fetchTodos = async () => {
            try{
                const { data, error } = await supabase
                .from('todos')
                .select('*')
                .order('id')
                
                if (error){
                    throw error
                }
                setTodos(data)
                console.log(data)
                
            } catch (error){
                console.error('Error fetching todos: ', error)
            }      
        }

    return (
        <div className='p-5'>
            <h1 className='text-2xl'>Todos:</h1>
            <ol>
                {todos.map(todo => (
                    <div key={todo.id}>
                        <div className='flex space-x-0.5'>
                            <p><strong>{todo.id}.</strong></p>
                            <h2><strong>{todo.name}</strong></h2>
                        </div>
                        <li key={todo.id}>{todo.desc}</li>
                        <div className='flex space-x-0.5'>
                            <p>Completed: {`${todo.completed}`}</p>
                            <ToggleCompleted todo={todo}/>
                        </div>
                    </div>
                ))}
            </ol>
        </div>
    )

}