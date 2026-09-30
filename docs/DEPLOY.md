# 🚀 Guia Completo de Deploy - Vercel

## ✅ Pré-requisitos

- Conta no GitHub
- Conta na Vercel (gratuita)
- Projeto funcionando localmente

---

## 📋 Passo a Passo Completo

### 1. Preparar o Projeto

```bash
# Certifique-se de que o build funciona
npm run build

# Deve criar a pasta dist/ sem erros
```

### 2. Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Nome: `cv-builder` (ou outro)
3. Visibilidade: Public ou Private
4. **NÃO** inicialize com README
5. Clique em "Create repository"

### 3. Push para o GitHub

```bash
# Inicialize o git (se ainda não fez)
git init

# Adicione todos os arquivos
git add .

# Commit inicial
git commit -m "Initial commit: CV Builder completo"

# Renomeie a branch para main
git branch -M main

# Adicione o remote
git remote add origin https://github.com/SEU_USUARIO/cv-builder.git

# Push para o GitHub
git push -u origin main
```

### 4. Deploy na Vercel

#### Opção A: Via Interface Web (Mais Fácil)

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

#### Opção B: Via CLI

```bash
# Instale a Vercel CLI
npm i -g vercel

# Faça login
vercel login

# Navegue até a pasta do projeto
cd cv-builder

# Deploy
vercel

# Siga as instruções:
# ? Set up and deploy "~\cv-builder"? [Y/n] Y
# ? Which scope do you want to deploy to? (selecione seu usuário)
# ? Link to existing project? [y/N] N
# ? What's your project's name? cv-builder
# ? In which directory is your code located? ./
# ? Want to override the settings? [y/N] N

# Deploy para produção
vercel --prod
```

### 5. Configurar API Key (Opcional)

Se quiser usar a IA:

1. Acesse o dashboard da Vercel
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Adicione nova variável:
   - **Name**: `OPENROUTER_API_KEY`
   - **Value**: `sk-or-v1-sua-chave-aqui`
   - **Environment**: ✅ Production ✅ Preview ✅ Development
5. Clique em **Save**
6. Vá em **Deployments**
7. Clique nos 3 pontos do último deployment
8. Selecione **Redeploy**
9. Aguarde o build

---

## 🔍 Verificar o Deploy

### Testar as URLs

1. **Landing Page**: `https://seu-projeto.vercel.app/`
2. **Builder**: `https://seu-projeto.vercel.app/#/builder`

### Checklist

- [ ] Landing page carrega corretamente
- [ ] Botão "Criar Currículo" funciona
- [ ] Builder abre sem erros
- [ ] Formulários funcionam
- [ ] Preview aparece
- [ ] Download PDF funciona
- [ ] Dark mode funciona
- [ ] Mobile responsivo

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

## ✅ Checklist Final

- [ ] Projeto funcionando localmente
- [ ] Build sem erros
- [ ] Repositório criado no GitHub
- [ ] Push realizado com sucesso
- [ ] Deploy na Vercel concluído
- [ ] URLs funcionando
- [ ] Todas as funcionalidades testadas
- [ ] API Key configurada (opcional)
- [ ] Domínio customizado (opcional)

---

**Parabéns! Seu CV Builder está no ar!** 🎉

**URL**: `https://seu-projeto.vercel.app`

**Feito com ❤️ em Angola** 🇦🇴
