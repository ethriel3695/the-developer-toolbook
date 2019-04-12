import { INCREMENTER } from './actionTypes';

export const increment = () => {
    return {
        type: INCREMENTER,
        count: 1
    }
};