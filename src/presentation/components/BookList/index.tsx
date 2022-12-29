import { BookModel } from "@/domain/models";
import { Card } from "../Card";
import { ListStyled } from "./styles";

type BookListProps = {
    books: BookModel[]
}

export function BookList({ books }: BookListProps) {
    return (
        <ListStyled>
            {books.map((book) => {
                return <Card book={book} />
            })}
        </ListStyled>
    )
}