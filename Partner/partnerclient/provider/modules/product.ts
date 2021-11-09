import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductItem {
  productId: number;
  partnerId: number;
  productName: string;
  productPrice: number;
  productImageUrl: string;
  fileName: string;
  fileType: string;
  foodType: string;
  expirationData: string;
  manufacturer: string;
  manufacturingDate: string;
  companyName: string;
  companyIntroduce: string;
  companyAddress: string;
  companyContact: string;
  beanType: string;
  beanTag: string;
  processing: string;
  country: string;
  region: string;
  farm: string;
  cupNote: string;
  roastingPoint: string;
  variety: string;
  productUploadDate?: number;
  salesStatus?: number;
  isEdit?: boolean;
}

export interface ProductPage {
  data: ProductItem[];
  totalElements: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast: boolean;
}

export interface ProductPagingResponse {
  content: ProductResponse[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ProductResponse {
  productId: number;
  partnerId: number;
  productName: string;
  productPrice: number;
  productImageUrl: string;
  fileName: string;
  fileType: string;
  foodType: string;
  expirationData: string;
  manufacturer: string;
  manufacturingDate: string;
  companyName: string;
  productUploadDate: number;
  companyIntroduce: string;
  companyAddress: string;
  companyContact: string;
  beanType: string;
  beanTag: string;
  processing: string;
  country: string;
  region: string;
  farm: string;
  cupNote: string;
  roastingPoint: string;
  variety: string;
  salesStatus: number;
}

export interface ProductRequest {
  productId: number;
  partnerId: number;
  productName: string;
  productPrice: number;
  productImageUrl: string;
  fileName: string;
  fileType: string;
  foodType: string;
  expirationData: string;
  manufacturer: string;
  manufacturingDate: string;
  companyName: string;
  productUploadDate: number;
  companyIntroduce: string;
  companyAddress: string;
  companyContact: string;
  beanType: string;
  beanTag: string;
  processing: string;
  country: string;
  region: string;
  farm: string;
  cupNote: string;
  roastingPoint: string;
  variety: string;
  salesStatus: number;
}

export interface ProductState {
  data: ProductItem[];
  isFetched: boolean;
  isAddCompleted?: boolean;
  totalElements?: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast?: boolean;
}

export interface SemiModify {
  productId: number;
  productName: string;
  productPrice: number;
}

const initialState: ProductState = {
  data: [],
  isFetched: false,
  page: 0,
  pageSize: 10,
  totalPages: 0,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductItem>) => {
      const productItem = action.payload;
      state.data.unshift(productItem);
    },
    initialPagedProduct: (state, action: PayloadAction<ProductPage>) => {
      state.data = action.payload.data;

      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.isLast = action.payload.isLast;

      state.isFetched = true;
    },
    editProduct: (state, action: PayloadAction<number>) => {
      const data = state.data.find((item) => item.productId === action.payload);
      if (data) {
        data.isEdit = true;
      }
    },
    editDone: (state, action: PayloadAction<number>) => {
      const data = state.data.find((item) => item.productId === action.payload);
      if (data) {
        data.isEdit = false;
      }
    },
    semiModify: (state, action: PayloadAction<ProductItem>) => {
      const newData = action.payload;
      const data = state.data.find(
        (item) => item.productId === newData.productId
      );
      if (data) {
        data.productName = newData.productName;
        data.productPrice = newData.productPrice;
        data.isEdit = false;
      }
    },
  },
});

export const {
  addProduct,
  initialPagedProduct,
  editProduct,
  semiModify,
  editDone,
} = productSlice.actions;

export default productSlice.reducer;
