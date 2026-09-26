import { Link } from 'react-router-dom';
import { FileText, Zap, Shield, Globe, ArrowRight, CheckCircle2, Star, Download, Layout, Mail, Printer, Share2, FolderKanban, Languages, Palette, Moon, Award, Briefcase, GraduationCap, Code, Users, TrendingUp, Clock, Sparkles, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function LandingPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const features = [
    {
      icon: Layout,
      title: '5 Templates Profissionais',
      description: 'Escolha entre Moderno, Executivo, Tech, Compacto e Criativo. Cada um otimizado para diferentes indústrias.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Zap,
      title: 'Auto-save em Tempo Real',
      description: 'Seus dados são salvos automaticamente. Nunca perca seu trabalho, mesmo sem internet.',
      color: 'from-yellow-500 to-orange-600',
    },
    {
      icon: Shield,
      title: 'Análise ATS Integrada',
      description: 'Verifique a compatibilidade do seu currículo com sistemas de rastreamento de candidatos.',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: Sparkles,
      title: 'IA Integrada',
      description: 'Sugestões inteligentes e gerador de carta de apresentação com OpenRouter API.',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: Globe,
      title: 'Multi-idioma',
      description: 'Suporte completo para Português, Inglês e Espanhol. Perfeito para vagas internacionais.',
      color: 'from-indigo-500 to-purple-600',
    },
    {
      icon: Moon,
      title: 'Modo Escuro',
      description: 'Interface adaptável com modo claro e escuro. Conforto visual em qualquer ambiente.',
      color: 'from-gray-700 to-gray-900',
    },
  ];

  const stats = [
    { number: '5+', label: 'Templates Profissionais' },
    { number: '29', label: 'Campos Personalizáveis' },
    { number: '3', label: 'Idiomas Suportados' },
    { number: '100%', label: 'Gratuito' },
  ];

  const steps = [
    {
      number: '01',
      title: 'Preencha seus Dados',
      description: 'Insira suas informações pessoais, experiências, educação e habilidades. Nosso sistema guia você passo a passo.',
      icon: FileText,
    },
    {
      number: '02',
      title: 'Escolha um Template',
      description: 'Selecione entre 5 templates profissionais otimizados para diferentes indústrias e cargos.',
      icon: Palette,
    },
    {
      number: '03',
      title: 'Personalize e Revise',
      description: 'Veja o preview em tempo real. Ajuste cores, seções e conteúdo até ficar perfeito.',
      icon: Sparkles,
    },
    {
      number: '04',
      title: 'Baixe em PDF',
      description: 'Exporte seu currículo em PDF profissional com um clique. Pronto para enviar!',
      icon: Download,
    },
  ];

  const faqs = [
    {
      question: 'É realmente gratuito?',
      answer: 'Sim! O CV Builder é 100% gratuito. Não cobramos nada para criar, editar ou baixar seu currículo. Sem taxas ocultas, sem surpresas.',
    },
    {
      question: 'Preciso criar uma conta?',
      answer: 'Não! Não é necessário criar conta ou fazer login. Basta acessar e começar a criar seu currículo. Seus dados são salvos automaticamente no seu navegador.',
    },
    {
      question: 'Meus dados estão seguros?',
      answer: 'Absolutamente! Seus dados ficam salvos apenas no seu navegador (localStorage). Não enviamos nenhuma informação para servidores externos. Você tem controle total sobre suas informações.',
    },
    {
      question: 'O PDF é compatível com sistemas ATS?',
      answer: 'Sim! Geramos PDFs com texto selecionível e estrutura clara, otimizados para serem lidos por sistemas de rastreamento de candidatos (ATS) usados por empresas.',
    },
    {
      question: 'Posso usar em outros idiomas?',
      answer: 'Sim! Oferecemos suporte completo para Português, Inglês e Espanhol. Basta selecionar o idioma no editor e todo o conteúdo será traduzido automaticamente.',
    },
    {
      question: 'Quantos currículos posso criar?',
      answer: 'Quantos quiser! Você pode criar múltiplos currículos para diferentes vagas e indústrias. Gerencie todos eles facilmente no mesmo navegador.',
    },
    {
      question: 'Posso editar depois?',
      answer: 'Sim! Seus dados ficam salvos automaticamente. Quando você voltar ao site, tudo estará como deixou. Você também pode exportar em JSON para backup.',
    },
  ];

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Desenvolvedora Full Stack',
      content: 'Consegui meu emprego dos sonhos usando o CV Builder! O template Tech ficou perfeito para minha área.',
      rating: 5,
    },
    {
      name: 'João Santos',
      role: 'Product Manager',
      content: 'Interface super intuitiva e o resultado final é profissional. Recomendo para todos os meus colegas.',
      rating: 5,
    },
    {
      name: 'Ana Costa',
      role: 'Designer UX/UI',
      content: 'O template Criativo é lindo! Finalmente um construtor de CV que entende designers.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">CV Builder</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}>Recursos</a>
              <a href="#templates" className="text-sm text-gray-600 hover:text-gray-900 transition-colors" onClick={(e) => { e.preventDefault(); document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' }); }}>Templates</a>
              <a href="#como-funciona" className="text-sm text-gray-600 hover:text-gray-900 transition-colors" onClick={(e) => { e.preventDefault(); document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' }); }}>Como Funciona</a>
              <a href="#faq" className="text-sm text-gray-600 hover:text-gray-900 transition-colors" onClick={(e) => { e.preventDefault(); document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }); }}>FAQ</a>
            </nav>
            <Link 
              to="/builder" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all text-sm font-medium"
            >
              Criar Currículo Grátis
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 px-4 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">


            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Crie seu Currículo
              <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Profissional em Minutos
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              Construtor de currículo online com 5 templates profissionais, preview ao vivo, análise ATS e IA integrada. 
              Seus dados salvos automaticamente.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link 
                to="/builder" 
                className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-blue-500/40 transition-all text-lg font-semibold flex items-center gap-2"
              >
                Começar Agora - É Grátis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="#como-funciona"
                className="text-gray-700 px-8 py-4 rounded-xl border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all text-lg font-semibold"
                onClick={(e) => { e.preventDefault(); document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                Ver Como Funciona
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tudo que Você Precisa
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ferramentas profissionais para criar um currículo que se destaca
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              5 Templates Profissionais
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cada template otimizado para diferentes indústrias e estilos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { name: 'Moderno', color: 'from-blue-500 to-blue-600', icon: Layout },
              { name: 'Executivo', color: 'from-gray-700 to-gray-900', icon: Briefcase },
              { name: 'Tech', color: 'from-green-500 to-emerald-600', icon: Code },
              { name: 'Compacto', color: 'from-purple-500 to-purple-600', icon: FolderKanban },
              { name: 'Criativo', color: 'from-pink-500 to-rose-600', icon: Palette },
            ].map((template, index) => {
              const Icon = template.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 text-center"
                >
                  <div className={`w-full h-32 bg-gradient-to-br ${template.color} rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <Icon className="w-12 h-12 text-white/90" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {template.name}
                  </h3>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/builder"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-blue-500/40 transition-all text-lg font-semibold"
            >
              Experimentar Templates
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              4 passos simples para criar seu currículo profissional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 h-full">
                    <div className="text-6xl font-bold text-blue-200 mb-4">{step.number}</div>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-blue-300" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              O que Dizem Nossos Usuários
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Milhares de profissionais já criaram seus currículos com sucesso
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600">
              Tire suas dúvidas sobre o CV Builder
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-3xl mx-auto text-center">
          <Mail className="w-16 h-16 text-white/80 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-4">
            Receba Dicas de Carreira
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Cadastre seu email para receber dicas semanais sobre currículos, entrevistas e carreira
          </p>
          
          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="flex-1 px-6 py-4 rounded-xl border-0 focus:ring-2 focus:ring-white text-gray-900"
                required
              />
              <button 
                type="submit" 
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors"
              >
                Inscrever
              </button>
            </form>
          ) : (
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 inline-flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-white" />
              <span className="text-white font-medium text-lg">Inscrição confirmada!</span>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Pronto para Criar seu Currículo?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Comece agora mesmo. É grátis, rápido e sem cadastro. Seu próximo emprego está a um clique de distância.
          </p>
          <Link 
            to="/builder"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-xl hover:shadow-2xl hover:shadow-blue-500/40 transition-all text-xl font-bold"
          >
            <Globe className="w-6 h-6" />
            Começar Agora - É Grátis
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-sm text-gray-500 mt-6">
            Sem cadastro • Sem cartão de crédito • 100% gratuito
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">CV Builder</span>
              </div>
              <p className="text-sm leading-relaxed">
                Construtor de currículo online gratuito. Crie currículos profissionais em minutos.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#templates" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</a></li>
                <li><Link to="/builder" className="hover:text-white transition-colors">Criar Currículo</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="mailto:support@cvbuilder.ao" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><span className="text-sm">Seus dados ficam salvos apenas no seu navegador</span></li>
                <li><span className="text-sm">Privacidade total garantida</span></li>
                <li><span className="text-sm">Sem envio de dados para servidores</span></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">
              © {new Date().getFullYear()} CV Builder. Todos os direitos reservados.
            </p>
            <p className="text-sm">
              Seus dados ficam salvos apenas no seu navegador. Privacidade total garantida.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
