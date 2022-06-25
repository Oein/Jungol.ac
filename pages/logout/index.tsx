import { useRouter } from "next/router";
import Load from "../../components/loading";

export default function Logout() {
  const router = useRouter();
  const { url } = router.query;
  if (typeof window !== "undefined") {
    if (localStorage.getItem("username") !== undefined) {
      localStorage.removeItem("username");
      localStorage.removeItem("auth_token");
    }

    if (url !== undefined) {
      router.push(url as string);
    } else {
      router.push("/");
    }
  }

  return <Load />;
}
