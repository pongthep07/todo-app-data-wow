import { useContext } from 'react';
import { TodoContext } from '../../App';
export default function Progress() {

    const { todosList } = useContext(TodoContext)

    const todoCompleted = todosList.filter((item: any) => item.completed === true).length;

    const percenProgress = (todosList.filter((item: any) => item.completed === true).length / todosList.length) * 100

    return (
        <div className="box-progress">
            <div className="box-title">
                <h3>Progress</h3>
            </div>
            <div className="progress">
                <progress value={percenProgress.toFixed(2)} max="100">{percenProgress.toFixed(2)}%</progress>
            </div>
            <div className="box-completed">
                <p>{todoCompleted} completed</p>
            </div>
        </div>
    )
}

