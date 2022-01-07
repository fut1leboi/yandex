import React, {useState} from 'react';  
import axios from 'axios';


export default function Form(){


      const [name, setName] = useState('');
      const [num, setNum] = useState('');
      const [sent, setSent] = useState(false);
      const [nameErr, setNameErr] = useState('');
      const [numErr, setNumErr] = useState('');


      const handleSend = async(e) =>{
         e.preventDefault();

         if(validateForm()){
            let data = `ФИО: ${name} \nНомер телефона: ${num}`;
            try{
               setSent(true);
               await axios.post('http://localhost:4000/send_mail', {data});
            }
            catch(err){
            }
         }
      }
      

      const validateForm = () =>{

         setNameErr('');
         setNumErr('');

         let err = false;
         setSent(false);

         // name field check

         if(name == '' || name == null){
            setNameErr('Поле не должно быть пустым');
            err = true;
         }
         else if(!(isNaN(parseInt(name)))){
            setNameErr('Поле ФИО не может быть числом');
            err = true;
         }

         else if(name.length < 3){
            setNameErr('Минимальное количество символов: 3');
            err = true;
         }
         else if(name.length > 50){
            setNameErr('Максимальное количество символов: 50');
            err = true;
         }

         // num field check

         if(num == '' || num == null){
            setNumErr('Поле не должно быть пустым');
            err = true;
         }
         else if(isNaN(parseInt(num))){
            setNumErr('Поле номера может быть только числом');
            err = true;
         }
         else if(num.length > 15){
            setNumErr('Номер телефона слишком большой');
            err = true;
         }
         else if(num.length < 8){
            setNumErr('Номер телефона слишком маленький');
            err = true;
         }

         if(err)
            return false;
         else
            return true;

      }

      return(
            <div>  
               <form onSubmit={handleSend} className="form">
                  <div className="form__item">
                     <label className="form__label">
                        <div className="form__label-container">
                           ФИО
                           <p className="form__error">{nameErr}</p>
                        </div>
                        <input type="text" className={nameErr == '' ? 'form__textbox' : 'form__textbox-error'} name="name"
                        value={name} onChange={(e) => setName(e.target.value)}/>
                     </label>
                  </div>
                  <div className="form__item">
                     <label className="form__label">
                     <div className="form__label-container">
                           Телефон
                           <p className="form__error">{numErr}</p>
                        </div>
                        <input type="text" className={numErr == '' ? 'form__textbox' : 'form__textbox-error'} name="number"
                        value={num} onChange={(e) => setNum(e.target.value)}/>
                     </label>
                  </div>
                  <div className="form__footer">
                        <input type="submit" name="sumbit" value="Отправить" className="btn_short"/>
                        <p className="form__policy">
                        Нажимая кнопку, вы соглашаетесь с
                        <a href="#" className="form__policy-link"> политикой конфиденциальности</a> 
                     </p>
                  </div>
                  <p className={sent ? 'form__success-show' : 'form__success'}>Заявка успешно отправлена</p>
               </form>
            </div>
      );  
   }  