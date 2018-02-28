export interface Parameter {
    key: string
    value: string
}

export default (params: Parameter[]) =>
    '?' + params
        .map(param => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
        .join('&')
