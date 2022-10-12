import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'



const getAll = async ()=>{
    const request = axios.get(baseURL)
    const response = await request
    return (
        response
    )
}



const create = async (newObject)=>{
    const request = axios.post(baseURL,newObject)
    const response = await request
    return (
        response
    )
}


const userDelete = async(id)=>{
    const request = axios.delete(`${baseURL}/${id}`)
    const response = await request
    return(
        response.data
    )
}

const userUpdate = async(id,newObject) =>{
    const request = axios.put(`${baseURL}/${id}`,newObject)
    const response = await request
    return(
        response
    )
}


// eslint-disable-next-line
export default {
    create:create,
    getAll:getAll,
    userDelete:userDelete,
    userUpdate:userUpdate
}