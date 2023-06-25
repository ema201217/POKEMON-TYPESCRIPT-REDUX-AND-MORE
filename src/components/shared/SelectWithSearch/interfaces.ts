export interface InputSearchI {
  onShowList: () => void;
  showList: boolean
}
export interface ListSearchI<T> {
  children: T;
}

export interface ItemListI<T,I> {
  name: T;
  id: I
}
