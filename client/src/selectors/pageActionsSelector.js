import { createSelector } from 'reselect';

const getCurrentAction = (store, condition) =>  {
    return {
        ...store.togglePageActions,
        condition
    };
};

export const getCurrentActionState = () => {
    return createSelector(
        [getCurrentAction],
        (currentAction) => {
            if (currentAction.togglePageAction.type === currentAction.condition) {
                return currentAction.togglePageAction.displayed
            } else {
                return false;
            }
        }
    )
};