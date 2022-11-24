/**
 * Компонент карточки задачи. Реализованы методы редактирования, сохранения, подключен компонент для удаления карточки.
 *  @param  {string}  id - идентификатор задачи.
 *  @param  {string}  title - заголовок задачи.
 *  @param  {string}  description - описание задачи.
 *  @param  {string}  image - ссылка на файл.
 *  @param  {string}  createdAt - дата создания карточки.
 *  @param  {string}  dateTo - дата выполнения задачи.
 *  @returns - Возвращается разметка - карточка задачи.
 */

import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import DeleteArticle from "../DeleteTodo/DeleteTodo";

import { updateDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebaseConfig";


export default function ToDoCard(props) {
    const [isEdited, setEdited] = useState(false);

    let now = dayjs();

    const [state, setState] = useState({
        key: props.id,
        title: props.title,
        description: props.description,
        dateTo: props.dateTo,
        imageUrl: props.imageUrl,
        status: props.status,
    });

    const editChange = () => {
        setEdited(!isEdited);
    }

    const editDone = () => {
        setState({ ...state, status: !state.status });
    }

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        postChange()
    }, [state.status])

    const saveChange = () => {
        setEdited(!isEdited);
        postChange()
    };


    const postChange = async () => {
        try {
            const todoRef = doc(db, "Todo", state.key);
            await updateDoc(todoRef, state);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className={new Date(state.dateTo) < now ? "todo-container alert" : "todo-container"} key={state.id}>
            {state.status ? <div className="done-mark">✅</div> : ""}
            {isEdited ? <input type="text" value={state.title} name="title" onChange={handleChange} /> : <h2>{state.title}</h2>}
            {isEdited ? <textarea value={state.description} name="description" onChange={handleChange} /> : <p>{state.description}</p>}
            {isEdited ? <input name="dateTo" type="date" value={state.dateTo} onChange={handleChange} /> : <p className={new Date(state.dateTo) < now ? "datePass" : ""}>{dayjs(state.dateTo).format('MMM D, YYYY')}</p>}
            {state.imageUrl ? <img src={state.imageUrl} alt="title" className="todo-img " /> : ""}
            <div className="controls">
                {isEdited ? <button className="button btnSave" onClick={saveChange} ></button>
                    : <button className="button btnEdit" onClick={editChange}></button>}
                <button onClick={editDone} className="button btnDone"></button>
                <DeleteArticle id={props.id} imageUrl={props.imageUrl} />
            </div>
        </div>
    );
}

