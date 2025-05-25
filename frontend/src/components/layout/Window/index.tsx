import React, { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import ReactDOM from "react-dom";

import "./style.less";

import { useEvent } from "../../../functions/hooks.tsx";

import Button from "../../controls/Button";

const modalRoot = document.getElementById("modals")!,
  STATE_NONE = 0,
  STATE_OVERLAY = 1,
  STATE_EMPTY = 2,
  STATE_CONTENT = 3;

type Props = {
  id?: string;
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
  hideClose?: boolean;
  theme?: string;
  confirm?: string | React.ReactNode;
  noQuestion?: boolean;
  confirmYes?: string;
  confirmNo?: string;
  onClickYes?: () => void;
  isUnderstand?: boolean;
  width?: number;
  height?: number;
  btnYesLoading?: boolean;
  style?: object;
};

function Window({
  id,
  open,
  onClose,
  children,
  hideClose = false,
  confirm,
  noQuestion = false,
  confirmYes = "Да",
  confirmNo = "Нет",
  isUnderstand = false,
  onClickYes,
  theme,
  width,
  height,
  btnYesLoading,
  style,
}: Props) {
  const [el] = useState(document.createElement("div")),
    childrenRef = useRef(children),
    [showState, setShowState] = useState(open ? STATE_CONTENT : STATE_NONE),
    [windowContent, setWindowContent] = useState(
      open ? childrenRef.current : undefined,
    ),
    openCallback = useCallback(() => {
      if (modalRoot.childNodes.length) {
        return;
      }
      setWindowContent(childrenRef.current);
      modalRoot.appendChild(el);

      const body = document.getElementsByTagName("body")[0];
      body.classList.add("noScroll");

      setShowState(STATE_OVERLAY);
      window.setTimeout(() => setShowState(STATE_EMPTY), 300);
      window.setTimeout(() => setShowState(STATE_CONTENT), 300);
    }, [el]),
    closeCallback = useCallback(() => {
      setShowState(STATE_EMPTY);
      window.setTimeout(() => setShowState(STATE_OVERLAY), 0);
      window.setTimeout(() => setShowState(STATE_NONE), 300);
      window.setTimeout(() => {
        if (modalRoot.childNodes.length < 2) {
          const body = document.getElementsByTagName("body")[0];
          body.classList.remove("noScroll");
        }
        if (modalRoot.contains(el)) modalRoot.removeChild(el);
        setWindowContent(undefined);
      }, 600);
    }, [el]);

  useEvent(
    "keydown",
    (e) => {
      if (e.code === "Escape") onClose();
    },
    [],
  );

  useEffect(() => {
    if (open) {
      childrenRef.current = children;
      setWindowContent(childrenRef.current);
    }
  }, [children, open]);

  useEffect(() => {
    if (open && !modalRoot.contains(el)) {
      openCallback();
    } else if (modalRoot.contains(el)) {
      closeCallback();
    }

    return () => {
      if (modalRoot.contains(el)) closeCallback();
    };
  }, [closeCallback, el, open, openCallback]);

  return ReactDOM.createPortal(
    <div className="WindowContainer">
      <div className="WindowWrapper">
        <div className="WindowBox">
          <div
            id={id}
            className={classNames("Window", theme, {
              active: open,
              confirm: confirm,
            })}
            style={{
              opacity: showState < STATE_EMPTY ? 0 : 1,
              transform: showState < STATE_EMPTY ? "scale(0.8)" : undefined,
              ...style,
            }}
            onClick={onClose}
          >
            <div
              className={classNames("WindowContent", { active: open })}
              style={{
                opacity: showState === STATE_CONTENT ? 1 : 0,
                transform:
                  showState === STATE_CONTENT ? undefined : "scale(0.8)",
                width,
                height,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {!hideClose ? (
                <div className="WindowClose" onClick={onClose} />
              ) : null}

              {!confirm ? null : (
                <>
                  {noQuestion ? null : (
                    <div className="WindowQuestion">{confirm}</div>
                  )}

                  {isUnderstand ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button onClick={onClose} size="big">
                        Понятно
                      </Button>
                    </div>
                  ) : (
                    <div className="WindowBtns">
                      <Button
                        onClick={onClose}
                        width={60}
                        size="big"
                        theme="green"
                      >
                        {confirmNo}
                      </Button>
                      <Button
                        className={btnYesLoading ? "animLoading" : undefined}
                        onClick={onClickYes}
                        width={60}
                        size="big"
                        theme="pink"
                      >
                        {confirmYes}
                      </Button>
                    </div>
                  )}
                </>
              )}

              {windowContent}
            </div>
          </div>
        </div>
        <div
          className="WindowOverlay"
          onClick={onClose}
          style={{ opacity: showState === STATE_NONE ? 0 : 1 }}
        />
      </div>
    </div>,
    el,
  );
}

export default Window;
