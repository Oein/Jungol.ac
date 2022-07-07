import ErrorPage from "next/error";

export default function fourOfour() {
  return <ErrorPage statusCode={404} title="This page could not be found" />;
}
