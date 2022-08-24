import axios from "axios"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-regular-svg-icons'
import { faCloud } from '@fortawesome/free-solid-svg-icons'
import { faSnowflake } from '@fortawesome/free-solid-svg-icons'
import { faCloudRain } from '@fortawesome/free-solid-svg-icons'


function ApiCall({ getSelection }) {
  const [takeData, setTakeData] = useState({list: []})
  const [loading, setLoading] = useState(false)

  const sunBright = <FontAwesomeIcon icon={faSun} className="sun" />
  const cloud = <FontAwesomeIcon icon={faCloud} className="cloud" />
  const snow = <FontAwesomeIcon icon={faSnowflake} className="snow" />
  const rain = <FontAwesomeIcon icon={faCloudRain} className="rainy" />


  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true)
      try {
        const res = await axios(`https://api.openweathermap.org/data/2.5/forecast?q=${getSelection}&units=metric&appid=c681e6e33ec339728fdf88e0b24a2a01`)
        setTakeData(res.data)
        // console.log(res.data)
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    }
    fetchApi()
  }, [getSelection])

  if (loading === true) {
    return <div>Loading...</div>
  }

  const { list } = takeData
  // console.log("IS UPDATED: ",city?.name)
  // To show the weather throughout the day, I cut the array
  const oneDayList = list.slice(0,8)

  return (
    <div className="container">
      <div className="weather_card" style={{ marginLeft: "60px", marginBottom: "10px" }} >{oneDayList?.map((el, idx) => (
        <div className="weather" key={idx}>
          <p className="date">{el.dt_txt}</p>
          <p className="icon">{el.weather[0].main === "Clouds" ? cloud : el.weather[0].main === "Clear" ? sunBright : el.weather[0].main === "Rain" ? rain : el.weather[0].main === "Snow" ? snow : "Weather cannot find"}</p>
          <p className="showDescr">{Math.round(el.main.temp)} °C / {el.weather[0].main}</p>
        </div>        
      ))}
      </div>
    </div>
  )

}

export default ApiCall