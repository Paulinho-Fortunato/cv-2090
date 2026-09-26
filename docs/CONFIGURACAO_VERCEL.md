# ⚙️ Configuração da API Key na Vercel

## ✅ API Key Embutida - Configuração Automática

A API Key da OpenRouter agora está **embutida no código** e configurada automaticamente via variáveis de ambiente da Vercel.

**O usuário NÃO precisa configurar nada!** A IA funciona automaticamente.

---

## 🔑 Como Configurar (Apenas para Administradores)

### Passo 1: Obter API Key da OpenRouter

1. Acesse: https://openrouter.ai/keys
2. Faça login com sua conta
3. Clique em "Create Key"
4. Copie a chave (formato: `sk-or-v1-...`)

### Passo 2: Adicionar na Vercel

1. Acesse o dashboard da Vercel: https://vercel.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Adicione nova variável:
   - **Name**: `VITE_OPENROUTER_API_KEY`
   - **Value**: `sk-or-v1-sua-chave-aqui`
   - **Environment**: Production, Preview, Development
5. Clique em **Save**

### Passo 3: Redeploy

1. Vá em **Deployments**
2. Clique nos 3 pontos do último deployment
3. Selecione **Redeploy**
4. Aguarde o build completar

✅ Pronto! A IA está configurada e funcionando para todos os usuários.

---

## 📝 Variáveis de Ambiente

### Obrigatórias

```bash
VITE_OPENROUTER_API_KEY=sk-or-v1-sua-chave-aqui
```

### Como Funciona

- A variável é injetada no build pelo Vite
- Fica disponível via `import.meta.env.VITE_OPENROUTER_API_KEY`
- É incluída no bundle JavaScript final
- Usuários não precisam configurar nada

---

## 🎯 Modelos Disponíveis

Os usuários podem escolher entre vários modelos:

### Gratuitos (Recomendados)
- **Llama 3 8B** (Meta) - Padrão, rápido e eficiente
- **Mistral 7B** (Mistral) - Bom para tarefas gerais

### Pagos (Pay-per-use)
- **GPT-3.5 Turbo** - $0.0015/1K tokens
- **GPT-4** - $0.03/1K tokens
- **Claude 3 Haiku** - $0.00025/1K tokens
- **Claude 3 Sonnet** - $0.003/1K tokens
- E mais...

---

## 🔒 Segurança

### Onde a Key é Armazenada?

- ✅ No bundle JavaScript final (client-side)
- ✅ Visível no código fonte (como qualquer variável de frontend)
- ❌ NÃO é segura para dados sensíveis
- ✅ OK para APIs com limites de uso

### Recomendações

1. **Use modelos gratuitos** quando possível (Llama 3 8B, Mistral 7B)
2. **Configure limites de uso** na OpenRouter
3. **Monitore o uso** regularmente
4. **Considere um proxy** se precisar de mais segurança

### Alternativa Mais Segura (Backend)

Se precisar de mais segurança, considere:
1. Criar uma API backend (Node.js/Express)
2. Armazenar a key apenas no servidor
3. Fazer proxy das requisições
4. Adicionar autenticação de usuários

---

## 📊 Monitoramento de Uso

### Na OpenRouter

1. Acesse: https://openrouter.ai/activity
2. Veja uso por modelo
3. Monitore custos em tempo real
4. Configure alertas de gasto

### Estimativa de Custos

**Com modelos gratuitos (Llama 3 8B, Mistral 7B):**
- Custo: $0
- Limite: Sem limite de uso

**Com modelos pagos:**
- Análise de currículo: ~500 tokens = $0.001 (GPT-3.5)
- Carta de apresentação: ~800 tokens = $0.002 (GPT-3.5)
- 1000 usos/dia: ~$2/dia = $60/mês

---

## 🆘 Troubleshooting

### "API Key não configurada"

**Causa**: Variável de ambiente não foi adicionada na Vercel

**Solução**:
1. Vá em Settings → Environment Variables
2. Adicione `VITE_OPENROUTER_API_KEY`
3. Faça redeploy

### "Erro na API"

**Causa**: API Key inválida ou sem créditos

**Solução**:
1. Verifique se a key está correta
2. Confirme que tem créditos (para modelos pagos)
3. Tente usar modelo gratuito (Llama 3 8B)

### "Modelo muito lento"

**Causa**: Modelo escolhido é muito grande

**Solução**:
1. Use modelo mais rápido (Llama 3 8B, Mistral 7B)
2. Ou modelo gratuito (sem limite de requisições)

---

## 💡 Dicas

### Para Reduzir Custos

1. **Use modelos gratuitos por padrão**
   - Llama 3 8B é o padrão
   - Suficiente para maioria dos casos

2. **Limite o tamanho das respostas**
   - Já configurado: `max_tokens: 1000`
   - Reduz custos significativamente

3. **Cache de respostas**
   - Considere cache para sugestões comuns
   - Reduz chamadas à API

### Para Melhor Experiência

1. **Teste diferentes modelos**
   - Cada modelo tem pontos fortes
   - GPT-4: Melhor qualidade
   - Claude: Melhor escrita criativa
   - Llama: Mais rápido

2. **Monitore feedback dos usuários**
   - Ajuste modelo padrão baseado no uso
   - Adicione mais opções se necessário

---

## 📚 Documentação

- **Guia do Usuário**: `docs/GUIA_OPENROUTER.md`
- **OpenRouter Docs**: https://openrouter.ai/docs
- **Vercel Docs**: https://vercel.com/docs/concepts/projects/environment-variables

---

## ✅ Checklist de Configuração

- [ ] Obter API Key da OpenRouter
- [ ] Adicionar variável `VITE_OPENROUTER_API_KEY` na Vercel
- [ ] Fazer redeploy
- [ ] Testar funcionalidades de IA
- [ ] Monitorar uso e custos
- [ ] Configurar alertas (opcional)

---

**Status**: ✅ Configuração concluída
**Última atualização**: 2024
