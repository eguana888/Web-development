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
                if (status != navermaps.Service.Status.OK) {
                    return alert("wrong");
                } else {
                    var result = response.v2,
                        item = result.addresses;
                    if (item!=null || item[0]!=null) {
                        let x = parseFloat(item[0]?.x);
                        let y = parseFloat(item[0]?.y);

                        setLng(x);
                        setLat(y);
                        setZoom(15);
                        setRodaAddress(item[0]?.roadAddress);

                    } else{
                        console.error("Error!!!");
                    }
                }
            });
        }, [address, navermaps.Service]);
        return (
            <NaverMap
                center={{lat, lng}}
                defaultZoom={12}
                zoom={zoom}
                style={{width: "200px", height: "200px"}}>
                <Marker position={{lat, lng}}/>
            </NaverMap>
        );
    }
    return(
        <NavermapsProvider
            ncpClientId={"c993q8ts9o"}
            submodules={["geocoder"]}>
            <MapDiv style={{ height: "300px", marginTop:"20px"}}>
                <Map address={address}/>
            </MapDiv>
        </NavermapsProvider>
    )
}
