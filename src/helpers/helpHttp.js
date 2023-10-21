//ESTE HELPER SE UTILZA PARA HACER PETICIONES AJAX
export const helpHttp = () => {
    //customFetch necesita la ruta (endpoint), las opciones
    const customFetch = (endpoint, options) => {
        const defaultHeder = {
            //con esto  se define que la aplicacion acepta formato json
            accept: "applicatiojson"
        };

        //CON ESTE OBJETO SE SE PUEDE ABOPRTAR LA PETICION EN CUALQUUIER MOMETNTO CUANDO EL SERVIDOR NO RESPONDE
        const controller = new AbortController();
        options.signial = controller.signal;

        options.method = options.method || "GET";
        options.headers = options.headers?{defaultHeder, ...options.headers}:defaultHeder;
    
        //CON ESTE METODO SE CONVIERTE EN CADENA PARA ENVIARLO AL BACKEN
        options.body = JSON.stringify(options.body) || false;
        if(!options.body) delete options.body;

        console.log(options);
        setTimeout(() => controller.abort,3000);

        return fetch(endpoint, options)
        .then((res)=> 
            res.ok?res.json():
            Promise.reject({
                err:true,
                status: res.status || "00",
                statusText: res.statusText || "Ocurrio un error",
            }))
        .catch((err) => err);
    };

    const get = (url, options = {}) => customFetch(url,options);

    const post = (url, options = {}) => {
        options.method = "POST";
        return customFetch(url, options);
    }

    const put = (url, options = {}) => {
        options.method = "PUT";
        return customFetch(url, options);
    }

    const del = (url, options = {}) => {
        options.method = "DELETE";
        return customFetch(url, options);
    }

    return {
        get,
        post,
        put,
        del,
    }
}