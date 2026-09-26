# CV Builder - Construtor de Currículo Profissional

Construtor de currículo online gratuito com 4 templates profissionais, preview ao vivo, download em PDF, pontuação ATS e suporte a 3 idiomas.

## 🚀 Deploy na Vercel

O projeto está configurado para deploy automático na Vercel.

### Opção 1: Deploy via GitHub (Recomendado)

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "Add New Project"
4. Importe o repositório do GitHub
5. A Vercel detectará automaticamente o Vite
6. Clique em "Deploy"

### Opção 2: Deploy via Vercel CLI

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

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Type checking
npm run typecheck
```

## 🛠️ Stack Tecnológica

- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS 4
- **State**: Zustand com persist (localStorage)
- **Forms**: React Hook Form + Zod
- **PDF**: @react-pdf/renderer (lazy-loaded)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **i18n**: Sistema customizado (PT, EN, ES)

## ✨ Funcionalidades

### Core
- ✅ Zero login - tudo funciona sem cadastro
- ✅ Auto-save em tempo real (debounce 500ms)
- ✅ Preview ao vivo enquanto edita
- ✅ Download em PDF com texto selecionível
- ✅ Impressão direta (window.print)
- ✅ Exportar/Importar JSON
- ✅ Compartilhamento via URL (Base64)

### Templates
- 🎨 4 templates profissionais (Moderno, Clássico, Minimalista, Criativo)
- 🌓 Modo escuro com persistência
- 🌐 3 idiomas (Português, Inglês, Espanhol)

### UX/UI
- 📱 Design responsivo (mobile-first)
- 🎯 Barra de progresso de completude
- 🏆 Pontuação ATS (0-100)
- 💡 Dicas contextuais (tooltips)
- 📸 Upload de foto de perfil
- 🔄 Drag-and-drop para reordenar seções
- 🔔 Sistema de notificações (toast)

### Seções do Currículo
- 👤 Dados Pessoais (com foto, website, LinkedIn, GitHub)
- 💼 Experiência Profissional
- 🎓 Formação Acadêmica
- 📁 Projetos/Portfolio
- 🏅 Habilidades (com sugestões populares)

### SEO & Performance
- 🔍 Meta tags otimizadas (OG, Twitter Card)
- 📊 Schema.org structured data (WebApplication, FAQPage)
- 📱 PWA ready (manifest.json)
- ⚡ Code-splitting (bundle principal: 258KB)
- 🚀 Lazy loading do PDF renderer

### Monetização
- 💰 Espaços para Google AdSense
- 📧 Newsletter para captura de leads
- 🎯 Posicionamento estratégico de anúncios

## 📁 Estrutura do Projeto

```
cv-builder/
├── public/
│   └── manifest.json          # PWA manifest
├── src/
│   ├── components/
│   │   ├── ads/
│   │   │   ├── AdBanner.tsx   # Componente de anúncio
│   │   │   └── DownloadModal.tsx  # Modal de download com ATS
│   │   ├── builder/
│   │   │   ├── Sidebar.tsx    # Menu lateral com progresso
│   │   │   ├── Preview.tsx    # Preview ao vivo (4 templates)
│   │   │   └── forms/
│   │   │       ├── BasicsForm.tsx
│   │   │       ├── ExperienceForm.tsx
│   │   │       ├── EducationForm.tsx
│   │   │       ├── ProjectsForm.tsx
│   │   │       └── SkillsForm.tsx
│   │   └── ui/
│   │       └── Toast.tsx      # Sistema de notificações
│   ├── hooks/
│   │   └── useAutoSave.ts     # Hook de auto-save
│   ├── lib/
│   │   └── store.ts           # Zustand store com persist
│   ├── pages/
│   │   ├── LandingPage.tsx    # Landing page SEO
│   │   └── BuilderPage.tsx    # Editor do currículo
│   ├── types/
│   │   └── resume.ts          # Tipos + i18n
│   ├── App.tsx                # Router
│   ├── main.tsx               # Entry point
│   └── index.css              # Tailwind + animações
├── index.html                 # HTML com SEO + Schema.org
├── vercel.json                # Configuração Vercel
└── package.json
```

## 🎨 Paleta de Cores

- **Primary**: Blue 600 (#2563eb)
- **Background Light**: Gray 50 (#f9fafb)
- **Background Dark**: Gray 900 (#111827)
- **Text**: Gray 900 (#111827) / Gray 100 (#f3f4f6)
- **Muted**: Gray 500 (#6b7280)

## 📊 Métricas de Performance

- **Bundle Principal**: 258 KB (gzip: 73 KB)
- **PDF Renderer**: 1,247 KB (lazy-loaded, só carrega quando necessário)
- **CSS**: 28 KB (gzip: 6 KB)
- **Lighthouse Score**: 95+ (estimado)

## 🔧 Configuração

### localStorage
- **Chave**: `cv-builder-storage`
- **Dados salvos**: Todo o currículo + preferências (tema, idioma, template)

### Environment Variables
Não requer variáveis de ambiente. Funciona 100% no frontend.

## 📝 Próximos Passos (Opcionais)

1. **Backend para newsletter** - Integrar com Mailchimp/SendGrid
2. **Analytics** - Google Analytics / Plausible
3. **Mais templates** - Expandir para 8-10 templates
4. **Cover letter builder** - Criador de carta de apresentação
5. **LinkedIn import** - Importar dados do LinkedIn
6. **AI suggestions** - Sugestões de texto com IA
7. **Video resume** - Upload de vídeo de apresentação

## 📄 Licença

MIT

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no GitHub.

---

**Status**: ✅ Pronto para produção

**Deploy**: Configurado para Vercel (deploy automático via GitHub)

**Performance**: Bundle otimizado com code-splitting
