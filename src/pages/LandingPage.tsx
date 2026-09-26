import { Link } from 'react-router-dom';
import { FileText, Zap, Shield, Globe, ArrowRight, CheckCircle2, Star, Download, Layout } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">CV Builder</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#beneficios" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Benefícios
              </a>
              <a href="#como-funciona" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Como Funciona
              </a>
              <a href="#faq" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                FAQ
              </a>
            </nav>
            <Link
              to="/builder"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Criar Currículo
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            100% Gratuito - Sem Cadastro
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Crie seu Currículo
            <span className="text-blue-600 block mt-2">Profissional em Minutos</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Construtor de currículo online gratuito. Preencha seus dados, visualize em tempo real
            e baixe em PDF. Sem login, sem complicação. Seus dados ficam salvos automaticamente.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/builder"
              className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg shadow-lg shadow-blue-600/25"
            >
              Criar Currículo Grátis
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#como-funciona"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              <Layout className="w-5 h-5" />
              Ver como funciona
            </a>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <div className="bg-gray-100 border border-dashed border-gray-300 rounded-lg h-[90px] flex items-center justify-center">
          <span className="text-sm text-gray-400">Espaço Publicitário (728x90)</span>
        </div>
      </div>

      {/* Benefits Section */}
      <section id="beneficios" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Por que usar nosso construtor?
            </h2>
            <p className="mt-3 text-gray-600">
              Ferramentas profissionais para criar um currículo que se destaca
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Rápido e Intuitivo</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Interface simples e direta. Preencha seus dados e veja o resultado em tempo real.
                Sem curvas de aprendizado, sem complicação. Seu currículo fica pronto em minutos.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Privacidade Total</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Seus dados ficam salvos apenas no seu navegador. Não enviamos nenhuma informação
                para servidores externos. Você tem controle total sobre suas informações pessoais.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">PDF Profissional</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Baixe seu currículo em PDF de alta qualidade. Layout otimizado para sistemas ATS
                (Applicant Tracking Systems), garantindo que recrutadores consigam ler seu conteúdo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Como Funciona</h2>
            <p className="mt-3 text-gray-600">3 passos simples para ter seu currículo pronto</p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Preencha seus dados</h3>
                <p className="text-gray-600 mt-1">
                  Insira suas informações pessoais, experiências profissionais, formação acadêmica e habilidades.
                  O formulário é organizado em seções para facilitar o preenchimento. Todos os campos são
                  opcionais - você decide o que incluir no seu currículo.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Visualize em tempo real</h3>
                <p className="text-gray-600 mt-1">
                  Enquanto você preenche, o preview do currículo é atualizado automaticamente.
                  Veja exatamente como seu currículo ficará antes de baixar. Ajuste o conteúdo
                  até ficar satisfeito com o resultado final.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Baixe em PDF</h3>
                <p className="text-gray-600 mt-1">
                  Quando estiver satisfeito, clique em "Baixar PDF" e receba um documento profissional
                  pronto para enviar para empresas. O PDF é otimizado para leitura por sistemas ATS
                  e tem texto selecionível para facilitar a vida dos recrutadores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Detail */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Recursos Incluídos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Preview ao vivo enquanto edita',
              'Salvamento automático no navegador',
              'Exportar e importar dados em JSON',
              'PDF otimizado para sistemas ATS',
              'Texto selecionível no PDF',
              'Design profissional e limpo',
              'Adicionar múltiplas experiências',
              'Adicionar múltiplas formações',
              'Seção de habilidades com tags',
              'Funciona 100% offline após carregar',
              'Sem necessidade de cadastro',
              'Totalmente gratuito',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Perguntas Frequentes</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900">É realmente gratuito?</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Sim! O CV Builder é 100% gratuito. Não cobramos nada para criar, editar ou baixar seu currículo.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900">Preciso criar uma conta?</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Não! Não é necessário criar conta ou fazer login. Basta acessar e começar a criar seu currículo.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900">Meus dados estão seguros?</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Seus dados ficam salvos apenas no seu navegador (localStorage). Não enviamos nenhuma informação
                para servidores externos. Você pode limpar todos os dados a qualquer momento.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900">O PDF é compatível com sistemas ATS?</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Sim! Geramos PDFs com texto selecionível e estrutura clara, otimizados para serem lidos
                por sistemas de rastreamento de candidatos (ATS) usados por empresas.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900">Posso editar depois?</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Sim! Seus dados ficam salvos automaticamente. Quando você voltar ao site, tudo estará
                como deixou. Você também pode exportar em JSON para backup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white">
            Pronto para criar seu currículo?
          </h2>
          <p className="mt-4 text-blue-100 text-lg">
            Comece agora mesmo. É grátis, rápido e sem cadastro.
          </p>
          <Link
            to="/builder"
            className="mt-8 inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3.5 rounded-lg hover:bg-blue-50 transition-colors font-bold text-lg"
          >
            <Globe className="w-5 h-5" />
            Começar Agora
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-blue-400" />
            <span className="text-white font-bold">CV Builder</span>
          </div>
          <p className="text-sm">
            Construtor de currículo online gratuito. Crie currículos profissionais em minutos.
          </p>
          <p className="text-xs mt-4 text-gray-500">
            Seus dados ficam salvos apenas no seu navegador. Privacidade total garantida.
          </p>
        </div>
      </footer>
    </div>
  );
}
