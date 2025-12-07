/* Generic placeholder resume data (EN / FR) — replace with your real data */
window.resumeData = {
  owner: {firstname: "Laurent", lastname:"Vincent"},
  en: {
    profileImage: "assets/images/en_anim_apple.png",
    sectionTitles: {
      about: "About",
      experience: "Experience",
      skills: "Skills",
      education: "Education",
      contact: "Contact",
      social: "Social",
      projects: "Projects"
    },
    about: "Hi👋, my name is **Laurent**.\n\Expert in systems engineering and software architecture with over 25 years of experience in embedded software for digital television, I have contributed to the development and deployment of numerous TV set-top boxes for major international operators.\nExperienced in requirements analysis, specification, design, and project management, I am passionate about transforming emerging technologies into secure, real-world solutions through creativity, collaboration, and technical excellence.",
    experience: [
      {company: "[Vantiva Technologies](https://www.vantiva.com/)", role: "Distinguished Systems Engineer / Video Product Line Manager", dates: "2024 - Present", 
        description: "As part of an international team of product line managers, I was focus on the definition of new [set-top boxes (STB)](https://en.wikipedia.org/wiki/Set-top_box) products around [Android TV](https://www.android.com/tv/) platform. In particular, I have:\n\
        - Led definition of Android TV POCs (e.g. Subatomic) thanks to closed relationship with Google regarding new Android feature roadmap.\n\
        - Ensured Google policies (inc. Letter upgrade and Security patch) are properly implemented across deployed products (>12M active units).\n\
        - Maintained Android TV requirements database ([Jira](https://www.atlassian.com/software/jira)) across product lines ([Broadcom](https://www.broadcom.com/), [Amlogic](https://www.amlogic.com/) or [Synaptics](https://www.synaptics.com) CPU based).\n\
        - Coordinated Android TV migration support with commercial and development teams."},


      {company: "[CommScope](https://www.commscope.com/) / [Arris](https://en.wikipedia.org/wiki/Arris_International)", role: "Distinguished Systems Engineer", dates: "2016 - 2024", 
        description: "As part of an international team of systems engineers, I was responsible of technical specification of various STB products. In particular, I have:\n\
        - Defined Software technical requirements for many Android TV Broadcom based UHD/4K STB operator device models (incl. [Orange TV Box](https://www.androidtv-guide.com/pay-tv-provider/orange-belgium/), [Telenor Sweden Mediahubb](https://www.androidtv-guide.com/pay-tv-provider/telenor-mediahubb/), [SK Broadband B TV Smart 2](https://www.androidtv-guide.com/pay-tv-provider/sk-broadband-b-tv-smart-2-arris/).\n\
        - Defined Software technical requirement for [OpenTV 5](https://nagra.vision/streaming-solutions/opentv/) based UHD/4K STB operator device models (incl. Telefonica Proteus).\n\
        - Led integration of security requirements of [Nagravision](https://www.nagra.com/) and [ViaccessOrca](https://www.viaccess-orca.com) Conditional Access providers.\n\
        - Coordinated with cross-functional teams, including hardware engineers, software developers, and QA.\n\
        - Assisted project team to make sure that STB design and implementation are aligned with customer expectation.\n\
        - Led integration of Arris assigned work packages for [COGNITUS Horizon 2020](https://doi.org/10.3030/687605) research project (EU fundings) by delivering functional UHD STB prototype with proper SW support."},

      {company: "[Pace](https://en.wikipedia.org/wiki/Pace_plc) / [Philips](https://www.philips.com/)", role: "Software Architect", dates: "2003 - 2016", 
        description: "As a member of an R&D local development site, I was leading SW architecture related tasks around STB devices. In particular I have:\n\
        - Led internal STB software generic architecture and technical specifications based on [OpenTV 2](hhttps://nagra.vision/streaming-solutions/opentv/) or [RDK-V](https://wiki.rdkcentral.com/) middleware with Nagravision Conditional Access.\n\
        - Supported project teams for customer specific SW changes needed for successful deployment in Europe and LATAM operator networks (incl. [Liberty Global](https://www.libertyglobal.com/), NOS, Net Brazil).\n\
        - Defined modular SW architecture of Philips High End platform STB platforms based on [STMicroelectronics](https://www.st.com/) CPU.\n\
        - Coordinated with cross-functional teams, including hardware engineers, software developers, and QA.\n\
        - Contributed to EU research project *[MHP-KDB](https://cordis.europa.eu/project/id/507442)* - Knowledge Database for [MHP (Multimedia Home Platform)](https://en.wikipedia.org/wiki/Multimedia_Home_Platform) standard.\n\
        - Contributed to EU research project *[BLAZE](https://www.catrene.org/web/downloads/profiles_medea/2A201_profile.pdf)* - PVR (Persistent Video Recorder) demonstrator with HD quality based on [Linux DVB](https://www.linuxtv.org/) and STMicroelectronics.\n\
        - Contributed to EU research project *[APPSGATE](https://www.catrene.org/web/downloads/profiles_catrene/CATRENE%20PP-CA110_AppsGate.pdf)* - Advanced STB expected to enhance functionality and performance in home based application domains."},

        {company: "[Philips](https://www.philips.com/)", role: "Software Designer Consultant & MHP Architect", dates: "1998 - 2003", 
        description: "As part of a special R&D team working on MHP software stack, I was leading technical SW architecture and component design around MHP standard for interactive TV. In particular I have:\n\
        - Led modular design of proprietary MHP middleware stack for Philips STB devices.\n\
        - Provided design support and technical advice for software development team (up to 30 developers), product management and other software development site.\n\
        - Endorsed as technical coordinator for MHP 1.0.2a and 1.0.2b conformance test suite issues.\n\
        - Designed and implemented [DVB-SI](https://en.wikipedia.org/wiki/Service_Information) Software stack for MHP middleware."},
    ],
    skills: {
      "📺 Digital TV":["DVB Frontend", "DSM-CC", "IPTV", "HW SoC", "Secure boot", "Trusted Execution Engine", "cybersecurity", "Android TV", "RDK-V", "Linux", "CA/DRM"],
      "♻️ Product Lifecycle": ["Device Manufacturing", "CE Regulations", "Device Provisioning", "First Time Installation", "Refurbishing", "OTA upgrade", "Remote Management"],
      "⚙️ SW Engineering": ["Requirement Management", "Modular Design", "UML", "Open Source Usage", "Technology roadmap"],
      "🎁 Product Management":["Customer support", "RFQ answer", "Product Definition","Product roadmap"],
      "🚦 Project Management" :["Agile", "Scrum", "Kanban board", "Waterfall"],
      "🛠️ Tools & Platforms": ["Git", "Jira", "Confluence", "Markdown", "Docker", "Linux", "JupyterLab", "Visual Studio Code", "Markdown"],
      "🛜 Networking": ["TCP/UDP", "IPv4/IPv6", "HTTPS", "DHCP", "RTP/RTSP", "mTLS", "Wi-Fi", "Bluetooth", "TR-069", "MQTT", "XMPP","WireShark"],
      "🕸️ Web Technologies": ["HTML", "CSS", "Node.js", "Express", "Angular"],
      "✏️ Coding Languages": ["Python", "JavaScript", "Java", "C++", "Kotlin", "SwiftfUI", "Rust"],
      "👤 Soft Skills": ["Teamwork", "Communication", "Adaptability", "Problem Solving", "Abstract thinking", "Cross-function","Curiosity"]
    },
    education: [{school: "[INSA Rennes](https://www.insa-rennes.fr)", degree: "M.Sc. Computer Science", year: "1997"}],
    contact: {email: "laurentxxc@gmail.com", phone: "+33 6 61 82 14 75", location: "Achères, France"},
    social: [{name: "GitHub", logo:"assets/images/github-icon.png", url: "https://github.com/laurentxxc"},{name:"LinkedIn", logo:"assets/images/linkedin-square-icon.png", url:"https://www.linkedin.com/in/lxxc"}],
    projects: [{title:"WebResume",desc:"Simple Web app for displaying my resume. This app has been done with main following goals in mind:\n\
        - Keep it simple and use static web pages in order to have it hosted freely on GitHub Pages.\n\
        - Use/evaluate [spec-kit](https://github.com/github/spec-kit) (Spec Driven Development).\n\
        - Generate code with AI.",link:"#"}]
  },
  fr: {
    profileImage: "assets/images/fr_anim_apple.png",
    sectionTitles: {
      about: "À Propos",
      experience: "Expérience",
      skills: "Compétences",
      education: "Formation",
      contact: "Contact",
      social: "Réseaux",
      projects: "Projets"
    },
    about: "Salutations🖖, je me prénomme **Laurent**.\n\Expert en ingénierie des systèmes et architecture logicielle avec plus de 25 ans d'expérience dans le logiciel embarqué pour la télévision numérique, j'ai contribué au développement et au déploiement de nombreux boîtiers numériques pour de grands opérateurs internationaux.\n\
    Expérimenté en analyse des besoins, spécification, conception et gestion de projet, je suis passionné par la transformation des technologies émergentes en solutions concrètes et sécurisées grâce à la collaboration, la créativité et l'excellence technique.",
    experience: [
      {company: "[Vantiva Technologies](https://www.vantiva.com/)", role: "Ingénieur Systèmes Distingué / Responsable Ligne Produits Vidéo", dates: "2024 - Présent", 
        description: "En tant que membre d'une équipe internationale de Responsables Ligne Produits, j'ai été chargé de la définition de nouveaux produits [boîtiers numériques (STB)](https://en.wikipedia.org/wiki/Set-top_box) autour de la plateforme [Android TV](https://www.android.com/tv/). En particulier, j'ai :\n\
        - Piloté la définition de POCs Android TV (ex. Subatomic) grâce à une collaboration étroite avec [Google](https://www.google.com/) concernant la nouvelle feuille de route des fonctionnalités Android TV.\n\
        - Assuré que les politiques Google (y compris les mises à jour et les correctifs de sécurité) sont correctement implémentées dans les produits déployés (>12M d'unités actives).\n\
        - Maintenu la base de données des exigences Android TV ([Jira](https://www.atlassian.com/software/jira)) à travers les lignes de produits (CPU [Broadcom](https://www.broadcom.com/), [Amlogic](https://www.amlogic.com/) ou Synaptic).\n\
        - Coordonné le support de migration Android TV avec les équipes commerciales et de développement."},

      {company: "[CommScope](https://www.commscope.com/) / [Arris](https://en.wikipedia.org/wiki/Arris_International)", role: "Ingénieur Systèmes Distingué", dates: "2016 - 2024", 
        description: "En tant que membre d'une équipe internationale d'Ingénieurs Systèmes, j'ai été responsable de la spécification technique de divers produits Boîtiers Numériques. En particulier, j'ai :\n\
        - Défini les exigences techniques logicielles pour de nombreux modèles de boîtiers [Android TV](https://www.android.com/tv/) [Broadcom](https://www.broadcom.com/) UHD/4K pour opérateurs (incl. [Orange TV Box](https://www.androidtv-guide.com/pay-tv-provider/orange-belgium/), [Telenor Sweden Mediahubb](https://www.androidtv-guide.com/pay-tv-provider/telenor-mediahubb/), [SK Broadband B TV Smart 2](https://www.androidtv-guide.com/pay-tv-provider/sk-broadband-b-tv-smart-2-arris/)).\n\
        - Défini les exigences techniques logicielles pour des modèles de boîtiers [OpenTV 5](https://nagra.vision/streaming-solutions/opentv/) UHD/4K pour opérateurs (incl. Telefonica Proteus).\n\
        - Piloté l'intégration des exigences de sécurité des fournisseurs [Nagravision](https://www.nagra.com/) et [ViaccessOrca](https://www.viaccess-orca.com) Conditional Access.\n\
        - Collaboré avec les équipes transversales, notamment les ingénieurs matériel, les développeurs et l'assurance qualité.\n\
        - Assisté l'équipe projet pour assurer l'alignement de la conception et de la mise en œuvre du boîtier avec les attentes des clients.\n\
        - Complété l'intégration des tâches assignées à Arris dans le cadre du projet de recherche [COGNITUS Horizon 2020](https://cordis.europa.eu/project/id/814115) (financements européens) en livrant un prototype de boîtier UHD fonctionnel avec le support logiciel approprié."},

      {company: "[Pace](https://en.wikipedia.org/wiki/Pace_plc) / [Philips](https://www.philips.com/)", role: "Architecte Logiciel", dates: "2003 - 2016", 
        description: "En tant que membre d'une équipe R&D sur un site de développement local, j'ai dirigé les tâches liées à l'architecture logicielle des boîtiers numériques. En particulier, j'ai :\n\
        - Supervisé l'architecture logicielle générique interne et les spécifications techniques des boîtiers numériques basées sur les middleware [OpenTV 2](https://nagra.vision/streaming-solutions/opentv/) ou [RDK-V](https://wiki.rdkcentral.com/) avec Conditional Access Nagravision.\n\
        - Soutenu les équipes projet pour les changements logiciels spécifiques aux clients nécessaires au déploiement réussi dans les réseaux d'opérateurs européens et d'Amérique latine (incl. [Liberty Global](https://www.libertyglobal.com/), NOS, Net Brazil).\n\
        - Défini l'architecture logicielle modulaire des plateformes Philips High End STB basées sur le CPU [STMicroelectronics](https://www.st.com/).\n\
        - Coordonné avec les équipes transversales, notamment les ingénieurs matériel, les développeurs et l'assurance qualité.\n\
        - Contribué au projet de recherche EU *[MHP-KDB](https://cordis.europa.eu/project/id/507442)* - Base de Connaissances pour la norme [MHP (Multimedia Home Platform)](https://en.wikipedia.org/wiki/Multimedia_Home_Platform).\n\
        - Contribué au projet de recherche EU *[BLAZE](https://www.catrene.org/web/downloads/profiles_medea/2A201_profile.pdf)* - Démonstrateur [PVR](https://en.wikipedia.org/wiki/Personal_video_recorder) (Enregistreur Vidéo Persistant) en qualité HD basé sur [Linux DVB](https://www.linuxtv.org/) et STMicroelectronics.\n\
        - Contribué au projet de recherche EU *[APPSGATE](https://www.catrene.org/web/downloads/profiles_catrene/CATRENE%20PP-CA110_AppsGate.pdf)* - Démonstrateur STB avancé conçu pour améliorer la fonctionnalité et les performances dans les domaines d'application domestiques."},

      {company: "[Philips](https://www.philips.com/)", role: "Consultant Concepteur Logiciel & Architecte MHP", dates: "1998 - 2003", 
        description: "En tant que membre d'une équipe R&D  travaillant sur la pile logicielle MHP, j'ai supervisé l'architecture technique logicielle et la conception de composants autour de la norme MHP pour la TV interactive. En particulier, j'ai :\n\
        - Dirigé la conception modulaire de la pile middleware [DVB](https://en.wikipedia.org/wiki/Digital_Video_Broadcasting) MHP propriétaire (Multimedia Home Platform) pour les boîtiers Philips.\n\
        - Fourni le support de conception et l'expertise technique à l'équipe de développement logiciel (jusqu'à 30 développeurs), la gestion des produits et d'autres sites de développement logiciel.\n\
        - Contribué à la mise au point de la suite de tests de conformité MHP 1.0.2a et 1.0.2b.\n\
        - Conçu et implémenté la pile logicielle [DVB-SI](https://en.wikipedia.org/wiki/Service_Information) pour le middleware MHP utilisé par Philips."},
    ],
    skills: {
      "📺 TV Numérique":["DVB Frontend", "DSM-CC", "IPTV", "HW SoC", "Secure boot", "Trusted Execution Engine", "cybersecurity", "Android TV", "RDK-V", "Linux", "CA/DRM"],
      "♻️ Cycle de Vie du produit": ["Fabrication usine", "Réglementations européennes", "Provisionnement de l'appareil", "Première utilisation", "Mise à jour terrain", "Gestion à distance"],
      "⚙️ Savoir-Faire logiciel": ["Gestion des spécifications", "Architecture Modulaire", "UML", "Utilisation du code open source", "Feuille de route technologique"],
      "🎁 Gestion de produit":["Support Client", "Réponse d'appel d'offre", "Définition du produit","Feuille de route du produit"],
      "🚦 Gestion de projet" :["Agile", "Scrum", "Kanban board", "Waterfall"],
      "🛠️ Outils Logiciels": ["Git", "Jira", "Confluence", "Markdown", "Docker", "Linux", "JupyterLab", "Visual Studio Code", "Markdown" ],
      "🛜 Communication réseau": ["TCP/UDP", "IPv4/IPv6", "HTTPS", "DHCP", "RTP/RTSP", "mTLS", "Wi-Fi", "Bluetooth", "TR-069", "MQTT", "XMPP","WireShark"],
      "🕸️ Technologies du Web": ["HTML", "CSS", "Node.js", "Express", "Angular", "MongoDB"],
      "✏️ Languages de programmation": ["Python", "JavaScript", "Java", "C++", "Kotlin", "SwiftfUI", "Rust"],
      "👤 Savoir-Être": ["Travail en équipe", "Communication", "Adaptabilité", "Résolution de problèmes", "Capacité d'abstraction", "Vue transversale","Curiosité"]
    },
    education: [{school: "[INSA Rennes](https://www.insa-rennes.fr)", degree: "Ingénieur Informatique", year: "1997"}],
    contact: {email: "laurentxxc@gmail.com", phone: "+33 6 61 82 14 75", location: "Achères, France"},
    social: [{name: "GitHub", logo:"assets/images/github-icon.png", url: "https://github.com/laurentxxc"},{name:"LinkedIn", logo:"assets/images/linkedin-square-icon.png", url:"https://www.linkedin.com/in/lxxc"}],
    projects: [{title:"WebResume",desc:"Web app pour afficher mon CV. L'application a été créée avec les objectifs suivants :\n\
        - Faire un site web statique pouvant être hébergé gratuitement sur GitHub Pages (HTML/JS/CSS).\n\
        - Utiliser et évaluer [spec-kit](https://github.com/github/spec-kit) (Spec Driven Development).\n\
        - Générer le code avec l'IA.",
        link:"#"}]
  }
};
