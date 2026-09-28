# Site da Casa do Curativo

Site estático, sem instalação: HTML, CSS e JavaScript puros.

## Como abrir

- Dois cliques no `index.html`, ou
- No VS Code, clique com o botão direito no `index.html` e escolha **Open with Live Server**.

## Pastas

```
index.html              página única com todas as seções
css/style.css           cores, fontes e layout (as cores ficam no topo, em :root)
js/produtos.js          catálogo: produtos, categorias e "Está cuidando de alguém?"
js/main.js              interações (filtros, busca, lista de orçamento, menu)
assets/img/produtos/    fotos dos produtos com fundo transparente
assets/img/loja/        fotos da loja
assets/img/marca/       logo em branco e verde, horizontal e completo
assets/fonts/           Young Serif e Poppins (licença OFL, pode usar à vontade)
```

## Editar produtos

Tudo fica em `js/produtos.js`. Para incluir um produto, copie um bloco e troque o `id`, o `nome`, a `cat` e a `desc`.

- Com foto: coloque a imagem em `assets/img/produtos/` e use `img: "arquivo.webp"`.
- Sem foto: use `icone:` com um dos desenhos prontos (`p-gaze`, `p-soro`, `p-seringa`, `p-luva`, `p-fita`...).

## WhatsApp

O número está em `js/produtos.js` (`whatsapp: "5588992264439"`) e nos links do `index.html`. Para trocar, busque por `5588992264439` e substitua em todos os lugares.

A lista de orçamento monta a mensagem sozinha, com os produtos e as quantidades.

## Publicar no GitHub Pages

1. Crie um repositório e suba o conteúdo desta pasta (o `index.html` na raiz).
2. Em **Settings > Pages**, escolha a branch `main` e a pasta `/ (root)`.
3. Depois de publicado, troque no `index.html` o `og:image` pelo endereço completo da imagem (ex.: `https://seuusuario.github.io/casa-do-curativo/assets/img/og-casa-do-curativo.jpg`). Assim a prévia aparece quando o link é enviado no WhatsApp.

## Conferir com o cliente antes de publicar

- **Horário de funcionamento:** não aparece no Instagram. Por enquanto o site pede para confirmar pelo WhatsApp.
- **Mapa:** mostra a Rua Edilson Veras Coelho, 46. Para o pino exato, no Google Maps procure a loja, clique em **Compartilhar > Incorporar um mapa** e troque o `src` do `iframe` na seção "Como chegar".
- **Fotos:** foram tiradas dos posts do Instagram da loja. Se o cliente fechar, peça as fotos originais em alta.
- **Produtos e textos:** confirme se a lista reflete o que está em estoque.
