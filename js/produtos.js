/* ==========================================================
   Casa do Curativo · dados do catálogo
   ----------------------------------------------------------
   Para incluir um produto, copie um bloco e ajuste:
   - id: único, sem espaço (ex.: "luvas-latex")
   - cat: uma das categorias abaixo
   - img: arquivo em assets/img/produtos/ (PNG/WEBP com fundo
     transparente). Sem foto? Use "icone" com um dos desenhos
     do index.html (p-gaze, p-soro, p-fita, p-seringa...).
   - busca: palavras extras que o cliente pode digitar
   ========================================================== */

window.CASA = {
  whatsapp: "5588992264439",

  categorias: [
    { id: "curativos",    nome: "Curativos e feridas" },
    { id: "descartaveis", nome: "Injetáveis e descartáveis" },
    { id: "aparelhos",    nome: "Aparelhos" },
    { id: "mobilidade",   nome: "Mobilidade" },
    { id: "acamados",     nome: "Acamados" },
    { id: "pele",         nome: "Pés, pernas e pele" },
    { id: "ostomia",      nome: "Ostomia" },
    { id: "geriatricos",  nome: "Geriátricos" },
    { id: "suplementos",  nome: "Suplementos" }
  ],

  situacoes: {
    acamado:    { nome: "Alguém acamado em casa",           ids: ["colchao", "almofada-giro", "creme-barreira", "fraldas", "luvas", "soro", "gaze"] },
    ferida:     { nome: "Uma ferida para cuidar",           ids: ["gaze", "soro", "phmb", "alginato-prata", "espuma", "hidrogel", "filme", "micropore", "crepom", "atadura-elastica", "luvas"] },
    diabetes:   { nome: "Diabetes no dia a dia",            ids: ["glicosimetro", "seringas", "decreina", "meia-compressao", "hidrogel"] },
    mobilidade: { nome: "Dificuldade para andar",           ids: ["cadeira-rodas", "andador", "bengala", "bandagem", "meia-compressao"] },
    monitorar:  { nome: "Medir a saúde em casa",            ids: ["pressao-braco", "pressao-pulso", "glicosimetro", "oximetro", "nebulizador"] },
    clinica:    { nome: "Abastecer clínica ou consultório", ids: ["luvas", "luvas-estereis", "gaze", "soro", "seringas", "micropore", "phmb", "alginato-prata", "espuma", "hidrogel", "filme", "pressao-manual"] }
  },

  produtos: [
    /* Curativos e feridas */
    { id: "gaze", nome: "Gaze", cat: "curativos", icone: "p-gaze",
      desc: "Pacote com 500 unidades, para limpeza e cobertura de feridas.", busca: "compressa pacote" },
    { id: "soro", nome: "Soro fisiológico", cat: "curativos", icone: "p-soro",
      desc: "Para limpar a ferida e a pele ao redor antes do curativo.", busca: "cloreto de sodio limpeza" },
    { id: "micropore", nome: "Fita microporosa", cat: "curativos", icone: "p-fita",
      desc: "Fixa gaze e curativos com delicadeza na pele.", busca: "micropore esparadrapo fita adesiva" },
    { id: "crepom", nome: "Atadura crepom", cat: "curativos", icone: "p-crepom",
      desc: "Para fixar curativos e dar um suporte leve.", busca: "faixa atadura" },
    { id: "atadura-elastica", nome: "Atadura elástica coesiva", cat: "curativos", img: "atadura-elastica.webp",
      desc: "Versátil, segura e confortável para fixar curativos. Em várias cores.", busca: "bandagem colorida coesiva" },
    { id: "phmb", nome: "Solução de PHMB", cat: "curativos", img: "solucao-phmb.webp",
      desc: "Limpeza e hidratação de feridas, com controle da carga microbiana.", busca: "pielsana polihexanida limpeza ferida" },
    { id: "alginato-prata", nome: "Curativo de alginato com prata", cat: "curativos", img: "alginato-prata.webp",
      desc: "Cobertura antimicrobiana para feridas com secreção. Aquacel Ag+ e M-TEC.", busca: "aquacel ag prata m-tec hidrofibra" },
    { id: "espuma", nome: "Curativo de espuma", cat: "curativos", icone: "p-espuma",
      desc: "Alta absorção, macio e com borda adesiva.", busca: "m-tec absorvente borda adesiva" },
    { id: "hidrogel", nome: "Curativo em gel", cat: "curativos", icone: "p-gel",
      desc: "Mantém a ferida hidratada. Usado em queimaduras, escoriações e pé diabético.", busca: "hidrogel missner m-tec queimadura" },
    { id: "filme", nome: "Filme transparente", cat: "curativos", icone: "p-filme",
      desc: "Fixa o curativo e ajuda a proteger da água, deixando ver a pele.", busca: "m-tec rolo transparente banho" },

    /* Injetáveis e descartáveis */
    { id: "seringas", nome: "Seringas e agulhas", cat: "descartaveis", icone: "p-seringa",
      desc: "Vários volumes, incluindo seringas de insulina.", busca: "injecao insulina agulha injetaveis" },
    { id: "luvas", nome: "Luvas de procedimento", cat: "descartaveis", img: "luvas-procedimento.webp",
      desc: "Nitrílicas, sem pó, em caixa com 100 unidades.", busca: "luva nitrilica medix latex" },
    { id: "luvas-estereis", nome: "Luvas cirúrgicas estéreis", cat: "descartaveis", icone: "p-luva",
      desc: "Para procedimentos que pedem material estéril.", busca: "luva esteril cirurgica" },

    /* Aparelhos */
    { id: "pressao-braco", nome: "Medidor de pressão de braço", cat: "aparelhos", img: "pressao-braco.webp",
      desc: "Automático, guarda até 199 medições na memória.", busca: "aparelho de pressao digital multi" },
    { id: "pressao-pulso", nome: "Medidor de pressão de pulso", cat: "aparelhos", img: "pressao-pulso.webp",
      desc: "Automático, com 2 perfis e 60 medições por usuário.", busca: "aparelho de pressao digital multi" },
    { id: "glicosimetro", nome: "Monitor de glicose", cat: "aparelhos", img: "monitor-glicose.webp",
      desc: "Resultado rápido, fácil de usar e portátil.", busca: "glicosimetro diabetes glicemia" },
    { id: "oximetro", nome: "Oxímetro de pulso", cat: "aparelhos", img: "oximetro.webp",
      desc: "Mede a oxigenação (SpO2) e os batimentos, com nova leitura a cada 8 segundos.", busca: "saturacao oxigenio" },
    { id: "nebulizador", nome: "Nebulizador compressor", cat: "aparelhos", img: "nebulizador.webp",
      desc: "Baixo ruído, compacto e leve, para inalação em casa.", busca: "inalador inalacao" },
    { id: "pressao-manual", nome: "Aparelho de pressão manual", cat: "aparelhos", icone: "p-pressao",
      desc: "Para aferição e avaliação física feita por profissionais.", busca: "esfigmomanometro estetoscopio" },

    /* Mobilidade */
    { id: "cadeira-rodas", nome: "Cadeira de rodas", cat: "mobilidade", img: "cadeira-de-rodas.webp",
      desc: "Desmontável, com conforto para o dia a dia e fácil de levar no carro.", busca: "cadeirante locomocao" },
    { id: "andador", nome: "Andador articulado", cat: "mobilidade", img: "andador.webp",
      desc: "Dobrável, com 3 barras, para caminhar com mais firmeza.", busca: "locomocao idoso" },
    { id: "bengala", nome: "Bengalas e muletas", cat: "mobilidade", img: "bengala-muleta.webp",
      desc: "Bastão e muleta para caminhar com mais apoio e independência.", busca: "bastao muleta canadense" },
    { id: "bandagem", nome: "Bandagem funcional", cat: "mobilidade", icone: "p-bandagem",
      desc: "Fita elástica de apoio muscular e articular.", busca: "kinesio fita elastica" },

    /* Acamados */
    { id: "colchao", nome: "Colchão pneumático", cat: "acamados", img: "colchao-pneumatico.webp",
      desc: "Com compressor, alterna a pressão e ajuda a prevenir escaras.", busca: "caixa de ovo escara ar" },
    { id: "almofada-giro", nome: "Almofada Giro Fácil", cat: "acamados", img: "almofada-giro-facil.webp",
      desc: "Ajuda a mudar o paciente de lado no leito, com menos esforço.", busca: "posicionamento escara", sangra: true },

    /* Pés, pernas e pele */
    { id: "creme-barreira", nome: "Creme barreira", cat: "pele", img: "creme-barreira.webp",
      desc: "Forma uma camada que protege a pele de crianças, idosos e pessoas acamadas.", busca: "dermamon assadura protecao fralda" },
    { id: "decreina", nome: "Linha Decreína", cat: "pele", icone: "p-pe",
      desc: "Queratolítico para calcanhar rachado e pele grossa, e gotas para o cuidado diário.", busca: "pe rachado calo hidratante podologia" },
    { id: "oleo-ozonizado", nome: "Óleo de girassol ozonizado", cat: "pele", icone: "p-oleo",
      desc: "O queridinho da casa para o cuidado diário da pele.", busca: "ozonio oleo age" },
    { id: "meia-compressao", nome: "Meia de compressão", cat: "pele", icone: "p-meia",
      desc: "Ajuda com dor, peso nas pernas e formigamento.", busca: "varizes circulacao" },

    /* Ostomia */
    { id: "colostomia", nome: "Bolsas de colostomia", cat: "ostomia", icone: "p-bolsa",
      desc: "Para o dia a dia de quem usa estomia.", busca: "ostomia estomia bolsa" },
    { id: "suporte-colostomia", nome: "Suporte para bolsa de colostomia", cat: "ostomia", icone: "p-suporte",
      desc: "Mais segurança e conforto na rotina.", busca: "cinta ostomia" },

    /* Geriátricos */
    { id: "fraldas", nome: "Fraldas geriátricas", cat: "geriatricos", icone: "p-fralda",
      desc: "Linha geriátrica para o conforto de quem você cuida.", busca: "fralda adulto geriatrica" },

    /* Suplementos */
    { id: "suplementos", nome: "Suplementos alimentares", cat: "suplementos", img: "suplementos.webp",
      desc: "Como o Hair & Nails, para cabelo e unhas.", busca: "vitamina growth hair nails" }
  ]
};
