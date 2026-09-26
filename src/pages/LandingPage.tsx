import { Link } from 'react-router-dom';
import { FileText, Zap, Shield, Globe, ArrowRight, CheckCircle2, Star, Download, Layout, Mail, Printer, Share2, FolderKanban, Languages, Palette, Moon } from 'lucide-react';
import { useState } from 'react';

export function LandingPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

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
              <a href="#beneficios" className="text-sm text-gray-600 hover:text-gray-900">Benefícios</a>
              <a href="#recursos" className="text-sm text-gray-600 hover:text-gray-900">Recursos</a>
              <a href="#como-funciona" className="text-sm text-gray-600 hover:text-gray-900">Como Funciona</a>
              <a href="#faq" className="text-sm text-gray-600 hover:text-gray-900">FAQ</a>
            </nav>
            <Link to="/builder" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Criar Currículo
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
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
            Construtor de currículo online gratuito com 4 templates profissionais. Preview ao vivo,
            download em PDF, suporte a múltiplos idiomas e pontuação ATS. Seus dados ficam salvos automaticamente.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/builder" className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg shadow-lg shadow-blue-600/25">
              Criar Currículo Grátis
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <div className="bg-gray-100 border border-dashed border-gray-300 rounded-lg h-[90px] flex items-center justify-center">
          <span className="text-sm text-gray-400">Espaço Publicitário (728x90)</span>
        </div>
      </div>

      {/* Benefits */}
      <section id="beneficios" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Por que usar nosso construtor?</h2>
            <p className="mt-3 text-gray-600">Ferramentas profissionais para criar um currículo que se destaca</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Rápido e Intuitivo</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Interface simples e direta. Auto-save em tempo real, drag-and-drop para reordenar
                seções, e preview ao vivo enquanto edita. Seu currículo fica pronto em minutos.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Privacidade Total</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Seus dados ficam salvos apenas no seu navegador. Não enviamos nenhuma informação
                para servidores externos. Modo escuro e suporte a 3 idiomas inclusos.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">PDF + ATS Score</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Baixe em PDF profissional ou imprima direto. Verifique sua pontuação ATS
                para garantir que recrutadores e sistemas consigam ler seu currículo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="recursos" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Recursos Incluídos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Layout, text: '4 templates profissionais' },
              { icon: Zap, text: 'Auto-save em tempo real' },
              { icon: FileText, text: 'PDF com texto selecionível' },
              { icon: Shield, text: 'Pontuação ATS integrada' },
              { icon: FolderKanban, text: 'Seção de projetos' },
              { icon: Languages, text: '3 idiomas (PT, EN, ES)' },
              { icon: Moon, text: 'Modo escuro' },
              { icon: Printer, text: 'Impressão direta' },
              { icon: Share2, text: 'Compartilhar por URL' },
              { icon: Download, text: 'Exportar/Importar JSON' },
              { icon: Globe, text: 'Funciona offline' },
              { icon: CheckCircle2, text: 'Sem cadastro necessário' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                <feature.icon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Como Funciona</h2>
            <p className="mt-3 text-gray-600">3 passos simples para ter seu currículo pronto</p>
          </div>
          <div className="space-y-8">
            {[
              { num: '1', title: 'Preencha seus dados', desc: 'Insira suas informações pessoais, experiências, formação, projetos e habilidades. O formulário salva automaticamente enquanto você digita. Reordene as seções com drag-and-drop.' },
              { num: '2', title: 'Escolha um template', desc: 'Selecione entre 4 templates profissionais: Moderno, Clássico, Minimalista e Criativo. O preview é atualizado em tempo real para você ver exatamente como ficará.' },
              { num: '3', title: 'Baixe ou compartilhe', desc: 'Baixe em PDF, imprima diretamente ou compartilhe via URL. Verifique sua pontuação ATS para garantir compatibilidade com sistemas de recrutamento.' },
            ].map((step) => (
              <div key={step.num} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{step.title}</h3>
                  <p className="text-gray-600 mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="w-10 h-10 text-blue-200 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">Receba dicas de carreira</h2>
          <p className="mt-2 text-blue-100">
            Cadastre seu email para receber dicas semanais sobre currículos, entrevistas e carreira.
          </p>
          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white text-gray-900"
                required
              />
              <button type="submit" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                Inscrever
              </button>
            </form>
          ) : (
            <div className="mt-6 bg-white/20 rounded-lg p-4 inline-flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Inscrição confirmada!</span>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Perguntas Frequentes</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'É realmente gratuito?', a: 'Sim! O CV Builder é 100% gratuito. Não cobramos nada para criar, editar ou baixar seu currículo.' },
              { q: 'Preciso criar uma conta?', a: 'Não! Não é necessário criar conta ou fazer login. Basta acessar e começar a criar seu currículo.' },
              { q: 'Meus dados estão seguros?', a: 'Seus dados ficam salvos apenas no seu navegador (localStorage). Não enviamos nenhuma informação para servidores externos.' },
              { q: 'O PDF é compatível com sistemas ATS?', a: 'Sim! Geramos PDFs com texto selecionível e estrutura clara. Além disso, oferecemos uma pontuação ATS para você verificar a compatibilidade.' },
              { q: 'Posso usar em outros idiomas?', a: 'Sim! Oferecemos suporte para Português, Inglês e Espanhol. Basta selecionar o idioma no editor.' },
              { q: 'Quantos templates estão disponíveis?', a: 'Atualmente oferecemos 4 templates profissionais: Moderno, Clássico, Minimalista e Criativo.' },
              { q: 'Posso editar depois?', a: 'Sim! Seus dados ficam salvos automaticamente. Quando você voltar ao site, tudo estará como deixou.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900">{faq.q}</h3>
                <p className="text-gray-600 mt-2 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white">Pronto para criar seu currículo?</h2>
          <p className="mt-4 text-blue-100 text-lg">Comece agora mesmo. É grátis, rápido e sem cadastro.</p>
          <Link to="/builder" className="mt-8 inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3.5 rounded-lg hover:bg-blue-50 transition-colors font-bold text-lg">
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
          <p className="text-sm">Construtor de currículo online gratuito. Crie currículos profissionais em minutos.</p>
          <p className="text-xs mt-4 text-gray-500">Seus dados ficam salvos apenas no seu navegador. Privacidade total garantida.</p>
        </div>
      </footer>
    </div>
  );
}
