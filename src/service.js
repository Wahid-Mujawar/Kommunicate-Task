import axios from 'axios'

const BASE_URL = 'https://reqres.in/api/users?page=1&per_page=4'

export const getUsers = async() => {
    const planets = await axios.get(`${BASE_URL}`).catch((e) => {
        console.error(e);
    })
    console.log('resp\n')
    console.log(planets.data)

    return planets.data
}

export const getUsersByPage = async (page) => {
    const url = `https://reqres.in/api/users?page=${page}&per_page=4`
    console.log("url",url)
    const planets = await axios.get(url).catch((e) => {
        console.error(e);
    })
    console.log('resp\n 1111111111111')
    console.log(planets.data)

    return planets.data
}


export default { getUsersByPage,getUsers }