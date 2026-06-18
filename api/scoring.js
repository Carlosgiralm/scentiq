// ══════════════════════════════════════════════════════════════
// SCENTIQ — MOTOR DE SCORING MATEMÁTICO
// El match se calcula aquí, no por la IA.
// La IA solo explica los resultados ya calculados.
// ══════════════════════════════════════════════════════════════

// ── BASE DE DATOS COMPLETA ──
const PERFUMES = [
  // LATTAFA
  {id:"lattafa-asad",nombre:"Asad",casa:"Lattafa",genero:"masculino",familias:["oriental","amaderado","especiado"],intensidad:4,dulzura:3,frescura:2,ocasiones:["citas","fiesta","versatil"],estacion_ideal:["frio","templado"],precio_cop_tier:"accesible",precio_aprox_cop:90000,vendor:"Disfragancias",notas_simples:"cálido, dulce y especiado — con un toque de madera ahumada",alt_de:"Dior Sauvage Elixir",polarizante:false,nivel_usuario:["nuevo","explorador","entusiasta"]},
  {id:"lattafa-asad-bourbon",nombre:"Asad Bourbon",casa:"Lattafa",genero:"masculino",familias:["oriental","gourmand","especiado"],intensidad:4,dulzura:4,frescura:1,ocasiones:["citas","fiesta"],estacion_ideal:["frio"],precio_cop_tier:"accesible",precio_aprox_cop:95000,vendor:"Disfragancias",notas_simples:"dulce pralinado con especias cálidas, como un postre sofisticado",alt_de:null,polarizante:false,nivel_usuario:["explorador","entusiasta"]},
  {id:"lattafa-khamrah",nombre:"Khamrah",casa:"Lattafa",genero:"unisex",familias:["oriental","gourmand"],intensidad:4,dulzura:5,frescura:1,ocasiones:["citas","fiesta","versatil"],estacion_ideal:["frio"],precio_cop_tier:"accesible",precio_aprox_cop:100000,vendor:"Disfragancias",notas_simples:"vainilla, miel y almizcle — envolvente y muy dulce",alt_de:"Initio Absolute Aphrodisiac",polarizante:false,nivel_usuario:["nuevo","explorador","entusiasta"]},
  {id:"lattafa-khamrah-qahwa",nombre:"Khamrah Qahwa",casa:"Lattafa",genero:"unisex",familias:["gourmand","especiado"],intensidad:4,dulzura:4,frescura:1,ocasiones:["citas","diario"],estacion_ideal:["frio","templado"],precio_cop_tier:"accesible",precio_aprox_cop:100000,vendor:"Disfragancias",notas_simples:"café y cardamomo — gourmand oscuro, perfecto para tardes frías",alt_de:null,polarizante:false,nivel_usuario:["explorador","entusiasta"]},
  {id:"lattafa-yara",nombre:"Yara",casa:"Lattafa",genero:"femenino",familias:["floral","gourmand","frutal"],intensidad:3,dulzura:5,frescura:2,ocasiones:["diario","citas","versatil"],estacion_ideal:["templado","calor"],precio_cop_tier:"accesible",precio_aprox_cop:90000,vendor:"Disfragancias",notas_simples:"floral frutal muy dulce — la fragancia femenina árabe #1 en Colombia",alt_de:"Xerjoff Erba Pura",polarizante:false,nivel_usuario:["nuevo","explorador","entusiasta"]},
  {id:"lattafa-yara-elixir",nombre:"Yara Elixir",casa:"Lattafa",genero:"femenino",familias:["gourmand","floral"],intensidad:4,dulzura:5,frescura:1,ocasiones:["citas","fiesta"],estacion_ideal:["frio","templado"],precio_cop_tier:"accesible",precio_aprox_cop:100000,vendor:"Disfragancias",notas_simples:"versión más cremosa e intensa de Yara",alt_de:null,polarizante:false,nivel_usuario:["explorador","entusiasta"]},
  {id:"lattafa-teriaq",nombre:"Teriaq",casa:"Lattafa",genero:"unisex",familias:["gourmand","oriental"],intensidad:5,dulzura:5,frescura:1,ocasiones:["fiesta","citas"],estacion_ideal:["frio"],precio_cop_tier:"accesible",precio_aprox_cop:110000,vendor:"Disfragancias",notas_simples:"caramelo, almendra y cuero — viral, muy dulce e intenso",alt_de:null,polarizante:true,nivel_usuario:["entusiasta","coleccionista"]},
  {id:"lattafa-oud-for-glory",nombre:"Oud For Glory",casa:"Lattafa",genero:"masculino",familias:["oriental","amaderado"],intensidad:4,dulzura:2,frescura:2,ocasiones:["trabajo","versatil"],estacion_ideal:["frio","templado"],precio_cop_tier:"accesible",precio_aprox_cop:95000,vendor:"Disfragancias",notas_simples:"oud suave y amaderado, elegante sin ser pesado",alt_de:null,polarizante:false,nivel_usuario:["explorador","entusiasta"]},
  {id:"lattafa-oud-mood",nombre:"Oud Mood",casa:"Lattafa",genero:"unisex",familias:["oriental","amaderado"],intensidad:3,dulzura:2,frescura:3,ocasiones:["trabajo","diario","versatil"],estacion_ideal:["templado","frio"],precio_cop_tier:"accesible",precio_aprox_cop:90000,vendor:"Disfragancias",notas_simples:"oud ligero y versátil, perfecto para empezar con esta familia",alt_de:null,polarizante:false,nivel_usuario:["nuevo","explorador"]},
  {id:"lattafa-give-me-gourmand",nombre:"Give Me Gourmand Vanilla Freak",casa:"Lattafa",genero:"femenino",familias:["gourmand"],intensidad:4,dulzura:5,frescura:1,ocasiones:["diario","citas"],estacion_ideal:["frio","templado"],precio_cop_tier:"accesible",precio_aprox_cop:95000,vendor:"Disfragancias",notas_simples:"vainilla cremosa tipo helado — dulce y viral en TikTok",alt_de:null,polarizante:false,nivel_usuario:["nuevo","explorador"]},
  {id:"lattafa-raghba",nombre:"Raghba",casa:"Lattafa",genero:"masculino",familias:["amaderado","oriental"],intensidad:3,dulzura:3,frescura:2,ocasiones:["trabajo","diario","versatil"],estacion_ideal:["templado","frio"],precio_cop_tier:"accesible",precio_aprox_cop:85000,vendor:"Disfragancias",notas_simples:"amaderado dulce, suave y agradable para uso diario",alt_de:null,polarizante:false,nivel_usuario:["nuevo","explorador"]},
  {id:"lattafa-ana-abiyedh",nombre:"Ana Abiyedh",casa:"Lattafa",genero:"unisex",familias:["fresco-limpio"],intensidad:2,dulzura:2,frescura:4,ocasiones:["trabajo","diario","gym"],estacion_ideal:["calor","templado"],precio_cop_tier:"accesible",precio_aprox_cop:75000,vendor:"Disfragancias",notas_simples:"almizcle blanco limpio, fresco y discreto — ideal para oficina",alt_de:null,polarizante:false,nivel_usuario:["nuevo"]},
  // ARMAF
  {id:"armaf-cdni-man",nombre:"Club de Nuit Intense Man",casa:"Armaf",genero:"masculino",familias:["fresco-limpio","amaderado","frutal"],intensidad:4,dulzura:2,frescura:4,ocasiones:["citas","fiesta","versatil"],estacion_ideal:["templado","frio"],precio_cop_tier:"accesible",precio_aprox_cop:140000,vendor:"Disfragancias",notas_simples:"frutal fresco con fondo amaderado — el más vendido de Armaf",alt_de:"Creed Aventus",polarizante:false,nivel_usuario:["nuevo","explorador","entusiasta"]},
  {id:"armaf-cdni-woman",nombre:"Club de Nuit Intense Woman",casa:"Armaf",genero:"femenino",familias:["floral","frutal"],intensidad:3,dulzura:3,frescura:3,ocasiones:["citas","diario","versatil"],estacion_ideal:["templado"],precio_cop_tier:"accesible",precio_aprox_cop:140000,vendor:"Disfragancias",notas_simples:"floral frutal elegante y versátil",alt_de:null,polarizante:false,nivel_usuario:["nuevo","explorador"]},
  {id:"armaf-tres-nuit",nombre:"Tres Nuit",casa:"Armaf",genero:"masculino",familias:["fresco-limpio","amaderado"],intensidad:3,dulzura:1,frescura:4,ocasiones:["trabajo","diario","versatil"],estacion_ideal:["templado","calor"],precio_cop_tier:"accesible",precio_aprox_cop:120000,vendor:"Disfragancias",notas_simples:"fresco y elegante, discreto para la oficina",alt_de:"Bleu de Chanel",polarizante:false,nivel_usuario:["nuevo","explorador"]},
  {id:"armaf-hunter",nombre:"Hunter",casa:"Armaf",genero:"masculino",familias:["amaderado","fresco-limpio"],intensidad:3,dulzura:2,frescura:3,ocasiones:["trabajo","versatil"],estacion_ideal:["templado"],precio_cop_tier:"accesible",precio_aprox_cop:120000,vendor:"Disfragancias",notas_simples:"amaderado moderno, fresco y profesional",alt_de:"YSL Y EDP",polarizante:false,nivel_usuario:["explorador"]},
  {id:"armaf-mandarin-sky",nombre:"Mandarin Sky",casa:"Armaf",genero:"masculino",familias:["citrico","acuatico"],intensidad:3,dulzura:2,frescura:5,ocasiones:["diario","trabajo","versatil"],estacion_ideal:["calor","templado"],precio_cop_tier:"accesible",precio_aprox_cop:140000,vendor:"Disfragancias",notas_simples:"cítrico fresco y marino — el más buscado en Colombia 2025",alt_de:"Creed Silver Mountain Water",polarizante:false,nivel_usuario:["nuevo","explorador","entusiasta"]},
  {id:"armaf-yum-yum",nombre:"Yum Yum EDP",casa:"Armaf",genero:"unisex",familias:["gourmand","frutal"],intensidad:3,dulzura:5,frescura:2,ocasiones:["diario","citas"],estacion_ideal:["templado","calor"],precio_cop_tier:"accesible",precio_aprox_cop:110000,vendor:"Disfragancias",notas_simples:"frutal cremoso tipo milkshake, divertido y viral",alt_de:null,polarizante:false,nivel_usuario:["nuevo"]},
  // RASASI
  {id:"rasasi-hawas",nombre:"Hawas for Him",casa:"Rasasi",genero:"masculino",familias:["acuatico","aromatico-verde"],intensidad:3,dulzura:1,frescura:4,ocasiones:["trabajo","diario","gym","versatil"],estacion_ideal:["calor","templado"],precio_cop_tier:"accesible",precio_aprox_cop:90000,vendor:"Disfragancias",notas_simples:"fougère acuático fresco, ideal para clima caliente",alt_de:null,polarizante:false,nivel_usuario:["nuevo","explorador"]},
  {id:"rasasi-hawas-fire",nombre:"Hawas Fire",casa:"Rasasi",genero:"unisex",familias:["acuatico","aromatico-verde"],intensidad:3,dulzura:2,frescura:4,ocasiones:["diario","versatil"],estacion_ideal:["calor","templado"],precio_cop_tier:"accesible",precio_aprox_cop:95000,vendor:"Disfragancias",notas_simples:"aromático fresco con notas marinas — sorprende: no es caliente",alt_de:null,polarizante:false,nivel_usuario:["explorador","entusiasta"]},
  {id:"rasasi-hawas-tropical",nombre:"Hawas Tropical",casa:"Rasasi",genero:"unisex",familias:["acuatico","gourmand"],intensidad:4,dulzura:3,frescura:4,ocasiones:["fiesta","versatil"],estacion_ideal:["calor"],precio_cop_tier:"accesible",precio_aprox_cop:100000,vendor:"Disfragancias",notas_simples:"coco y agua de coco con jengibre — tropical y proyección fuerte",alt_de:null,polarizante:false,nivel_usuario:["entusiasta"]},
  {id:"rasasi-hawas-kobra",nombre:"Hawas Kobra",casa:"Rasasi",genero:"masculino",familias:["oriental","especiado"],intensidad:4,dulzura:3,frescura:2,ocasiones:["citas","fiesta"],estacion_ideal:["frio","templado"],precio_cop_tier:"accesible",precio_aprox_cop:100000,vendor:"Disfragancias",notas_simples:"jengibre y té verde con fondo ámbar — genera muchos cumplidos",alt_de:null,polarizante:false,nivel_usuario:["entusiasta"]},
  {id:"rasasi-hawas-malibu",nombre:"Hawas Malibu",casa:"Rasasi",genero:"unisex",familias:["acuatico","frutal"],intensidad:3,dulzura:3,frescura:4,ocasiones:["diario","versatil"],estacion_ideal:["calor"],precio_cop_tier:"accesible",precio_aprox_cop:100000,vendor:"Disfragancias",notas_simples:"piña y tonka con ámbar — tropical y sofisticado",alt_de:null,polarizante:false,nivel_usuario:["explorador"]},
  {id:"rasasi-la-yuqawam",nombre:"La Yuqawam",casa:"Rasasi",genero:"masculino",familias:["oriental","frutal"],intensidad:4,dulzura:3,frescura:2,ocasiones:["citas","fiesta"],estacion_ideal:["frio"],precio_cop_tier:"accesible",precio_aprox_cop:110000,vendor:"Disfragancias",notas_simples:"oud frutal sofisticado, elegante para la noche",alt_de:null,polarizante:false,nivel_usuario:["entusiasta","coleccionista"]},
  {id:"rasasi-egra",nombre:"Egra",casa:"Rasasi",genero:"masculino",familias:["citrico","fresco-limpio"],intensidad:2,dulzura:1,frescura:5,ocasiones:["trabajo","diario","gym"],estacion_ideal:["calor"],precio_cop_tier:"accesible",precio_aprox_cop:80000,vendor:"Disfragancias",notas_simples:"cítrico muy fresco, ideal para clima caliente y deporte",alt_de:null,polarizante:false,nivel_usuario:["nuevo"]},
  // AFNAN
  {id:"afnan-9pm",nombre:"9PM",casa:"Afnan",genero:"masculino",familias:["oriental","gourmand"],intensidad:4,dulzura:4,frescura:1,ocasiones:["citas","fiesta"],estacion_ideal:["frio"],precio_cop_tier:"accesible",precio_aprox_cop:85000,vendor:"Disfragancias",notas_simples:"dulce especiado y envolvente, ideal para la noche",alt_de:"Paco Rabanne 1 Million",polarizante:false,nivel_usuario:["nuevo","explorador"]},
  {id:"afnan-supremacy-silver",nombre:"Supremacy Silver",casa:"Afnan",genero:"masculino",familias:["fresco-limpio","amaderado"],intensidad:3,dulzura:2,frescura:4,ocasiones:["trabajo","diario","versatil"],estacion_ideal:["templado","calor"],precio_cop_tier:"accesible",precio_aprox_cop:90000,vendor:"Disfragancias",notas_simples:"fresco amaderado, versátil para el día a día",alt_de:"Carolina Herrera 212 VIP",polarizante:false,nivel_usuario:["nuevo","explorador"]},
  {id:"afnan-musk-is-great",nombre:"Musk Is Great",casa:"Afnan",genero:"unisex",familias:["fresco-limpio"],intensidad:2,dulzura:2,frescura:3,ocasiones:["trabajo","diario"],estacion_ideal:["templado","calor"],precio_cop_tier:"accesible",precio_aprox_cop:75000,vendor:"Disfragancias",notas_simples:"almizcle suave y limpio, discreto para todo el día",alt_de:null,polarizante:false,nivel_usuario:["nuevo"]},
  // AL HARAMAIN
  {id:"alharamain-amber-oud",nombre:"Amber Oud",casa:"Al Haramain",genero:"unisex",familias:["oriental","amaderado"],intensidad:3,dulzura:3,frescura:2,ocasiones:["trabajo","diario","versatil"],estacion_ideal:["templado","frio"],precio_cop_tier:"accesible",precio_aprox_cop:95000,vendor:"Disfragancias",notas_simples:"oud suave y ámbar dulce, versátil y agradable",alt_de:null,polarizante:false,nivel_usuario:["nuevo","explorador"]},
  {id:"alharamain-laventure",nombre:"L'Aventure",casa:"Al Haramain",genero:"masculino",familias:["amaderado","frutal"],intensidad:4,dulzura:2,frescura:3,ocasiones:["citas","versatil"],estacion_ideal:["templado","frio"],precio_cop_tier:"accesible",precio_aprox_cop:100000,vendor:"Disfragancias",notas_simples:"frutal amaderado con gran proyección",alt_de:"Creed Aventus",polarizante:false,nivel_usuario:["explorador","entusiasta"]},
  {id:"alharamain-madinah",nombre:"Madinah",casa:"Al Haramain",genero:"unisex",familias:["oriental","floral"],intensidad:2,dulzura:3,frescura:2,ocasiones:["diario","trabajo"],estacion_ideal:["templado"],precio_cop_tier:"accesible",precio_aprox_cop:85000,vendor:"Disfragancias",notas_simples:"oriental suave y floral, discreto y elegante",alt_de:null,polarizante:false,nivel_usuario:["nuevo","explorador"]},
  // BHARARA
  {id:"bharara-king",nombre:"King",casa:"Bharara",genero:"masculino",familias:["amaderado","especiado"],intensidad:4,dulzura:3,frescura:2,ocasiones:["citas","fiesta","versatil"],estacion_ideal:["frio","templado"],precio_cop_tier:"accesible",precio_aprox_cop:110000,vendor:"Disfragancias",notas_simples:"amaderado especiado dulce — el más vendido de Bharara",alt_de:null,polarizante:false,nivel_usuario:["nuevo","explorador","entusiasta"]},
  {id:"bharara-king-soleil",nombre:"King Soleil",casa:"Bharara",genero:"masculino",familias:["citrico","amaderado"],intensidad:3,dulzura:2,frescura:4,ocasiones:["diario","versatil"],estacion_ideal:["calor"],precio_cop_tier:"accesible",precio_aprox_cop:110000,vendor:"Disfragancias",notas_simples:"cítrico solar, fresco y luminoso",alt_de:null,polarizante:false,nivel_usuario:["explorador"]},
  // JO MILANO
  {id:"jomilano-rouge",nombre:"Game of Spades Rouge",casa:"Jo Milano",genero:"unisex",familias:["oriental","especiado"],intensidad:4,dulzura:4,frescura:1,ocasiones:["citas","fiesta"],estacion_ideal:["frio"],precio_cop_tier:"accesible",precio_aprox_cop:180000,vendor:"Fraganceros Colombia",notas_simples:"dulce ambarado y especiado — muy similar a lujo francés",alt_de:"MFK Baccarat Rouge 540",polarizante:false,nivel_usuario:["explorador","entusiasta"]},
  {id:"jomilano-fullhouse",nombre:"Game of Spades Full House",casa:"Jo Milano",genero:"masculino",familias:["citrico","amaderado"],intensidad:3,dulzura:2,frescura:3,ocasiones:["trabajo","versatil"],estacion_ideal:["templado"],precio_cop_tier:"accesible",precio_aprox_cop:180000,vendor:"Fraganceros Colombia",notas_simples:"cítrico amaderado elegante y versátil",alt_de:"Louis Vuitton Imagination",polarizante:false,nivel_usuario:["explorador","entusiasta"]},
  {id:"jomilano-allin",nombre:"Game of Spades All In",casa:"Jo Milano",genero:"unisex",familias:["fresco-limpio","amaderado"],intensidad:3,dulzura:2,frescura:3,ocasiones:["trabajo","diario","versatil"],estacion_ideal:["templado"],precio_cop_tier:"accesible",precio_aprox_cop:170000,vendor:"Fraganceros Colombia",notas_simples:"bergamota, lavanda y cedro — versátil y elegante",alt_de:null,polarizante:false,nivel_usuario:["nuevo","explorador"]},
  // MAISON ALHAMBRA
  {id:"alhambra-lathan",nombre:"Lathan",casa:"Maison Alhambra",genero:"masculino",familias:["amaderado","fresco-limpio"],intensidad:3,dulzura:2,frescura:3,ocasiones:["trabajo","citas","versatil"],estacion_ideal:["templado","frio"],precio_cop_tier:"accesible",precio_aprox_cop:140000,vendor:"Disfragancias",notas_simples:"manzana, menta y madera — fresco y elegante",alt_de:"Parfums de Marly Layton",polarizante:false,nivel_usuario:["explorador","entusiasta"]},
  // MID
  {id:"ch-good-girl",nombre:"Good Girl",casa:"Carolina Herrera",genero:"femenino",familias:["gourmand","floral"],intensidad:4,dulzura:5,frescura:1,ocasiones:["citas","fiesta"],estacion_ideal:["frio","templado"],precio_cop_tier:"mid",precio_aprox_cop:380000,vendor:"Disfragancias",notas_simples:"floral gourmand oscuro — almendra y dulzura intensa",alt_de:null,polarizante:false,nivel_usuario:["explorador","entusiasta","coleccionista"]},
  {id:"ch-bad-boy",nombre:"Bad Boy",casa:"Carolina Herrera",genero:"masculino",familias:["amaderado","especiado"],intensidad:4,dulzura:3,frescura:1,ocasiones:["citas","fiesta"],estacion_ideal:["frio"],precio_cop_tier:"mid",precio_aprox_cop:350000,vendor:"Disfragancias",notas_simples:"madera de cedro con especias, masculino y seductor",alt_de:null,polarizante:false,nivel_usuario:["entusiasta","coleccionista"]},
  {id:"ch-212-vip",nombre:"212 VIP Men",casa:"Carolina Herrera",genero:"masculino",familias:["amaderado","gourmand"],intensidad:3,dulzura:3,frescura:2,ocasiones:["citas","fiesta","versatil"],estacion_ideal:["templado","frio"],precio_cop_tier:"mid",precio_aprox_cop:320000,vendor:"Disfragancias",notas_simples:"amaderado gourmand exclusivo, perfecto para salir de noche",alt_de:null,polarizante:false,nivel_usuario:["explorador","entusiasta"]},
  {id:"versace-eros",nombre:"Eros",casa:"Versace",genero:"masculino",familias:["aromatico-verde","gourmand"],intensidad:4,dulzura:3,frescura:3,ocasiones:["citas","fiesta","versatil"],estacion_ideal:["templado","frio"],precio_cop_tier:"mid",precio_aprox_cop:340000,vendor:"Disfragancias",notas_simples:"menta, manzana verde y tonka — icónico y muy reconocible",alt_de:null,polarizante:false,nivel_usuario:["nuevo","explorador","entusiasta"]},
  {id:"versace-bright-crystal",nombre:"Bright Crystal",casa:"Versace",genero:"femenino",familias:["floral","frutal"],intensidad:3,dulzura:3,frescura:4,ocasiones:["diario","trabajo","versatil"],estacion_ideal:["templado","calor"],precio_cop_tier:"mid",precio_aprox_cop:320000,vendor:"Disfragancias",notas_simples:"floral frutal fresco, ligero y femenino",alt_de:null,polarizante:false,nivel_usuario:["nuevo","explorador"]},
  {id:"versace-dylan-blue",nombre:"Dylan Blue",casa:"Versace",genero:"masculino",familias:["acuatico","amaderado"],intensidad:3,dulzura:1,frescura:4,ocasiones:["trabajo","diario","versatil"],estacion_ideal:["templado"],precio_cop_tier:"mid",precio_aprox_cop:340000,vendor:"Disfragancias",notas_simples:"acuático amaderado fresco, perfecto para todos los días",alt_de:null,polarizante:false,nivel_usuario:["explorador","entusiasta"]},
  {id:"hugoboss-bottled-absolu",nombre:"Boss Bottled Absolu",casa:"Hugo Boss",genero:"masculino",familias:["oriental","amaderado"],intensidad:4,dulzura:2,frescura:1,ocasiones:["trabajo","citas"],estacion_ideal:["frio"],precio_cop_tier:"mid",precio_aprox_cop:380000,vendor:"Disfragancias",notas_simples:"incienso y mirra con madera — elegante y profundo",alt_de:null,polarizante:false,nivel_usuario:["entusiasta","coleccionista"]},
  {id:"jpg-le-male",nombre:"Le Male",casa:"Jean Paul Gaultier",genero:"masculino",familias:["aromatico-verde","oriental"],intensidad:4,dulzura:3,frescura:2,ocasiones:["citas","fiesta","versatil"],estacion_ideal:["templado","frio"],precio_cop_tier:"mid",precio_aprox_cop:350000,vendor:"Disfragancias",notas_simples:"lavanda y vainilla — icónico masculino",alt_de:null,polarizante:false,nivel_usuario:["explorador","entusiasta"]},
  {id:"pacorabanne-1million",nombre:"1 Million",casa:"Paco Rabanne",genero:"masculino",familias:["especiado","gourmand"],intensidad:4,dulzura:4,frescura:2,ocasiones:["citas","fiesta"],estacion_ideal:["frio","templado"],precio_cop_tier:"mid",precio_aprox_cop:330000,vendor:"Disfragancias",notas_simples:"especiado dulce con cuero — icónico",alt_de:null,polarizante:false,nivel_usuario:["nuevo","explorador","entusiasta"]},
  {id:"montale-intense-cafe",nombre:"Intense Cafe",casa:"Montale",genero:"unisex",familias:["gourmand","amaderado"],intensidad:5,dulzura:4,frescura:1,ocasiones:["citas","fiesta"],estacion_ideal:["frio"],precio_cop_tier:"mid",precio_aprox_cop:380000,vendor:"Gran Aroma",notas_simples:"café y almendra amaderado — intenso, favorito de entusiastas",alt_de:null,polarizante:true,nivel_usuario:["entusiasta","coleccionista"]},
  {id:"mancera-cedrat-boise",nombre:"Cedrat Boise",casa:"Mancera",genero:"unisex",familias:["citrico","amaderado"],intensidad:3,dulzura:2,frescura:4,ocasiones:["trabajo","diario","versatil"],estacion_ideal:["templado","calor"],precio_cop_tier:"mid",precio_aprox_cop:390000,vendor:"Gran Aroma",notas_simples:"cedro y bergamota fresco — top ventas nicho mid",alt_de:null,polarizante:false,nivel_usuario:["explorador","entusiasta"]},
  {id:"davidoff-coolwater",nombre:"Cool Water",casa:"Davidoff",genero:"masculino",familias:["acuatico","aromatico-verde"],intensidad:3,dulzura:1,frescura:5,ocasiones:["diario","trabajo","gym","versatil"],estacion_ideal:["calor","templado"],precio_cop_tier:"mid",precio_aprox_cop:280000,vendor:"Disfragancias",notas_simples:"acuático marino clásico, fresco y atemporal",alt_de:null,polarizante:false,nivel_usuario:["nuevo","explorador"]},
  {id:"azzaro-chrome",nombre:"Chrome",casa:"Azzaro",genero:"masculino",familias:["citrico","acuatico"],intensidad:2,dulzura:1,frescura:5,ocasiones:["trabajo","diario","gym"],estacion_ideal:["calor","templado"],precio_cop_tier:"mid",precio_aprox_cop:260000,vendor:"Disfragancias",notas_simples:"cítrico acuático muy fresco y ligero, clásico de oficina",alt_de:null,polarizante:false,nivel_usuario:["nuevo","explorador"]},
  {id:"ckone",nombre:"CK One",casa:"Calvin Klein",genero:"unisex",familias:["citrico","fresco-limpio"],intensidad:2,dulzura:1,frescura:5,ocasiones:["trabajo","diario","gym","versatil"],estacion_ideal:["calor","templado"],precio_cop_tier:"mid",precio_aprox_cop:280000,vendor:"Disfragancias",notas_simples:"cítrico fresco unisex, icónico y muy versátil",alt_de:null,polarizante:false,nivel_usuario:["nuevo"]},
  {id:"burberry-hero",nombre:"Hero",casa:"Burberry",genero:"masculino",familias:["amaderado","fresco-limpio"],intensidad:3,dulzura:2,frescura:3,ocasiones:["trabajo","diario","versatil"],estacion_ideal:["templado"],precio_cop_tier:"mid",precio_aprox_cop:360000,vendor:"Disfragancias",notas_simples:"madera de cedro fresca, moderno y versátil",alt_de:null,polarizante:false,nivel_usuario:["explorador","entusiasta"]},
  {id:"givenchy-gentleman",nombre:"Gentleman",casa:"Givenchy",genero:"masculino",familias:["amaderado","oriental"],intensidad:3,dulzura:2,frescura:2,ocasiones:["trabajo","citas"],estacion_ideal:["templado","frio"],precio_cop_tier:"mid",precio_aprox_cop:360000,vendor:"Disfragancias",notas_simples:"iris amaderado elegante, sofisticado y discreto",alt_de:null,polarizante:false,nivel_usuario:["explorador","entusiasta"]},
  {id:"jpg-scandal",nombre:"Scandal",casa:"Jean Paul Gaultier",genero:"femenino",familias:["gourmand","floral"],intensidad:4,dulzura:4,frescura:1,ocasiones:["citas","fiesta"],estacion_ideal:["frio"],precio_cop_tier:"mid",precio_aprox_cop:350000,vendor:"Disfragancias",notas_simples:"miel y flores dulces, atrevido y memorable",alt_de:null,polarizante:false,nivel_usuario:["explorador","entusiasta"]},
  // MID-ALTA
  {id:"dior-sauvage-edt",nombre:"Sauvage EDT",casa:"Dior",genero:"masculino",familias:["fresco-limpio","especiado"],intensidad:3,dulzura:1,frescura:4,ocasiones:["trabajo","diario","versatil"],estacion_ideal:["templado","calor"],precio_cop_tier:"mid-alta",precio_aprox_cop:480000,vendor:"Disfragancias",notas_simples:"bergamota fresca con mineral — el masculino más vendido del mundo",alt_de:null,polarizante:false,nivel_usuario:["nuevo","explorador","entusiasta","coleccionista"]},
  {id:"dior-sauvage-elixir",nombre:"Sauvage Elixir",casa:"Dior",genero:"masculino",familias:["especiado","amaderado"],intensidad:5,dulzura:3,frescura:1,ocasiones:["citas","fiesta"],estacion_ideal:["frio"],precio_cop_tier:"mid-alta",precio_aprox_cop:550000,vendor:"Disfragancias",notas_simples:"especiado amaderado muy concentrado, oscuro e intenso",alt_de:null,polarizante:false,nivel_usuario:["entusiasta","coleccionista"]},
  {id:"dior-jadore",nombre:"J'adore",casa:"Dior",genero:"femenino",familias:["floral"],intensidad:3,dulzura:3,frescura:3,ocasiones:["trabajo","citas","versatil"],estacion_ideal:["templado","calor"],precio_cop_tier:"mid-alta",precio_aprox_cop:500000,vendor:"Disfragancias",notas_simples:"floral elegante con ylang y jazmín — icónico femenino",alt_de:null,polarizante:false,nivel_usuario:["explorador","entusiasta","coleccionista"]},
  {id:"chanel-bleu",nombre:"Bleu de Chanel",casa:"Chanel",genero:"masculino",familias:["citrico","amaderado"],intensidad:3,dulzura:1,frescura:4,ocasiones:["trabajo","citas","versatil"],estacion_ideal:["templado"],precio_cop_tier:"mid-alta",precio_aprox_cop:550000,vendor:"Disfragancias",notas_simples:"cítrico amaderado sofisticado — icónico para cualquier ocasión",alt_de:null,polarizante:false,nivel_usuario:["explorador","entusiasta","coleccionista"]},
  {id:"chanel-coco-mademoiselle",nombre:"Coco Mademoiselle",casa:"Chanel",genero:"femenino",familias:["oriental","floral"],intensidad:3,dulzura:3,frescura:2,ocasiones:["trabajo","citas","versatil"],estacion_ideal:["templado","frio"],precio_cop_tier:"mid-alta",precio_aprox_cop:550000,vendor:"Disfragancias",notas_simples:"chypre frutal elegante, sofisticado y atemporal",alt_de:null,polarizante:false,nivel_usuario:["entusiasta","coleccionista"]},
  {id:"tomford-tobacco-vanille",nombre:"Tobacco Vanille",casa:"Tom Ford",genero:"unisex",familias:["gourmand","oriental"],intensidad:5,dulzura:4,frescura:1,ocasiones:["citas","fiesta"],estacion_ideal:["frio"],precio_cop_tier:"mid-alta",precio_aprox_cop:650000,vendor:"Gran Aroma",notas_simples:"tabaco y vainilla — gourmand oscuro y muy querido",alt_de:null,polarizante:true,nivel_usuario:["entusiasta","coleccionista"]},
  {id:"tomford-oud-wood",nombre:"Oud Wood",casa:"Tom Ford",genero:"unisex",familias:["amaderado","oriental"],intensidad:3,dulzura:2,frescura:2,ocasiones:["trabajo","citas","versatil"],estacion_ideal:["templado","frio"],precio_cop_tier:"mid-alta",precio_aprox_cop:680000,vendor:"Gran Aroma",notas_simples:"oud suave y elegante, sin ser pesado",alt_de:null,polarizante:false,nivel_usuario:["entusiasta","coleccionista"]},
  {id:"ysl-libre",nombre:"Libre",casa:"YSL",genero:"femenino",familias:["floral","aromatico-verde"],intensidad:4,dulzura:2,frescura:3,ocasiones:["trabajo","citas","versatil"],estacion_ideal:["templado"],precio_cop_tier:"mid-alta",precio_aprox_cop:480000,vendor:"Disfragancias",notas_simples:"lavanda y naranja floral — moderno y empoderado",alt_de:null,polarizante:false,nivel_usuario:["explorador","entusiasta"]},
  {id:"ysl-black-opium",nombre:"Black Opium",casa:"YSL",genero:"femenino",familias:["gourmand","oriental"],intensidad:4,dulzura:4,frescura:1,ocasiones:["citas","fiesta"],estacion_ideal:["frio"],precio_cop_tier:"mid-alta",precio_aprox_cop:480000,vendor:"Disfragancias",notas_simples:"café, vainilla y jazmín — adictivo y muy querido",alt_de:null,polarizante:false,nivel_usuario:["explorador","entusiasta","coleccionista"]},
  {id:"armani-acqua-profumo",nombre:"Acqua di Gio Profumo",casa:"Giorgio Armani",genero:"masculino",familias:["acuatico","aromatico-verde"],intensidad:3,dulzura:1,frescura:4,ocasiones:["trabajo","diario","versatil"],estacion_ideal:["calor","templado"],precio_cop_tier:"mid-alta",precio_aprox_cop:520000,vendor:"Disfragancias",notas_simples:"marino con incienso — fresco e intenso a la vez",alt_de:null,polarizante:false,nivel_usuario:["explorador","entusiasta","coleccionista"]},
  {id:"hermes-terre",nombre:"Terre d'Hermès",casa:"Hermès",genero:"masculino",familias:["amaderado","citrico"],intensidad:3,dulzura:1,frescura:3,ocasiones:["trabajo","diario","versatil"],estacion_ideal:["templado"],precio_cop_tier:"mid-alta",precio_aprox_cop:560000,vendor:"Disfragancias",notas_simples:"madera con pomelo y naranja, terroso y elegante",alt_de:null,polarizante:false,nivel_usuario:["entusiasta","coleccionista"]},
  {id:"gucci-bloom",nombre:"Bloom",casa:"Gucci",genero:"femenino",familias:["floral"],intensidad:3,dulzura:2,frescura:2,ocasiones:["diario","trabajo","versatil"],estacion_ideal:["templado","calor"],precio_cop_tier:"mid-alta",precio_aprox_cop:500000,vendor:"Disfragancias",notas_simples:"floral blanco tipo tuberosa, fresco y femenino",alt_de:null,polarizante:false,nivel_usuario:["explorador","entusiasta"]},
  // LUJO
  {id:"creed-aventus",nombre:"Aventus",casa:"Creed",genero:"masculino",familias:["frutal","amaderado"],intensidad:4,dulzura:2,frescura:3,ocasiones:["citas","trabajo","versatil"],estacion_ideal:["templado","frio"],precio_cop_tier:"lujo",precio_aprox_cop:1200000,vendor:"Gran Aroma",notas_simples:"piña y abedul ahumado — el nicho masculino más icónico",alt_de:null,polarizante:false,nivel_usuario:["coleccionista"]},
  {id:"pdm-layton",nombre:"Layton",casa:"Parfums de Marly",genero:"masculino",familias:["aromatico-verde","gourmand"],intensidad:4,dulzura:3,frescura:2,ocasiones:["citas","versatil"],estacion_ideal:["templado","frio"],precio_cop_tier:"lujo",precio_aprox_cop:950000,vendor:"Gran Aroma",notas_simples:"manzana, lavanda y vainilla — bestseller absoluto",alt_de:null,polarizante:false,nivel_usuario:["entusiasta","coleccionista"]},
  {id:"pdm-delina",nombre:"Delina",casa:"Parfums de Marly",genero:"femenino",familias:["floral","frutal"],intensidad:3,dulzura:3,frescura:3,ocasiones:["citas","versatil"],estacion_ideal:["templado"],precio_cop_tier:"lujo",precio_aprox_cop:980000,vendor:"Gran Aroma",notas_simples:"rosa y lichi — el femenino más querido de la marca",alt_de:null,polarizante:false,nivel_usuario:["entusiasta","coleccionista"]},
  {id:"mfk-baccarat-rouge",nombre:"Baccarat Rouge 540",casa:"MFK",genero:"unisex",familias:["oriental","amaderado"],intensidad:4,dulzura:3,frescura:2,ocasiones:["citas","versatil"],estacion_ideal:["templado","frio"],precio_cop_tier:"lujo",precio_aprox_cop:1100000,vendor:"Gran Aroma",notas_simples:"jazmín, azafrán y amberwood — el nicho más deseado",alt_de:null,polarizante:false,nivel_usuario:["coleccionista"]},
  {id:"lelabo-santal33",nombre:"Santal 33",casa:"Le Labo",genero:"unisex",familias:["amaderado","fresco-limpio"],intensidad:3,dulzura:1,frescura:3,ocasiones:["trabajo","citas","versatil"],estacion_ideal:["templado","frio"],precio_cop_tier:"lujo",precio_aprox_cop:850000,vendor:"Gran Aroma",notas_simples:"sándalo, cedro y violeta — el nicho más buscado en Colombia",alt_de:null,polarizante:false,nivel_usuario:["entusiasta","coleccionista"]},
  {id:"xerjoff-erba-pura",nombre:"Erba Pura",casa:"Xerjoff",genero:"unisex",familias:["citrico","gourmand"],intensidad:3,dulzura:3,frescura:4,ocasiones:["diario","citas","versatil"],estacion_ideal:["calor","templado"],precio_cop_tier:"lujo",precio_aprox_cop:900000,vendor:"Gran Aroma",notas_simples:"naranja siciliana con almizcle — fresco y dulce a la vez",alt_de:null,polarizante:false,nivel_usuario:["entusiasta","coleccionista"]},
  {id:"initio-absolute",nombre:"Absolute Aphrodisiac",casa:"Initio",genero:"unisex",familias:["gourmand","oriental"],intensidad:5,dulzura:5,frescura:1,ocasiones:["citas","fiesta"],estacion_ideal:["frio"],precio_cop_tier:"lujo",precio_aprox_cop:1000000,vendor:"Gran Aroma",notas_simples:"vainilla y almizcle muy concentrado — seductor e intenso",alt_de:null,polarizante:true,nivel_usuario:["coleccionista"]},
  {id:"kilian-love",nombre:"Love Don't Be Shy",casa:"Kilian",genero:"femenino",familias:["gourmand","floral"],intensidad:4,dulzura:5,frescura:1,ocasiones:["citas"],estacion_ideal:["frio"],precio_cop_tier:"lujo",precio_aprox_cop:1050000,vendor:"Gran Aroma",notas_simples:"miel y vainilla con flor de naranja — dulce y delicado",alt_de:null,polarizante:false,nivel_usuario:["coleccionista"]},
  {id:"byredo-gypsy-water",nombre:"Gypsy Water",casa:"Byredo",genero:"unisex",familias:["amaderado","aromatico-verde"],intensidad:3,dulzura:1,frescura:3,ocasiones:["diario","trabajo","versatil"],estacion_ideal:["templado"],precio_cop_tier:"lujo",precio_aprox_cop:880000,vendor:"Gran Aroma",notas_simples:"pino y bergamota con vainilla suave — fresco y bohemio",alt_de:null,polarizante:false,nivel_usuario:["entusiasta","coleccionista"]},
  {id:"nishane-hacivat",nombre:"Hacivat",casa:"Nishane",genero:"unisex",familias:["citrico","amaderado"],intensidad:3,dulzura:2,frescura:4,ocasiones:["diario","trabajo","versatil"],estacion_ideal:["calor","templado"],precio_cop_tier:"lujo",precio_aprox_cop:920000,vendor:"Gran Aroma",notas_simples:"piña y cedro fresco — bestseller turco muy querido",alt_de:null,polarizante:false,nivel_usuario:["entusiasta","coleccionista"]},
  {id:"creed-silver-mtn",nombre:"Silver Mountain Water",casa:"Creed",genero:"unisex",familias:["citrico","acuatico"],intensidad:3,dulzura:1,frescura:4,ocasiones:["trabajo","diario","versatil"],estacion_ideal:["calor","templado"],precio_cop_tier:"lujo",precio_aprox_cop:1100000,vendor:"Gran Aroma",notas_simples:"té verde y bergamota — fresco y elegante, ícono de Creed",alt_de:null,polarizante:false,nivel_usuario:["coleccionista"]},
  {id:"jomalone-woodsage",nombre:"Wood Sage & Sea Salt",casa:"Jo Malone",genero:"unisex",familias:["acuatico","aromatico-verde"],intensidad:2,dulzura:1,frescura:4,ocasiones:["diario","trabajo","versatil"],estacion_ideal:["calor","templado"],precio_cop_tier:"lujo",precio_aprox_cop:750000,vendor:"Gran Aroma",notas_simples:"sal marina y salvia, muy fresco y minimalista",alt_de:null,polarizante:false,nivel_usuario:["entusiasta","coleccionista"]},
  {id:"viktorrolf-flowerbomb",nombre:"Flowerbomb",casa:"Viktor & Rolf",genero:"femenino",familias:["floral","oriental"],intensidad:4,dulzura:4,frescura:1,ocasiones:["citas","fiesta"],estacion_ideal:["frio"],precio_cop_tier:"lujo",precio_aprox_cop:820000,vendor:"Gran Aroma",notas_simples:"floral oriental explosivo y dulce, muy femenino",alt_de:null,polarizante:false,nivel_usuario:["entusiasta","coleccionista"]},
];

