import React from "react";
import { Button, Modal } from "antd";

export * from "./hooks";

const VideoModal: React.FC<
  React.ComponentProps<typeof Modal> & { link: string; title?: string }
> = ({ onCancel, visible, link, title }) => {
  return (
    <Modal
      visible={visible}
      width="1024px"
      onCancel={onCancel}
      footer={
        <Button size="large" onClick={onCancel} type="primary">
          Confirm
        </Button>
      }
    >
      {visible ? (
        <iframe
          id={title}
          width="960"
          height="600"
          src={link.replace(
            "https://youtu.be",
            "https://www.youtube.com/embed"
          )}
          title={title || "spacex"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : null}
    </Modal>
  );
};

export default VideoModal;
