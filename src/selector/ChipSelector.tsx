import { useReducer, useRef } from "react";
import { ChipInput } from "./ChipInput";
import Chips from "./Chips";
import { User } from "../demo-data";
import { chip_reducer_action_types, useChipsReducer } from "../reducers/chips.reducer";
import { createAction } from "../reducers/utils";

export interface ChipSelectorProps {
    data: User[];
}
export function ChipSelector({ data }: ChipSelectorProps) {
    const [state, dispatch] = useChipsReducer(data);
    const chipInputRef = useRef(null)

    return (
        <div className=" border min-h-14 py-2 w-auto rounded-sm flex border-b-2 border-b-blue-700 flex-wrap" onClick={()=>{
            if(chipInputRef.current){
                (chipInputRef.current as HTMLElement).focus()
            }
        }}>
            {state.selected.map((user: User, index: number) => {
                return (
                    <Chips
                        key={index}
                        user={user}
                        onDelete={(chip) =>
                            dispatch(createAction<chip_reducer_action_types, User>("DELETE_ACTION", chip))
                        }
                        isHighlighted ={user.id == state.highlighted?.id}
                    />
                );
            })}
            <ChipInput
                placeholderText="Type to search"
                ref={chipInputRef}
                totalUsers = {state.original.length}
                users={state.non_selected}
                onSelect={(user) => {
                    dispatch(createAction<chip_reducer_action_types, User>("SELECT_ACTION", user));
                }}
                onPreviousDelete={() => {
                    if (!state.selected.length) {
                        return;
                    }
                    dispatch(
                        createAction<chip_reducer_action_types, User>(
                            "DELETE_ACTION",
                            state.selected[state.selected.length - 1]
                        )
                    );
                }}
                onHighlightPrevious={()=>{
                    if(!state.selected.length){
                        return
                    }
                    dispatch(createAction<chip_reducer_action_types, User>("HIGHLIGHT_ACTION", state.selected[state.selected.length-1]))
                }}
            />
        </div>
    );
}
