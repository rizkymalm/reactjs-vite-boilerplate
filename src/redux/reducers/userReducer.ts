import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    list: {
        loading: boolean;
        error: {
            statusCode: number;
            message: string;
        };
        data: any;
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
        data: '',
        error: undefined,
    },
    actions: {
        loading: false,
        error: '',
        type: null,
        message: '',
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userListLoading: (state: UserState) => {
            state.list.loading = true;
        },
        userList: (state: UserState, action: PayloadAction) => {
            state.list.data = action.payload;
        },
    },
});

export const { userListLoading, userList } = userSlice.actions;
export default userSlice.reducer;
