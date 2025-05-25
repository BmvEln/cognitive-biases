import { ReactNode, useEffect, useRef, useState } from "react";

import "./style.less";

type ShowMore = {
  title: string | ReactNode;
  children: ReactNode;
};

function ShowMore({ title, children }: ShowMore) {
  const [heightContent, setHeightContent] = useState(0),
    [isOpen, setIsOpen] = useState(false),
    contentRef = useRef(null),
    hiddenRef = useRef(null);

  useEffect(() => {
    if (hiddenRef.current) {
      setHeightContent(hiddenRef.current.clientHeight);
    }
  }, []);

  return (
    <div className="ShowMore">
      <div className="ShowMoreTitle" onClick={() => setIsOpen(!isOpen)}>
        {title} {isOpen ? "▲" : "▼"}
      </div>
      {/* Используем для вычисления реальной высоты контента */}
      <div
        className="ShowMoreContent"
        ref={hiddenRef}
        style={{ position: "absolute", visibility: "hidden" }}
      >
        {children}
      </div>
      <div
        className="ShowMoreContent"
        ref={contentRef}
        style={{
          maxHeight: (isOpen ? heightContent : 0) + "px",
          opacity: isOpen ? 1 : 0,
          marginBottom: (isOpen ? 24 : 0) + "px",
          transition: isOpen ? "opacity 0.5s" : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default ShowMore;
