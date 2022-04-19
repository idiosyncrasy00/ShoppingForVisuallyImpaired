import ReactPlayer from 'react-player'

function VideoPlayer(props) {
  const videoURL = props.videoURL;
  return (
    <div className="ml-40">
      <ReactPlayer url={videoURL} />
      </div>
  );
}

export default VideoPlayer;