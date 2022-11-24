/**
 * Компонент принимает параметры, по которым реализуется метод для удаления записи из firebase. Возвращается кнопка для удаления.
 *  @param {string} id - идентификатор записи для обращения в базу данных.
 *  @param  {string}  imageUrl - идентификатор изображения.
 *  @returns - Возвращается кнопка для использования метода удаления.
 */


import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db, storage } from "../../firebaseConfig";
import { deleteObject, ref } from "firebase/storage";

export default function DeleteArticle({ id, imageUrl }) {
    const handleDelete = async () => {
        console.log(id)
        if (window.confirm("Вы точно хотите удалить запись?")) {
            try {
                await deleteDoc(doc(db, "Todo", id));
                const storageRef = ref(storage, imageUrl);
                await deleteObject(storageRef);
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <div>
            <button className="button btnDelete" onClick={handleDelete} ></button>
        </div>
    );
}
