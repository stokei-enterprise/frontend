export type MountUrlGetParamsData<
  T = ArrayLike<unknown> | { [s: string]: unknown } | undefined
> = T
export interface MountUrlGetParamsResponse {
  readonly params: string
  readonly exists: boolean
}

export const mountUrlGetParams = <TData>(
  data: MountUrlGetParamsData<TData>
): MountUrlGetParamsResponse => {
  const dataParams = Object.entries(data || {})
  let params = ''
  if (dataParams.length > 0) {
    params = dataParams.map(([key, value]) => `${key}=${value || ''}`).join('&')
  }
  return {
    params,
    exists: dataParams.length > 0
  }
}
