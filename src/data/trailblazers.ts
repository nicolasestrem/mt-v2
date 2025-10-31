/**
 * Trailblazers 2025 Data
 *
 * Contains all data for the 22 Mobility Trailblazers 2025 honorees,
 * including their profiles and categorization.
 *
 * @module trailblazers
 * @version 2.0.0
 */

// Type Definitions
export interface Trailblazer {
	id: string;
	name: string;
	title?: string;
	organization: string;
	category: 'etablierte' | 'startups' | 'politik';
	quickSummary: string;
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

// Trailblazers Data (22 total)
export const trailblazers: Trailblazer[] = [
	// ETABLIERTE UNTERNEHMEN (5)
	{
		id: "andre-schwammlein",
		name: "André Schwämmlein",
		organization: "FlixBus",
		category: "etablierte",
		quickSummary: "André Schwämmlein hat mit FlixBus einen neuen globalen Mobilitätsanbieter geschaffen und den Fernverkehr digital, kundenfreundlich und nachhaltig neu definiert. Mit Mut und Weitblick nutzte er die Deregulierung des Marktes, um ein innovatives, asset-light Geschäftsmodell zu etablieren. Unter seiner Führung wuchs Flix zu einem internationalen Unternehmen mit Millionen Fahrgästen.",
		image: "/images/trailblazers/AndréSchwämmlein.jpg",
		linkedin: "https://www.linkedin.com/in/andreschwammlein/"
	},
	{
		id: "helmut-ruhl",
		name: "Helmut Ruhl",
		organization: "AMAG",
		category: "etablierte",
		quickSummary: "Helmut Ruhl transformierte die AMAG vom Autoimporteur zum Anbieter nachhaltiger Mobilitätslösungen. Unter seiner Leitung entstand ein Ökosystem aus E-Auto-Abos, Carsharing und Ladeinfrastruktur. Das Unternehmen verfolgt ein Netto-Null-Ziel bis 2040 und setzt auf erneuerbare Energien. Ruhls Strategie gilt als Best Practice für die Dekarbonisierung der Branche. Er steht für werteorientierte Führung und mutige Transformation.",
		image: "/images/trailblazers/HelmutRuhl.jpg",
		linkedin: "https://www.linkedin.com/in/helmut-ruhl/"
	},
	{
		id: "olga-nevska",
		title: "Dr.",
		name: "Olga Nevska",
		organization: "Telekom MobilitySolutions",
		category: "etablierte",
		quickSummary: "Olga Nevska wandelt Deutschlands zweitgrößte Firmenflotte in ein modernes Mobilitätsangebot. Sie führte E-Autos, Shuttle-Dienste und Dienstradleasing konsequent ein. Ihre App 'goodride' vereint alle Dienste in einem System. Nevska zeigt, wie Konzerne die Verkehrswende praktisch vorantreiben können. Sie gilt als sichtbare Vorkämpferin für nachhaltige Unternehmensmobilität.",
		image: "/images/trailblazers/OlgaNevska.jpg",
		linkedin: "https://www.linkedin.com/in/olga-nevska/"
	},
	{
		id: "tobias-liebelt",
		name: "Tobias Liebelt",
		organization: "Benteler Mobility Services",
		category: "etablierte",
		quickSummary: "Tobias Liebelt führt Benteler vom klassischen Zulieferer zum Hersteller autonomer E-Shuttles. Er brach mit alten Strukturen und schuf ein neues Geschäftsfeld für urbane Mobilität. Die Shuttles werden ab 2026 weltweit eingesetzt und ergänzen den ÖPNV. Damit treibt Liebelt die Dekarbonisierung und Barrierefreiheit voran. Er beweist, dass Transformation aus dem Inneren der Industrie möglich ist.",
		image: "/images/trailblazers/TobiasLiebelt.jpg",
		linkedin: "https://www.linkedin.com/in/tobias-liebelt/"
	},
	{
		id: "ulrich-prediger",
		name: "Ulrich Prediger",
		organization: "JobRad",
		category: "etablierte",
		quickSummary: "Ulrich Prediger machte das Dienstrad zum gesellschaftlichen Phänomen. Sein Modell ermöglicht über Millionen Menschen den Umstieg vom Auto aufs Rad. JobRad spart jährlich tausende Tonnen CO₂ und belebt den Radverkehr. Prediger schuf eine neue Form betrieblicher Mobilität. Er steht für Unternehmertum mit gesellschaftlichem Antrieb.",
		image: "/images/trailblazers/UlrichPrediger.jpg",
		linkedin: "https://www.linkedin.com/in/ulrich-prediger/"
	},

	// START-UPS & KATALYSATOREN (14)
	{
		id: "corsin-sulser",
		title: "Dr.",
		name: "Corsin Sulser",
		organization: "Parcandi",
		category: "startups",
		quickSummary: "Dr. Corsin Sulser löst mit Parcandi ein alltägliches Mobilitätsproblem neu: Parkplätze werden digital geteilt statt neu gebaut. Die Plattform reduziert Stau, Suchverkehr und Emissionen in Städten. Mit über 40 wagte Sulser den Schritt vom Konzernmanager zum Gründer. Sein IoT-basierter Ansatz zeigt, wie Effizienz und Nachhaltigkeit zusammenwirken können. Parcandi verbessert die urbane Lebensqualität sichtbar.",
		image: "/images/trailblazers/CorsinSulser.jpg",
		linkedin: "https://www.linkedin.com/in/corsin-sulser/"
	},
	{
		id: "fabian-beste",
		name: "Fabian Beste",
		organization: "4Screen",
		category: "startups",
		quickSummary: "Fabian Beste entwickelte mit 4Screen die weltweit erste Plattform für Fahrer-Interaktion im Fahrzeugdisplay. Sie verbindet Marken, Händler und Fahrer in Echtzeit und schafft ein neues digitales Ökosystem. Innerhalb weniger Jahre gewann 4Screen große Automobilhersteller wie Mercedes-Benz und Audi als Partner. Beste steht für mutiges Unternehmertum und datengetriebene Innovation. Seine Technologie macht das Auto zur vernetzten Erlebniswelt.",
		image: "/images/trailblazers/FabianBeste.jpg",
		linkedin: "https://www.linkedin.com/in/fabianbeste/"
	},
	{
		id: "felix-pornbacher",
		name: "Felix Pörnbacher",
		organization: "DeepDrive",
		category: "startups",
		quickSummary: "Felix Pörnbacher treibt mit DeepDrive eine bahnbrechende Motorentechnologie für Elektrofahrzeuge voran. Die Dual-Rotor-Technik steigert Reichweite und Effizienz um bis zu 20 Prozent. Acht der zehn größten OEMs setzen bereits auf die Lösung aus München. DeepDrive zeigt, wie Start-ups die Elektromobilität revolutionieren können. Pörnbacher beweist, dass technologische Exzellenz auch außerhalb der Großindustrie entsteht.",
		image: "/images/trailblazers/FelixPörnbacher.jpg",
		linkedin: "https://www.linkedin.com/in/felix-poernbacher/"
	},
	{
		id: "judith-haberli",
		name: "Judith Häberli",
		organization: "Urban Connect",
		category: "startups",
		quickSummary: "Judith Häberli vernetzt mit Urban Connect Fahrräder, E-Bikes und Firmenmobilität auf einer Plattform. Ihr Ziel ist es, die letzte Meile in Städten nachhaltig zu gestalten. Unter ihrer Führung wurde Urban Connect zum wichtigen Partner für Unternehmen im DACH-Raum. Die Gründerin kombiniert Vision und Pragmatismus – mit spürbarer Wirkung auf Verkehr und Emissionen. Sie gilt als Role Model für weibliche Führung in der Mobilitätsbranche.",
		image: "/images/trailblazers/JudithHäberli.jpeg",
		linkedin: "https://www.linkedin.com/in/judithhaberli/"
	},
	{
		id: "katharina-kreutzer",
		name: "Katharina Kreutzer",
		organization: "MUVN",
		category: "startups",
		quickSummary: "Katharina Kreutzer entwickelt mit MUVN eine Plattform für nachhaltige urbane Logistik. Sie verbindet Sharing Economy und Gütertransport in einem neuen digitalen Ansatz. Dadurch werden Leerfahrten vermieden und Emissionen gesenkt. Ihr Startup zeigt, wie Kreativität und Ökologie zusammenpassen. Kreutzer steht für mutiges Gründen mit ökologischem Mehrwert.",
		image: "/images/trailblazers/KatharinaKreutzer.jpg",
		linkedin: "https://www.linkedin.com/in/katharinakreutzer/"
	},
	{
		id: "lea-miggiano",
		name: "Léa Miggiano",
		organization: "carvolution",
		category: "startups",
		quickSummary: "Als Mitgründerin und CMO hat sie das Auto-Abo in der Schweiz massentauglich gemacht und damit den Zugang zur Elektromobilität vereinfacht. Ihr Modell – ein Fixpreis inklusive Versicherung und Service – ersetzt den klassischen Fahrzeugbesitz durch eine flexible, transparente Lösung. Mit ihrem Konzept 'Mobilität wie Streaming' revolutioniert sie die Art, wie Menschen Autos nutzen: einfach, digital und kurzfristig. Unter ihrer Führung wurde das Unternehmen Marktführer, gewann Investoren und erweitert sein Angebot auf Firmenflotten.",
		image: "/images/trailblazers/LéaMiggiano.jpg",
		linkedin: "https://www.linkedin.com/in/leamiggiano/"
	},
	{
		id: "lukas-stranger",
		name: "Lukas Stranger",
		organization: "NXRT",
		category: "startups",
		quickSummary: "Als CEO von NXRT entwickelt Lukas Stranger einen Mixed-Reality-Fahrsimulator, der die Fahrausbildung sicherer, nachhaltiger und kosteneffizienter macht. Mit dem Mut, in einen komplexen B2B-Markt zu gehen, verband er reale Fahrzeuge mit virtuellen Umgebungen und schuf so ein völlig neues Trainingskonzept. Seine Technologie reduziert Ressourcenverbrauch und Emissionen und wird bereits von internationalen Großkunden eingesetzt. Stranger zeigt, wie aus visionärer Innovation ein weltweit beachtetes Technologieprodukt entsteht, das die Mobilitätswende praktisch vorantreibt.",
		image: "/images/trailblazers/LukasStranger.jpg",
		linkedin: "https://www.linkedin.com/in/lukasstranger/"
	},
	{
		id: "matthias-ballweg",
		title: "Dr.",
		name: "Matthias Ballweg",
		organization: "Circular Republic / TU München",
		category: "startups",
		quickSummary: "Matthias Ballweg verbindet als Mitgründer von Circular Republic unternehmerisches Handeln mit gesellschaftlichem Engagement für nachhaltige Mobilität. Mit Projekten wie dem Bergbus und Circular Republic schafft er praxisnahe Lösungen, die Freizeit- und Alltagsmobilität gleichermaßen verbessern. Er beweist Mut, Unternehmergeist und Umsetzungsstärke, indem er Wirtschaft und Ehrenamt wirkungsvoll vereint. Ballweg steht beispielhaft dafür, wie persönliches Engagement und Innovation gemeinsam die Mobilitätswende voranbringen.",
		image: "/images/trailblazers/MatthiasBallweg.jpg",
		linkedin: "https://www.linkedin.com/in/matthiasballweg/"
	},
	{
		id: "roy-uhlmann",
		name: "Roy Uhlmann",
		organization: "Motor Ai",
		category: "startups",
		quickSummary: "Roy Uhlmann entwickelt zertifizierbare Level-4-Autopilotsysteme für autonomes Fahren. Sein Team setzt auf erklärbare KI, die sicher und transparenter entscheidet als Black-Box-Modelle. Damit stärkt Motor Ai den europäischen Technologiestandort. Uhlmann zeigt, dass künstliche Intelligenz und Verkehrssicherheit kein Widerspruch sind. Er steht für mutige Pionierarbeit im Feld des autonomen Fahrens",
		image: "/images/trailblazers/RoyUhlmann.jpg",
		linkedin: "https://www.linkedin.com/in/royuhlmann/"
	},
	{
		id: "sarah-fleischer",
		name: "Sarah Fleischer",
		organization: "ToZero",
		category: "startups",
		quickSummary: "Sarah Fleischer schließt mit ToZero den Kreislauf für Batterien der E-Mobilität. Ihr Team entwickelte ein Verfahren, das Rohstoffe fast vollständig zurückgewinnt. Die Pilotanlage läuft bereits erfolgreich mit ersten Kunden. Fleischer zeigt, wie Cleantech skaliert und Klimaziele erreichbar macht. Sie steht für Tatkraft in einem kritischen Technologiefeld.",
		image: "/images/trailblazers/SarahFleischer.jpg",
		linkedin: "https://www.linkedin.com/in/sarahfleischer/"
	},
	{
		id: "sascha-meyer",
		name: "Sascha Meyer",
		organization: "MOIA",
		category: "startups",
		quickSummary: "Sascha Meyer führt MOIA, den elektrischen Ridepooling-Dienst von Volkswagen. Er setzte früh auf E-Antrieb und eigene Softwarelösungen. MOIA transportierte bereits über sechs Millionen Fahrgäste und reduzierte den innerstädtischen Autoverkehr. Meyer lenkt das Unternehmen nun in Richtung autonomes Fahren. Er steht für skalierbare Urban Mobility made in Germany.",
		image: "/images/trailblazers/SaschaMeyer.jpg",
		linkedin: "https://www.linkedin.com/in/saschameyer/"
	},
	{
		id: "sebastian-tanzer",
		name: "Sebastian Tanzer",
		organization: "Triply",
		category: "startups",
		quickSummary: "Sebastian Tanzer gründete mit 19 das B2B-Startup Triply zur Optimierung von Firmenmobilität. Seine Plattform analysiert Pendelwege und hilft Unternehmen, CO₂ zu senken. Zahlreiche Organisationen nutzen die Lösung bereits international. Triply macht betriebliche Mobilität sichtbar und steuerbar. Tanzer steht für Datenintelligenz im Dienst der Nachhaltigkeit.",
		image: "/images/trailblazers/SebastianTanzer.jpg",
		linkedin: "https://www.linkedin.com/in/sebastiantanzer/"
	},
	{
		id: "wim-ouboter",
		name: "Wim Ouboter",
		organization: "Microlino AG",
		category: "startups",
		quickSummary: "Wim Ouboter erfand den Micro-Scooter und prägte die urbane Mikromobilität weltweit. Mit dem elektrischen Microlino entwickelte er ein kompaktes Stadtfahrzeug zwischen E-Bike und Auto. Sein Ansatz 'kleine Fahrzeuge statt großer Autos' reduziert Emissionen und Flächenverbrauch. Trotz Rückschlägen blieb er dem Ziel treu. Ouboter zeigt, wie europäischer Erfindergeist nachhaltige Lösungen bringt.",
		image: "/images/trailblazers/WimOuboter.jpg",
		linkedin: "https://www.linkedin.com/in/wimouboter/"
	},
	{
		id: "xanthi-doubara",
		name: "Xanthi Doubara",
		organization: "Via Transportation Berlin",
		category: "startups",
		quickSummary: "Xanthi Doubara integriert On-Demand-Shuttles als Teil des öffentlichen Nahverkehrs in Städten und Regionen. Sie verbindet Technologie mit kommunaler Verkehrsplanung. Unter ihrer Leitung laufen bereits über 45 Via-Projekte in Deutschland. Diese verbessern Erreichbarkeit und reduzieren Wartezeiten nachweislich. Doubara steht für kluge Verzahnung von Innovation und Öffentlichem Dienst.",
		image: "/images/trailblazers/XanthiDoubara.jpg",
		linkedin: "https://www.linkedin.com/in/xanthidoubara/"
	},

	// POLITIK & ÖFFENTLICHE INSTITUTIONEN (3)
	{
		id: "alexandra-reinagl",
		name: "Alexandra Reinagl",
		organization: "Wiener Linien",
		category: "politik",
		quickSummary: "Als Geschäftsführerin der Wiener Linien prägt Alexandra Reinagl seit Jahren die Entwicklung einer der größten städtischen Verkehrsbetriebe im DACH-Raum. Sie treibt die konsequente Transformation hin zu emissionsfreier Mobilität voran – vom massiven Ausbau der U-Bahn-Linie U2xU5 über die Elektrifizierung der Busflotte bis hin zu innovativen digitalen Services für Fahrgäste. Unter ihrer Leitung positionieren sich die Wiener Linien als Vorreiter einer klimafreundlichen und attraktiven urbanen Mobilität, die internationale Strahlkraft hat.",
		image: "/images/trailblazers/AlexandraReinagl.jpeg",
		linkedin: "https://www.linkedin.com/in/alexandra-reinagl-aa19001a2"
	},
	{
		id: "anjes-tjarks",
		title: "Dr.",
		name: "Anjes Tjarks",
		organization: "Hansestadt Hamburg",
		category: "politik",
		quickSummary: "Dr. Anjes Tjarks gestaltet als Senator die Hamburger Verkehrswende mit klaren Zielen und messbaren Erfolgen. Sein erklärtes Ziel ist es, den Anteil des Umweltverbunds – also von ÖPNV, Rad- und Fußverkehr – bis 2030 auf 80 Prozent zu steigern. Unter seiner Leitung entstehen neue U-Bahn-Linien, Radwege und autonome Busprojekte. Hamburg dient damit als Vorbild für nachhaltige Stadtentwicklung. Tjarks gilt als pragmatischer Macher mit bundesweiter Strahlkraft.",
		image: "/images/trailblazers/AnjesTjarks.jpg",
		linkedin: "https://www.linkedin.com/in/anjes-tjarks/"
	},
	{
		id: "nic-knapp",
		name: "Nic Knapp",
		organization: "TUM Venture Labs",
		category: "politik",
		quickSummary: "Nic Knapp unterstützt Start-ups von autonomen Shuttles bis E-Fluggeräten. Als Leiter des TUM Venture Labs Mobility verbindet er Forschung und Industrie. So entstehen aus Ideen marktreife Produkte und Investorenkontakte. Seine Arbeit macht München zu einem Hotspot für Mobilitätsinnovation. Knapp steht für mutige Förderung junger Talente.",
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
