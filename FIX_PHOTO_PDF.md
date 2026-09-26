# 🖼️ Correção da Foto no PDF

## 🐛 Problema Identificado

A foto de perfil não estava sendo incluída no PDF gerado, mesmo sendo salva corretamente no localStorage.

## 🔍 Causa Raiz

O componente `Image` do `@react-pdf/renderer` não estava sendo importado nem utilizado na geração do PDF.

### Código Anterior (Incorreto)
```tsx
// ❌ Image não estava sendo importado
const { pdf, Document, Page, Text, View, StyleSheet } = await import('@react-pdf/renderer');

// ❌ Foto não estava sendo renderizada
<View style={styles.header}>
  <Text style={styles.name}>{basics.fullName}</Text>
  // ... sem foto
</View>
```

## ✅ Correção Aplicada

### 1. Import do Componente Image
```tsx
// ✅ Image adicionado ao import
const { pdf, Document, Page, Text, View, Image, StyleSheet } = await import('@react-pdf/renderer');
```

### 2. Desestruturação da Foto
```tsx
// ✅ Foto desestruturada do resumeData
const { basics, experiences, education, projects, skills, photo } = useResumeStore.getState().resumeData;
```

### 3. Estilos para a Foto
```tsx
const styles = StyleSheet.create({
  headerContent: { flexDirection: 'row' as const, alignItems: 'center' },
  photo: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    marginRight: 15, 
    borderWidth: 2, 
    borderColor: '#ffffff' 
  },
  headerText: { flex: 1 },
  // ... outros estilos
});
```

### 4. Renderização da Foto
```tsx
<View style={styles.header}>
  <View style={styles.headerContent}>
    {photo && (
      <Image src={photo} style={styles.photo} />
    )}
    <View style={styles.headerText}>
      <Text style={styles.name}>{basics.fullName || 'Seu Nome'}</Text>
      <Text style={styles.headline}>{basics.headline || ''}</Text>
      <View style={{ flexDirection: 'row' as const, marginTop: 10 }}>
        {basics.email && <Text style={styles.contactText}>{basics.email}</Text>}
        {basics.phone && <Text style={styles.contactText}>{basics.phone}</Text>}
        {basics.location && <Text style={styles.contactText}>{basics.location}</Text>}
      </View>
    </View>
  </View>
</View>
```

## 📋 Como Funciona

### 1. Upload da Foto
Quando o usuário faz upload de uma foto no formulário:
```tsx
const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      setPhoto(event.target?.result as string); // base64 string
    };
    reader.readAsDataURL(file);
  }
};
```

O `FileReader.readAsDataURL()` converte a imagem para base64 no formato:
```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
```

### 2. Salvamento no Store
A foto é salva no Zustand store:
```tsx
setPhoto: (photo) => set((state) => ({
  resumeData: { ...state.resumeData, photo }
}))
```

### 3. Persistência no localStorage
O Zustand com middleware `persist` salva automaticamente no localStorage.

### 4. Geração do PDF
Ao gerar o PDF, a foto é incluída:
```tsx
{photo && (
  <Image src={photo} style={styles.photo} />
)}
```

O `@react-pdf/renderer` aceita strings base64 diretamente no atributo `src`.

## 🎨 Layout do Header no PDF

### Com Foto
```
┌─────────────────────────────────────┐
│  ┌────┐  NOME COMPLETO              │
│  │ 📷 │  Cargo Desejado             │
│  └────┘  email | telefone | local   │
└─────────────────────────────────────┘
```

### Sem Foto
```
┌─────────────────────────────────────┐
│  NOME COMPLETO                       │
│  Cargo Desejado                     │
│  email | telefone | local           │
└─────────────────────────────────────┘
```

## 📐 Especificações da Foto no PDF

- **Tamanho**: 60x60 pixels
- **Formato**: Circular (borderRadius: 30)
- **Borda**: 2px branca
- **Margem**: 15px à direita
- **Posição**: Lado esquerdo do header

## ✅ Compatibilidade

O `@react-pdf/renderer` suporta:
- ✅ Imagens base64 (data URLs)
- ✅ URLs externas (https://)
- ✅ Buffers
- ✅ PNG e JPG

## 🧪 Testes Realizados

- [x] Upload de foto no formulário
- [x] Foto salva no localStorage
- [x] Foto visível no preview
- [x] Foto incluída no PDF gerado
- [x] Layout correto com e sem foto
- [x] Foto circular com borda branca

## 📊 Impacto

### Antes
- ❌ Foto não aparecia no PDF
- ❌ Header sem imagem
- ❌ Layout menos profissional

### Depois
- ✅ Foto incluída no PDF
- ✅ Header com foto circular
- ✅ Layout profissional
- ✅ Identidade visual preservada

## 🚀 Como Usar

1. **Fazer upload da foto** no formulário "Dados Pessoais"
2. **Verificar no preview** se a foto aparece
3. **Clicar em "Baixar PDF"**
4. **Verificar o PDF gerado** - a foto deve estar no header

## 📝 Notas Técnicas

### Formato Base64
O `FileReader.readAsDataURL()` retorna:
```
data:image/[format];base64,[encoded-data]
```

Exemplo:
```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
```

### @react-pdf/renderer Image
O componente `Image` aceita:
- String (URL ou base64)
- URL object
- Buffer
- Function

### Performance
- A foto é cacheada pelo `@react-pdf/renderer`
- Não há impacto significativo no tempo de geração
- Tamanho do PDF aumenta proporcionalmente ao tamanho da imagem

## 🔗 Referências

- [Documentação @react-pdf/renderer - Image](https://react-pdf.org/components#image)
- [MDN - FileReader.readAsDataURL()](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL)
- [Base64 Image Encoding](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)

---

**Status**: ✅ **CORRIGIDO** - Foto agora é incluída corretamente no PDF
