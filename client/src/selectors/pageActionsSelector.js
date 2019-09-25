import { createSelector } from 'reselect';

const getCurrentAction = (store, condition) =>  {
    return {
        ...store.pageActions,
        condition
    };
};

export const getCurrentActionState = () => {
    return createSelector(
        [getCurrentAction],
        (currentAction) => {
            if (currentAction.pageAction.type === currentAction.condition) {
                return currentAction.pageAction.displayed
            } else {
                return false;
            }
        }
    )
};