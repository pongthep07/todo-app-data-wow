import { useState, useContext, useEffect, useRef } from 'react';

// import Todo from '../app/';
import Todo from '../../components/todo';


import api from '../../services/api';
import { TodoContext } from '../../App';
import React from 'react';


const TodoFilterContext = React.createContext<any>(null);


export { TodoFilterContext }
export default function AppBoxTodo() {

    const { todosList, setTodosList } = useContext(TodoContext);

    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState('All');

    const [todos, setTodo] = useState(todosList);
  
    const isFirstChange = useRef(true);
    useEffect(() => {
        if (isFirstChange.current && todosList.length > 0) {
            setTodo(todosList);
            isFirstChange.current = false
        } 
    }, [todosList]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleKeyDown = async (event: any) => {
        if (event.key === 'Enter') {

            let request = {
                id: Math.random().toString(36).replace('0.', ''),
                title: event.target.value,
                completed: false,

            }
            await api.post(`todos`, request).then(async () => {
                await api.get('todos').then((response: any) => {
                    
                    isFirstChange.current = true;
                    setTodosList(response.data)
                    setFilter('All')
                    event.target.value = null
                });
            });
        }
    };

    const activeItem = (type: string) => {
        if (type === filter) {
            return 'active'
        } else {
            return ''
        }

    }

    const selectFilter = (type: string) => {
        if (type === 'Done') {
            const result = todosList.filter((item: any) => item.completed === true);
            setTodo(result);
            setIsOpen(!isOpen);
            setFilter(type)
        } else if (type === 'Undone') {
            const result = todosList.filter((item: any) => item.completed !== true)
            setTodo(result);
            setIsOpen(!isOpen);
            setFilter(type);
        } else {
            setTodo(todosList);
            setIsOpen(!isOpen);
            setFilter(type);
        }
    }
    return (
        <div className="box-todo">
            <div className="box-head">
                <div className="box-title">
                    <h3>Tasks</h3>
                </div>
                <div className="box-filter">
                    <div className="dropdown-wrapper">
                        <div className="dropdown-btn" onClick={toggleDropdown}>
                            <span>{filter}</span>
                            <span className='icon-arrow'></span>
                        </div>
                        {isOpen && (
                            <div className="dropdown-menu">
                                <div className={`item ${activeItem('All')}`} onClick={() => selectFilter('All')}>All</div>
                                <div className={`item ${activeItem('Done')}`} onClick={() => selectFilter('Done')}>Done</div>
                                <div className={`item ${activeItem('Undone')}`} onClick={() => selectFilter('Undone')}>Undone</div>
                            </div>
                        )}

                    </div>

                </div>
            </div>
            <div className="box-todo-list">
                {todos.map((item: any, index: any) => {
                    return (
                        <TodoFilterContext.Provider value={setTodo} key={index}>
                            <Todo todo={item} filter={filter} />
                        </TodoFilterContext.Provider>
                    )
                })}
                <div className="box-content-todo">
                    <div className="form-input">
                        <input type="text" placeholder="Add your todo..." onKeyDown={handleKeyDown} />
                    </div>
                </div>

            </div>
        </div>
    )
}

