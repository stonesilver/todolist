import CloseIcon from "../../assets/icons/close.svg?react";
import EditIcon from "../../assets/icons/edit.svg?react";

import './todo-list-item.styles.scss'

type PropsContext = {
    task: string,
    done: boolean,
    handleRemoveTodo: () => void,
    handleToggleTodoState: () => void,
    handleEdit: () => void,
}

const Index = ({ task, done, handleRemoveTodo, handleToggleTodoState, handleEdit }: PropsContext) => {
    return (
        <div className='todo-list-container'>
            <input type="checkbox" name="" className='checkbox' checked={done} onChange={handleToggleTodoState} />
            <p className={`todo-text ${done ? 'todo-done-text' : null}`}>{task}</p>
            <div className="action-btn">
                <CloseIcon className="action-btn-btns" onClick={handleRemoveTodo} />
                <EditIcon className="action-btn-btns" onClick={handleEdit} />
            </div>
        </div>
    )
}

export default Index