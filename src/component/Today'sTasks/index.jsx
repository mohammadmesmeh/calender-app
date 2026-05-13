
import { Task } from "../Task";
import { tasks } from "../../Mock Data/data";
import { useState } from "react";
import { AddButtonsNonBg } from '../Buttons/AddButtonsNonBg'
import { Plus } from 'lucide-react'
export const TodaysTasks = () => {
    const [tasksState, setTasks] = useState([

        ...tasks
    ]
    );

    const toggleTask = (id) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };
    return (
        <div className="w-full bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">



                <h2 className="text-xl font-semibold  ">Today's Tasks</h2>
                <AddButtonsNonBg content='Add Task ' className="bg-transparent shadow-none hover:shadow-none" >
                    <Plus />

                </AddButtonsNonBg>
            </div>
            <ul className="flex flex-col gap-4 overflow-y-auto max-h-64">
                {tasksState.map((task) => (
                    <Task key={task.id} {...task} onToggle={() => toggleTask(task.id)} />
                ))}
            </ul>
        </div>
    )
}
