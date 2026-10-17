import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ACCENT_BORDER_HUES } from "./tokens"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface CardData {
  id: number;
  title: string;
  description: string;
  category: string;
  metric: string;
  metricLabel: string;
  color: string;
  image: string;
  badge: string;
  link: string;
}

export const cardData: CardData[] = [
  {
    id: 1,
    title: "Late-Monsoon Thermal Shift",
    description: "Annual averages masked sharp seasonal trends across the Bay of Bengal. 25 years of NASA MERRA-2 records uncover a +0.40 °C/decade warming signature concentrated in September.",
    category: "CLIMATE DYNAMICS",
    metric: "+0.40 °C / decade",
    metricLabel: "September Surface Warming",
    color: ACCENT_BORDER_HUES[0],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    badge: "NASA MERRA-2 REANALYSIS",
    link: "/dossiers",
  },
  {
    id: 2,
    title: "Thermal Infrared Fire Penetration",
    description: "Dense monsoonal smoke blinds visible optical sensors. By isolating the 3.75 µm thermal infrared channel, active burning hotspots are identified through heavy atmospheric haze.",
    category: "INFRARED SENSING",
    metric: "375m Sub-pixel",
    metricLabel: "VIIRS I-4 Active Radiance",
    color: ACCENT_BORDER_HUES[1],
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80",
    badge: "VIIRS SUOMI-NPP SENSOR",
    link: "/games",
  },
  {
    id: 3,
    title: "Deltaic Microclimate Shift",
    description: "Decadal ground and satellite telemetry over Dhaka confirm accelerated surface heat flux and changing monsoon humidity patterns across the Ganges-Brahmaputra Delta.",
    category: "ATMOSPHERIC FLUX",
    metric: "25 Years Calibrated",
    metricLabel: "Decadal Trend Verification",
    color: ACCENT_BORDER_HUES[2],
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80",
    badge: "MODIS & POWER INTEGRATION",
    link: "/dossiers",
  },
  {
    id: 4,
    title: "Autonomous Geospatial Digital Twin",
    description: "CesiumJS-powered orbital simulation integrating real-time telemetry from 31 spatial stations, multi-sensor coverage pyramids, and dynamic climate anomaly layers.",
    category: "DIGITAL TWIN",
    metric: "31 Spatial Stations",
    metricLabel: "Real-time Node Telemetry",
    color: ACCENT_BORDER_HUES[3],
    image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
    badge: "CESIUM DIGITAL TWIN",
    link: "/agent",
  },
];
