export interface CarPhase {
    id: string;
    title: string;
    subtitle?: string;
    price?: string;
    description?: string;
    specs?: { label: string; value: string }[];
    cta?: string;
}

export const carData: CarPhase[] = [
    {
        id: "hero",
        title: "LAMBORGHINI HURACÁN",
        price: "3.22 CRORE",
        cta: "INQUIRE NOW",
    },
    {
        id: "design",
        title: "DESIGN",
        description: "SHARP, LOW, AND UNAPOLOGETIC. THE HURACÁN IS SCULPTED BY AIRFLOW AND ATTITUDE — EVERY LINE SERVES SPEED. ITS WEDGE-SHAPED SILHOUETTE, HEXAGONAL DESIGN LANGUAGE, AND RAZOR-EDGED PANELS CREATE A FORM THAT LOOKS FAST EVEN AT REST. INSIDE, A DRIVER-FOCUSED COCKPIT BLENDS AEROSPACE-INSPIRED CONTROLS WITH LUXURY MATERIALS, WRAPPING THE PILOT IN PURE PERFORMANCE. THIS IS DESIGN ENGINEERED TO DOMINATE THE ROAD AND THE SENSES.",
    },
    {
        id: "engine",
        title: "ENGINE",
        specs: [
            { label: "Engine", value: "V10" },
            { label: "Power", value: "602 hp (610 CV) / 631 hp (640 CV)" },
            { label: "0-100 km/h", value: "2.9 s" },
            { label: "Top Speed", value: "> 325 km/h" },
        ],
    },
];
