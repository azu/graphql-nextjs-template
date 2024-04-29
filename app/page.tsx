"use client";
import { createQueryPreloader, QueryReference, useReadQuery } from "@apollo/client";
import { ErrorBoundary } from "react-error-boundary";
import { GetBooksDocument, GetBooksQuery } from "../api/gql/graphql";
import { Suspense, useEffect, useState } from "react";
import { client } from "./apollo/ApolloClient";

const preloader = createQueryPreloader(client);
const GetBooksQueryRef = typeof window !== "undefined" ? preloader(GetBooksDocument) : null;
const Book = (props: { queryRef: QueryReference<GetBooksQuery>; }) => {
    const { data } = useReadQuery(props.queryRef);
    return <ul>
        {
            data?.books?.map((item) => (
                <li key={item.id}>{item.title} by {item.author.name}</li>
            ))
        }
    </ul>
};
const BookPlaceholder = () => {
    return <ul>
        <li>DEFAULT BOOK</li>
    </ul>

}
const useMounted = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    return mounted;
}
export default function Home() {
    const mounted = useMounted();
    return <main style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
    }}>
        <h1>Page</h1>
        <ErrorBoundary fallback={<>Error</>}>
            <Suspense fallback={<BookPlaceholder/>}>
                {GetBooksQueryRef ? <Book queryRef={GetBooksQueryRef}/> : <BookPlaceholder/>}
            </Suspense>
        </ErrorBoundary>
    </main>
}
