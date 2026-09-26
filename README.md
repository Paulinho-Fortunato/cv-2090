# 🎨 CV Builder - Construtor de Currículo Profissional

Construtor de currículo profissional online com 6 templates (incluindo personalizável com drag-and-drop), preview ao vivo, geração de PDF, análise ATS, IA integrada e muito mais.

## 🚀 Deploy na Vercel

### Método 1: Deploy Automático via GitHub (Recomendado)

1. **Faça push para o GitHub**
   ```bash
   git init
   git add .
   git commit -m "CV Builder - Pronto para deploy"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/cv-builder.git
   git push -u origin main
   ```

2. **Conecte com Vercel**
   - Acesse: https://vercel.com/new
   - Importe o repositório
   - Clique em "Deploy"
   - Aguarde 2-3 minutos

3. **Configure a API Key (Opcional)**
   - Vá em Settings → Environment Variables
   - Adicione: `VITE_OPENROUTER_API_KEY`
   - Cole sua chave da OpenRouter
   - Clique em "Save"
   - Faça redeploy

### Método 2: Deploy via Vercel CLI

```bash
# Instale a Vercel CLI
npm i -g vercel

# Faça login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

## 🌐 URLs

- **Landing Page**: `https://seu-projeto.vercel.app/`
- **Builder**: `https://seu-projeto.vercel.app/#/builder`

**Importante**: Como usamos HashRouter, as URLs usam `/#/` antes do caminho.

## 📦 Instalação Local

```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/cv-builder.git
cd cv-builder

# Instale as dependências
npm install

# Rode em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🎯 Funcionalidades Principais

### Core
- ✅ 6 templates profissionais (Moderno, Executivo, Tech, Compacto, Criativo, Personalizado)
- ✅ Template personalizável com drag-and-drop
- ✅ Preview ao vivo
- ✅ Download em PDF
- ✅ Impressão direta
- ✅ QR Code para compartilhamento
- ✅ Exportar/Importar JSON
- ✅ Auto-save em tempo real
- ✅ Undo/Redo (Ctrl+Z / Ctrl+Y)
- ✅ Múltiplos currículos

### IA (OpenRouter)
- ✅ Sugestões de melhoria com IA
- ✅ Gerador de carta de apresentação
- ✅ Múltiplos modelos (GPT-4, Claude, Llama, etc.)
- ✅ Modelos gratuitos disponíveis

### Analytics
- ✅ Dashboard de estatísticas
- ✅ Histórico de downloads
- ✅ Score ATS
- ✅ Template mais usado
- ✅ Análise de palavras-chave para ATS

### Dados Pessoais (29 campos)
- ✅ Adaptado para Angola 🇦🇴
- ✅ Telefone: +244
- ✅ Moeda: Kwanza (Kz)
- ✅ Português angolano
- ✅ Cidades e províncias angolanas

### UX/UI
- ✅ Tour guiado para novos usuários
- ✅ Drag-and-drop real para reordenar
- ✅ Preview em tela cheia
- ✅ Animações de transição entre templates
- ✅ Modo de comparação de versões
- ✅ Compressão de imagens

### Performance
- ✅ Bundle otimizado (555 KB)
- ✅ PDF renderer lazy-loaded
- ✅ Service Worker (PWA)
- ✅ Cache otimizado
- ✅ Virtualização de listas

### Responsividade
- ✅ Mobile-first
- ✅ Desktop otimizado
- ✅ 6 templates responsivos
- ✅ Dark mode
- ✅ Gestos touch

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
# OpenRouter API Key (opcional)
VITE_OPENROUTER_API_KEY=sk-or-v1-sua-chave-aqui
```

**Para Vercel:**
1. Vá em Settings → Environment Variables
2. Adicione `VITE_OPENROUTER_API_KEY`
3. Cole sua chave
4. Clique em "Save"
5. Faça redeploy

### Obter API Key da OpenRouter

1. Acesse: https://openrouter.ai/keys
2. Faça login
3. Clique em "Create Key"
4. Copie a chave (sk-or-v1-...)

## 🎨 Templates Disponíveis

1. **Moderno** - Design clean e profissional
2. **Executivo** - Formal e corporativo
3. **Tech/Dev** - Visual de IDE/código
4. **Compacto** - Uma página, denso
5. **Criativo** - Colorido e ousado
6. **✨ Personalizado** - Arraste e personalize (drag-and-drop)

