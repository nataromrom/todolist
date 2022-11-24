/**
 * Компонент формы для добавления новой записи. Возвращается разметка формы. Реализуются методы записи данных в firebase
 *  @param {object} formData - объект для хранения текущего стейта карточки
 *  @param  {string}  title - заголовок задачи.
 *  @param  {string}  description - описание задачи.
 *  @param  {string}  image - ссылка на файл.
 *  @param  {string}  createdAt - дата создания карточки.
 * @param  {string}  dateTo - дата выполнения задачи.
 *  @returns -Возвращается разметка формы.
 */


import React, { useState } from "react";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../firebaseConfig";


export default function AddTodo() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        createdAt: Timestamp.now().toDate(),
        dateTo: Timestamp.now().toDate(),
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handlePublish = () => {
        if (!formData.title || !formData.description || !formData.image) {
            alert("Пожалуйста заполните все поля");
            return;
        }

        const storageRef = ref(
            storage,
            `/files/${Date.now()}${formData.image.name}`
        );

        const uploadImage = uploadBytesResumable(storageRef, formData.image);

        uploadImage.on(
            "state_changed",
            () => {
                console.log('Загрузка');
            },
            (err) => {
                console.log(err);
            },
            () => {
                setFormData({
                    title: "",
                    description: "",
                    image: "",
                });

                getDownloadURL(uploadImage.snapshot.ref).then((url) => {
                    const todoRef = collection(db, "Todo");
                    addDoc(todoRef, {
                        title: formData.title,
                        description: formData.description,
                        imageUrl: url,
                        createdAt: Timestamp.now().toDate(),
                        dateTo: formData.dateTo,
                        status: false,

                    })
                        .then(() => {
                        })
                        .catch((err) => {
                        });
                });
            }
        );
    };

    return (
        <div className="todo-add-card" >

            <div className="card-title"><h2>Добавить задачу</h2></div>
            <div className="form-group">
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    placeholder="Заголовок"
                    onChange={(e) => handleChange(e)
                    }
                />
                <textarea
                    name="description"
                    className="form-control"
                    placeholder="Описание"
                    value={formData.description}
                    onChange={(e) => handleChange(e)}
                />

                <label htmlFor="">Дата завершения</label>
                <input name="dateTo" type="date" onChange={(e) => handleChange(e)} className="form-control" />

                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="form-control"
                    onChange={(e) => handleImageChange(e)}
                />

                <button className="form-control btn-add" onClick={handlePublish}> ДОБАВИТЬ </button>
            </div>
        </div>
    );
}