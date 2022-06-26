import Head from "next/head";
import FHeader from "../components/Fheader";

export default function Index() {
  return (
    <>
      <Head>
        <title>Jungoler | Main</title>
      </Head>
      <FHeader
        title="Jungoler"
        description="Jungol.co.kr을 사용하는 사람들의 모임"
      />
    </>
  );
}
