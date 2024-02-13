import { ILessonDto } from "@/app/interface/modules/lesson";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Lesson = {
  list?: ILessonDto[];
  item?: ILessonDto;
};

interface IServerProps {
  lesson?: Lesson;
}

interface IDefaultProps {
  state?: IServerProps;
  handleUpdateState?: (params: IServerProps) => void;
  updateLesson?: (params: Lesson) => void;
}

const defaultServerState: IServerProps = {
  lesson: {
    list: [],
    item: {},
  },
};

const defaultProps: IDefaultProps = {};

export const ServerContext = createContext(defaultProps);

const ServerStateProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [data, setData] = useState(defaultServerState);

  const handleUpdateState = useCallback((updatedData: IServerProps) => {
    setData({ ...data, ...updatedData });
  }, []);

  const updateLesson = useCallback((updatedData: Lesson) => {
    const newLessonState = { ...data.lesson, ...updatedData };
    return handleUpdateState({ lesson: newLessonState });
  }, []);

  const state = {
    handleUpdateState,
    updateLesson,
    state: data,
  };

  return (
    <ServerContext.Provider value={state}>
      {props.children}
    </ServerContext.Provider>
  );
};

export const useServerContext = () => {
  const context = useContext(ServerContext);
  return context;
};

export default ServerStateProvider;
