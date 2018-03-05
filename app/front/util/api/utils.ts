import * as moment from 'moment'

export const momentalizeEntity = (entity: any) => {
    let newEntity = {}

    Object.keys(entity).forEach(key => {
        const regex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\+(\d{2}):(\d{2})/

        newEntity = {
            ...newEntity,
            [key]: regex.test(entity[key]) ? moment(entity[key]) : entity[key],
        }
    })

    return newEntity
}
