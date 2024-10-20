import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    url: "/"
}

export const routeSlice = createSlice({
    initialState: { value: initialState },
    name: "route",
    reducers: {
        setRoute: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setRoute } = routeSlice.actions;
export default routeSlice.reducer;