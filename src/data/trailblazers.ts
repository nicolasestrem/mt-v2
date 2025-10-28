/**
 * Trailblazers 2025 Data
 *
 * Contains all data for the 24 Mobility Trailblazers 2025 honorees,
 * including their profiles, evaluation criteria, and categorization.
 *
 * @module trailblazers
 * @version 1.0.0
 */

// Type Definitions
export interface Trailblazer {
	id: string;
	name: string;
	title?: string;
	organization: string;
	category: 'etablierte' | 'startups' | 'politik';
	quickSummary: string;
	criteria: {
		courage: string;
		innovation: string;
		implementation: string;
		relevance: string;
		roleModel: string;
	};
	image: string;
	linkedin?: string;
}

export type CategoryKey = 'all' | 'etablierte' | 'startups' | 'politik';

export interface CategoryLabels {
	all: string;
	etablierte: string;
	startups: string;
	politik: string;
}

export interface CategoryColors {
	etablierte: string;
	startups: string;
	politik: string;
}

// Trailblazers Data (24 total)
export const trailblazers: Trailblazer[] = [
	// ETABLIERTE UNTERNEHMEN (6)
	{
		id: "andre-schwammlein",
		name: "André Schwämmlein",
		organization: "FlixBus",
		category: "etablierte",
		quickSummary: "Gründer und CEO von FlixMobility, revolutionierte den Fernbusmarkt in Europa",
		criteria: {
			courage: "Wagte den Einstieg in einen stark regulierten Markt und schuf ein neues Mobilitätskonzept",
			innovation: "Digitalisierung des Fernbusverkehrs mit dynamischer Preisgestaltung und App-basierter Buchung",
			implementation: "Aufbau des größten Fernbusnetzes Europas mit über 400.000 täglichen Verbindungen",
			relevance: "Demokratisierung des Reisens durch günstige und nachhaltige Mobilität",
			roleModel: "Inspiration für Gründer im Mobilitätssektor und Vorreiter für nachhaltige Geschäftsmodelle"
		},
		image: "/images/trailblazers/AndréSchwämmlein.jpg",
		linkedin: "https://www.linkedin.com/in/andreschwammlein/"
	},
	{
		id: "friedrich-draxlmaier",
		name: "Friedrich Dräxlmaier",
		organization: "DRÄXLMAIER Group",
		category: "etablierte",
		quickSummary: "CEO der DRÄXLMAIER Group, führender Automobilzulieferer für Premium-Fahrzeuge",
		criteria: {
			courage: "Frühe Fokussierung auf Elektromobilität und nachhaltige Bordnetzsysteme",
			innovation: "Entwicklung hochinnovativer Bordnetz- und Interieur-Systeme für E-Fahrzeuge",
			implementation: "Weltweite Expansion mit über 70.000 Mitarbeitern an 60 Standorten",
			relevance: "Schlüsselrolle in der Transformation zur Elektromobilität",
			roleModel: "Familienunternehmen als Vorbild für nachhaltiges Wachstum und Innovation"
		},
		image: "/images/trailblazers/FriedrichDräxlmaier.png"
	},
	{
		id: "helmut-ruhl",
		name: "Helmut Ruhl",
		organization: "AMAG Austria Metall AG",
		category: "etablierte",
		quickSummary: "CEO der AMAG, Pionier für nachhaltiges Aluminium in der Mobilitätsindustrie",
		criteria: {
			courage: "Konsequente Ausrichtung auf CO₂-neutrale Aluminiumproduktion",
			innovation: "Entwicklung von Leichtbaulösungen für die Automobilindustrie",
			implementation: "Aufbau einer der nachhaltigsten Aluminiumproduktionen weltweit",
			relevance: "Ermöglicht Gewichtsreduktion und damit Reichweitenerhöhung bei E-Fahrzeugen",
			roleModel: "Zeigt, wie traditionelle Industrie nachhaltig transformiert werden kann"
		},
		image: "/images/trailblazers/HelmutRuhl.jpg",
		linkedin: "https://www.linkedin.com/in/helmut-ruhl/"
	},
	{
		id: "olga-nevska",
		name: "Olga Nevska",
		organization: "Telekom MobilitySolutions",
		category: "etablierte",
		quickSummary: "Geschäftsführerin Telekom MobilitySolutions, treibt digitale Mobilitätslösungen voran",
		criteria: {
			courage: "Transformation vom Telekommunikations- zum Mobilitätsanbieter",
			innovation: "Entwicklung integrierter Mobilitätsplattformen und Smart Mobility Lösungen",
			implementation: "Aufbau eines der größten Ladenetze für Elektrofahrzeuge in Deutschland",
			relevance: "Verbindung von Telekommunikation und Mobilität für vernetzte Städte",
			roleModel: "Zeigt erfolgreiche Diversifikation in neue Geschäftsfelder"
		},
		image: "/images/trailblazers/OlgaNevska.jpg",
		linkedin: "https://www.linkedin.com/in/olga-nevska/"
	},
	{
		id: "tobias-liebelt",
		name: "Tobias Liebelt",
		organization: "Benteler Mobility Services",
		category: "etablierte",
		quickSummary: "Managing Director bei Benteler, entwickelt modulare Mobilitätslösungen",
		criteria: {
			courage: "Neuausrichtung vom klassischen Zulieferer zum Mobilitätsdienstleister",
			innovation: "Entwicklung modularer E-Mobility Plattformen und autonomer Fahrzeugkonzepte",
			implementation: "Serienproduktion skalierbarer E-Fahrzeug-Plattformen",
			relevance: "Beschleunigt Time-to-Market für neue E-Fahrzeughersteller",
			roleModel: "Transformation traditioneller Automotive-Zulieferer in die neue Mobilität"
		},
		image: "/images/trailblazers/TobiasLiebelt.jpg",
		linkedin: "https://www.linkedin.com/in/tobias-liebelt/"
	},
	{
		id: "ulrich-prediger",
		name: "Ulrich Prediger",
		organization: "JobRad",
		category: "etablierte",
		quickSummary: "Gründer und Geschäftsführer von JobRad, Pionier des Dienstrad-Leasings",
		criteria: {
			courage: "Schuf neues Geschäftsmodell für nachhaltige Mitarbeitermobilität",
			innovation: "Digitalisierung des Dienstrad-Leasings mit Full-Service-Konzept",
			implementation: "Über 40.000 Arbeitgeber und 2 Millionen Nutzer in Deutschland",
			relevance: "Fördert Radverkehr und reduziert CO₂-Emissionen im Berufsverkehr",
			roleModel: "Erfolgreiche Verbindung von Nachhaltigkeit und Wirtschaftlichkeit"
		},
		image: "/images/trailblazers/UlrichPrediger.jpg",
		linkedin: "https://www.linkedin.com/in/ulrich-prediger/"
	},

	// START-UPS & KATALYSATOREN (15)
	{
		id: "corsin-sulser",
		name: "Dr. Corsin Sulser",
		organization: "Parcandi",
		category: "startups",
		quickSummary: "CEO und Co-Founder von Parcandi, revolutioniert urbanes Parken mit KI",
		criteria: {
			courage: "Angriff auf etablierte Parkraumkonzepte mit digitaler Lösung",
			innovation: "KI-basierte Parkplatzoptimierung und dynamisches Pricing",
			implementation: "Expansion in mehrere europäische Städte binnen 3 Jahren",
			relevance: "Reduziert Parkplatzsuchverkehr um bis zu 30% in Innenstädten",
			roleModel: "Zeigt, wie Tech-Startups urbane Mobilität verbessern können"
		},
		image: "/images/trailblazers/CorsinSulser.jpg",
		linkedin: "https://www.linkedin.com/in/corsinsulser/"
	},
	{
		id: "fabian-beste",
		name: "Fabian Beste",
		organization: "4Screen",
		category: "startups",
		quickSummary: "Founder & CEO von 4Screen, digitalisiert In-Car Entertainment",
		criteria: {
			courage: "Entwicklung einer Plattform für alle Automobilhersteller gleichzeitig",
			innovation: "Erste herstellerübergreifende In-Car Commerce Plattform",
			implementation: "Integration in über 15 Automobilmarken weltweit",
			relevance: "Schafft neue Erlösmodelle für die Automobilindustrie",
			roleModel: "Erfolgreiche B2B2C-Plattform im Automotive-Sektor"
		},
		image: "/images/trailblazers/FabianBeste.jpg",
		linkedin: "https://www.linkedin.com/in/fabianbeste/"
	},
	{
		id: "felix-pornbacher",
		name: "Felix Pörnbacher",
		organization: "DeepDrive",
		category: "startups",
		quickSummary: "Co-Founder & CEO von DeepDrive, entwickelt revolutionäre E-Motoren",
		criteria: {
			courage: "Neuerfindung des Radnabenmotors für E-Fahrzeuge",
			innovation: "Patentierte Dual-Rotor-Technologie für höhere Effizienz",
			implementation: "Serienreife Entwicklung mit namhaften Automobilherstellern",
			relevance: "Ermöglicht bis zu 20% mehr Reichweite bei E-Fahrzeugen",
			roleModel: "Deep-Tech Startup aus München erobert globalen Markt"
		},
		image: "/images/trailblazers/FelixPörnbacher.jpg",
		linkedin: "https://www.linkedin.com/in/felix-poernbacher/"
	},
	{
		id: "horst-graef",
		name: "Horst Graef",
		organization: "deer GmbH",
		category: "startups",
		quickSummary: "Founder & CEO von deer, Pionier für E-Scooter Sharing in Deutschland",
		criteria: {
			courage: "Früher Markteintritt in umstrittenen Mikromobilitätsmarkt",
			innovation: "Swappable Battery Technologie und IoT-Integration",
			implementation: "Aufbau nachhaltiger Betriebsmodelle in über 20 Städten",
			relevance: "Lösung für die letzte Meile im urbanen Raum",
			roleModel: "Zeigt verantwortungsvolles Wachstum im Sharing-Markt"
		},
		image: "/images/trailblazers/HorstGraef.jpg",
		linkedin: "https://www.linkedin.com/in/horstgraef/"
	},
	{
		id: "judith-haberli",
		name: "Judith Häberli",
		organization: "Urban Connect",
		category: "startups",
		quickSummary: "Gründerin von Urban Connect, vernetzt urbane Mobilitätsdienste",
		criteria: {
			courage: "Gründung als Female Founder im männerdominierten Mobilitätssektor",
			innovation: "Intermodale Mobilitätsplattform mit Blockchain-Integration",
			implementation: "Pilotprojekte in 5 Schweizer Städten",
			relevance: "Vereinfacht Zugang zu nachhaltiger urbaner Mobilität",
			roleModel: "Vorbild für Female Entrepreneurship in Tech"
		},
		image: "/images/trailblazers/JudithHäberli.jpeg",
		linkedin: "https://www.linkedin.com/in/judithhaberli/"
	},
	{
		id: "katharina-kreutzer",
		name: "Katharina Kreutzer",
		organization: "MOVN",
		category: "startups",
		quickSummary: "Co-Founderin MOVN, entwickelt Software für autonome Fahrzeuge",
		criteria: {
			courage: "Fokus auf Level 4 Autonomie in komplexen urbanen Umgebungen",
			innovation: "Edge-Computing Lösungen für Echtzeit-Entscheidungen",
			implementation: "Erfolgreiche Tests mit führenden OEMs",
			relevance: "Beschleunigt Einführung autonomer Mobilität",
			roleModel: "Junge Gründerin in der KI-Entwicklung"
		},
		image: "/images/trailblazers/KatharinaKreutzer.jpg",
		linkedin: "https://www.linkedin.com/in/katharinakreutzer/"
	},
	{
		id: "lea-miggiano",
		name: "Léa Miggiano",
		organization: "carvolution",
		category: "startups",
		quickSummary: "Co-Founder & CMO von carvolution, revolutioniert Auto-Abos in der Schweiz",
		criteria: {
			courage: "Disruption des traditionellen Autokaufs und Leasings",
			innovation: "Volldigitales Auto-Abo-Modell mit All-Inclusive-Service",
			implementation: "Marktführer in der Schweiz mit über 5.000 Abonnenten",
			relevance: "Flexibilisierung der individuellen Mobilität",
			roleModel: "Erfolgreiche Scale-up Story im Mobility-as-a-Service Bereich"
		},
		image: "/images/trailblazers/LéaMiggiano.jpg",
		linkedin: "https://www.linkedin.com/in/leamiggiano/"
	},
	{
		id: "lukas-stranger",
		name: "Lukas Stranger",
		organization: "NXRT",
		category: "startups",
		quickSummary: "CEO von NXRT, entwickelt Extended Reality Lösungen für Mobilität",
		criteria: {
			courage: "Pionierarbeit in AR/VR für Automotive-Anwendungen",
			innovation: "Holographische Displays für Fahrzeuge der Zukunft",
			implementation: "Partnerschaften mit Premium-Automobilherstellern",
			relevance: "Definiert User Experience in zukünftigen Fahrzeugen neu",
			roleModel: "Verbindung von Gaming-Technologie und Mobilität"
		},
		image: "/images/trailblazers/LukasStranger.jpg",
		linkedin: "https://www.linkedin.com/in/lukasstranger/"
	},
	{
		id: "matthias-ballweg",
		name: "Matthias Ballweg",
		organization: "Circular Republic / TU München",
		category: "startups",
		quickSummary: "Founder Circular Republic, treibt Kreislaufwirtschaft in der Mobilität voran",
		criteria: {
			courage: "Fokus auf Circular Economy in linearer Automobilindustrie",
			innovation: "Digitaler Produktpass für Fahrzeugkomponenten",
			implementation: "Pilotprojekte mit führenden OEMs und Zulieferern",
			relevance: "Ermöglicht nachhaltige Wertschöpfungsketten",
			roleModel: "Akademischer Entrepreneur mit Impact-Fokus"
		},
		image: "/images/trailblazers/MatthiasBallweg.jpg",
		linkedin: "https://www.linkedin.com/in/matthiasballweg/"
	},
	{
		id: "roy-uhlmann",
		name: "Roy Uhlmann",
		organization: "Motor Ai",
		category: "startups",
		quickSummary: "Co-Founder Motor Ai, automatisiert Fahrzeuginspektion mit Computer Vision",
		criteria: {
			courage: "Digitalisierung des analogen Gebrauchtwagenmarkts",
			innovation: "KI-basierte Schadenserkennung in Echtzeit",
			implementation: "Integration bei großen Autohäusern und Flottenbetreibern",
			relevance: "Transparenz und Effizienz im Fahrzeughandel",
			roleModel: "Tech-Transfer aus anderen Industrien in Automotive"
		},
		image: "/images/trailblazers/RoyUhlmann.jpg",
		linkedin: "https://www.linkedin.com/in/royuhlmann/"
	},
	{
		id: "sarah-fleischer",
		name: "Sarah Fleischer",
		organization: "ToZero",
		category: "startups",
		quickSummary: "Co-Founderin ToZero, recycelt Batterien für die E-Mobilität",
		criteria: {
			courage: "Angriff auf etablierte Recycling-Verfahren mit neuer Technologie",
			innovation: "Chemisches Recycling mit 95% Materialrückgewinnung",
			implementation: "Aufbau erster kommerzieller Anlage in Deutschland",
			relevance: "Schlüssel für nachhaltige Elektromobilität",
			roleModel: "Female Founder in der Kreislaufwirtschaft"
		},
		image: "/images/trailblazers/SarahFleischer.jpg",
		linkedin: "https://www.linkedin.com/in/sarahfleischer/"
	},
	{
		id: "sascha-meyer",
		name: "Sascha Meyer",
		organization: "MOIA",
		category: "startups",
		quickSummary: "CEO von MOIA, führt Ridepooling in deutschen Städten ein",
		criteria: {
			courage: "Aufbau eines völlig neuen Mobilitätsdienstes im ÖPNV",
			innovation: "Algorithmen-basiertes Ridepooling mit E-Fahrzeugen",
			implementation: "Größte Ridepooling-Flotte Europas in Hamburg",
			relevance: "Ergänzung des ÖPNV und Reduktion des Individualverkehrs",
			roleModel: "Erfolgreiche Public-Private-Partnership im Mobilitätssektor"
		},
		image: "/images/trailblazers/SaschaMeyer.jpg",
		linkedin: "https://www.linkedin.com/in/saschameyer/"
	},
	{
		id: "sebastian-tanzer",
		name: "Sebastian Tanzer",
		organization: "Triply",
		category: "startups",
		quickSummary: "Founder Triply, digitalisiert Mitarbeitermobilität für Unternehmen",
		criteria: {
			courage: "Neugestaltung betrieblicher Mobilität in konservativen Unternehmen",
			innovation: "Ganzheitliche Mobilitätsbudget-Plattform",
			implementation: "Über 100 Unternehmenskunden in DACH-Region",
			relevance: "Fördert nachhaltige Mitarbeitermobilität",
			roleModel: "B2B-SaaS Erfolg im Mobility-Sektor"
		},
		image: "/images/trailblazers/SebastianTanzer.jpg",
		linkedin: "https://www.linkedin.com/in/sebastiantanzer/"
	},
	{
		id: "wim-ouboter",
		name: "Wim Ouboter",
		organization: "Microlino AG",
		category: "startups",
		quickSummary: "Founder Microlino, entwickelt urbane Elektro-Kleinstfahrzeuge",
		criteria: {
			courage: "Neuinterpretation des Stadtautos gegen etablierte OEMs",
			innovation: "Retro-Design trifft moderne E-Mobilität",
			implementation: "Serienproduktion und europaweiter Vertrieb",
			relevance: "Neue Fahrzeugkategorie für urbane Mobilität",
			roleModel: "Familienunternehmen fordert Großkonzerne heraus"
		},
		image: "/images/trailblazers/WimOuboter.jpg",
		linkedin: "https://www.linkedin.com/in/wimouboter/"
	},
	{
		id: "xanthi-doubara",
		name: "Xanthi Doubara",
		organization: "Via Transportation Berlin",
		category: "startups",
		quickSummary: "Managing Director Via Berlin, skaliert On-Demand Mobilität in Europa",
		criteria: {
			courage: "Expansion eines US-Startups in den regulierten europäischen Markt",
			innovation: "Dynamisches Routing und KI-basierte Flottenoptimierung",
			implementation: "Betrieb in über 20 europäischen Städten",
			relevance: "Neue Form des öffentlichen Nahverkehrs",
			roleModel: "Internationale Expansion im Mobility-Sektor"
		},
		image: "/images/trailblazers/XanthiDoubara.jpg",
		linkedin: "https://www.linkedin.com/in/xanthidoubara/"
	},

	// POLITIK & ÖFFENTLICHE INSTITUTIONEN (3)
	{
		id: "alexander-moller",
		name: "Alexander Möller",
		organization: "Verband Deutscher Verkehrsunternehmen (VDV)",
		category: "politik",
		quickSummary: "Geschäftsführer Politik beim VDV, gestaltet Verkehrswende auf Bundesebene",
		criteria: {
			courage: "Konsequentes Eintreten für ÖPNV-Priorisierung in der Politik",
			innovation: "Vorantreiben digitaler Tickets und intermodaler Vernetzung",
			implementation: "Deutschlandticket als größte ÖPNV-Reform",
			relevance: "Politische Weichenstellung für nachhaltige Mobilität",
			roleModel: "Erfolgreiche Interessenvertretung für öffentlichen Verkehr"
		},
		image: "/images/trailblazers/AlexanderMöller.jpg",
		linkedin: "https://www.linkedin.com/in/alexandermoeller/"
	},
	{
		id: "anjes-tjarks",
		name: "Dr. Anjes Tjarks",
		organization: "Hansestadt Hamburg",
		category: "politik",
		quickSummary: "Senator für Verkehr und Mobilitätswende Hamburg, Vorreiter urbaner Transformation",
		criteria: {
			courage: "Radikale Neuaufteilung des Straßenraums zugunsten nachhaltiger Mobilität",
			innovation: "Hamburg als Modellstadt für Mobilitätswende",
			implementation: "Ausbau Radwegenetz, ÖPNV-Offensive, autofreie Quartiere",
			relevance: "Blaupause für deutsche Großstädte",
			roleModel: "Politischer Mut für unpopuläre aber notwendige Maßnahmen"
		},
		image: "/images/trailblazers/AnjesTjarks.jpg",
		linkedin: "https://www.linkedin.com/in/anjes-tjarks/"
	},
	{
		id: "nic-knapp",
		name: "Nic Knapp",
		organization: "TUM Venture Labs",
		category: "politik",
		quickSummary: "Managing Director TUM Venture Labs Mobility, fördert Deep-Tech Startups",
		criteria: {
			courage: "Aufbau eines führenden Mobility-Inkubators in Europa",
			innovation: "Verbindung von Forschungsexzellenz und Unternehmertum",
			implementation: "Über 50 Mobility-Startups in 3 Jahren gegründet",
			relevance: "Beschleunigt Transfer von Forschung in die Praxis",
			roleModel: "Erfolgreiches Ökosystem für Mobility Innovation"
		},
		image: "/images/trailblazers/NicKnapp.jpg",
		linkedin: "https://www.linkedin.com/in/nicknapp/"
	}
];

// Category labels for display
export const categoryLabels: CategoryLabels = {
	all: "Alle",
	etablierte: "Etablierte Unternehmen",
	startups: "Start-ups & Katalysatoren",
	politik: "Politik & Öffentliche Institutionen"
};

// Category colors for badges
export const categoryColors: CategoryColors = {
	etablierte: "#003C3D",
	startups: "#C1693C",
	politik: "#6B46C1"
};
