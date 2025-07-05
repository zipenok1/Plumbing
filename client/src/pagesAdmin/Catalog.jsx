import React, {useEffect, useState} from "react";
import {$authHost , $host} from '../http/index'
import '../styles/pagesAdmin/catalog.css'
import Modal from "../component/Modal";

function Catalog() {
  
  const [date, setDate] = useState([])
  const [open, setOpen] = useState({ isModal: false });
  const [editing, setEditing] = useState({ id: '', isModal: false, initialData: null });

  const editingModal = (ids, modOP, initialData) => {
    setEditing({ id: ids, isModal: !modOP, initialData });
  };

  const openModal = (mod) => {
    setOpen({ isModal: !mod });
  };
  
  const getApp = async () =>{
    const res = await $host.get('api/catalog/receiving')
    setDate(res.data)
  }
  
  const handleSubmit = async (formData) => {
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      await $authHost.post('api/catalog/addition', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      getApp(); 
      setOpen({ isModal: false })
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  useEffect(()=>{
    getApp()
  },[])


  const editingSubmit = async (editingData, id) => {
    try {
      const data = new FormData();
      Object.keys(editingData).forEach((key) => {
        data.append(key, editingData[key]);
      });
      await $authHost.put(`api/catalog/editing/${id}`, data, {
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

  const fields = [
    { name: "name", type: "text", placeholder: "Название", required: true },
  ];
  
  return (
    <div className='Catalog' style={{paddingTop:'50px'}}>
      <h2>Админ панель</h2>
    <div className="catalog__butt">
      <button onClick={() => openModal(open.isModal)}>Добавить</button>
    </div>
      {open.isModal && (
          <Modal
            onClose={() => setOpen({ isModal: false })}
            onSubmit={handleSubmit}
            fields={fields}
            title="Добавить каталог"
            submitButtonText="Добавить"
          />
        )}
      <div className="catalog__contnet">
        {
          date.map((el) => (
            <div  className="catalog__box">
              <p>Название: <span>{el.name}</span></p>
              <button onClick={() => editingModal(el.id_catalog, editing.isModal, el)} className="Character__box-editing">Обновить</button>
              {editing.isModal && el.id_catalog === editing.id && (
                <Modal
                  onClose={() => setEditing({ isModal: false, id: '', initialData: null })}
                  onEdit={(data) => editingSubmit(data, el.id_catalog)}
                  fields={fields}
                  title="Обновить товар"
                  submitButtonText="Обновить"
                  initialData={editing.initialData}
                />
              )}
            </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default Catalog