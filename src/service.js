import axios from 'axios'

const BASE_URL = 'https://reqres.in/api/users?page=1&per_page=4'

export const getUsers = async() => {
    const details = await axios.get(`${BASE_URL}`).catch((e) => {
        console.error(e);
    })
    console.log('resp\n')
    console.log(details.data)

    return details.data
}

export const getUsersByPage = async (page) => {
    const url = `https://reqres.in/api/users?page=${page}&per_page=4`
    const details = await axios.get(url).catch((e) => {
        console.error(e);
    })

    return details.data
}

