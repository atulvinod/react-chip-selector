import { LegacyRef, forwardRef, useRef, useState } from "react";
import { User } from "../demo-data";

export interface ChipInputProps {
    users: User[];
    onSelect: (user: User) => void;
    onPreviousDelete: () => void;
    onHighlightPrevious: () => void;
    totalUsers?: number;
    placeholderText?: string;
}
export const ChipInput = forwardRef(
    (
        {
            users,
            onSelect,
            onPreviousDelete,
            onHighlightPrevious,
            totalUsers = -1,
            placeholderText = "",
        }: ChipInputProps,
        ref
    ) => {
        const [searchResultState, setSearchResultState] = useState<User[]>([]);
        const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
            undefined
        );
        const [searchQuery, setSearchQuery] = useState("");
        let backspaceCount = useRef(2);

        function filterUsers(query: string) {
            if (!query.length) {
                setSearchResultState([]);
                setSelectedIndex(undefined);
                return;
            }
            query = query.toLowerCase();
            const filteredUsers = users.filter(
                (u) =>
                    u.firstname.toLowerCase().includes(query) ||
                    u.lastname.toLowerCase().includes(query)
            );
            setSelectedIndex(0);
            setSearchResultState(filteredUsers);
        }

        function keydownEventHandler(
            event: React.KeyboardEvent<HTMLInputElement>
        ) {
            if (event.key == "Enter" && selectedIndex != undefined) {
                return selectUser(searchResultState[selectedIndex]);
            }
            if (
                event.key == "Backspace" &&
                !(event.target as HTMLInputElement).value.length
            ) {
                console.log(backspaceCount);
                backspaceCount.current -= 1;
                if (backspaceCount.current <= 0) {
                    onPreviousDelete();
                    backspaceCount.current = 2;
                } else {
                    onHighlightPrevious();
                }
            }
            if (selectedIndex != undefined) {
                if (event.key == "ArrowUp") {
                    setSelectedIndex(
                        selectedIndex - 1 < 0
                            ? searchResultState.length - 1
                            : selectedIndex - 1
                    );
                }
                if (event.key == "ArrowDown") {
                    setSelectedIndex(
                        (selectedIndex + 1) % searchResultState.length
                    );
                }
            }
        }

        function selectUser(user: User) {
            setSearchResultState([]);
            setSelectedIndex(undefined);
            onSelect(user);
            setSearchQuery("");
        }

        return (
            <div className="w-min relative flex-1">
                <input
                    ref={ref as LegacyRef<HTMLInputElement>}
                    type="text"
                    className="w-full h-full ml-2 border-none outline-none"
                    onChange={(event) => {
                        setSearchQuery(event.target.value);
                        filterUsers(event.target.value);
                    }}
                    onKeyDown={keydownEventHandler}
                    value={searchQuery}
                    placeholder={
                        totalUsers == users.length ? placeholderText : ""
                    }
                />
                {!!searchResultState.length && (
                    <div className="absolute bg-white border-2 w-max">
                        {searchResultState.map((u, index) => (
                            <div
                                key={index}
                                className={
                                    "flex flex-row items-center p-2 border-t-2" +
                                    (selectedIndex != undefined &&
                                    selectedIndex == index
                                        ? " bg-slate-500"
                                        : "")
                                }
                                onClick={() => selectUser(u)}
                            >
                                <img
                                    src={u.image}
                                    className="w-10 h-10 rounded-full"
                                />
                                <span className="mx-2">
                                    {u.firstname} {u.lastname}
                                </span>
                                <span className="mx-1 text-gray-400">
                                    {u.email}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
);
