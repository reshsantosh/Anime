import React, { useEffect, useState } from "react";
import './Components/style.css';
import { AnimeList } from "./Components/AnimeList";
import { AnimeInfo } from "./Components/AnimeInfo";
import { AddToList } from "./Components/AddToList";
import { RemoveFromList } from "./Components/RemoveFromList";
function App() {

  const [search,setSearch]=useState('power')
  const [animeData,setAnimeData]=useState();
  const [animeInfo,setAnimeInfo]=useState()
  const [myAnimeList,setMyAnimeList]=useState([])

  const addTo=(anime)=>{
    const index=myAnimeList.findIndex((myanime)=>{
        return myanime.mal_id === anime.mal_id
    })
    if(index < 0){
      const newArray=[...myAnimeList,anime]
      setMyAnimeList(newArray);
    }
    
  }
  const removeFrom=(anime)=>{
    const newArray=myAnimeList.filter((myanime)=>{
      return myanime.mal_id !== anime.mal_id
    })
    setMyAnimeList(newArray)
  }
  
  useEffect(()=>{
    const getData=async()=>{
      const res=await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=20`)
      const resData= await res.json();
      setAnimeData(resData.data)
  }
    getData()
  },[search])

  return (
    <>
        <div className="header">
          <h1>Welcome to Anime</h1>
          <div className="search-box">
              <input type="search" placeholder="Search your anime" 
              onChange={(e)=>setSearch(e.target.value)}/>
          </div>
        </div>

        <div className="container">
          <div className="animeInfo">
           {animeInfo && <AnimeInfo animeInfo={animeInfo}/>}
          </div>
          <div className="anime-row">
            <h2 className="text-heading">Searched Anime List</h2>
            <div className="row">
                <AnimeList 
                animelist={animeData}
                setAnimeInfo={setAnimeInfo}
                animeComponent={AddToList}
                handleList={(anime)=>addTo(anime)}
                />
            </div>
            <h2 className="text-heading">Watch List</h2>
            <div className="row">
                <AnimeList 
                animelist={myAnimeList}
                setAnimeInfo={setAnimeInfo}
                animeComponent={RemoveFromList}
                handleList={(anime)=>removeFrom(anime)}
                />
            </div>
          </div>
        </div>
    </>
  );
}

export default App;
