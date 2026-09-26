# 🔧 Troubleshooting - Página em Branco

## ✅ Correções Aplicadas

### 1. Error Boundary Adicionado
Adicionei um Error Boundary para capturar erros de runtime e mostrar uma mensagem amigável ao invés de tela branca.

**Arquivo**: `src/components/ErrorBoundary.tsx`

### 2. DownloadModal Simplificado
Removi o import estático do `@react-pdf/renderer` e agora uso dynamic import apenas quando o usuário clica em "Baixar PDF". Isso evita problemas de inicialização.

**Arquivo**: `src/components/ads/DownloadModal.tsx`

### 3. HashRouter Configurado
Mudei de BrowserRouter para HashRouter para evitar problemas de roteamento em SPAs.

**Arquivo**: `src/App.tsx`

### 4. Vite Config Atualizado
Adicionei `base: './'` para garantir que os assets sejam carregados corretamente.

**Arquivo**: `vite.config.js`

## 📊 Resultado do Build

```
dist/index.html                                4.11 kB
dist/assets/index-Cbu3X3wT.css                28.65 kB
dist/assets/index-bChPpq-W.js                260.17 kB  ← Bundle principal (leve!)
dist/assets/react-pdf.browser-wAxdtQ8f.js  1,247.66 kB  ← PDF (carregado sob demanda)
```

## 🚀 Como Testar

### 1. Limpe o Cache do Navegador
- Pressione `Ctrl + Shift + R` (Windows/Linux) ou `Cmd + Shift + R` (Mac)
- Ou abra em aba anônima

### 2. Acesse as URLs Corretas
- Landing Page: `https://cv-2090.vercel.app/`
- Builder: `https://cv-2090.vercel.app/#/builder`

### 3. Verifique o Console do Navegador
- Pressione `F12` para abrir o DevTools
- Vá na aba "Console"
- Procure por erros em vermelho

## 🐛 Se Ainda Estiver em Branco

### Passo 1: Verifique se há erros no console
Abra o console do navegador (F12) e veja se há alguma mensagem de erro.

### Passo 2: Verifique se o Error Boundary está funcionando
Se o Error Boundary estiver funcionando, você verá uma tela com:
- Ícone de alerta
- Mensagem "Ops! Algo deu errado"
- Botão "Recarregar Página"

### Passo 3: Teste localmente
```bash
# Clone o repositório
git clone https://github.com/Paulinho-Fortunato/cv-2090.git
cd cv-2090

# Instale as dependências
npm install

# Rode em desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

### Passo 4: Verifique o deploy na Vercel
1. Vá em [vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique no seu projeto
3. Vá em "Deployments"
4. Clique no último deploy
5. Veja os logs de build
6. Procure por erros

### Passo 5: Forçe um novo deploy
```bash
# Faça uma mudança mínima
echo "# test" >> README.md

# Commit e push
git add .
git commit -m "test: force new deploy"
git push origin main
```

## 🔍 Possíveis Causas

### 1. Cache do Navegador
**Solução**: Limpe o cache ou use aba anônima

### 2. DNS não propagado
**Solução**: Aguarde alguns minutos ou use outro navegador

### 3. Erro no JavaScript
**Solução**: Verifique o console do navegador (F12)

### 4. Problema com o @react-pdf/renderer
**Solução**: Já foi corrigido com dynamic import

### 5. Problema com o Zustand persist
**Solução**: Limpe o localStorage
```javascript
localStorage.clear();
```

## 📞 Suporte

Se o problema persistir, abra uma issue no GitHub com:
1. URL do deploy
2. Screenshot do console do navegador (F12)
3. Screenshot da tela em branco
4. Logs de build da Vercel

## 🎯 Checklist Final

- [x] Error Boundary adicionado
- [x] DownloadModal simplificado
- [x] HashRouter configurado
- [x] Vite config atualizado
- [x] Build funcionando (260KB)
- [x] PDF carregado sob demanda
- [ ] Deploy na Vercel
- [ ] Testar em produção

## 📝 Próximos Passos

1. Faça commit e push das mudanças
2. Aguarde o deploy na Vercel
3. Teste as URLs:
   - `https://cv-2090.vercel.app/`
   - `https://cv-2090.vercel.app/#/builder`
4. Se ainda estiver em branco, verifique o console (F12)
5. Reporte o erro com screenshots

---

**Status**: ✅ Pronto para deploy com todas as correções aplicadas
