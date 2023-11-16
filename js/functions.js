
const renderMyElement=(element)=>
{
    element.renderElement();
}

const fetchApi= async (url,options)=>{
   const req = await fetch(url,{
    params:options
   })
   return req.json();
}
const fetchAxios= async (url = 'https://restcountries.com/v3.1/all', options = {})=>{
     const req = await axios.get(url,{params:options});
     return await req.data;  
}

const fetchAxiosByName = async (url,name)=>{
    const req = await axios.get(`${url}/${name}`);
    return await req.data;
}

export{fetchAxios,fetchAxiosByName,renderMyElement,fetchApi};