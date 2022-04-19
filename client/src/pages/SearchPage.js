//import ChatForm from "../components/Room/ChatForm";
import SearchBar from "../components/General/SearchBar"
import Card from "../components/General/Card"
//import VideoUpload from "../components/General/VideoUpload";
import { useState, Fragment, useEffect } from 'react';
import { youtubeAPI } from "../adapters/youtube.api"
import { useNavigate } from "react-router-dom"
import { getQuery } from "../redux/query"
import { useSelector, useDispatch } from "react-redux";
import Button from "../components/General/Button"
import InputField from "../components/General/InputField"

function SearchPage() {
  const query = useSelector((state) => state.query.value);
  const dispatch = useDispatch(getQuery(query));
  const [searchForm, setSearchForm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  //let { query } = useParams();
  useEffect(() => {
    console.log("lmao")
  })
  function searchResult() {
    //setSearchResults([]);
    dispatch(getQuery(searchForm))
    if (query === "") {
      alert("Please fill in the search box!");
      return;
    }
    navigate("/search?query=" + query)
    //setSearchResults([])
    console.log("Search resulttttttt is " + searchForm);
    youtubeAPI(searchForm)
      .then(res => {
        console.log(res.data)
        //dispatch(getQuery(searchForm));
        //console.log(res.data.params)
        for (var i = 0; i < 5; i++) {
          setSearchResults(result => [...result, res.data.items[i]]);
        }
        console.log(searchResults.length)
      }
      )
  }
  return (
    <div>
      <h1>Search Page</h1>
      {/* <ChatForm /> */}
      <SearchBar
        searchResult={searchResult}
        onChange={(e) => setSearchForm(e.target.value)}
        defaultValue={query}
      />
      or
      <Button
        bgColor={"blue-500"}
        textColor={"blue-500"}
        size={"lg"}
        buttonName={"Upload a video"}
        onClick={() => setShowModal(true)}
      />
      {/* <VideoUpload /> */}

      <div>
        {
          searchResults.map((result, index) => {
            return (
              <Fragment>
                {/* <li key={index}>{result}</li>
                <br></br> */}
                <Card
                  title={result.snippet.title}
                  channelName={result.snippet.channelTitle}
                  thumbnail={result.snippet.thumbnails.high.url}
                  videoId={result.id.videoId}
                />
              </Fragment>
            )
          })
        }
        {
          //show modal
          showModal ? (
            <>
              <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        Modal Title
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          {/* name={name} type={type} placeholder={placeholder} onChange={onChange} defaultValue={defaultValue} /> */}
                        <InputField
                          type={"file"}
                          placeholder={"Upload a video here"}
                        />
                      </p>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
      </div>
    </div >
  )
}

export default SearchPage;