import React from "react";

const RegistroTabalRow = ({ el, setDataToEdit, deleteData }) => {
  let { nombre, apellido, apartamento, vehiculo, color, placa, id } = el;

  return (
    
      
        
        <tr>
          <td>{nombre}</td>
          <td>{apellido}</td>
          <td>{apartamento}</td>
          <td>{vehiculo}</td>
          <td>{color}</td>
          <td>{placa}</td>
          <td>
            <button onClick={() => setDataToEdit(el)}>Editar</button>
            <button onClick={() => deleteData(id)}>Eliminar</button>
          </td>
        {/*VERIFICAR ESTE PASO*/}
        
            
      
      </tr>
    
  );
};

export default RegistroTabalRow;
