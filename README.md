# Ferreira Veículos — Site institucional

Site institucional responsivo da **Ferreira Veículos | Águas Lindas** (Águas Lindas de Goiás/GO):
mostra o estoque real de seminovos, apresenta os serviços da loja e conduz o visitante
direto para uma conversa no WhatsApp.

Site estático (HTML + CSS + JavaScript puro), sem etapa de build — mesma estrutura dos
outros projetos da área de trabalho.

---

## Como rodar

```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1
```

Depois abra <http://localhost:8766/>.

Não há dependências: basta um servidor estático qualquer (os arquivos também funcionam
abertos direto no navegador, mas o `server.ps1` evita problemas de CORS/URL).

---

## Publicação (online)

- **Site no ar**: <https://ddesites.github.io/ferreira-veiculos/>
- **Repositório**: <https://github.com/DDESites/ferreira-veiculos>

Publicado via **GitHub Pages** a partir da branch `main` (raiz). Para atualizar:

```powershell
git add -A
git commit -m "Atualização do site"
git push origin main
```

O GitHub Pages rebuilda sozinho em ~30 segundos. Como todos os caminhos são relativos,
o mesmo código também funciona em outro domínio/pasta sem ajustes — apenas o `og:image`
dos `<head>` das páginas usa a URL absoluta do GitHub Pages e deve ser trocada se o
domínio mudar.

---

## Estrutura

```
ferreira-veiculos/
├── index.html              Home: hero, busca, destaques, serviços, loja, atendimento
├── estoque.html            Estoque com filtros, ordenação e estado vazio
├── veiculo.html            Detalhe do veículo (?id=<slug>), ficha, CTA e relacionados
├── financiamento.html      Passo a passo do financiamento + documentos/condições
├── avalie.html             Formulário "Avalie seu carro" (venda / troca / consignação)
├── contato.html            Canais, endereço, horário e mensagem pelo WhatsApp
├── privacidade.html        Política de privacidade (LGPD)
├── server.ps1              Servidor local na porta 8766
├── css/styles.css          Identidade e layout responsivo
├── js/dados.js             ⭐ LOJA (dados de contato) + VEICULOS (estoque)
├── js/main.js              Menu, header, animações, links de WhatsApp/telefone/mapa
├── js/busca.js             Busca rápida, filtros, ordenação e cartões de veículo
├── js/veiculo.js           Renderização da página de detalhe
├── js/formularios.js       Validação e envio dos formulários via WhatsApp
├── img/
│   ├── logo.svg                  Logotipo empilhado (fundo escuro) — usado no cabeçalho/rodapé
│   ├── logo-horizontal.svg       Variante horizontal
│   ├── logo-monocromatico.svg    Versão mono (carimbo/marca d'água)
│   ├── logo-fundo-claro.svg      Versão para fundo claro
│   ├── favicon.svg               Selo simplificado (favicon/avatar)
│   ├── veiculos/                 Fotos reais do estoque (640px, originais do Instagram da loja)
│   │   └── thumbs/               Miniaturas de 420px usadas nos cartões
│   ├── loja/fachada.jpg           Foto da fachada
│   └── referencia/               Recortes do logotipo original (material de estudo, não usado no site)
├── docs/PRD.md             Requisitos do produto
└── README.md               Este arquivo
```

---

## Identidade visual

| Item | Definição |
|---|---|
| Fundo | Preto suave `#0A0B0D` / grafite `#121417`–`#1E222A` |
| Destaque | Dourado `#E0B443` (claro `#F3D075`, escuro `#B8891A`) |
| Apoio | Prata `#C6CCD2`, branco `#F4F6F7`, cinza `#9BA3AB` |
| Tipografia | Títulos **Montserrat** (600–800) · Texto **Inter** · Slogan **Great Vibes** (uso pontual) |
| Logotipo | Emblema em traço curvo (telhado dourado, carroceria prata, filete dourado) + FERREIRA em prata metálica + VEÍCULOS em dourado |
| Slogan | "Aqui vendemos sonhos e fazemos amigos." |

Variantes do logotipo em `img/`: empilhada, horizontal, monocromática, fundo claro e favicon.
O cabeçalho usa o SVG embutido (assim a fonte Montserrat é aplicada corretamente).

---

## Como atualizar o estoque

Todo o estoque vive em **`js/dados.js`** — nenhum HTML precisa ser editado para
incluir, esconder ou alterar um carro.

```js
{
  id: 'fiat-argo-2020',            // usado na URL: veiculo.html?id=fiat-argo-2020
  marca: 'Fiat',
  modelo: 'Argo',
  versao: 'Drive 1.3',             // null => exibe "Consulte"
  ano: 2020,
  km: 58000,                       // null => "Consulte"
  cambio: 'Manual',                // null => "Consulte"
  combustivel: 'Flex',             // null => "Consulte"
  categoria: 'Hatch',              // Hatch | Sedã | SUV | Picape | Perua | Utilitário
  preco: 62900,                    // null => "Consulte"; em reais
  status: 'disponivel',            // disponivel | reservado | vendido
  selo: 'Novidade',                // 'Novidade' | 'Destaque' | null
  destaque: true,                  // aparece na home
  descricao: 'Texto do anúncio...',
  fotos: ['img/veiculos/fiat-argo-2020.jpg'],   // 1ª foto = capa
  capa: 'img/veiculos/thumbs/fiat-argo-2020.jpg',
  posicao: 'center 82%',           // opcional: recorte vertical do cartão/galeria
  atualizado: '2026-10-15',        // data mostrada no detalhe
  anuncio: 'https://www.instagram.com/p/XXXX/'  // link do anúncio original (opcional)
}
```

