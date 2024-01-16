import CrossSvg from '../assets/cross.svg';
import { User } from '../demo-data';

export interface ChipProps{
    user: User,
    onDelete: (user:User)=>void
    isHighlighted: boolean
}
const Chips = ({user, onDelete, isHighlighted = false}:ChipProps) => {
    return (
        <div className={"rounded-3xl flex items-center  m-1 " + (isHighlighted ? "bg-slate-500" : "bg-slate-400")}>
            <img
                src={user.image}
                className="rounded-full w-10 h-10 bg-slate-500"
            />
            <span className="mx-1">
                {user.firstname} {user.lastname}
            </span>
            <img src={CrossSvg} className='w-5 h-5 mx-2 cursor-pointer' onClick={() => onDelete(user)}/>
        </div>
    );
};

export default Chips;
