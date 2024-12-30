import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../config/Api";
import Cookies from "js-cookie";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (user, { rejectWithValue }) => {
    try {
      let res = await API.post("/users", user);
      Cookies.set("user", JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const Loginuser = createAsyncThunk(
  "user/Loginuser",
  async (user, { rejectWithValue }) => {
    try {
      let res = await API.get(
        `/users?${(user.email)}&password=${user.password}`
      );
      if (res.data.length > 0) {
        let userData = res.data[0];
        Cookies.set("user", JSON.stringify(userData));
        return userData;
      } else {
        return rejectWithValue("Invalid Email $ Password");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const userData = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
const initialState = {
  user: userData ? userData : {},
  isLoggedIn: userData ? true : false,
  isLoading: false,
  error: null,
};

const Userslice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = {};
      Cookies.remove("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.isLoggedIn = true;
    });
    builder.addCase(createUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(Loginuser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.isLoggedIn = true;
    });
    builder.addCase(Loginuser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    })
  },
});

export const { logout } = Userslice.actions;
export const userReducer = Userslice.reducer;
