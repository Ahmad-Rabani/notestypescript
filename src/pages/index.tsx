import StyledComponentsRegistry from "../../registry";
import Link from "next/link";
import SignUp from "./signup";
import Login from "./login";
import Main from "./main";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <StyledComponentsRegistry>
        <Link className={`link ${pathname === '3000' ? router.push("/signup") : ''}`} href="/signup">
          <SignUp />
        </Link>
        <Link href="/login">
          <Login />
        </Link>
        <Link href="/main">
          <Main />
        </Link>
      </StyledComponentsRegistry>
    </>
  );
}
