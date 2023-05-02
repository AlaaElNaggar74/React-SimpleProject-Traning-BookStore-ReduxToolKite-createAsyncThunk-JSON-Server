import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBookList = createAsyncThunk(
  "book/fetchBookList",
  async (_, thunkAPI) => {
    let { rejectWithValue } = thunkAPI;
    try {
      let res = await fetch("http://localhost:9000/Books");
      let data = res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const insertBook = createAsyncThunk(
  "book/insertBook",
  async (newBook, thunkAPI) => {
    let { rejectWithValue, getState } = thunkAPI;
    newBook.userName = getState().auth.name;
    try {
      let res = await fetch("http://localhost:9000/Books", {
        method: "POST",
        body: JSON.stringify(newBook),
        headers: { "Content-type": "application/json ; charse=UTF-8" },
      });
      let data = res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const upddateBook = createAsyncThunk(
  "book/upddateBook",
  async (updateBook, thunkAPI) => {
    let { rejectWithValue } = thunkAPI;
    // newBook.userName = getState().auth.name;
    console.log("updateAAAAAAAAAAAAAABook",updateBook)
    try {
      let res = await fetch(`http://localhost:9000/Books/${updateBook.id}`, {
        method: "PUT",
        body: JSON.stringify(updateBook),
        headers: { "Content-type": "application/json ; charse=UTF-8" },
      });
      let data = res.json();
    return data;
    // console.log("DTAT",data)

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deletetBook = createAsyncThunk(
  "book/deletetBook",
  async (idBook, thunkAPI) => {
    let { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:9000/Books/${idBook}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json ; charse=UTF-8" },
      });

      return idBook;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export let bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    isLoading: false,
    erroeMessage: "",
  },
  reducers: {
    addBook: (state, action) => {},
    removeBook: (state, action) => {},
    viewBook: (state, action) => {},
    upddatBook: (state, action) => {},
  },

  extraReducers: (builder) => {
    builder.addCase(fetchBookList.pending, (state, action) => {
      state.isLoading = true;
      console.log("action", action);
    });
    builder.addCase(fetchBookList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    });
    builder.addCase(fetchBookList.rejected, (state, action) => {
      state.isLoading = true;
      state.erroeMessage = action.payload;
    });

    // INSERT NEW BOOK ---- ---- ------ ---- ---

    builder.addCase(insertBook.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(insertBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books = [...state.books, action.payload];
    });
    builder.addCase(insertBook.rejected, (state, action) => {
      state.isLoading = true;
      state.erroeMessage = action.payload;
    });
    // delete  BOOK ---- ---- ------ ---- ---

    builder.addCase(deletetBook.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deletetBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books = state.books.filter((book) => book.id !== action.payload);
    });
    builder.addCase(deletetBook.rejected, (state, action) => {
      state.isLoading = true;
      state.erroeMessage = action.payload;
    });
    // UPDATE  BOOK ---- ---- ------ ---- ---

    builder.addCase(upddateBook.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(upddateBook.fulfilled, (state, action) => {
      state.isLoading = false;
      // console.log("action.payload.id",action)
      state.books = state.books.map((book) => book.id === action.payload.id?action.payload:book);
    });
    builder.addCase(upddateBook.rejected, (state, action) => {
      state.isLoading = true;
      state.erroeMessage = action.payload;
    });
  },
});

// export let {addBook}=bookSlice.actions;
export default bookSlice.reducer;
