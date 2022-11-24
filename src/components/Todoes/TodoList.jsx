/**
 * Компонент для получения данных из firebase и генерации карточек задач.
 *  @param {array} todoList - массив полученных из базы данных задач.
 *  @param  {string}  id - идентификатор задачи.
 *  @param  {string}  title - заголовок задачи.
 *  @param  {string}  description - описание задачи.
 *  @param  {string}  image - ссылка на файл.
 *  @param  {string}  createdAt - дата создания карточки.
 *  @param  {string}  dateTo - дата выполнения задачи.
 *  @returns - Возвращается разметка - сгенерированный массив карточек.
 */


import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import ToDoCard from "./TodoCard";


export default function TodoList() {
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        const articleRef = collection(db, "Todo");
        const q = query(articleRef, orderBy("createdAt", "desc"));
        onSnapshot(q, (snapshot) => {
            const todoList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTodoList(todoList);
        });
    }, []);


    return (
        <div >
            {todoList.length === 0 ? (
                <p>Список задач пуст!</p>
            ) : (
                todoList.map(
                    ({
                        id,
                        title,
                        description,
                        imageUrl,
                        dateTo,
                        status

                    }) => (

                        <ToDoCard
                            id={id}
                            key={id}
                            title={title}
                            description={description}
                            imageUrl={imageUrl}
                            dateTo={dateTo}
                            status={status}
                        ></ToDoCard>
                    )
                )
            )}
        </div>
    );
}