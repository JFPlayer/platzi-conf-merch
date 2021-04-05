import axios from 'axios';
import {useState, useEffect} from 'react'

const useGoogleAddress = address => {
  const [map, setMap] = useState({});
  const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCgMLUvPUcuAU0McE92_zsjvpPlIzL1NCo`

  useEffect(async () => {
    const response = await axios(API);
    setMap(response.data.results[0].geometry.location)
  }, [])

  return map;
}

export default useGoogleAddress;