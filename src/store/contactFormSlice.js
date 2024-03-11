import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    name: null,
    number: null,
  },
};

export const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState,
  reducers: {
    updateFormData: (state, { payload }) => {
      state.formData = { ...state.formData, ...payload };
    },
    resetFormData: state => {
      state.formData = initialState;
    },
  },
});

export const { updateFormData, resetFormData } = contactFormSlice.actions;
export const contactFormReducer = contactFormSlice.reducer;
