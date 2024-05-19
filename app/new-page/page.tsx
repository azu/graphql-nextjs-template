// @ts-expect-error
import lodash from "lodash"

export default function Home() {
    return <>NEW PAGE:{lodash.version}</>;
}
