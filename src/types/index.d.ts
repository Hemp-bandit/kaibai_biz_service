export * from './user'

export type T_List_rsp<T> = {
  list: Array<T>,
  total: number
}
