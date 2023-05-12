import s from "./style.module.css";
import { Search as SearchIcon } from "react-bootstrap-icons";

export function SearchBar(props) {
    return (
        <>
            <SearchIcon size={27} className={s.icon} />
            <input
                type="text"
                className={s.input}
                placeholder="Search a tv show you may like"
            />
        </>
    );
}