## 🌍 Multi-idioma

- ✅ Português (PT)
- ✅ Inglês (EN)
- ✅ Espanhol (ES)

## 🇦🇴 Adaptado para Angola

- Dados padrão: Luanda, Angola
- Telefone: +244
- Moeda: Kwanza (Kz)
- Português angolano
- Cidades e províncias angolanas

## 📊 Build

```bash
# Build para produção
npm run build

# Resultado:
# dist/index.html                    4.11 kB
# dist/assets/index.css             64.92 kB (gzip: 10.35 kB)
# dist/assets/index.js             555.19 kB (gzip: 156.01 kB)
# dist/assets/react-pdf.browser.js 1,247.66 kB (lazy-loaded)
```

## 🛠️ Stack Tecnológica

- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS 4
- **State**: Zustand com persist
- **Forms**: React Hook Form + Zod
- **PDF**: @react-pdf/renderer
- **Icons**: Lucide React
- **Routing**: React Router DOM (HashRouter)
- **IA**: OpenRouter API
- **Analytics**: Zustand store
- **Drag-and-Drop**: @dnd-kit
- **Animações**: Framer Motion

## 📚 Documentação

- [Guia de Deploy](docs/DEPLOY.md)
- [Guia da IA](docs/GUIA_OPENROUTER.md)
- [Configuração Vercel](docs/CONFIGURACAO_VERCEL.md)
- [Template Personalizado](TEMPLATE_PERSONALIZADO.md)
- [Tour Melhorado](TOUR_MELHORADO.md)
- [Correções UX](CORRECOES_UX.md)

## 🔒 Privacidade

- ✅ Dados salvos apenas no navegador (localStorage)
- ✅ API Key armazenada localmente
- ✅ Não enviamos dados para servidores
- ✅ Zero login necessário

## 📈 Performance

- **Bundle Principal**: 555.19 KB (gzip: 156.01 KB)
- **PDF Renderer**: 1,247.66 KB (lazy-loaded)
- **CSS**: 64.92 KB (gzip: 10.35 KB)
- **Build Time**: ~13s
- **Lighthouse Score**: 95+ (estimado)

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Enviar pull requests
- Melhorar a documentação

## 📄 Licença

MIT

## 📞 Suporte

- **Issues**: GitHub Issues
- **Email**: seu-email@exemplo.ao
- **Documentação**: Veja a pasta `docs/`

---

**Status**: ✅ Pronto para produção

**Deploy**: Configurado para Vercel

**Build**: Otimizado e funcional

**Feito com ❤️ em Angola** 🇦🇴

## 🚀 Deploy na Vercel

### Método 1: Deploy Automático via GitHub (Recomendado)

1. **Faça push para o GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/cv-builder.git
   git push -u origin main
   ```

2. **Conecte com Vercel**
   - Acesse: https://vercel.com/new
   - Importe o repositório do GitHub
   - Clique em "Deploy"
   - Aguarde o build (2-3 minutos)

3. **Configure a API Key (Opcional)**
   - Vá em Settings → Environment Variables
   - Adicione: `VITE_OPENROUTER_API_KEY`
   - Cole sua chave da OpenRouter
   - Clique em "Save"
   - Faça redeploy

### Método 2: Deploy via Vercel CLI

```bash
# Instale a Vercel CLI
npm i -g vercel

# Faça login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

## 📦 Instalação Local

```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/cv-builder.git
cd cv-builder

# Instale as dependências
npm install

# Rode em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🌐 URLs

- **Landing Page**: `https://seu-projeto.vercel.app/` ou `https://seu-projeto.vercel.app/#/`
- **Builder**: `https://seu-projeto.vercel.app/#/builder`

**Importante**: Como usamos HashRouter, as URLs usam `/#/` antes do caminho.

## 🎯 Funcionalidades

### Core
- ✅ 5 templates profissionais (Moderno, Executivo, Tech, Compacto, Criativo)
- ✅ Preview ao vivo
- ✅ Download em PDF
- ✅ Impressão direta
- ✅ QR Code para compartilhamento
- ✅ Exportar/Importar JSON
- ✅ Auto-save em tempo real
- ✅ Undo/Redo (Ctrl+Z / Ctrl+Y)

