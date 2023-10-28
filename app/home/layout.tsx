import LeftBar from "./components/LeftBar";
import Sidebar from "./components/Sidebar";

const HomeLayout = (props: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full min-h-[inherit]">
      <Sidebar />
      <div className="flex-1">
        {props.children}
      </div>
      <LeftBar />
    </div>
  );
};

export default HomeLayout;
