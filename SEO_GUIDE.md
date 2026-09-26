# 📊 Guia SEO e Google Search Console - CV Builder

## 🎯 Objetivos
- Aumentar visibilidade no Google
- Melhorar posicionamento para palavras-chave de currículo
- Geo-targeting para Brasil e países de língua portuguesa
- Monitorar tráfego e performance

---

## 📝 Parte 1: Google Search Console

### 1.1 Adicionar Site

1. Acesse [Google Search Console](https://search.google.com/search-console)
2. Clique em **"Adicionar propriedade"**
3. Selecione **"URL prefix"** (mais simples)
4. Digite: `https://cv-2090.vercel.app`
5. Clique em **"Continuar"**

### 1.2 Verificar Propriedade

Escolha um método (recomendado: **Arquivo HTML**):

#### Método 1: Tag HTML (Mais Rápido)
1. Copie a meta tag fornecida
2. Cole no `<head>` do arquivo `index.html`:
   ```html
   <meta name="google-site-verification" content="SEU_CÓDIGO_AQUI" />
   ```
3. Faça push para o repositório
4. Vercel vai fazer deploy automaticamente
5. Volte ao Search Console e clique **"Verificar"**

#### Método 2: Arquivo HTML
1. Baixe o arquivo HTML
2. Coloque em `public/google_verification_file.html`
3. Push para o repositório
4. Clique "Verificar"

### 1.3 Enviar Sitemap

1. Após verificação, no menu esquerdo, clique em **"Sitemaps"**
2. Adicione: `https://cv-2090.vercel.app/sitemap.xml`
3. Clique em **"Enviar"**

---

## 🌍 Parte 2: Otimizações SEO e Geo-Targeting

### 2.1 Estrutura de Arquivos para Criar

Você precisa adicionar esses arquivos ao projeto:

```
public/
├── robots.txt
├── sitemap.xml
└── sitemap-pt-br.xml
```

### 2.2 Implementações

#### ✅ robots.txt
Arquivo que indica aos buscadores quais páginas indexar.

#### ✅ sitemap.xml
Mapa do site em formato XML.

#### ✅ Otimizações no index.html
- Adicionar og:image para redes sociais
- Adicionar alternativas de idioma
- Melhorar structured data

#### ✅ Geo-targeting
- Adicionar hreflang para PT-BR e PT
- Configurar geo-meta tags
- Orientar para público brasileiro e português

---

## 🔍 Parte 3: Palavras-Chave por Região

### Brasil (pt-BR)
- criar currículo online
- construtor de currículo grátis
- cv builder português
- currículo em PDF
- modelo de currículo profissional
- ATS score currículo
- fazer currículo fácil
- currículo sem login
- template currículo
- curriculum vitae online

### Portugal (pt)
- construir CV online
- gerador de CV gratuito
- CV builder português
- modelo de currículo
- CV profissional
- download CV PDF
- ATS score CV
- fazer CV fácil

### Espanha (es)
- crear CV online
- generador de currículum
- plantilla de CV
- descargar currículum PDF
- CV profesional
- curriculum vitae online

---

## 📈 Parte 4: Métricas para Monitorar

No Google Search Console, monitore:

1. **Cliques** - Quantas pessoas clicaram no seu site
2. **Impressões** - Quantas vezes apareceu nos resultados
3. **CTR (Click-Through Rate)** - Taxa de cliques
4. **Posição Média** - Posição nos resultados
5. **Cobertura** - Quantas páginas foram indexadas
6. **Desempenho Mobile** - Performance no celular

### Metas Iniciais:
- 100 cliques/mês em 30 dias
- 500 cliques/mês em 90 dias
- 2000 cliques/mês em 180 dias

---

## 🚀 Parte 5: Estratégia de Conteúdo

### Blog Posts Sugeridos

1. **"Como Criar um Currículo que Passa em Sistemas ATS"**
   - Palavras-chave: ATS, sistema de rastreamento
   - Link interno: página do CV Builder

2. **"Melhor Plataforma para Criar Currículo Online Grátis em 2024"**
   - Palavras-chave: plataforma currículo, grátis
   - Comparação com concorrentes

3. **"Templates de Currículo Profissional Personalizáveis"**
   - Palavras-chave: template, modelo
   - Showcase dos templates do CV Builder

4. **"Guia Completo: Como Preencher um Currículo Profissional"**
   - Palavras-chave: preencher, estrutura
   - Educativo

### Links Internos Estratégicos
- Usar em blog posts
- Usar em descrições de recursos
- Usar em CTAs

---

## 🎨 Parte 6: Social Media & Backlinks

### Estratégia de Backlinks
1. Contatar blogs sobre emprego/carreiras
2. Mencionar em fóruns como Reddit
3. Responder perguntas no Quora
4. Parcerias com plataformas de emprego

### Social Media
- Instagram: dicas de currículo
- LinkedIn: conteúdo profissional
- Twitter: atualizações de features
- TikTok: tutoriais rápidos

---

## 📋 Checklist de Implementação

- [ ] Adicionar site ao Google Search Console
- [ ] Verificar propriedade com meta tag
- [ ] Criar e enviar robots.txt
- [ ] Criar e enviar sitemap.xml
- [ ] Adicionar Google Analytics 4
- [ ] Adicionar og:image (social cards)
- [ ] Implementar hreflang para pt-BR/pt/es
- [ ] Adicionar geo-targeting meta tags
- [ ] Monitorar Search Console diariamente (primeiros 30 dias)
- [ ] Criar blog/artigos
- [ ] Configurar CTAs internos
- [ ] Monitorar Core Web Vitals

---

## 🔗 Links Úteis

- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics 4](https://analytics.google.com)
- [Google PageSpeed Insights](https://pagespeed.web.dev)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Schema.org](https://schema.org)
- [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool)

---

## 💡 Próximos Passos

1. Implementar os arquivos (robots.txt, sitemap.xml)
2. Adicionar og:image
3. Configurar Google Analytics 4
4. Enviar para Google Search Console
5. Monitorar por 30 dias
6. Iterar baseado em dados