// ══════════════════════════════════════════════════════════════
// MOTOR DE SCORING — FÓRMULA MATEMÁTICA FIJA
// ══════════════════════════════════════════════════════════════

// Mapeo del Tinder de olores → familias olfativas del esquema
const TINDER_A_FAMILIA = {
  lluvia:    ["acuatico","fresco-limpio"],
  mar:       ["acuatico"],
  cafe:      ["gourmand"],
  flores:    ["floral"],
  madera:    ["amaderado"],
  citrico:   ["citrico"],
  especiado: ["especiado","oriental"],
  dulce:     ["gourmand"],
  limpio:    ["fresco-limpio"],
  verde:     ["aromatico-verde"],
  oud:       ["oriental","amaderado"],
  frutal:    ["frutal","floral"],
};

// Mapeo de presupuesto del flujo → tier del esquema
const PRESUPUESTO_A_TIER = {
  basico:    ["accesible"],
  medio:     ["accesible","mid"],
  alto:      ["mid","mid-alta"],
  lujo:      ["mid-alta","lujo"],
};

// Mapeo de clima a estación ideal
function climaAEstacion(tempC) {
  if (tempC >= 26) return "calor";
  if (tempC >= 18) return "templado";
  return "frio";
}

/**
 * calcularScore(perfume, userContext) → number 0–100
 *
 * userContext = {
 *   genero:      "hombre" | "mujer" | "unisex",
 *   ocasiones:   ["trabajo","citas",...],
 *   presupuesto: "basico"|"medio"|"alto"|"lujo",
 *   tinderLikes: ["lluvia","cafe",...],   // lo que le gustó en el Tinder
 *   tempC:       number,                  // temperatura actual
 *   nivelUsuario:"nuevo"|"explorador"|"entusiasta"|"coleccionista"
 * }
 */
