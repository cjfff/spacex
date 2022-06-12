import { useMemo, useState } from "react";
import VideoModal from "./index";

interface IQuery {
  link?: string;
  title?: string;
}

export function useVideoModal() {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState<IQuery>({});
  const showModal = (query: IQuery) => {
    setVisible(true);
    setQuery(query);
  };

  const videoModal = useMemo(() => {
    if (query.link && visible)
      return (
        <VideoModal
          visible={visible}
          onCancel={() => setVisible(false)}
          link={query.link!}
          title={query.title}
        />
      );

    return <></>;
  }, [query.link, query.title, visible]);

  return {
    videoModal,
    showModal
  };
}
