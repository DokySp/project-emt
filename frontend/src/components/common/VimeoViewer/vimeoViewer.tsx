
interface VimeoViewerInterface {
  url: string
}

const VimeoViewer = (props: VimeoViewerInterface) => (
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

export default VimeoViewer