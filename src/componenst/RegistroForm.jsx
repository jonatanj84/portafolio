import React, { useState, useEffect } from 'react';

const inicialForm = {
    nombre:"",
    apellido:"",
    apartamento:"",
    vehiculo:"",
    color:"",
    placa:"",
    id:null,
}

const RegistroForm = ({createData,upData,dataToEdit,setDataToEdit}) => {
    const [form, setForm] = useState(inicialForm);

    useEffect(() => {
        if (dataToEdit) {
            //con esta funcion se pasan los datos de la fila al formulario
            setForm(dataToEdit);
        }else{
            setForm(inicialForm);
        }
        
        
    }, [dataToEdit]);

    //Este evento actualiza los datos del formulario
    const handelChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value,
        });
    };


    const handelSubmit = (e) => {
        //este evento es para que no se auto procese el formulario
        e.preventDefault();

        if(!form.nombre || !form.apellido || !form.apartamento || !form.vehiculo || !form.color || !form.color || !form.placa){
            alert("Datos incompletos");
            return;
        };

        if (form.id === null) {
            createData(form);
        }else{
            upData(form);
        }

        handelReset();
    };
    
    const handelReset = (e) => {
        setForm(inicialForm);

        //estea funcion actualiza la variable de estado a null
        setDataToEdit(null)
        //ESTA FUNCION NO ESTA FUNCIONADO REVISAR
    }

    return (
        <div>
            <h3>{dataToEdit?"Editar":"Agregar"}</h3>
            <form onSubmit={handelChange}>
                <input type='text' name='nombre' placeholder='Nombre' onChange={handelChange} value={form.nombre}/>
                <input type='text' name='apellido' placeholder='Apellido' onChange={handelChange} value={form.apellido}/>
                <input type='text' name='apartamento' placeholder='Apartamento' onChange={handelChange} value={form.apartamento}/>
                <input type='text' name='vehiculo' placeholder='Vehiculo' onChange={handelChange} value={form.vehiculo}/>
                <input type='text' name='color' placeholder='Color' onChange={handelChange} value={form.color}/>
                <input type='text' name='placa' placeholder='Plca' onChange={handelChange} value={form.placa}/>
                <input type='submit' value= "Enviar" onClick={handelSubmit}/>
                <input type='reset' value="Limpiar" onClick={handelReset}/>
            </form>
            
        </div>
    )
}

export default RegistroForm