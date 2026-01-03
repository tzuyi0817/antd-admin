export interface HomeItem {
  id: number;
  itemNumber: string;
  productName: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface HomeListParams {
  page: number;
  pageSize: number;
  itemNumber?: string;
  productName?: string;
}

export interface CreateHomeParams {
  itemNumber: string;
  productName: string;
  unit: string;
  quantity: number;
  unitPrice: number;
}
