/* ==========================================================
   Casa do Curativo · interações
   - luz da onda acendendo no topo
   - catálogo com filtros, situações e busca
   - lista de orçamento enviada pelo WhatsApp
   ========================================================== */
(function () {
  "use strict";

  var CASA = window.CASA;
  if (!CASA) return;
  document.documentElement.classList.add("js");

  var reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (sel, el) { return (el || document).querySelector(sel); };
  var $$ = function (sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); };

  function waLink(msg) {
    return "https://wa.me/" + CASA.whatsapp + "?text=" + encodeURIComponent(msg);
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function normalizar(s) {
    return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  /* ---------- links de WhatsApp com mensagem pronta ---------- */
  $$("[data-wa]").forEach(function (a) { a.href = waLink(a.getAttribute("data-wa")); });

  var ano = $("[data-ano]");
  if (ano) ano.textContent = String(new Date().getFullYear());

  /* ---------- topo, menu e botão flutuante ---------- */
  var topo = $("[data-topo]");
  var hero = $("[data-hero]");
  var fab = $(".wa-flutuante");
  var menuBotao = $("[data-menu-botao]");
  var menu = $("[data-menu]");
  var menuAberto = false;

  function aoRolar() {
    var y = window.scrollY || window.pageYOffset;
    topo.classList.toggle("topo--solido", y > 12 || menuAberto);
    var limite = hero ? hero.offsetHeight * 0.65 : 400;
    if (fab) fab.classList.toggle("is-visivel", y > limite);
  }
  window.addEventListener("scroll", aoRolar, { passive: true });
  aoRolar();

  function abrirMenu() {
    menuAberto = true;
    menu.hidden = false;
    requestAnimationFrame(function () { menu.classList.add("is-aberto"); });
    menuBotao.setAttribute("aria-expanded", "true");
    $(".sr", menuBotao).textContent = "Fechar menu";
    $("use", menuBotao).setAttribute("href", "#i-fechar");
    document.body.classList.add("trava-rolagem", "menu-aberto");
    aoRolar();
  }
  function fecharMenu() {
    if (!menuAberto) return;
    menuAberto = false;
    menu.classList.remove("is-aberto");
    menuBotao.setAttribute("aria-expanded", "false");
    $(".sr", menuBotao).textContent = "Abrir menu";
    $("use", menuBotao).setAttribute("href", "#i-menu");
    document.body.classList.remove("menu-aberto");
    if (!listaAberta) document.body.classList.remove("trava-rolagem");
    setTimeout(function () { if (!menuAberto) menu.hidden = true; }, reduzido ? 0 : 260);
    aoRolar();
  }
  if (menuBotao && menu) {
    menuBotao.addEventListener("click", function () { menuAberto ? fecharMenu() : abrirMenu(); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) fecharMenu(); });
    window.addEventListener("resize", function () { if (window.innerWidth > 1180) fecharMenu(); });
  }

  /* ---------- a luz da onda acende ---------- */
  function ligar() { if (hero) hero.classList.add("is-ligada"); }
  var esperaFontes = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  Promise.race([esperaFontes, new Promise(function (r) { setTimeout(r, 450); })]).then(function () {
    requestAnimationFrame(function () { requestAnimationFrame(ligar); });
  });

  /* ---------- revelar fitas e linha do tempo ---------- */
  var alvos = $$("[data-revelar]");
  if ("IntersectionObserver" in window && !reduzido) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visivel"); io.unobserve(en.target); }
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -6% 0px" });
    alvos.forEach(function (a) { io.observe(a); });
  } else {
    alvos.forEach(function (a) { a.classList.add("is-visivel"); });
  }

  /* ==========================================================
     Lista de orçamento (estado)
     ========================================================== */
  var CHAVE = "casa-do-curativo:lista";
  var produtos = CASA.produtos;
  var porId = {};
  produtos.forEach(function (p) { porId[p.id] = p; });
  var catNome = {};
  var ordemCat = {};
  var ordemOriginal = {};
  CASA.categorias.forEach(function (c, i) { catNome[c.id] = c.nome; ordemCat[c.id] = i; });
  produtos.forEach(function (p, i) { ordemOriginal[p.id] = i; });

  var itens = new Map();
  try {
    var salvo = JSON.parse(localStorage.getItem(CHAVE) || "[]");
    salvo.forEach(function (par) {
      if (porId[par[0]] && par[1] > 0) itens.set(par[0], Math.min(99, par[1] | 0));
    });
  } catch (e) { /* sem armazenamento: a lista vive só nesta visita */ }

  function salvar() {
    try { localStorage.setItem(CHAVE, JSON.stringify(Array.from(itens.entries()))); } catch (e) {}
  }

  function mudarQtd(id, delta) {
    var antes = itens.get(id) || 0;
    var depois = Math.max(0, Math.min(99, antes + delta));
    if (depois === 0) itens.delete(id); else itens.set(id, depois);
    salvar();
    atualizarContadores(antes === 0 && depois > 0);
    return { antes: antes, depois: depois };
  }

  function atualizarContadores(pular) {
    var n = itens.size;
    $$("[data-lista-contagem]").forEach(function (el) {
      el.textContent = String(n);
      if (el.classList.contains("contador")) {
        el.hidden = n === 0;
        if (pular && !reduzido) { el.classList.remove("pula"); void el.offsetWidth; el.classList.add("pula"); }
      }
    });
    var barra = $("[data-lista-barra]");
    if (barra) {
      barra.hidden = n === 0;
      barra.setAttribute("aria-label", "Abrir minha lista, " + n + (n === 1 ? " item" : " itens"));
    }
  }

  /* ---------- botões de adicionar / quantidade ---------- */
  function acoesHTML(id) {
    var p = porId[id];
    var q = itens.get(id) || 0;
    var perguntar =
      '<a class="botao-pergunta" href="' + esc(waLink("Olá, Casa do Curativo! Vi no site e queria saber o preço e a disponibilidade de: " + p.nome + ".")) +
      '" target="_blank" rel="noopener" aria-label="Perguntar sobre ' + esc(p.nome) + ' no WhatsApp">' +
      '<svg class="ico ico--cheio" aria-hidden="true"><use href="#i-whatsapp"/></svg></a>';
    if (!q) {
      return '<button type="button" class="botao-lista" data-add="' + id + '" aria-label="Adicionar ' + esc(p.nome) + ' à lista">' +
        '<svg class="ico" aria-hidden="true"><use href="#i-mais"/></svg><span>Adicionar<span class="rotulo-extra"> à lista</span></span></button>' + perguntar;
    }
    return '<div class="qtd" role="group" aria-label="Quantidade de ' + esc(p.nome) + ' na lista">' +
      '<button type="button" data-menos="' + id + '" aria-label="Diminuir quantidade de ' + esc(p.nome) + '"><svg class="ico" aria-hidden="true"><use href="#i-menos"/></svg></button>' +
      "<output>" + q + '<span class="rotulo-extra"> na lista</span></output>' +
      '<button type="button" data-mais="' + id + '" aria-label="Aumentar quantidade de ' + esc(p.nome) + '"><svg class="ico" aria-hidden="true"><use href="#i-mais"/></svg></button>' +
      "</div>" + perguntar;
  }

  function atualizarAcoes(id, foco) {
    $$('[data-acoes="' + id + '"]').forEach(function (box) {
      var tinhaFoco = box.contains(document.activeElement);
      box.innerHTML = acoesHTML(id);
      if (tinhaFoco && foco) {
        var alvo = $("[data-" + foco + '="' + id + '"]', box) || $("[data-add]", box) || $("[data-mais]", box);
        if (alvo) alvo.focus();
      }
    });
  }

  /* ações fixas (seção de aparelhos) */
  $$(".aparelho__acoes[data-acoes]").forEach(function (box) {
    var id = box.getAttribute("data-acoes");
    if (!porId[id]) return;
    box.classList.add("acoes");
    box.innerHTML = acoesHTML(id);
  });

  /* ---------- aviso rápido ---------- */
  var aviso = $("[data-aviso]");
  var avisoTexto = $("[data-aviso-texto]");
  var avisoTimer = null;
  function mostrarAviso(texto) {
    if (!aviso) return;
    avisoTexto.textContent = texto;
    aviso.hidden = false;
    requestAnimationFrame(function () { aviso.classList.add("is-visivel"); });
    clearTimeout(avisoTimer);
    avisoTimer = setTimeout(esconderAviso, 3400);
  }
  function esconderAviso() {
    if (!aviso) return;
    aviso.classList.remove("is-visivel");
    setTimeout(function () { if (!aviso.classList.contains("is-visivel")) aviso.hidden = true; }, 300);
  }

  /* ==========================================================
     Catálogo
     ========================================================== */
  var grade = $("[data-grade]");
  var filtrosEl = $("[data-filtros]");
  var busca = $("[data-busca]");
  var vazio = $("[data-vazio]");
  var ativoEl = $("[data-filtro-ativo]");
  var ativoTxt = $("[data-filtro-texto]");
  var linkBusca = $("[data-wa-busca]");
  var verMais = $("[data-ver-mais]");
  var verMaisBotao = $("[data-ver-mais-botao]");
  var LIMITE = 12;
  var estado = { cat: "todos", situacao: null, termo: "", tudo: false };

  function montarFiltros() {
    var cont = { todos: produtos.length };
    produtos.forEach(function (p) { cont[p.cat] = (cont[p.cat] || 0) + 1; });
    var lista = [{ id: "todos", nome: "Todos" }].concat(CASA.categorias);
    filtrosEl.innerHTML = lista.map(function (c) {
      return '<button type="button" class="chip" data-cat="' + c.id + '" aria-pressed="false">' +
        esc(c.nome) + '<span class="chip__n" aria-label="' + (cont[c.id] || 0) + ' produtos">' + (cont[c.id] || 0) + "</span></button>";
    }).join("");
  }

  function selecionados() {
    if (estado.termo) {
      var palavras = normalizar(estado.termo).split(/\s+/).filter(Boolean);
      return produtos.filter(function (p) {
        var alvo = normalizar(p.nome + " " + p.desc + " " + (p.busca || "") + " " + catNome[p.cat]);
        return palavras.every(function (w) { return alvo.indexOf(w) !== -1; });
      });
    }
    if (estado.situacao && CASA.situacoes[estado.situacao]) {
      return CASA.situacoes[estado.situacao].ids.map(function (id) { return porId[id]; }).filter(Boolean);
    }
    if (estado.cat !== "todos") {
      return produtos.filter(function (p) { return p.cat === estado.cat; }).sort(function (a, b) {
        return ((b.img ? 1 : 0) - (a.img ? 1 : 0)) || (ordemOriginal[a.id] - ordemOriginal[b.id]);
      });
    }
    // "Todos": primeiro o que tem foto, misturando categorias
    return produtos.slice().sort(function (a, b) {
      return ((b.img ? 1 : 0) - (a.img ? 1 : 0)) || (ordemCat[a.cat] - ordemCat[b.cat]) || (ordemOriginal[a.id] - ordemOriginal[b.id]);
    });
  }

  function cartaoHTML(p, i) {
    var midia = p.img
      ? '<div class="nicho' + (p.sangra ? " nicho--sangra" : "") + '"><img src="assets/img/produtos/' + p.img + '" alt="' + esc(p.nome) + '" loading="lazy" decoding="async"></div>'
      : '<div class="nicho"><div class="embalagem" aria-hidden="true"><svg><use href="#' + p.icone + '"/></svg></div></div>';
    return '<li class="produto' + (reduzido ? "" : " entra") + '" style="animation-delay:' + Math.min(i, 10) * 35 + 'ms">' +
      midia +
      '<div class="produto__corpo">' +
      '<span class="produto__cat">' + esc(catNome[p.cat]) + "</span>" +
      '<h3 class="produto__nome">' + esc(p.nome) + "</h3>" +
      '<p class="produto__desc">' + esc(p.desc) + "</p>" +
      '<div class="produto__acoes acoes" data-acoes="' + p.id + '">' + acoesHTML(p.id) + "</div>" +
      "</div></li>";
  }

  function render(inicio) {
    var arr = selecionados();
    var resumido = estado.cat === "todos" && !estado.situacao && !estado.termo && !estado.tudo && arr.length > LIMITE;
    var mostrar = resumido ? arr.slice(0, LIMITE) : arr;
    if (inicio) {
      grade.insertAdjacentHTML("beforeend", mostrar.slice(inicio).map(function (p, i) { return cartaoHTML(p, i); }).join(""));
    } else {
      grade.innerHTML = mostrar.map(cartaoHTML).join("");
    }
    vazio.hidden = arr.length > 0;
    if (verMais) {
      verMais.hidden = !resumido;
      if (verMaisBotao) verMaisBotao.textContent = "Ver todos os " + arr.length + " produtos";
    }

    $$("[data-cat]", filtrosEl).forEach(function (b) {
      var ativo = !estado.situacao && !estado.termo && b.getAttribute("data-cat") === estado.cat;
      b.setAttribute("aria-pressed", String(ativo));
    });

    if (estado.termo) {
      ativoEl.hidden = false;
      ativoTxt.textContent = arr.length
        ? arr.length + (arr.length === 1 ? " produto encontrado" : " produtos encontrados") + " para “" + estado.termo + "”."
        : "Nada encontrado para “" + estado.termo + "”.";
    } else if (estado.situacao) {
      ativoEl.hidden = false;
      ativoTxt.textContent = "Selecionamos " + arr.length + " produtos para “" + CASA.situacoes[estado.situacao].nome + "”.";
    } else {
      ativoEl.hidden = true;
    }

    if (linkBusca) {
      linkBusca.href = waLink(estado.termo
        ? "Olá, Casa do Curativo! Vocês têm " + estado.termo + "?"
        : "Olá, Casa do Curativo! Queria saber se vocês têm um produto que não encontrei no site:");
    }
  }

  function marcarSituacoes() {
    $$(".situacao").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-situacao") === estado.situacao));
    });
  }

  function limparFiltros() {
    estado.cat = "todos"; estado.situacao = null; estado.termo = "";
    if (busca) busca.value = "";
    marcarSituacoes();
    render();
  }

  if (grade && filtrosEl) {
    montarFiltros();
    render();
    marcarSituacoes();

    filtrosEl.addEventListener("click", function (e) {
      var b = e.target.closest("[data-cat]");
      if (!b) return;
      estado.cat = b.getAttribute("data-cat");
      estado.situacao = null; estado.termo = "";
      if (busca) busca.value = "";
      marcarSituacoes();
      render();
    });

    var espera = null;
    if (busca) {
      busca.addEventListener("input", function () {
        clearTimeout(espera);
        espera = setTimeout(function () {
          estado.termo = busca.value.trim();
          if (estado.termo) { estado.situacao = null; marcarSituacoes(); }
          render();
        }, 140);
      });
      busca.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && busca.value) { e.stopPropagation(); limparFiltros(); }
      });
    }

    var limpar = $("[data-filtro-limpar]");
    if (limpar) limpar.addEventListener("click", limparFiltros);

    if (verMaisBotao) {
      verMaisBotao.addEventListener("click", function () {
        estado.tudo = true;
        render(LIMITE);
        var proximo = grade.children[LIMITE] && $("button, a", grade.children[LIMITE]);
        if (proximo) proximo.focus({ preventScroll: true });
      });
    }
  }

  /* ==========================================================
     Gaveta da lista
     ========================================================== */
  var listaEl = $("[data-lista]");
  var fundo = $("[data-lista-fundo]");
  var itensEl = $("[data-lista-itens]");
  var vaziaEl = $("[data-lista-vazia]");
  var formEl = $("[data-lista-form]");
  var ajudaEl = $(".lista__ajuda");
  var listaAberta = false;
  var focoAnterior = null;

  function renderLista() {
    var arr = [];
    itens.forEach(function (q, id) { if (porId[id]) arr.push([porId[id], q]); });
    itensEl.innerHTML = arr.map(function (par) {
      var p = par[0], q = par[1];
      var mini = p.img
        ? '<img src="assets/img/produtos/' + p.img + '" alt="">'
        : '<svg aria-hidden="true"><use href="#' + p.icone + '"/></svg>';
      return '<li class="lista__item">' +
        '<div class="lista__mini">' + mini + "</div>" +
        "<div>" +
        '<p class="lista__nome">' + esc(p.nome) + "</p>" +
        '<div class="lista__linha">' +
        '<div class="passo" role="group" aria-label="Quantidade de ' + esc(p.nome) + '">' +
        '<button type="button" data-menos="' + p.id + '" aria-label="Diminuir quantidade de ' + esc(p.nome) + '"><svg class="ico" aria-hidden="true"><use href="#i-menos"/></svg></button>' +
        "<output>" + q + "</output>" +
        '<button type="button" data-mais="' + p.id + '" aria-label="Aumentar quantidade de ' + esc(p.nome) + '"><svg class="ico" aria-hidden="true"><use href="#i-mais"/></svg></button>' +
        "</div>" +
        '<button type="button" class="lista__remover" data-remover="' + p.id + '"><svg class="ico" aria-hidden="true"><use href="#i-lixeira"/></svg>Remover</button>' +
        "</div></div></li>";
    }).join("");
    var vazia = arr.length === 0;
    vaziaEl.hidden = !vazia;
    formEl.hidden = vazia;
    if (ajudaEl) ajudaEl.hidden = vazia;
  }

  function focaveis() {
    return $$('a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])', listaEl)
      .filter(function (el) { return el.offsetParent !== null; });
  }

  function abrirLista() {
    if (listaAberta) return;
    listaAberta = true;
    focoAnterior = document.activeElement;
    fecharMenu();
    esconderAviso();
    renderLista();
    listaEl.hidden = false;
    fundo.hidden = false;
    requestAnimationFrame(function () {
      listaEl.classList.add("is-aberta");
      fundo.classList.add("is-aberta");
    });
    document.body.classList.add("trava-rolagem");
    setTimeout(function () { var f = $(".lista__fechar", listaEl); if (f) f.focus(); }, reduzido ? 0 : 60);
  }

  function fecharLista(devolverFoco) {
    if (!listaAberta) return;
    listaAberta = false;
    listaEl.classList.remove("is-aberta");
    fundo.classList.remove("is-aberta");
    if (!menuAberto) document.body.classList.remove("trava-rolagem");
    setTimeout(function () {
      if (!listaAberta) { listaEl.hidden = true; fundo.hidden = true; }
    }, reduzido ? 0 : 400);
    if (devolverFoco !== false && focoAnterior && focoAnterior.focus && document.contains(focoAnterior)) focoAnterior.focus();
  }

  if (listaEl && fundo) {
    fundo.addEventListener("click", function () { fecharLista(); });

    listaEl.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var f = focaveis();
      if (!f.length) return;
      var primeiro = f[0], ultimo = f[f.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
    });

    formEl.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!itens.size) return;
      var dados = new FormData(formEl);
      var linhas = [];
      itens.forEach(function (q, id) { if (porId[id]) linhas.push("• " + q + "x " + porId[id].nome); });
      var msg = "Olá, Casa do Curativo! Vim pelo site e gostaria de um orçamento:\n\n" + linhas.join("\n") +
        "\n\nÉ para: " + (dados.get("para") || "uso em casa");
      var nome = String(dados.get("nome") || "").trim();
      var obs = String(dados.get("obs") || "").trim();
      if (nome) msg += "\nNome: " + nome;
      if (obs) msg += "\nObservação: " + obs;
      var janela = window.open(waLink(msg), "_blank", "noopener");
      if (!janela) window.location.href = waLink(msg);
    });

    var limparLista = $("[data-lista-limpar]");
    if (limparLista) {
      limparLista.addEventListener("click", function () {
        var ids = Array.from(itens.keys());
        itens.clear();
        salvar();
        atualizarContadores(false);
        ids.forEach(function (id) { atualizarAcoes(id); });
        renderLista();
        var f = $(".lista__fechar", listaEl); if (f) f.focus();
      });
    }
  }

  /* ---------- cliques (delegação) ---------- */
  document.addEventListener("click", function (e) {
    var alvo;

    if ((alvo = e.target.closest("[data-add]"))) {
      var idA = alvo.getAttribute("data-add");
      mudarQtd(idA, 1);
      atualizarAcoes(idA, "mais");
      mostrarAviso("“" + porId[idA].nome + "” foi para a sua lista.");
      return;
    }
    if ((alvo = e.target.closest("[data-mais]"))) {
      var idM = alvo.getAttribute("data-mais");
      mudarQtd(idM, 1);
      atualizarAcoes(idM, "mais");
      if (listaEl && listaEl.contains(alvo)) { renderLista(); var bm = $('[data-mais="' + idM + '"]', itensEl); if (bm) bm.focus(); }
      return;
    }
    if ((alvo = e.target.closest("[data-menos]"))) {
      var idN = alvo.getAttribute("data-menos");
      var r = mudarQtd(idN, -1);
      atualizarAcoes(idN, r.depois > 0 ? "menos" : "add");
      if (listaEl && listaEl.contains(alvo)) {
        renderLista();
        var bn = $('[data-menos="' + idN + '"]', itensEl) || $(".lista__fechar", listaEl);
        if (bn) bn.focus();
      }
      return;
    }
    if ((alvo = e.target.closest("[data-remover]"))) {
      var idR = alvo.getAttribute("data-remover");
      itens.delete(idR);
      salvar();
      atualizarContadores(false);
      atualizarAcoes(idR);
      renderLista();
      var prox = $("[data-remover]", itensEl) || $(".lista__fechar", listaEl);
      if (prox) prox.focus();
      return;
    }
    if ((alvo = e.target.closest("[data-lista-abrir]"))) {
      abrirLista();
      return;
    }
    if ((alvo = e.target.closest("[data-lista-fechar]"))) {
      var ehLink = alvo.tagName === "A";
      fecharLista(!ehLink);
      return;
    }
    if ((alvo = e.target.closest("[data-situacao]"))) {
      estado.situacao = alvo.getAttribute("data-situacao");
      estado.cat = "todos"; estado.termo = "";
      if (busca) busca.value = "";
      marcarSituacoes();
      render();
      var sec = document.getElementById("produtos");
      if (sec) sec.scrollIntoView({ behavior: reduzido ? "auto" : "smooth", block: "start" });
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (listaAberta) fecharLista();
    else if (menuAberto) { fecharMenu(); menuBotao.focus(); }
  });

  atualizarContadores(false);
})();
