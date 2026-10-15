# PRD — Site da Ferreira Veículos

> Documento de requisitos do produto, base para a construção deste site.
> Revisão de referência: 15/10/2026.

---

## 1. Contexto

A Ferreira Veículos é uma revenda de veículos seminovos localizada em **Águas Lindas de
Goiás/GO**, na **BR-070, ao lado da Honda**. O Instagram `@ferreira_veiculos_go` já concentra
o estoque e o atendimento, mas o perfil não substitui um site: não permite busca por
criterios, páginas por veículo, textos institucionais e links de contato persistentes.

**Objetivo do site:** apresentar o estoque real da loja de forma pesquisável e converter
visitas em conversas de WhatsApp.

**Público:** compradores de carro usado/seminovo da região (Águas Lindas, Formosa, Planaltina
e entorno do Distrito Federal), que acessam principalmente pelo celular.

**Mensagens-chave:**
- "Seu próximo carro começa aqui."
- Slogan: "Aqui vendemos sonhos e fazemos amigos."

---

## 2. Identidade visual

| Elemento | Diretriz |
|---|---|
| Base | Grafite escuro / preto suave (fundo predominante) |
| Destaque | Dourado, tirado da referência do logotipo |
| Apoio | Prata/branco para o nome da marca e textos secundários |
| Tipografia | Sans-serif geométrica no corpo da interface |
| Slogan | Caligrafia elegante, usada com moderação (cabeçalho/rodapé) |
| Imagens | Fotos reais e sem filtros dos veículos da loja |

---

## 3. Logotipo (redesign)

Redesenhar preservando os elementos reconhecíveis da arte original:

1. **FERREIRA** em caixa alta, com acabamento metálico/prata;
2. **VEÍCULOS** em dourado, abaixo do nome;
3. **Silhueta de automóvel em traço curvo**, com detalhes prata e dourado.

Variações obrigatórias:

- **Empilhada** (padrão, fundo escuro);
- **Horizontal** (cabeçalhos estreitos, papel timbrado);
- **Monocromática** (carimbo, marca d'água em fotos, fundos simples);
- **Fundo claro**;
- **Favicon/avatar simplificado** (só o emblema + inicial), usado em aba do navegador,
  miniaturas de rede social e marca d'água.

---

## 4. Estrutura das páginas

### 4.1 Página inicial
1. **Cabeçalho fixo** com logotipo, navegação e botão de WhatsApp.
2. **Hero** — "Seu próximo carro começa aqui." + texto de apoio + chamadas para estoque
   e WhatsApp + foto real de veículo/composição.
3. **Busca de veículos** — marca, modelo, faixa de preço e categoria.
4. **Destaques** — grade com veículos selecionados.
5. **Serviços** — compra e venda, financiamento, consignação, troca/avaliação
   (confirmados na fachada da loja).
6. **Confiança e atendimento** — apresentação da loja, endereço, horário, avaliações
   (somente com fonte autorizada) e atalhos para Instagram, telefone e WhatsApp.
7. **Rodapé** — navegação, contato, endereço, horário e política de privacidade.

### 4.2 Página de estoque
- Lista completa dos veículos disponíveis.
- Filtros: marca, modelo, faixa de preço e categoria + ordenação.
- Ordenação por relevância, preço, ano e quilometragem.
- Estado vazio amigável, com sugestão de conversa no WhatsApp.

### 4.3 Página de detalhe do veículo (`veiculo.html?id=…`)
- Galeria de fotos reais.
- Ficha técnica (marca, modelo, versão, ano, km, câmbio, combustível, categoria).
- Preço e selo de situação (disponível/reservado/vendido).
- **Chamada para WhatsApp com mensagem pré-preenchida citando o veículo.**
- Veículos relacionados.
- Estado de "veículo não encontrado".

### 4.4 Avalie seu carro
- Formulário: nome, telefone, marca, modelo, ano, quilometragem, observações,
  envio opcional de fotos e consentimento de contato.
- Envio: monta a mensagem e abre a conversa do WhatsApp da loja (site sem backend).

---

## 5. Funcionalidades

- Exibir **apenas veículos disponíveis** (`status: 'disponivel'`); reservados e vendidos
  saem da vitrine.
- Busca e filtros funcionais (marca, modelo, faixa de preço, categoria) com ordenação.
- Cada veículo com página própria e CTA de WhatsApp pré-preenchido.
- **Estoque editável sem reconstruir páginas** — todo o conteúdo em um único arquivo de
  dados JavaScript.
- Otimização de imagens (miniaturas para cartões, `loading="lazy"`, dimensões declaradas).
- Links de Instagram, telefone e mapa funcionais, após validação.
- Responsividade completa (celular, tablet e desktop).
- Botão flutuante de WhatsApp em todas as páginas.

---

## 6. Conteúdo e fotos

- As fotos devem ser **reais, do estoque da Ferreira Veículos**, sem filtros e sem
  atribuir imagens de outras revendas ou de banco de imagens ao nosso estoque.
- Preços, anos, quilometragens e disponibilidade só podem ser publicados quando
  **confirmados pela loja**.
- Dados de contato (telefone, WhatsApp, endereço, horário) consistentes em todas as páginas.

---

## 7. Requisitos de qualidade

- Layout responsivo e consistente.
- Contraste mínimo AA nos textos.
- Navegação completa por teclado, com foco visível.
- Textos alternativos (`alt`) em todas as imagens.
- Metadados SEO e de compartilhamento social (title, description, og:image/título/descrição).
- Conformidade com a LGPD: aviso de privacidade, consentimento nos formulários e
  finalidade clara de uso dos dados.
- Animações respeitando `prefers-reduced-motion`.

---

## 8. Informações pendentes (bloqueiam o fechamento do escopo)

- Cidade, endereço completo e lote da loja.
- Telefone/WhatsApp oficial (e se o link curto da bio aponta para o mesmo número).
- Horário de funcionamento.
- Serviços efetivamente oferecidos.
- Forma de atualização do estoque pela equipe.
- Fotos atuais dos carros (mínimo: capa + interior de cada anúncio).
- Logotipo original em alta resolução.

---

## 9. Métricas de sucesso

- Cliques em "Buscar veículos", filtros e ordenação.
- Cliques em botões de WhatsApp por veículo e globais.
- Conversas iniciadas a partir do site (mensagens pré-preenchidas facilitam o rastreio).
- Menor taxa de saída nas páginas de detalhe.

---

## 10. Critérios de aceite

- [x] Logotipo atualizado reconhecível (FERREIRA prata + VEÍCULOS dourado + emblema curvo).
- [x] Home com busca, destaques, serviços e contato.
- [x] Estoque filtrável com páginas de detalhe por veículo.
- [x] Botões de contato funcionais após validação dos dados (WhatsApp, telefone, Instagram, mapa).
- [x] Fotos reais e autorizadas da loja (posts públicos do próprio Instagram).
- [x] Site responsivo no celular e no desktop.
- [ ] Preços, quilometragens, disponibilidade, endereço, telefone e horário
      **confirmados e preenchidos pela loja** (hoje: "Consulte" no estoque).
