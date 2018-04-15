export interface Parameter {
    key: string
    value: string
}

export default (params: Parameter[]): string => params.length !== 0
    ? '?' + params
        .map((param) => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
        .join('&')
    : ''
