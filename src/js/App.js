import React, { Component } from 'react';  
import {useFormik} from "formik";
import emailjs from "emailjs-com";
import * as Yup from "yup";


export default function Form(){

   const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
   let success = "";
   const formik = useFormik({
      initialValues:{
         name: "",
         cell: ""
      },
      validationSchema: Yup.object({
         name: Yup.string()
         .strict(true)
         .max(50, "Поле ФИО должно содержать не более 50 символов")
         .min(3, "Поле ФИО должно содержать минимум 3 символа")
         .required("Поле ФИО обязательно для заполнения"),
         cell: Yup.string()
         .matches(phoneRegExp, 'Не правильный номер телефона')
         .max(15, "Телефон не может содержать больше 15 символов")
         .required("Поле телефон обязательно для заполнения")
      }),
      onSubmit: (values)=>{
         
         emailjs.sendForm('service_yjvlwin', 'template_hwzldie', document.getElementsByClassName("form")[0], 'user_IPHVGFLVcq9Zskg2vOUJi')
         .then((result) => {
            document.getElementsByClassName("form__success")[0].innerHTML = "Данные успешно отправлены!";
         }, (error) => {
            document.getElementsByClassName("form__success")[0].innerHTML = "Ошибка. Что-то пошло не так.";
         });
         
      }
      
   });
      return(
            <div>  
               <form onSubmit={formik.handleSubmit} className="form">
                  <div className="form__item">
                     <label className="form__label">
                        ФИО
                        <br/>
                        <input type="text" className="form__textbox" name="name"
                        value={formik.values.name} onChange={formik.handleChange}/>
                     </label>
                     <h3 className="form__error">{formik.errors.name}</h3>
                  </div>
                  <div className="form__item">
                     <label className="form__label">Телефон
                        <br/>
                        <input type="text" className="form__textbox" name="cell"
                        value={formik.values.cell} onChange={formik.handleChange}/>
                     </label>
                     <h3 className="form__error">{formik.errors.cell}</h3>
                  </div>
                  <div className="form__footer">
                        <input type="submit" name="sumbit" value="Отправить" className="btn_short"/>
                        <p className="form__policy">
                        Нажимая кнопку, вы соглашаетесь с
                        <a href="#" className="form__policy-link"> политикой конфиденциальности</a> 
                     </p>
                  </div>
                  <p className="form__success">{success}</p>
               </form>
            </div>
      );  
   }  