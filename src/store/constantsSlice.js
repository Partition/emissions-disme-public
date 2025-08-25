// src/store/constantsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import defaultConstants from '../config/newConstants';

const constantsSlice = createSlice({
    name: 'constants',
    initialState: defaultConstants,
    reducers: {
        updateConstant: (state, action) => {
            const { category, key, value } = action.payload;
            state[category][key] = value;
        },
        resetConstants: () => defaultConstants
    }
});

export const { updateConstant, resetConstants } = constantsSlice.actions;
export default constantsSlice.reducer;