import api from "@/api/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// --- Thunks ---

export const fetchMe = createAsyncThunk(
  "user/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken)
        return rejectWithValue("No authentication accessToken found");

      const res = await api.get(`${import.meta.env.VITE_BASE_URL}/user`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user data"
      );
    }
  }
);

// --- Slice ---
const initialState = {
  profile: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Me
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = false;
        state.profile = null;
        state.error = action.payload;
      });
  },
});

export const { clearUserProfile } = userSlice.actions;
export default userSlice.reducer;
