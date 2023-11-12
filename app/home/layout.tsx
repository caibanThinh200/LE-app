import RightBar from "./components/RightBar";
import Sidebar from "./components/Sidebar";

const HomeLayout = (props: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full min-h-[inherit]">
      <Sidebar />
      <div className="flex-1">{props.children}</div>
      <RightBar />
    </div>
  );
};

export default HomeLayout;
