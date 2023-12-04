import React, {useEffect, useState} from "react";
import {Container as MapDiv, NaverMap, Marker, useNavermaps, NavermapsProvider} from "react-naver-maps";

export default function CurentMap({address}) {
    function Map({address}) {
        const navermaps = useNavermaps();
        const [lng, setLng] = useState(37.54);
        const [lat, setLat] = useState(126.99);
        const [zoom, setZoom] = useState(20);
        const [roadAddress, setRodaAddress] = useState(null);

        useEffect(() => {
            navermaps.Service.geocode({query: address}, function (status, response) {
                console.log("geocode status: ", status);
                console.log("geocode response: ", response);
                if (status != navermaps.Service.Status.OK) {
                    return alert("wrong");
                } else {
                    var result = response.v2,
                        item = result.addresses;
                    console.log("geocoding result: ", result);
                    console.log("geocoding item: ", item);
                    if (item!=null || item[0]!=null) {
                        let x = parseFloat(item[0]?.x);
                        console.log(item[0]?.x);
                        let y = parseFloat(item[0]?.y);
                        console.log(item[0]?.y);

                        setLng(x);
                        setLat(y);
                        setZoom(15);
                        setRodaAddress(item[0]?.roadAddress);

                        console.log("geocode road: ", roadAddress);
                    } else{
                        console.error("Error!!!");
                    }
                }
            });
        }, [address, navermaps.Service]);
        return (
            <NaverMap
                //Latitude={lat}
                //Longtitude={lng}
                center={{lat, lng}}
                defaultZoom={12}
                zoom={zoom}
                style={{width: "400px", height: "400px"}}>
                <Marker position={{lat, lng}}/>
            </NaverMap>
        );
    }
    return(
        <NavermapsProvider
            ncpClientId={"c993q8ts9o"}
            submodules={["geocoder"]}>
            <MapDiv style={{width: "800px", height: "800px"}}>
                <Map address={address}/>
            </MapDiv>
        </NavermapsProvider>
    )
}
