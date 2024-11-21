"use client";

import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiamVzdWlzbHVkYWwiLCJhIjoiY20zYnQ0aWdwMWkzNzJqcXgweG5zYXJiYyJ9.irMTOmxMR1Du1Shosz2M5g';

const markers = [
    { lng: -0.128018, lat: 51.519294, location: "British museum", description: "Musée de l'histoire et de la culture humaine" },
    { lng: -0.12654, lat: 51.500443, location: "Visite Westminster", description: "Quartier de Londres"  },
    { lng: -0.417706, lat: 51.688859, location: "Studio Harry Potter", description: "Comme son nom l'indique"  },
    { lng: -0.283887, lat: 51.556513, location: "London Designer Outlet", description: "Centre commercial semi-extérieur"  },
    { lng: -0.08112, lat: 51.50652, location: "HMS Belfast", description: "Croiseur léger de classe Town de la Royal Navy"  },
    { lng: -0.156537, lat: 51.509374, location: "Winter Wonderland", description: "Grande foire de Noël"  },
]

const TravelMap = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (mapRef.current || !mapContainerRef.current) return;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [-0.127765, 51.5074456],
            zoom: 8
        });

        markers.map((marker) => {
            const popup = new mapboxgl.Popup({
                offset: 25,
                closeButton: true,
                closeOnClick: true
            }).setHTML(`<h3 class="text-lg font-bold">${marker.location}</h3><p>${marker.description}</p>`);

            new mapboxgl.Marker()
                .setLngLat([marker.lng, marker.lat])
                .setPopup(popup)
                .addTo(map);;
        });

        mapRef.current = map;
    }, []);

    return (
        <div 
            ref={mapContainerRef}
            className="map-container rounded-xl border shadow min-h-[300px] h-full w-full"
        />
    );
}

export default TravelMap;