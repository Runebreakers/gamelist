'use client'

import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function ToggleCompleted({ todo }) {
    const [isCompleted, setIsCompleted] = useState(todo.completed)

    const handleToggle = async () => {
        const { error } = await supabase
            .from('todos')
            .update({ completed: !isCompleted })
            .eq('id', todo.id)

        if (error) {
            console.error('Update failed: ', error)
        } else {
            setIsCompleted(!isCompleted)
        }
    }

    return (
        <input type="checkbox" checked={isCompleted} onChange={handleToggle} />
    )
}
