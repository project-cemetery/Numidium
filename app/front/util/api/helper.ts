import axios from 'axios'

import { API_URL } from 'util/api/config'

export const getMyId = () => axios.get(`${API_URL}/me`).then(res => parseInt(res.data, 10))