function calcularScore(perfume, ctx) {
  let score = 0;

  // ── 1. FAMILIA OLFATIVA — 35 puntos ──
  const familiasDeseadas = (ctx.tinderLikes || [])
    .flatMap(like => TINDER_A_FAMILIA[like] || []);
  const familiaSet = new Set(familiasDeseadas);
  const matchFamilias = perfume.familias.filter(f => familiaSet.has(f)).length;
  const totalFamilias = Math.max(perfume.familias.length, 1);
  score += Math.round((matchFamilias / totalFamilias) * 35);

  // ── 2. OCASIÓN — 25 puntos ──
  const ocasionesUsuario = ctx.ocasiones || [];
  const matchOcasion = perfume.ocasiones.some(o =>
    ocasionesUsuario.includes(o) || o === "versatil"
  );
  if (matchOcasion) score += 25;

  // ── 3. PRESUPUESTO — 20 puntos ──
  const tiersPermitidos = PRESUPUESTO_A_TIER[ctx.presupuesto] || ["accesible","mid"];
  if (tiersPermitidos.includes(perfume.precio_cop_tier)) {
    score += 20;
  } else {
    // Penalización parcial si está un tier arriba o abajo
    const tierOrder = ["accesible","mid","mid-alta","lujo"];
    const diffTier = Math.abs(
      tierOrder.indexOf(perfume.precio_cop_tier) -
      tierOrder.indexOf(tiersPermitidos[tiersPermitidos.length - 1])
    );
    if (diffTier === 1) score += 8;
  }

  // ── 4. GÉNERO — 10 puntos ──
  const generoUsuario = ctx.genero || "unisex";
  if (perfume.genero === "unisex") {
    score += 10;
  } else if (
    (generoUsuario === "hombre" && perfume.genero === "masculino") ||
    (generoUsuario === "mujer"  && perfume.genero === "femenino")
  ) {
    score += 10;
  } else if (generoUsuario === "unisex") {
    score += 7; // el usuario acepta cualquier género
  }

  // ── 5. CLIMA / ESTACIÓN — 10 puntos ──
  const estacionActual = climaAEstacion(ctx.tempC || 20);
  if (perfume.estacion_ideal.includes(estacionActual)) {
    score += 10;
  }

  // ── BONUS / PENALIZACIONES ──
  // Nivel de usuario: si el perfume no es para este nivel, penalizar suavemente
  const nivelOk = perfume.nivel_usuario.includes(ctx.nivelUsuario || "nuevo");
  if (!nivelOk) score = Math.max(0, score - 8);

  // Polarizante: si es usuario nuevo, bajar 10 puntos para evitar arriesgados
  if (perfume.polarizante && (ctx.nivelUsuario === "nuevo")) score = Math.max(0, score - 10);

  return Math.min(score, 100);
}

/**
 * getTopMatches(userContext, n) → array de los n mejores perfumes con su score
 */
function getTopMatches(ctx, n = 3) {
  const scored = PERFUMES.map(p => ({
    ...p,
    score: calcularScore(p, ctx),
  }));

  // Ordenar por score descendente
  scored.sort((a, b) => b.score - a.score);

  // Diversificación: no más de 2 perfumes de la misma casa entre los top n*2
  const candidates = scored.slice(0, n * 4);
  const casasUsadas = {};
  const top = [];
  for (const p of candidates) {
    if (top.length >= n) break;
    casasUsadas[p.casa] = (casasUsadas[p.casa] || 0) + 1;
    if (casasUsadas[p.casa] <= 1) top.push(p);
  }

  // Si no llenamos n por diversificación, completar
  if (top.length < n) {
    for (const p of candidates) {
      if (top.length >= n) break;
      if (!top.find(t => t.id === p.id)) top.push(p);
    }
  }

  return top.slice(0, n);
}

module.exports = { getTopMatches, calcularScore,
