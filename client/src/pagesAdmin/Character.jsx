import React, { useState, useEffect } from "react";
import { $authHost, $host } from '../http/index';
import '../styles/pagesAdmin/character.css';
import Modal from "../component/Modal";

function Character() {
  const [date, setDate] = useState([]);
  const [catalogs, setCatalogs] = useState([]);
  const [open, setOpen] = useState({ isModal: false });
  const [editing, setEditing] = useState({ id: '', isModal: false, initialData: null });

  const editingModal = (ids, modOP, initialData) => {
    setEditing({ id: ids, isModal: !modOP, initialData });
  };

  const getApp = async () => {
    const res = await $host.get(`api/character/add`);
    setDate(res.data);
  };

  const getCatalogs = async () => {
    const res = await $host.get(`api/catalog/receiving`);
    setCatalogs(res.data);
  };

  const deleteApp = async (id) => {
    await $authHost.delete(`api/character/deletion/${id}`);
    getApp();
  };

  const openModal = (mod) => {
    setOpen({ isModal: !mod });
  };

  useEffect(() => {
    getApp();
    getCatalogs();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      await $authHost.post('api/character/addition', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      getApp();
      setOpen({ isModal: false });
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const editingSubmit = async (editingData, id) => {
    try {
      const data = new FormData();
      Object.keys(editingData).forEach((key) => {
        data.append(key, editingData[key]);
      });
      await $authHost.put(`api/character/editing/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      getApp();
      setEditing({ isModal: false, id: '', initialData: null });
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const getCatalogOptions = () => {
    return catalogs.map(catalog => ({
      value: catalog.id_catalog.toString(),
      label: catalog.name
    }));
  };

  const fields = [
    { name: "name", type: "text", placeholder: "Название", required: true, maxLength: 300 },
    { name: "descript", type: "textarea", placeholder: "Описание", required: true, maxLength: 1500 },
    { name: "price", type: "text", placeholder: "Цена", required: true },
    { 
      name: "id_catalog", 
      type: "select", 
      placeholder: "Привязать к каталогу", 
      required: true,
      options: getCatalogOptions()
    },
    { name: "img", type: "file", required: true },
  ];

  const field = [
    { name: "name", type: "text", placeholder: "Название", required: false, maxLength: 300 },
    { name: "descript", type: "textarea", placeholder: "Описание", required: false, maxLength: 1500 },
    { name: "price", type: "text", placeholder: "Цена", required: false },
    { 
      name: "id_catalog", 
      type: "select", 
      placeholder: "Привязать к каталогу", 
      required: false,
      options: getCatalogOptions()
    },
    { name: "img", type: "file", required: false },
  ];

  return (
    <div className='Character'>
      <h2>Админ панель</h2>
      <div className="Character__button">
        <button onClick={() => openModal(open.isModal)}>Добавить</button>
      </div>
      {open.isModal && (
        <Modal
          onClose={() => setOpen({ isModal: false })}
          onSubmit={handleSubmit}
          fields={fields}
          title="Добавить товар"
          submitButtonText="Добавить"
        />
      )}
      <div className="Character-flex">
        {date.map((el) => (
          <div className="Character__box" key={el.id_character}>
            <div className="Character__content">
              <div className='Character__content-title'>
                <img src={`https://tarasovasanteh.store/` + el.img} className="img" alt="1" />
                <p>{el.name}</p>
                <p>{el.descript}</p>
              </div>
              <div className='Character__content-desc'>
                <p>{el.price}</p>
                <img onClick={() => deleteApp(el.id_character)} className="Character__box-img" src="imeges/back.svg" alt="back" />
              </div>
              <button onClick={() => editingModal(el.id_character, editing.isModal, el)} className="Character__box-editing">Обновить</button>
              {editing.isModal && el.id_character === editing.id && (
                <Modal
                  onClose={() => setEditing({ isModal: false, id: '', initialData: null })}
                  onEdit={(data) => editingSubmit(data, el.id_character)}
                  fields={field}
                  title="Обновить товар"
                  submitButtonText="Обновить"
                  initialData={editing.initialData}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Character;