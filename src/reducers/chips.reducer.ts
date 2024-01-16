import { useReducer } from "react";
import { User } from "../demo-data";

export interface State {
    original: User[];
    selected: User[];
    non_selected: User[];
    highlighted: User | undefined
}

function reducer(
    state: State,
    action: { type: keyof typeof chip_reducer_actions; payload: User }
) {
    const { type, payload } = action;
    switch (type) {
        case chip_reducer_actions.SELECT_ACTION: {
            const filtered_non_selected = state.non_selected.filter(
                (element) => element.id != payload.id
            );
            state.selected.push(payload);
            return { ...state, non_selected: filtered_non_selected , highlighted: undefined};
        }
        case chip_reducer_actions.DELETE_ACTION: {
            const filtered_selected_items = state.selected.filter(
                (element) => element.id != payload.id
            );
            state.non_selected.push(payload);
            return { ...state, selected: filtered_selected_items ,highlighted: undefined};
        }
        case chip_reducer_actions.HIGHLIGHT_ACTION:
            return {...state, highlighted: payload}
        default:
            return state;
    }
}



export const chip_reducer_actions = {
    SELECT_ACTION: "SELECT_ACTION",
    DELETE_ACTION: "DELETE_ACTION",
    HIGHLIGHT_ACTION: "HIGHLIGHT_ACTION"
};

export type chip_reducer_action_types = keyof typeof chip_reducer_actions;

export function useChipsReducer(data: User[]){

    const reducer_state: State = {
        original: data,
        non_selected: data,
        selected: [],
        highlighted: undefined
    };

    return useReducer( reducer, reducer_state)
}