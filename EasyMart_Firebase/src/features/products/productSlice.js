import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const snap = await getDocs(collection(db, "products"));
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addProduct = createAsyncThunk('products/add', async (product) => {
  const docRef = await addDoc(collection(db, "products"), product);
  return { id: docRef.id, ...product };
});

export const updateProduct = createAsyncThunk('products/update', async (product) => {
  await updateDoc(doc(db, "products", product.id), product);
  return product;
});

export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  await deleteDoc(doc(db, "products", id));
  return id;
});

const productSlice = createSlice({
  name: "products",
  initialState: { items: [], status: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const idx = state.items.findIndex(i => i.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i.id !== action.payload);
      });
  }
});
export default productSlice.reducer;