Regras automáticas:

- Só o `status: 'disponivel'` entra na listagem da home e do estoque;
  `reservado`/`vendido` saem da vitrine (e a página de detalhe mostra o aviso de
  indisponibilidade sem o botão de WhatsApp do anúncio).
- Filtros, ordenações, contadores, busca rápida e "relacionados" são gerados a partir
  do array — nada de páginas fixas.
- **Fotos**: adicione o arquivo em `img/veiculos/` (ideal: 1024px+, JPG) e gere uma
  miniatura de ~420px em `img/veiculos/thumbs/` para os cartões.
- **`posicao`** (opcional): fotos verticais ou com o carro fora do centro podem ser
  enquadradas com `object-position` (ex.: `'center 82%'` empura o recorte para baixo,
  `'center 20%'` para cima). Sem o campo, o recorte fica centralizado.

---

## Contato

Os dados de contato ficam no objeto `LOJA`, em `js/dados.js`:

| Campo | Valor atual |
|---|---|
| WhatsApp (todos os botões) | `5561991404475` → exibição `(61) 99140-4475` |
| Link curto do perfil do Instagram | `wa.me/message/S4Y6SXEYINUAM1` (guardado como referência) |
| Instagram | `instagram.com/ferreira_veiculos_go` |
| Endereço | Quadra 01, Lote 01 — Mansões Centroeste, Águas Lindas de Goiás/GO, CEP 72915-180 |
| Horário | Segunda a sábado, 8h às 18h (domingo fechado) |
| Mapa | busca do endereço no Google Maps |

As mensagens pré-preenchidas ficam em `MENSAGENS` (mesmo arquivo).

---

## Fontes das informações

Pesquisa feita em 15/10/2026:

- **Instagram** `@ferreira_veiculos_go` — bio (BR-070, ao lado da Honda, veículos seminovos),
  fotos e legendas dos anúncios, link curto do WhatsApp.
- **Fotos dos veículos**: download dos posts públicos da própria loja (12 posts),
  usados como fotos reais do estoque.
- **Fachada**: post da loja — confirma os serviços *Financiamento · Consignação · Troca*.
- **Cadastros públicos** (locaisdobrasil, usadosbr, exa.ai): endereço, CEP, telefone
  `(61) 99140-4475`, horário 8h–18h seg–sáb, slogan "Aqui vendemos sonhos e fazemos amigos".

---

## ⚠️ Configurar antes de publicar

Checklist de informações que **ainda dependem de confirmação da loja**:

- [ ] **Preço, quilometragem, câmbio, combustível e versão** de cada veículo — hoje
      aparecem como "Consulte" (nenhum valor foi inventado).
- [ ] **Disponibilidade**: anúncios de ago/2026 podem já ter sido vendidos; revisar o
      `status` de cada item em `js/dados.js`.
- [ ] **Endereço exato**: fontes divergem entre "Quadra 01, Lote 01" (Google/cadastros) e
      "QD 01, Lt 02" (usadosbr/CNPJ). Confirmar lote e, se possível, o ano de "desde"
      visível na fachada.
- [ ] **WhatsApp**: confirmar que o número `(61) 99140-4475` é o mesmo do link curto
      `wa.me/message/S4Y6SXEYINUAM1` da bio do Instagram.
- [ ] **Mais fotos por veículo** (interior, motor, detalhes) — hoje há 1 foto por carro,
      a capa do anúncio do Instagram.
- [ ] **Logotipo original em alta** (arquivo vetorial) para substituir o redesenho
      feito em SVG, se a loja preferir a arte original.
- [ ] **Avaliações/notas**: nenhum depoimento ou nota é exibido no site; só devem entrar
      com fonte autorizada.
- [ ] **CNPJ/razão social** no rodapé, quando confirmados.
- [ ] Ao publicar, trocar o `og:image` dos HTMLs pelo **URL absoluto** com o domínio final
      (hoje é caminho relativo) e testar o compartilhamento no WhatsApp/Facebook.

---

## Acessibilidade e SEO

- HTML semântico com `header/main/section/footer`, um único `h1` por página, `alt` em todas
  as imagens e `label` em todos os campos.
- Skip link ("Pular para o conteúdo"), foco visível dourado de 3px e contraste AA
  (texto claro sobre fundo escuro).
- Menu mobile com `aria-expanded`, fechamento por `Esc` e clique no link.
- `prefers-reduced-motion` desliga as animações de aparição.
- Meta description, `og:title/description/image`, `theme-color` e títulos únicos por página;
  a página de detalhe reescreve título/descrição dinamicamente.
- Navegação funciona apenas com teclado; os filtros são formulários reais.

---

## Consistência dos dados

Telefone, endereço, horário, Instagram e WhatsApp vêm de **um único lugar** (`LOJA` em
`js/dados.js`) e são injetados no cabeçalho, rodapé, botões flutuantes e páginas internas
pelo `main.js` — alterou ali, muda em todo o site.
