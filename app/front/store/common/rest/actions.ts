import { createActionCreators } from 'rest-api-redux'

import { API_URL } from 'util/api/config'
import momentalizeEntity from 'util/api/momentalizeEntity'

export default createActionCreators(
    API_URL,
    (entity: any) => momentalizeEntity(entity),
    (response: any) => response.data['hydra:member'],
    (response: any) => parseInt(response.data['hydra:totalItems'], 10),
)
