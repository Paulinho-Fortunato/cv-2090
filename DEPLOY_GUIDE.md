# 🚀 Guia Completo de Deploy - CV Builder

## ✅ Checklist Pré-Deploy

### 1. Verificar Build Local
```bash
npm run build
```

**Resultado esperado:**
```
✓ 1923 modules transformed.
dist/index.html                                4.11 kB
dist/assets/index.css             64.92 kB │ gzip: 10.35 kB
dist/assets/index.js             555.19 kB │ gzip: 156.01 kB
✓ built in 13.65s
```

### 2. Verificar Arquivos Necessários
- ✅ `vercel.json` - Configuração do Vercel
- ✅ `.gitignore` - Ignorar arquivos desnecessários
- ✅ `README.md` - Documentação atualizada
- ✅ `package.json` - Dependências corretas
- ✅ `vite.config.js` - Configuração do Vite

### 3. Testar Localmente
```bash
npm run dev
```

Acesse:
- Landing Page: `http://localhost:3000/`
- Builder: `http://localhost:3000/#/builder`

---

## 📦 Deploy na Vercel

### Método 1: Via GitHub (Recomendado)

#### Passo 1: Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Nome: `cv-builder`
3. Visibilidade: Public ou Private
4. **NÃO** inicialize com README
5. Clique em "Create repository"

#### Passo 2: Push para o GitHub

```bash
# Inicialize o git (se ainda não fez)
git init

# Adicione todos os arquivos
git add .

# Commit inicial
git commit -m "CV Builder - Pronto para deploy"

# Renomeie a branch para main
git branch -M main

# Adicione o remote (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/cv-builder.git

# Push para o GitHub
git push -u origin main
```

#### Passo 3: Conectar com Vercel

1. Acesse: https://vercel.com/new
2. Clique em "Import Git Repository"
3. Selecione seu repositório `cv-builder`
4. Configure:
   - **Framework Preset**: Vite (detectado automaticamente)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Clique em "Deploy"
6. Aguarde 2-3 minutos
7. ✅ Pronto! Você receberá uma URL como: `https://cv-builder-xxx.vercel.app`

#### Passo 4: Configurar API Key (Opcional)

Se quiser usar a IA:

1. Obtenha API Key: https://openrouter.ai/keys
2. No dashboard da Vercel:
   - Selecione seu projeto
   - Vá em **Settings** → **Environment Variables**
3. Adicione nova variável:
   - **Name**: `VITE_OPENROUTER_API_KEY`
   - **Value**: `sk-or-v1-sua-chave-aqui`
   - **Environment**: ✅ Production ✅ Preview ✅ Development
4. Clique em **Save**
5. Vá em **Deployments**
6. Clique nos 3 pontos do último deployment
7. Selecione **Redeploy**
8. Aguarde o build

---

### Método 2: Via Vercel CLI

#### Passo 1: Instalar Vercel CLI

```bash
npm i -g vercel
```

#### Passo 2: Fazer Login

```bash
vercel login
```

Siga as instruções para autenticar.

#### Passo 3: Deploy

```bash
# Navegue até a pasta do projeto
cd cv-builder

# Deploy
vercel
```

Siga as instruções:
```
? Set up and deploy "~\cv-builder"? [Y/n] Y
? Which scope do you want to deploy to? (selecione seu usuário)
? Link to existing project? [y/N] N
? What's your project's name? cv-builder
? In which directory is your code located? ./
? Want to override the settings? [y/N] N
```

#### Passo 4: Deploy para Produção

```bash
vercel --prod
```

---

## 🔍 Verificar o Deploy

### Testar as URLs

1. **Landing Page**: `https://seu-projeto.vercel.app/`
2. **Builder**: `https://seu-projeto.vercel.app/#/builder`

### Checklist de Testes

- [ ] Landing page carrega corretamente
- [ ] Botão "Criar Currículo" funciona
- [ ] Builder abre sem erros
- [ ] Formulários funcionam
- [ ] Preview aparece
- [ ] Download PDF funciona
- [ ] Dark mode funciona
- [ ] Mobile responsivo
- [ ] Tour guiado aparece
- [ ] Templates funcionam
- [ ] Template personalizado funciona
- [ ] IA funciona (se configurada)

---

## 🐛 Troubleshooting

### Problema: Página em Branco

**Causa**: URL incorreta ou cache

