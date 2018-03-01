import axios from 'axios'

import { API_URL } from './rest'

export const getMyId = () => axios.get(`${API_URL}/me`)
