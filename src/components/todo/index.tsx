import { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';




import api from '../../services/api';
import { TodoContext } from '../../App';
import { TodoFilterContext } from '../../sections/app/AppBoxTodo';


Todo.propTypes = {
    todo: PropTypes.any,
    filter: PropTypes.string
};


export default function Todo({ todo, filter }: { todo: any, filter: string }) {

    const { setTodosList } = useContext(TodoContext);
    const setTodo = useContext(TodoFilterContext)

    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [inputValue, setInputValue] = useState(todo.title || '');
    const [isChecked, setIsChecked] = useState(todo.completed);

    useEffect(() => {
        setIsChecked(todo.completed)
    }, [todo]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const changeStatus = async () => {
        setIsChecked(!isChecked)
        let request = {
            title: todo.title,
            completed: !isChecked
        }

        await api.put(`todos/${todo.id}`, request).then(async () => {
            await api.get('todos').then((response: any) => {
                if (filter === 'Done') {
                    const result = response.data.filter((item: any) => item.completed === true)
                    setTodo(result)
                    setTodosList(response.data)
                }else if (filter === 'Undone'){
                    const result = response.data.filter((item: any) => item.completed !== true)
                    setTodo(result)
                    setTodosList(response.data)
                }else {
                    setTodo(response.data)
                    setTodosList(response.data)
                }

                

            });
        });
    }
    const delItem = async () => {
        await api.del(`todos/${todo.id}`).then(async () => {
            setIsOpen(!isOpen);

            await api.get('todos').then((response: any) => {
                
                if (filter === 'Done') {
                    const result = response.data.filter((item: any) => item.completed === true)
                    setTodo(result)
                    setTodosList(response.data)
                }else if (filter === 'Undone'){
                    const result = response.data.filter((item: any) => item.completed !== true)
                    setTodo(result)
                    setTodosList(response.data)
                }else {
                    setTodo(response.data)
                    setTodosList(response.data)
                }
            });
        });

    }

    const handleClick = () => {
        setIsEdit(!isEdit);
        setIsOpen(!isOpen);
    };


    const editTodo = async () => {
        let request = {
            title: inputValue,
            completed: todo.completed
        }

        await api.put(`todos/${todo.id}`, request).then(async () => {
            await api.get('todos').then((response: any) => {

                if (filter === 'Done') {
                    const result = response.data.filter((item: any) => item.completed === true)
                    setTodo(result)
                    setTodosList(response.data)
                }else if (filter === 'Undone'){
                    const result = response.data.filter((item: any) => item.completed !== true)
                    setTodo(result)
                    setTodosList(response.data)
                }else {
                    setTodo(response.data)
                    setTodosList(response.data)
                }
                setIsEdit(!isEdit);
            });
        });
    };



    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const isItemComplete = isChecked ? 'dash' : ''

    return (
        <div className="box-content-todo">
            {!isEdit ? <div className="form-checkbox">
                <input type="checkbox" checked={isChecked} onChange={changeStatus} />
                <label className={isItemComplete}>{todo.title}</label>
            </div> : <div className="form-input">
                <input type="text" value={inputValue} onChange={handleInputChange} />
            </div>
            }
            {!isEdit ? <div className="more">
                <div className="btn-more" onClick={toggleDropdown}>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>

                {isOpen && (
                    <div className="dropdown-menu">
                        <div className="item" onClick={handleClick}>Edit</div>
                        <div className="item danger" onClick={delItem} >Delete</div>
                    </div>
                )}
            </div> : <div className="box-btn-save">
                <button className='btn btn-save' onClick={editTodo}>Save</button>
            </div>}


        </div>
    )
}

