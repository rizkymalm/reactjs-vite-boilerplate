import { createSlice } from '@reduxjs/toolkit';

import { getUserList } from '../actions/user';

interface UserState {
    list: {
        loading: boolean;
        error: unknown;
        data: unknown;
    };
    actions?: {
        loading: boolean;
        error: {
            statusCode: number;
            message: string;
        };
        type: 'success' | 'failed' | null;
    };
}

const initialState: UserState = {
    list: {
        loading: false,
        data: null,
        error: undefined,
    },
    actions: {
        loading: false,
        error: undefined,
        type: null,
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userReset: () => initialState,
    },
    extraReducers: builder => {
        builder
            .addCase(getUserList.pending, (state: UserState) => {
                state.list.loading = true;
            })
            .addCase(getUserList.fulfilled, (state: UserState, action) => {
                state.list.loading = false;
                state.list.data = action.payload;
            })
            .addCase(getUserList.rejected, (state: UserState, action) => {
                state.list.error = action.payload;
            });
    },
});

export const { userReset } = userSlice.actions;
export default userSlice.reducer;
