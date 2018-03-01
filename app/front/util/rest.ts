import axios from 'axios'
import * as code from 'http-status-codes'

import encodeQuery, { Parameter } from 'util/encodeQuery'
import Collection from 'model/Collection'


const API_URL = `${window.location.origin}/api`

const getList = (entity: string, params?: Parameter[]) =>
    axios.get(`${API_URL}/${entity}` + (!!params && encodeQuery(params)))

const get = (entity: string, id: number) =>
    axios.get(`${API_URL}/${entity}/${id}`)

const post = (entity: string, data: any) =>
    axios.post(`${API_URL}/${entity}`, data)

const put = (entity: string, id: number, data: any) =>
    axios.put(`${API_URL}/${entity}/${id}`, data)

const del = (entity: string, id: number) =>
    axios.delete(`${API_URL}/${entity}/${id}`)

export interface RestResponse<T> {
    code: number
    error?: string
    data?: T | null
}

const axiosErrorToResponseError = (error: any) => {
    console.log(error)
    return ({
        code: code.BAD_REQUEST,
        error: error || 'shit!',
        data: null,
    })
}

const createGetList = <T>(enity: string): (params?: Parameter[]) => Promise<RestResponse<Collection<T>>> =>
    (params?: Parameter[]) =>
        getList(enity, params)
            .then(
                response => ({
                    code: response.status,
                    error: response.status !== code.OK ? response.data : null,
                    data: response.status === code.OK
                        ? {
                            '@id': response.data['@id'],
                            '@type': response.data['@type'],
                            '@context': response.data['@context'],
                            member: response.data['hydra:member'],
                            totalItems: parseInt(response.data['hydra:totalItems'], 10),
                        } as Collection<T>
                        : null,
                }),
                error => axiosErrorToResponseError(error)
            )

// const createGet = <T>(entity: string): (id: number) => Promise<RestResponse<T>> => (id: number) =>
//     get(entity, id)
//         .then(
//             response => ({
//                 code: response.status,
//                 error: response.status !== code.OK ? response.data : null,
//                 data: response.status === code.OK ? response.data : null,
//             }),
//             error => axiosErrorToResponseError(error)
//         )

// const createPost = <T>(entity: string): (object: T) => Promise<RestResponse<T>> => (object: T) =>
//     post(entity, object)
//         .then(
//             response => ({
//                 code: response.status,
//                 error: response.status !== code.CREATED ? response.data : null,
//                 data: response.status === code.CREATED ? response.data : null,
//             }),
//             error => axiosErrorToResponseError(error)
//         )

// const createPut = <T>(entity: string): (id: number, object: T) => Promise<RestResponse<T>> => (id: number, object: T) =>
//     put(entity, id, object)
//         .then(
//             response => ({
//                 code: response.status,
//                 error: response.status !== code.OK ? response.data : null,
//                 data: response.status === code.OK ? response.data : null,
//             }),
//             error => axiosErrorToResponseError(error)
//         )

// const createDelete = <T>(entity: string): (id: number) => Promise<RestResponse<T>> => (id: number) =>
//     del(entity, id)
//         .then(
//             response => ({
//                 code: response.status,
//                 error: response.status !== code.NO_CONTENT ? response.data : null,
//                 data: response.status === code.NO_CONTENT ? response.data : null,
//             }),
//             error => axiosErrorToResponseError(error)
//         )

// const createGetFiltered = <T>(entity: string): (f: Filter[]) => Promise<RestResponse<T[]>> => (f: Filter[]) =>
//         getFiltered(entity, f)
//             .then(
//                 response => ({
//                     code: response.status,
//                     error: response.status !== code.OK ? response.data : null,
//                     data: response.status === code.OK ? response.data['hydra:member'] : null,
//                 }),
//                 error => axiosErrorToResponseError(error)
//             )

// const createGetPaginated = <T>(entity: string): (page: number) => Promise<RestResponse<T[]>> => (page: number) =>
//         createGetFiltered<T>(entity)([{ field: 'page', value: page.toString() } as Filter])

interface RestMethods<T> {
    getList: (params?: Parameter[]) => Promise<RestResponse<Collection<T>>>
}

export type Rest = <T>(entity: string) => RestMethods<T>

export default <T>(entity: string) => ({
    getList: createGetList<T>(entity),

    // getAll: createGetAll<T>(entity),
    // get: createGet<T>(entity),
    // post: createPost<T>(entity),
    // put: createPut<T>(entity),
    // delete: createDelete<T>(entity),

    // getFiltered: createGetFiltered<T>(entity),
    // getPaginated: createGetPaginated<T>(entity),
})
