import { Col, Row } from "react-bootstrap"

interface VimeoViewerInterface {
  url: string
}

const VimeoViewer = (props: VimeoViewerInterface) => {

  if (!props.url.includes("https://player.vimeo.com")) {
    return (
      <div style={{ height: "25em", width: "100%", backgroundColor: "black", color: "white", textAlign: "center" }}>
        {/* TODO: CSS 수정하기 */}
        <br /><br /><br /><br /><br /><br /><br /><br />올바르지 않은 Vimeo 링크입니다.
      </div>
    )
  }

  return (
    <>
      <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
        <iframe
          src={props.url}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          title="Untitled video 4k HDR" />

      </div>
      <script src="https://player.vimeo.com/api/player.js" />
    </>
  )
}

export default VimeoViewer