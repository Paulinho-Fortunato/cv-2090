# Guia de Deploy na Vercel

## ✅ Status do Projeto

O projeto está **100% pronto** para deploy na Vercel. Todos os arquivos necessários estão configurados:

- ✅ `vercel.json` - Configuração de deploy
- ✅ `package.json` - Dependências atualizadas
- ✅ `vite.config.js` - Configuração do Vite
- ✅ Build funcionando sem erros

## 🚀 Como Fazer Deploy

### Método 1: Via GitHub (Recomendado)

1. **Crie um repositório no GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: CV Builder"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/cv-builder.git
   git push -u origin main
   ```

2. **Acesse a Vercel**
   - Vá para [vercel.com](https://vercel.com)
   - Clique em "Sign Up" ou "Login"
   - Faça login com GitHub

3. **Importe o Projeto**
   - Clique em "Add New Project"
   - Selecione o repositório do GitHub
   - A Vercel detectará automaticamente que é um projeto Vite
   - Clique em "Deploy"

4. **Aguarde o Deploy**
   - A Vercel instalará as dependências
   - Executará `npm run build`
   - Deploy será concluído em ~2 minutos
   - Você receberá uma URL como: `https://cv-builder-xxx.vercel.app`

### Método 2: Via Vercel CLI

```bash
# Instale a Vercel CLI globalmente
npm i -g vercel

# Faça login na Vercel
vercel login

# Navegue até a pasta do projeto
cd cv-builder

# Execute o deploy
vercel

# Siga as instruções:
# - Set up and deploy? Y
# - Which scope? (selecione seu usuário)
# - Link to existing project? N
# - Project name? cv-builder
# - Directory? ./
# - Override settings? N

# Para deploy em produção
vercel --prod
```

## 🔍 Sobre os Warnings

Os warnings que você viu são **normais** e **não impedem o deploy**:

### 1. `uuid@9.0.1 deprecated`
- **Status**: ✅ Resolvido
- **Ação**: Pacote atualizado para versão mais recente
- **Impacto**: Nenhum

### 2. `recharts@2.15.4 deprecated`
- **Status**: ✅ Resolvido
- **Ação**: Pacote atualizado para v3
- **Impacto**: Nenhum (não está sendo usado no projeto)

### 3. `esbuild install-scripts`
- **Status**: ✅ Normal
- **Ação**: Nenhum
- **Impacto**: Nenhum (é apenas um aviso sobre scripts de instalação)

## 📋 Checklist de Deploy

Antes de fazer deploy, verifique:

- [ ] Todos os arquivos estão commitados no Git
- [ ] `vercel.json` está presente no projeto
- [ ] `package.json` tem o script `build`
- [ ] Não há arquivos sensíveis commitados (senhas, tokens)
- [ ] O projeto builda localmente com `npm run build`

## 🎯 Configurações da Vercel

O arquivo `vercel.json` já configura:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Isso garante:
- ✅ Build correto com Vite
- ✅ Output na pasta `dist`
- ✅ SPA routing (todas as rotas vão para index.html)
- ✅ Cache de assets otimizado

## 🌐 Domínio Customizado (Opcional)

Após o deploy, você pode adicionar um domínio personalizado:

1. Vá em "Settings" > "Domains"
2. Adicione seu domínio (ex: `cvbuilder.com.br`)
3. Siga as instruções para configurar DNS
4. Aguarde propagação (até 24h)

## 📊 Monitoramento

Após o deploy, a Vercel oferece:

- **Analytics**: Visualize métricas de performance
- **Logs**: Veja logs de build e runtime
- **Deploy Previews**: Preview de cada PR antes de mergear
- **Automatic HTTPS**: SSL gratuito automático

## 🐛 Troubleshooting

### Problema: Build falha na Vercel

**Solução**:
```bash
# Teste localmente
npm run build

# Se funcionar localmente, verifique:
# - Se todos os arquivos estão commitados
# - Se não há arquivos .env faltando
# - Se o Node.js version é compatível (18+)
```

### Problema: Rota não funciona (404)

**Solução**:
- Verifique se `vercel.json` tem a configuração de `rewrites`
- Certifique-se de que está usando React Router corretamente
- Faça redeploy após mudanças

### Problema: Assets não carregam

**Solução**:
- Verifique se os paths estão corretos (use `/` no início)
- Certifique-se de que os assets estão na pasta `public/`
- Limpe o cache do navegador

## 📈 Próximos Passos Após Deploy

1. **Teste o fluxo completo**
   - Crie um currículo
   - Baixe o PDF
   - Teste todos os templates
   - Teste os 3 idiomas

2. **Configure Analytics** (opcional)
   - Adicione Google Analytics
   - Ou use Plausible (mais privacidade)

3. **Configure AdSense** (opcional)
   - Substitua os espaços de anúncio placeholder
   - Adicione seu código AdSense real

4. **Monitore Performance**
   - Use Lighthouse para verificar score
   - Monitore Core Web Vitals na Vercel

## 🎉 Sucesso!

Seu CV Builder está pronto para produção!

**URL de exemplo**: `https://cv-builder.vercel.app`

**Importante**: O projeto usa HashRouter, então as URLs serão:
- Landing page: `https://cv-builder.vercel.app` ou `https://cv-builder.vercel.app/#/`
- Builder: `https://cv-builder.vercel.app/#/builder`

**Funcionalidades ativas**:
- ✅ 4 templates profissionais
- ✅ Preview ao vivo
- ✅ Download PDF
- ✅ ATS Score
- ✅ 3 idiomas
- ✅ Modo escuro
- ✅ Auto-save
- ✅ Zero login

---

**Dúvidas?** Abra uma issue no GitHub ou entre em contato.
