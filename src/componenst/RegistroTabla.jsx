import React from "react";
import RegistroTabalRow from "./RegistroTablaRow";

const RegistroTabla = ({ data, setDataToEdit, deleteData }) => {
  return (
    <div>
      <h2>Tabla de datos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Apartamento</th>
            <th>Vehiculo</th>
            <th>Color</th>
            <th>Placa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        {/*VERIFICAR ESTE PASO*/ }
          {data.length === 0 ? (
            <tr>
              <td colSpan="6">Sin datos</td>
            </tr>
          ) : (
            data.map((el) => (
              <RegistroTabalRow
                key={el.id}
                el={el}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RegistroTabla;
