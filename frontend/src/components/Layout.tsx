// Layout.tsx
import { Outlet } from "react-router-dom";
import { Appbar } from "./Appbar";
import { useRecoilValue } from "recoil";
import { userState } from "../hooks";

const Layout = () => {
    const uName = useRecoilValue(userState)
  return (
    <>
      <Appbar userName={uName}/>
      <Outlet />
    </>
  );
};

export default Layout;