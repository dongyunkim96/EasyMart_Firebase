import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// sign up
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, name, address }, thunkAPI) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", res.user.uid), { email, name, address });
    return { uid: res.user.uid, email, name, address };
  }
);

// login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const userSnap = await getDoc(doc(db, "users", res.user.uid));
    return { uid: res.user.uid, ...userSnap.data() };
  }
);

// logout
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await signOut(auth);
});

// edit profile
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ uid, name, address }, thunkAPI) => {
    await updateDoc(doc(db, "users", uid), { name, address });
    return { name, address };
  }
);

// delete account
export const deleteAccount = createAsyncThunk(
  'auth/deleteAccount',
  async (uid, thunkAPI) => {
    await deleteDoc(doc(db, "users", uid));
    return uid;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, status: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        state.status = "logged_out";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
        }
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.user = null;
      });
  }
});
export default authSlice.reducer;
