'use client'
import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SingleTasks from './SingleTasks';

const ShowTasks = () => {

    const axios = useAxios()
    const [pages, setPages] = useState([])
    const [itemParPage, setItemParPage] = useState(6)
    const [currentPage, setCurrentPage] = useState(0)

    const { data: AllTasks = [], isLoading, refetch } = useQuery({
        queryKey: ['tasks', axios, currentPage, itemParPage],
        queryFn: async () => {
            const res = await axios.get(`/tasks/task?page=${currentPage}&size=${itemParPage}`)
            return res.data
        }
    })


    const { data: count = {} } = useQuery({
        queryKey: ['tasksCount', axios],
        queryFn: async () => {
            const res = await axios.get('/tasksCount')
            return res.data
        }
    })

    useEffect(() => {
        if (count.count) {
            const numberOfPages = Math.ceil(count.count / itemParPage)
            const page = [...Array(numberOfPages).keys()];
            setPages(page)
        }
    }, [itemParPage, count])

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    }

    if(isLoading){
        return <p className=''>Loading.......</p>
    }

    return (
        <div>
            <div className='flex gap-3 items-center my-10'>
                <div className='h-10 w-3 bg-sky-500'></div>
                <h3 className="text-2xl font-bold">All Tasks</h3>
            </div>
            <div className='grid md:grid-cols-3 gap-5'>
                {
                    AllTasks.map(tasks => <SingleTasks key={tasks._id} tasks={tasks}></SingleTasks>)
                }
            </div>

            <div className="md:w-1/2 mx-auto mt-10 mb-5">
                <button onClick={handlePrevPage} className="px-2 py-2 mr-3 "><FaChevronLeft /></button>
                {
                    pages?.map(page => <button onClick={() => setCurrentPage(page)} key={page} className={currentPage === page ? "px-3 py-1 text-white bg-sky-400 hover:bg-sky-500 mr-3 rounded-sm mb-2" : "px-3 py-1 bg-sky-100 hover:bg-sky-200 mr-3 rounded-sm mb-2"}>{page + 1}</button>)
                }
                <button onClick={handleNextPage} className="px-2 py-2 mr-3"><FaChevronRight /></button>
            </div>
        </div>
    );
};

export default ShowTasks;