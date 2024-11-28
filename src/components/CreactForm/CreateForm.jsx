'use client'
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import useAxios from '../hooks/useAxios';
import { useQueryClient } from '@tanstack/react-query';

const CreateForm = () => {

    const axios = useAxios()
    const queryClient = useQueryClient()

    const createTask = async (e) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const task = form.get('task')
        const description = form.get('description')

        if (!task || !description) {
            toast.error('Both fields are required!')
            return
        }

        const data = {
            task, description
        }
        const res = await axios.post('/tasks', data)
        if (res.data.insertedId) {
            toast.success('Task Added Successful !')
            queryClient.invalidateQueries('tasks');
            e.target.reset()
        }


    }


    return (
        <div className='md:px-7 md:py-14 p-3  shadow-md rounded-md  border-y-4 border-sky-500'>
            <Toaster></Toaster>
            <h3 className="text-2xl font-bold text-center text-sky-500">Create A Task</h3>
            <div>
                <form onSubmit={createTask} className='md:w-3/4 mx-auto space-y-3'>
                    <div className="w-full">
                        <label htmlFor="task" className="font-bold"> Task </label>
                        <input
                            type="text"
                            name="task"
                            id="task"
                            placeholder="Task Title"
                            className=" border rounded-md outline-none px-4 w-full mt-1 py-2 focus:border-sky-500 transition-colors duration-300"
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="description" className="font-bold"> Description </label>
                        <textarea
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Write description"
                            className="border  rounded-md outline-none mt-1 px-4 w-full py-3 min-h-[100px] focus:border-sky-500 transition-colors duration-300"
                        />
                    </div>

                    <div className='flex justify-center items-center'>
                        <button type='submit' className='hover:shadow-md border w-40 font-bold px-4 py-2 rounded-md  border-b-4 border-sky-500 text-sky-500'>Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateForm;