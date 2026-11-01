import { createAction } from '@reduxjs/toolkit';

/** Clears every piece of user data. Handled by each slice. */
export const resetAllData = createAction('app/resetAllData');
