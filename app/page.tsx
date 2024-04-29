"use client";
import { useQuery } from "@apollo/client";
import { GetBooksDocument } from "../api/gql/graphql";

export default function Home() {
    const { loading, error, data } = useQuery(GetBooksDocument);
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error</div>
    }
    if (!data) return null;
    return <main style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
    }}>
        <ul>
            {
                data?.books?.map((item) => (
                    <li key={item.id}>{item.title} by {item.author.name}</li>
                ))
            }
        </ul>
    </main>
}
