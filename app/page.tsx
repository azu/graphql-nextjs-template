"use client";
import { createQueryPreloader, QueryReference, skipToken, useBackgroundQuery, useReadQuery } from "@apollo/client";
import { ErrorBoundary } from "react-error-boundary";
import { GetBooksDocument, GetBooksQuery } from "../api/gql/graphql";
import { client } from "./apollo/ApolloClient";
import { Suspense, useEffect, useState } from "react";

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
const BookWithData = (props: { data?: GetBooksQuery }) => {
    return <ul>
        {
            props?.data?.books?.map((item) => (
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
const fallbackRender = (props: { error: Error, resetErrorBoundary: () => void; refresh: () => void }) => {
    return <div>
        <button onClick={() => {
            props.refresh();
            props.resetErrorBoundary();
        }}>Try again: {props.error.message}</button>
    </div>
}
export default function Home() {
    const mounted = useMounted();
    // const { data } = useSuspenseQuery(GetBooksDocument, mounted ? {} : skipToken);
    const [queryRef, {
        refetch
    }] = useBackgroundQuery(GetBooksDocument, mounted ? {} : skipToken);
    return <main style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
    }}>
        <h1>Page</h1>
        <ErrorBoundary fallbackRender={props => {
            return fallbackRender({
                ...props,
                refresh: refetch
            });
        }}>
            <Suspense fallback={<>Loading</>}>
                {/*{data ? <BookWithData data={data}/> : <BookPlaceholder/>}*/}
                {queryRef ? <Book queryRef={queryRef}/> : <BookPlaceholder/>}
            </Suspense>
        </ErrorBoundary>
    </main>
}
