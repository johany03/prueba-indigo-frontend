export interface CreateSaleDto {
  items: {
    productId: string;
    quantity: number;
  }[];
}

export interface Sale {
  id: string;
  items: SaleItem[];
  createdAt: Date;
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface SalesListResponse {
  data: Sale[];
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}

export interface SaleReportItem {
  saleId: string;
  saleDate: string;
  total: number;
}

export interface SalesReportResponse {
  data: SaleReportItem[];
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}
