"use client";

import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiamVzdWlzbHVkYWwiLCJhIjoiY20zYnQ0aWdwMWkzNzJqcXgweG5zYXJiYyJ9.irMTOmxMR1Du1Shosz2M5g';

const TravelMap = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (mapRef.current || !mapContainerRef.current) return;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [1.43, 42.6],
            zoom: 10
        });
    }, []);

    return (
        <div 
            ref={mapContainerRef}
            className="map-container rounded-xl border shadow min-h-[300px] h-full w-full"
        />
    );
}

export default TravelMap;