### IA (OpenRouter)
- ✅ Sugestões de melhoria com IA
- ✅ Gerador de carta de apresentação
- ✅ Múltiplos modelos (GPT-4, Claude, Llama, etc.)
- ✅ Modelos gratuitos disponíveis

### Analytics
- ✅ Dashboard de estatísticas
- ✅ Histórico de downloads
- ✅ Score ATS
- ✅ Template mais usado

### Dados Pessoais (Angola)
- ✅ 29 campos de dados pessoais
- ✅ Adaptado para Angola
- ✅ Telefone: +244
- ✅ Moeda: Kwanza (Kz)
- ✅ Português angolano

### Responsividade
- ✅ Mobile-first
- ✅ Desktop otimizado
- ✅ 5 templates responsivos
- ✅ Dark mode

### Performance
- ✅ Bundle: 290 KB (gzip: 79 KB)
- ✅ PDF renderer: 1,247 KB (lazy-loaded)
- ✅ Service Worker (PWA)
- ✅ Cache otimizado

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
# OpenRouter API Key (opcional)
VITE_OPENROUTER_API_KEY=sk-or-v1-sua-chave-aqui
```

**Para Vercel:**
1. Vá em Settings → Environment Variables
2. Adicione `VITE_OPENROUTER_API_KEY`
3. Cole sua chave
4. Clique em "Save"
5. Faça redeploy

### Obter API Key da OpenRouter

1. Acesse: https://openrouter.ai/keys
2. Faça login
3. Clique em "Create Key"
4. Copie a chave (sk-or-v1-...)
5. Adicione no Vercel

## 📊 Build

```bash
# Build para produção
npm run build

# Resultado:
# dist/index.html                    4.11 kB
# dist/assets/index.css             44.34 kB (gzip: 8.11 kB)
# dist/assets/index.js             290.41 kB (gzip: 79.32 kB)
# dist/assets/react-pdf.browser.js 1,247.66 kB (lazy-loaded)
```

## 🎨 Templates

1. **Moderno** - Design clean e profissional
2. **Executivo** - Formal e corporativo
3. **Tech/Dev** - Visual de IDE/código
4. **Compacto** - Uma página, denso
5. **Criativo** - Colorido e ousado

## 🌍 Multi-idioma

- ✅ Português (PT)
- ✅ Inglês (EN)
- ✅ Espanhol (ES)

## 🇦🇴 Adaptado para Angola

- Dados padrão: Luanda, Angola
- Telefone: +244
- Moeda: Kwanza (Kz)
- Português angolano
- Cidades e províncias angolanas

## 📱 PWA

O app pode ser instalado como PWA:
- ✅ Service Worker configurado
- ✅ Manifest.json
- ✅ Funciona offline
- ✅ Instalável em mobile

## 🔒 Privacidade

- ✅ Dados salvos apenas no navegador (localStorage)
- ✅ API Key armazenada localmente
- ✅ Não enviamos dados para servidores
- ✅ Zero login necessário

## 📚 Documentação

- [Guia de Deploy](docs/DEPLOY.md)
- [Guia da IA](docs/GUIA_OPENROUTER.md)
- [Configuração Vercel](docs/CONFIGURACAO_VERCEL.md)
- [Adaptação Angola](ADAPTACAO_ANGOLA.md)

## 🛠️ Stack Tecnológica

- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS 4
- **State**: Zustand com persist
- **Forms**: React Hook Form + Zod
- **PDF**: @react-pdf/renderer
- **Icons**: Lucide React
- **Routing**: React Router DOM (HashRouter)
- **IA**: OpenRouter API
- **Analytics**: Zustand store

## 📈 Performance

- **Bundle Principal**: 290 KB (gzip: 79 KB)
- **PDF Renderer**: 1,247 KB (lazy-loaded)
- **CSS**: 44 KB (gzip: 8 KB)
- **Build Time**: ~7s
- **Lighthouse Score**: 95+ (estimado)

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Enviar pull requests
- Melhorar a documentação

## 📄 Licença

MIT

## 📞 Suporte

- **Issues**: GitHub Issues
- **Email**: seu-email@exemplo.ao
- **Documentação**: Veja a pasta `docs/`

---

**Status**: ✅ Pronto para produção

**Deploy**: Configurado para Vercel

**Build**: Otimizado e funcional

**Feito com ❤️ em Angola** 🇦🇴
