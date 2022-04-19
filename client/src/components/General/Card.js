import { useNavigate } from 'react-router-dom';

function Card(props) {
  const navigate = useNavigate();
  const title = props.title;
  const channelName = props.channelName;
  const thumbnail = props.thumbnail;
  const videoId = props.videoId;
  return (
    <div class="w-25 h-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
      onClick={() => { console.log("The url is: " + videoId); navigate("/room/" + videoId) }
      }>
      <img class="px-0.125" src={thumbnail} alt="Sunset in the mountains"></img>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{title}</div>
        <p class="text-gray-700 text-base">
          {/* {title} */}
          {channelName}
        </p>
      </div>
      {/* <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
      </div> */}
    </div>
  )
}

export default Card;