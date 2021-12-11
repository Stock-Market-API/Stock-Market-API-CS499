import { createGlobalState } from 'react-hooks-global-state';

//Global state that if an option is deleted
//Used to render options page dynamically
const { setGlobalState, useGlobalState } = createGlobalState({
    optionsSold: false,
});


export const setFavErrorMessage = (s: string) => {
    setGlobalState('optionsSold', s);
};

export { useGlobalState };