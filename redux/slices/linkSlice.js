import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '@/lib/axios'


export const getUserLinks = createAsyncThunk(
  'links/getUserLinks',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/link/user')
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message || 'Failed to fetch links')
    }
  }
)

export const createShortLink = createAsyncThunk(
    'links/createShortLink',
    async ({ longUrl, customAlias, expiresAt }, thunkAPI) => {
      try {
        const res = await axios.post('/link/create', {
          longUrl,
          customAlias,
          expiresAt,
        })
        return res.data
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message || 'Failed to create link')
      }
    }
  )


  export const deleteLink = createAsyncThunk(
    'links/deleteLink',
    async (linkId, thunkAPI) => {
      try {
        await axios.delete(`/link/${linkId}`)
        return linkId
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete link')
      }
    }
  )
  
const linkSlice = createSlice({
  name: 'links',
  initialState: {
    links: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserLinks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUserLinks.fulfilled, (state, action) => {
        state.loading = false
        state.links = action.payload
      })
      .addCase(getUserLinks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createShortLink.fulfilled, (state, action) => {
        state.links.unshift(action.payload) // insert at top
      })
      .addCase(deleteLink.fulfilled, (state, action) => {
        state.links = state.links.filter(link => link._id !== action.payload)
      })
      
  },
})

export default linkSlice.reducer