**Solução**:
1. Use `/#/` nas URLs (HashRouter)
2. Limpe o cache: Ctrl+Shift+R
3. Tente em modo anônimo
4. Verifique o console (F12)

### Problema: Build Falha na Vercel

**Causa**: Erro de compilação

**Solução**:
1. Verifique os logs de build na Vercel
2. Teste localmente: `npm run build`
3. Corrija os erros
4. Commit e push
5. Vercel fará redeploy automaticamente

### Problema: Rota Não Funciona (404)

**Causa**: Configuração de rotas

**Solução**:
1. Verifique se `vercel.json` existe
2. Confirme que tem a configuração de `rewrites`
3. Faça redeploy

### Problema: Assets Não Carregam

**Causa**: Paths incorretos

**Solução**:
1. Verifique se `vite.config.js` tem `base: './'`
2. Faça redeploy
3. Limpe o cache

### Problema: IA Não Funciona

**Causa**: API Key não configurada

**Solução**:
1. Verifique se `VITE_OPENROUTER_API_KEY` está configurada
2. Confirme que a key é válida
3. Faça redeploy

---

## 🌐 Domínio Customizado (Opcional)

### Adicionar Domínio Próprio

1. Vá em **Settings** → **Domains**
2. Adicione seu domínio (ex: `cvbuilder.ao`)
3. Configure o DNS:
   - **Type**: A
   - **Name**: @
   - **Value**: 76.76.21.21
4. Ou use CNAME:
   - **Type**: CNAME
   - **Name**: www
   - **Value**: cname.vercel-dns.com
5. Aguarde propagação (até 24h)

---

## 📊 Monitoramento

### Vercel Analytics

1. Vá em **Analytics** no dashboard
2. Veja métricas:
   - Page views
   - Unique visitors
   - Performance
   - Web Vitals

### Logs

1. Vá em **Deployments**
2. Clique no deployment
3. Veja **Function Logs** ou **Build Logs**

---

## 🔄 Atualizações Automáticas

### Como Funciona

- ✅ Push para `main` → Deploy automático em produção
- ✅ Push para outras branches → Deploy de preview
- ✅ Pull Requests → Deploy de preview

### Fluxo de Trabalho

```bash
# Faça suas alterações
# ...

# Commit e push
git add .
git commit -m "feat: nova funcionalidade"
git push origin main

# Vercel faz deploy automaticamente!
```

---

## 💰 Custos

### Vercel Free Tier

- ✅ Deploy ilimitado
- ✅ HTTPS automático
- ✅ CDN global
- ✅ 100 GB de bandwidth/mês
- ✅ Build time: 45 minutos/mês
- ✅ Suficiente para uso pessoal e pequenos projetos

### Quando Pagar

- Alto tráfego (>100k visitas/mês)
- Múltiplos projetos
- Team features
- Suporte prioritário

---

## 🎯 Próximos Passos

### Após o Deploy

1. ✅ Teste todas as funcionalidades
2. ✅ Configure API Key (se quiser IA)
3. ✅ Adicione domínio customizado (opcional)
4. ✅ Configure analytics
5. ✅ Compartilhe com amigos!

### Melhorias Futuras

- Adicionar mais templates
- Integrar com LinkedIn
- Adicionar mais idiomas
- Implementar backend para salvamento em nuvem
- Adicionar autenticação de usuários

---

## 📞 Suporte

### Documentação

- [Vercel Docs](https://vercel.com/docs)
- [Vite Docs](https://vitejs.dev)
- [React Docs](https://react.dev)

### Comunidade

- [Vercel Discord](https://discord.gg/vercel)
- [GitHub Issues](https://github.com/SEU_USUARIO/cv-builder/issues)

---

## ✅ Checklist Final de Deploy

- [ ] Projeto funcionando localmente
- [ ] Build sem erros
- [ ] Repositório criado no GitHub
- [ ] Push realizado com sucesso
- [ ] Deploy na Vercel concluído
- [ ] URLs funcionando
- [ ] Todas as funcionalidades testadas
- [ ] API Key configurada (opcional)
- [ ] Domínio customizado (opcional)
- [ ] Analytics configurado (opcional)

---

**Parabéns! Seu CV Builder está no ar!** 🎉

**URL**: `https://seu-projeto.vercel.app`

**Feito com ❤️ em Angola** 🇦🇴
