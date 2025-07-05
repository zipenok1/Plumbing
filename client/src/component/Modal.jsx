import React, { useState, useEffect } from "react";
import '../styles/modal.css';
import { POLITIC_ROUTE } from '../utils/const'
import { Link } from "react-router-dom";

function Modal({ onClose, onSubmit, onEdit, fields, title, submitButtonText, initialData }) {
  const [formData, setFormData] = useState(initialData || {});
  const [checked, setChecked] = useState(false);
  const [showAddress, setShowAddress] = useState(true);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setShowAddress(initialData.deliveryMethod !== 'pickup');
    }
  }, [initialData]);

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    let cleanedValue = value.replace(/\D/g, '');
    
    let formattedValue = '';
    if (cleanedValue.length > 0) {
      formattedValue = `+7 (${cleanedValue.substring(1, 4)}) ${cleanedValue.substring(4, 7)}-${cleanedValue.substring(7, 9)}-${cleanedValue.substring(9, 11)}`;
    }
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'tel') {
      handlePhoneChange(e);
      return;
    }
    
    const newFormData = {
      ...formData,
      [name]: type === 'file' ? files[0] : value
    };

    if (name === 'deliveryMethod') {
      const isPickup = value === 'pickup';
      setShowAddress(!isPickup);
      
      if (isPickup) {
        if (formData.deliveryMethod !== 'pickup' && formData.address !== 'Самовывоз') {
          newFormData.previousAddress = formData.address;
        }
        newFormData.address = 'Самовывоз';
      } else {
        newFormData.address = formData.previousAddress || '';
      }
    }

    setFormData(newFormData);
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = { 
      ...formData,
      phone: formData.phone ? formData.phone.replace(/\D/g, '') : ''
    };

    if (initialData && typeof onEdit === 'function') {
      onEdit(formDataToSend);
    } else {
      onSubmit(formDataToSend);
    }
  };

  // Находим поле адреса в массиве fields
  const addressField = fields.find(f => f.name === 'address');

  return (
    <div className="Modal">
      <div className="Modal__content">
        <form className="Modal__form" onSubmit={handleSubmit}>
          <img
            onClick={onClose}
            src="imeges/back.svg"
            alt="back"
            className="Modal__close"
          />
          {title && <h2 className="Modal__title">{title}</h2>}
          
          {fields.map((field) => {

            if (field.name === 'address' && !showAddress) {
              return null;
            }
            
            const commonProps = {
              name: field.name,
              onChange: handleChange,
              required: field.name === 'address' ? showAddress : field.required,
              value: formData[field.name] || '',
              placeholder: field.placeholder,
              className: field.className || "input"
            };

            return (
              <div key={field.name} className="Modal__form-box">
                {field.type === "select" ? (
                  <select {...commonProps} className="select">
                    <option value="">{field.placeholder}</option>
                    {field.options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ): field.type === "file" ? (
                  <input
                    type="file"
                    name={field.name}
                    onChange={handleChange}
                    required={field.required}
                  />
                ) : field.type === "checkbox" ? (
                  <div className="checkbox__box">
                    <input
                      type="checkbox"
                      name={field.name}
                      onChange={() => setChecked(!checked)}
                      required={field.required}
                      checked={checked}
                      className="chek"
                    />
                    <Link to={POLITIC_ROUTE} className="checkbox__box-politic" target="_blank" rel="noopener noreferrer">
                      Даю согласие на обработку персональных данных
                    </Link>
                    <div className="checkbox__box-desc">
                      <Link to={POLITIC_ROUTE}  target="_blank" rel="noopener noreferrer">
                        Нажимая на кнопку "Заказать", я подтверждаю, что ознакомился  
                        с Политикой обработки персональных данных и даю согласие на обработку  всех моих персональных данных указанных в форме
                      </Link>
                    </div>
                  </div>
                ) : (
                  <input
                    type={field.type || "text"}
                    {...commonProps}
                  />
                )}
              </div>
            );
          })}
          
          <button className="Modal__form-button" type="submit">
            {submitButtonText || "Отправить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;