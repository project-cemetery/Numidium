import axios from 'axios'
import * as code from 'http-status-codes'

import encodeQuery, { Parameter } from 'util/encodeQuery'
import Collection from 'model/Collection'

import { momentalizeEntity } from './utils'


export const API_URL = `${window.location.origin}/api`

const getList = (entity: string, params?: Parameter[]) =>
    axios.get(`${API_URL}/${entity}${encodeQuery(params || [])}`)

const get = (entity: string, id: number) =>
    axios.get(`${API_URL}/${entity}/${id}`)

const post = (entity: string, data: any) =>
    axios.post(`${API_URL}/${entity}`, data)

const put = (entity: string, id: number, data: any) =>
    axios.put(`${API_URL}/${entity}/${id}`, data)

const del = (entity: string, id: number) =>
    axios.delete(`${API_URL}/${entity}/${id}`)


const createGetList = <T>(enity: string): (params?: Parameter[]) => Promise<Collection<T>> =>
    (params?: Parameter[]) =>
        getList(enity, params)
            .then(response => ({
                id: 0, // TODO: think about it!
                '@id': response.data['@id'],
                '@type': response.data['@type'],
                '@context': response.data['@context'],
                member: response.data['hydra:member'].map(momentalizeEntity),
                totalItems: parseInt(response.data['hydra:totalItems'], 10),
            }))

const createGet = <T>(entity: string): (id: number) => Promise<T> =>
    (id: number) =>
        get(entity, id)
            .then(response => momentalizeEntity(response.data) as T)

const createPost = <T>(entity: string): (object: T) => Promise<T> =>
    (object: T) =>
        post(entity, object)
            .then(response => momentalizeEntity(response.data) as T)

const createPut = <T>(entity: string): (id: number, object: T) => Promise<T> =>
    (id: number, object: T) =>
        put(entity, id, object)
            .then(response => momentalizeEntity(response.data) as T)

const createDelete = <T>(entity: string): (id: number) => Promise<boolean> =>
    (id: number) =>
        del(entity, id)
            .then(response => true)


export default <T>(entity: string) => ({
    getList: createGetList<T>(entity),
    get: createGet<T>(entity),
    post: createPost<T>(entity),
    put: createPut<T>(entity),
    delete: createDelete<T>(entity),
})
