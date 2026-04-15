export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export interface ProductListResponse {
  data: Product[];
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}

export interface CreateProductDto {
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
}

export interface UpdateProductDto {
  name?: string;
  price?: number;
  stock?: number;
  imageUrl?: string;
}
