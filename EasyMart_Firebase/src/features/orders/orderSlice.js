import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { collection, addDoc, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async ({ userId, products, total, createdAt }, thunkAPI) => {
    const docRef = await addDoc(collection(db, "orders"), {
      userId, products, total, createdAt
    });
    return { id: docRef.id, userId, products, total, createdAt };
  }
);

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (userId, thunkAPI) => {
    const q = query(collection(db, "orders"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
);

export const fetchOrderDetail = createAsyncThunk(
  'orders/fetchOrderDetail',
  async (orderId, thunkAPI) => {
    const snap = await getDoc(doc(db, "orders", orderId));
    return { id: snap.id, ...snap.data() };
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: { items: [], selected: null, status: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchOrderDetail.fulfilled, (state, action) => {
        state.selected = action.payload;
      });
  }
});
export default orderSlice.reducer;
