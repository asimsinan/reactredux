import "./App.css";
import Liste from "./Liste";
import InputWithLabel from "./InputWithLabel";
import React from "react";
import axios from "axios";
import Yazi from "./Yazi";
import { useSelector,useDispatch } from "react-redux";
function App() {
  const API_ENDPOINT =
    "https://my-json-server.typicode.com/asimsinan/mockapi/dersler";
  const [aramaMetni, setAramaMetni] = React.useState(
    localStorage.getItem("aranan") || "Web"
  );
const dispatch=useDispatch();
const data=useSelector((state)=>state.data);
const isLoading=useSelector((state)=>state.isLoading);
const isError=useSelector((state)=>state.isError);

  function handleSearch(event) {
    setAramaMetni(event.target.value);
    localStorage.setItem("aranan", event.target.value);
  }
  React.useEffect(() => {
    localStorage.setItem("aranan", aramaMetni);
  }, [aramaMetni]);
  const handleFetchPost = React.useCallback(() => {
    dispatch({ type: "FETCH_INIT" });
    axios(API_ENDPOINT)
      .then((result) => {
        dispatch({
          type: "FETCH_SUCCESS",
          payload: result.data.data,
        });
      })
      .catch(() => dispatch({ type: "FETCH_FAILURE" }));
  });
  React.useEffect(() => {
    handleFetchPost();
  }, []);
  function handleRemovePost(yaziID) {
    dispatch({
      type: "REMOVE_POST",
      payload: yaziID,
    });
  }
  const arananYazilar = data.filter(function (yazi) {
    return yazi.baslik.toLowerCase().includes(aramaMetni.toLowerCase());
  });
  return (
    <div>
      <InputWithLabel
        type="text"
        id="arama"
        value={aramaMetni}
        onInputChange={handleSearch}
        label="Arama"
      />
      <hr />
      {isError ? (
        <p>Bir hata oluştu...</p>
      ) : isLoading ? (
        <p>Yükleniyoor...</p>
      ) : (
        <Liste
          Yazi={
            <Yazi yazilar={arananYazilar} onRemovePost={handleRemovePost} />
          }
        />
      )}
    </div>
  );
}
export default App;
