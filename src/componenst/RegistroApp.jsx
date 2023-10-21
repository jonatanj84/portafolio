import React, { useEffect, useState } from "react";
import RegistroForm from "./RegistroForm";
import RegistroTabla from "./RegistroTabla";
import { helpHttp } from "../helpers/helpHttp";
import Loader from "./Loader";
import Message from "./Message";



const RegistroApp = () => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loadin, setLoadin] = useState(false);

  let api = helpHttp();
  let url = " http://localhost:5000/registro";
  
  useEffect(() => {
    setLoadin(true);
    helpHttp()
    .get(url).then((res) => {
      //console.log(res);
      if (!res.err) {
        setDb(res);
        setError(null);
      }else {
        setDb(null);
        setError(res);
      }

      setLoadin(false);
    });
  }, [url]);

  

  //Esta fubcion crea un nuevo registro en la base datos falsa
  const createData = (data) => {
    /*con esta funcion se crea un numero aleatorio para crear el id
        Data.now es la estanpa del tiempo en el que se ejecuta*/
    data.id = Date.now();

    let options = {body: data,
      headers:{"content-type": "application/json"},
    };

    api.post(url, options).then((res) => {
      console.log(res);
      if (!res.err) {
        setDb([...db, data]);
      }else{
        setError (res);
      }
    })

    
  };

  //Esta funcion actualiza
  const upData = (data) => {

    let endpoint = `${url}/${data.id}`;

    let options = {body: data,
      headers:{"content-type": "application/json"},
    };

    api.put(endpoint, options).then((res) => {
      console.log(res);
      if (!res.err) {
        let nuevaData = db.map((el) => (el.id===data.id ? data: el));
        setDb(nuevaData);
      }else{
        setError (res);
      }
    })

    
};

  //para eliminar el registro
  const deleteData = (id) => {
    let isDelete = window.confirm(
      `¿Estas seguro eliminsr el registro con el '${id}' id?`);
      
      if (isDelete) {
        let endpoint = `${url}/${id}`;

    let options = {
      headers:{"content-type": "application/json"},
    };

    api.del(endpoint, options).then((res) => {
      console.log(res);
      if (!res.err) {
        let newData = db.filter((el) => el.id !== id);
        setDb(newData);
      }else{
        setError (res);
      }
    })

        
      } else {
        return;
      }
    };

  return (
    <div>
      <h2>Datos Personales</h2>
      <article className="grid-1-2">
      <RegistroForm
        createData={createData}
        upData={upData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      />
      {/*si la varible loadin es verdadera renderizara loader*/}
      {loadin && <Loader/>}

      {/*si error es verdadero rederizara message*/}
      {error && (<Message
      //ESTA PARTE DEL CODIGO NO FUNCINA CORREGIR 22.05 MIN
      msg={`Error ${error.status}: ${error.statusText}`}
                bgColor="#dc3545"
      />
      )}

      {/*si db es verdadero renderizara registro tabla*/}
      {db &&(<RegistroTabla
        data={db}
        setDataToEdit={setDataToEdit}
        deleteData={deleteData}
        />
      )};
      </article>
      
      
    </div>
  );
};

export default RegistroApp;
