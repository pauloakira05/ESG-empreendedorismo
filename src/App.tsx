import React, { useState, useRef, useEffect } from 'react';
import {
  Scale,
  BookOpen,
  Clock,
  FileSearch,
  Brain,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Gavel,
  ScrollText,
  Shield,
  Lightbulb,
  TrendingUp,
  Target,
  Users,
  Book,
  Mic,
  Instagram,
  Link,
  Menu,
  X,
  ChevronDown,
  Linkedin,
} from 'lucide-react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Refs para cada seção
  const heroRef = useRef(null);
  const manifestoRef = useRef(null);
  const objetivosRef = useRef(null);
  const ferramentasRef = useRef(null);
  const podcastRef = useRef(null);
  const metodologiaRef = useRef(null);
  const equipeRef = useRef(null);
  const redesRef = useRef(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const menuItems = [
    { name: 'Início', ref: heroRef, id: 'hero' },
    { name: 'Manifesto', ref: manifestoRef, id: 'manifesto' },
    { name: 'Objetivos', ref: objetivosRef, id: 'objetivos' },
    { name: 'Ferramentas', ref: ferramentasRef, id: 'ferramentas' },
    { name: 'Podcast', ref: podcastRef, id: 'podcast' },
    { name: 'Metodologia', ref: metodologiaRef, id: 'metodologia' },
    { name: 'Equipe', ref: equipeRef, id: 'equipe' },
    { name: 'Redes Sociais', ref: redesRef, id: 'redes' },
  ];

  // Observador de interseção para detectar a seção ativa
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    menuItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Garantir que todos os recursos estejam carregados
    window.addEventListener('load', () => {
      setIsLoading(false);
      document.documentElement.classList.add('loaded');
    });

    // Fallback caso o evento load não dispare
    const timeout = setTimeout(() => {
      setIsLoading(false);
      document.documentElement.classList.add('loaded');
    }, 1000);

    return () => {
      window.removeEventListener('load', () => {
        setIsLoading(false);
        document.documentElement.classList.add('loaded');
      });
      clearTimeout(timeout);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  const features = [
    {
      icon: <FileSearch className="w-12 h-12 text-blue-900" />,
      title: 'Análise Documental Inteligente',
      description: 'Imagine revisar 500 páginas de documentos em minutos, não dias. Nossa IA não apenas lê, mas compreende contexto jurídico, identificando riscos ocultos e oportunidades que olhos humanos podem perder.',
    },
    {
      icon: <BookOpen className="w-12 h-12 text-blue-900" />,
      title: 'Pesquisa Jurisprudencial Cognitiva',
      description: 'Supere a busca por palavras-chave. Nossa IA entende a essência do seu caso e encontra precedentes verdadeiramente relevantes, mesmo quando a linguagem é diferente mas o mérito é idêntico.',
    },
    {
      icon: <ScrollText className="w-12 h-12 text-blue-900" />,
      title: 'Geração Avançada de Peças',
      description: 'Transforme 4 horas de redação em 15 minutos de revisão. A IA aprende seu estilo argumentativo e cria minutas personalizadas, fundamentadas em milhares de casos de sucesso.',
    },
  ];

  const tools = [
    {
      icon: <Brain className="w-12 h-12 text-blue-900" />,
      title: 'ClickUp',
      description: 'Gestão de processos e prazos',
      link: 'https://clickup.com',
    },
    {
      icon: <Book className="w-12 h-12 text-blue-900" />,
      title: 'Notion',
      description: 'Organização, banco de dados e anotações',
      link: 'https://notion.so',
    },
    {
      icon: <Brain className="w-12 h-12 text-blue-900" />,
      title: 'ChatGPT',
      description: 'Automatização de textos e atendimento ao cliente',
      link: 'https://chat.openai.com',
    },
    {
      icon: <Brain className="w-12 h-12 text-blue-900" />,
      title: 'Google Gemini',
      description: 'Análise de dados e automação com IA generativa',
      link: 'https://gemini.google.com',
    },
    {
      icon: <Scale className="w-12 h-12 text-blue-900" />,
      title: 'ADVBOX',
      description: 'Controle de tarefas jurídicas e gestão de escritórios',
      link: 'https://advbox.com.br',
    },
    {
      icon: <Scale className="w-12 h-12 text-blue-900" />,
      title: 'JurisIA',
      description: 'Pesquisa jurídica e geração automática de documentos',
      link: 'https://jurisia.com.br',
    },
  ];

  const team = [
    {
      name: 'Fernanda Fabro'
    },
    {
      name: 'Lorraine Nascimento'
    },
    {
      name: 'Cátia do Prado'
    },
    {
      name: 'Paulo Feliciano'
    },
    {
      name: 'Lucas Cordeiro'
    },
    {
      name: 'Rafael Delgado'
    },
    {
      name: 'Ana Paula de Mauro'
    },
  ] as const;

  const insights = [
    {
      icon: <Lightbulb className="w-8 h-8 text-amber-400" />,
      title: 'Você sabia?',
      description: '73% dos escritórios líderes já utilizam IA para tarefas analíticas. Em 2025, este número chegará a 95%. De que lado da história você estará?',
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-amber-400" />,
      title: 'O Futuro é Agora',
      description: 'A cada minuto gasto em tarefas repetitivas, você perde oportunidades estratégicas. A IA não substitui advogados - ela os eleva a um novo patamar de excelência.',
    },
    {
      icon: <Target className="w-8 h-8 text-amber-400" />,
      title: 'Impacto Real',
      description: 'Escritórios que adotaram IA reportam redução de 70% em erros processuais e aumento de 40% na satisfação dos clientes. A excelência tem números.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Menu */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm transform transition-all duration-300 hover:shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-blue-900 font-serif transform transition-all duration-300 hover:scale-105">IA no Direito</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.ref)}
                  className={`nav-link transform transition-all duration-300 hover:scale-110 ${
                    activeSection === item.id ? 'text-blue-900 font-semibold' : 'text-gray-600 hover:text-blue-900'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-blue-900 transform transition-all duration-300 hover:scale-110"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm animate-slide-down">
            <div className="px-4 py-2 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.ref)}
                  className={`block w-full text-left px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${
                    activeSection === item.id ? 'text-blue-900 bg-blue-50' : 'text-gray-600 hover:text-blue-900 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="section bg-gradient-legal relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-[url('/images/law-ai-bg.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-legal opacity-90"></div>
        <div className="absolute inset-0 bg-pattern opacity-10 animate-pulse-slow"></div>
        <div className="relative z-10 h-screen flex items-center justify-center px-4">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif transform transition-all duration-1000 hover:scale-105 animate-float">
              Mais negócios, menos burocracia
              <span className="block text-amber-400 mt-4 animate-pulse">A revolução da IA no Direito começa agora</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 transform transition-all duration-1000 hover:scale-105 animate-fade-in">
              Em um mundo onde algoritmos decidem causas e contratos se auto-analisam,
              a verdadeira advocacia está na estratégia, não na burocracia.
              Bem-vindo ao amanhã.
            </p>
            <div className="animate-bounce">
              <ChevronDown className="w-12 h-12 text-white mx-auto transform transition-all duration-300 hover:scale-110" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Manifesto Section */}
      <section id="manifesto" ref={manifestoRef} className="py-20 bg-white">
        <AnimatedSection className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-8 transform transition-all duration-500 hover:scale-105 animate-slide-up">Manifesto</h2>
          <div className="space-y-6">
            <AnimatedSection className="transform transition-all duration-500">
              <p className="text-xl text-gray-700 mb-6">
                Rejeitar a IA hoje é como insistir em usar máquina de escrever em 1995.
                É negar o inevitável. É escolher deliberadamente a obsolescência.
              </p>
            </AnimatedSection>
            <AnimatedSection className="transform transition-all duration-500">
              <p className="text-xl text-gray-700 mb-6">
                A verdadeira ameaça não é a IA.
                É a resistência à mudança que deixará profissionais brilhantes presos ao passado,
                enquanto o futuro acontece sem eles.
              </p>
            </AnimatedSection>
            <AnimatedSection className="transform transition-all duration-500">
              <p className="text-xl text-gray-700">
                Este não é apenas um momento de transformação tecnológica.
                É um divisor de águas na história do Direito.
                De que lado você estará?
              </p>
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </section>

      {/* Provocative Questions Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-blue-900">
                Quanto Vale Seu Tempo?
              </h2>
              <p className="text-xl text-gray-600">
                Enquanto você gasta 3 horas revisando um contrato,
                seus concorrentes analisaram 100 usando IA.
                A cada minuto perdido em tarefas mecânicas,
                uma oportunidade estratégica escapa.
              </p>
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-blue-900">
                2025 Já Começou
              </h2>
              <p className="text-xl text-gray-600">
                O escritório do futuro não é ficção - ele já existe.
                Análises instantâneas, petições inteligentes, riscos previstos
                antes de se materializarem. Isso não é futuro. É presente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <AnimatedSection className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-16 transform transition-all duration-500 hover:scale-105 animate-slide-up">
            Revolução em Cada Detalhe
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-white animate-zoom-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="mb-6 transform transition-all duration-300 hover:scale-110 animate-float">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4 transform transition-all duration-300 hover:scale-105">
                  {feature.title}
                </h3>
                <p className="text-gray-600 transform transition-all duration-300 hover:scale-105">{feature.description}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Insights Section */}
      <section className="py-20 bg-blue-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Insights Transformadores
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="bg-blue-800 p-8 rounded-lg hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="mb-6">{insight.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {insight.title}
                </h3>
                <p className="text-gray-300">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-16">
            Histórias de Transformação
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <Gavel className="w-8 h-8 mr-4 text-blue-900" />
                <h3 className="text-2xl font-bold text-blue-900">Thomson Reuters</h3>
              </div>
              <p className="text-gray-600 mb-4">
                "A implementação de IA na análise de documentos reduziu o tempo de revisão em 60% e aumentou a precisão na identificação de cláusulas críticas em 40%. Nossa equipe agora pode focar em análises estratégicas e aconselhamento aos clientes."
              </p>
              <p className="text-amber-600 font-semibold">
                Relatório de Impacto 2023
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <Brain className="w-8 h-8 mr-4 text-blue-900" />
                <h3 className="text-2xl font-bold text-blue-900">LexisNexis</h3>
              </div>
              <p className="text-gray-600 mb-4">
                "Com a integração de IA em nossa plataforma de pesquisa jurídica, observamos um aumento de 50% na eficiência na localização de precedentes relevantes. A precisão das buscas aumentou em 35%, reduzindo significativamente o tempo de pesquisa."
              </p>
              <p className="text-amber-600 font-semibold">
                Estudo de Caso 2023
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="py-20 bg-gradient-to-b from-blue-900 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            2025: Seu Escritório Será Assim
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Imagine chegar ao escritório e encontrar análises profundas de todos os casos do dia,
            geradas durante a noite. Petições preliminares aguardando sua revisão estratégica.
            Riscos identificados antes de se tornarem problemas.
          </p>
          <p className="text-xl text-gray-300 mb-12">
            Este não é um futuro distante. É a realidade de quem já começou a transformação.
            A única questão é: quando você começará a sua?
          </p>
          <div className="inline-flex items-center space-x-2 text-amber-400 text-xl font-semibold cursor-pointer hover:text-amber-300 transition-colors">
            <span>Comece Sua Transformação Agora</span>
            <ArrowRight className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* Objetivos Section */}
      <section id="objetivos" ref={objetivosRef} className="py-20 bg-gray-50">
        <AnimatedSection className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-16 transform transition-all duration-500 hover:scale-105 animate-slide-up">
            Objetivos do Projeto
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-blue-50 animate-zoom-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="mb-6 transform transition-all duration-300 hover:scale-110 animate-float">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4 transform transition-all duration-300 hover:scale-105">
                  {feature.title}
                </h3>
                <p className="text-gray-600 transform transition-all duration-300 hover:scale-105">{feature.description}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Tools Section */}
      <section id="ferramentas" ref={ferramentasRef} className="section bg-white py-20">
        <AnimatedSection className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-16 transform transition-all duration-500 hover:scale-105 animate-slide-up">
            Ferramentas de IA Usadas no Projeto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-blue-50 animate-zoom-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-blue-100 p-3 rounded-lg transform transition-all duration-300 hover:scale-110">
                    {tool.icon}
                  </div>
                  <h3 className="text-xl font-bold text-blue-900">{tool.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{tool.description}</p>
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-900 hover:text-blue-700 font-medium transform transition-all duration-300 hover:scale-105"
                >
                  Acessar ferramenta
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Podcast Section */}
      <section id="podcast" ref={podcastRef} className="py-20 bg-gray-50">
        <AnimatedSection className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-16 transform transition-all duration-500 hover:scale-105 animate-slide-up">
            Podcast
          </h2>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-zoom-in">
            <div className="flex items-center space-x-4 mb-6">
              <Mic className="w-12 h-12 text-blue-900" />
              <h3 className="text-2xl font-bold text-blue-900">Em breve disponível</h3>
            </div>
            <p className="text-gray-600">
              Estamos preparando um podcast especial para discutir os impactos da IA no Direito.
              Fique atento às nossas redes sociais para mais informações.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Metodologia Section */}
      <section id="metodologia" ref={metodologiaRef} className="py-20 bg-white">
        <AnimatedSection className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-16 transform transition-all duration-500 hover:scale-105 animate-slide-up">
            Metodologia
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-zoom-in">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Pesquisa e Análise</h3>
              <p className="text-gray-600">
                Realizamos uma extensa pesquisa sobre as ferramentas de IA disponíveis no mercado
                e analisamos seu potencial impacto no setor jurídico.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-zoom-in">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Testes Práticos</h3>
              <p className="text-gray-600">
                Implementamos e testamos as ferramentas em casos reais, avaliando sua eficiência
                e impacto na produtividade dos profissionais do Direito.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Team Section */}
      <section id="equipe" ref={equipeRef} className="section bg-white py-20">
        <AnimatedSection className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center font-serif transform transition-all duration-500 hover:scale-105 animate-slide-up">Nossa Equipe</h2>
          <div className="mb-16 text-center max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 mb-6 transform transition-all duration-500 hover:scale-105 animate-fade-in">
              Somos alunos do 7º semestre da Escola Paulista de Direito, unidos por uma visão comum: 
              transformar a prática jurídica através da inovação tecnológica.
            </p>
            <p className="text-lg text-gray-700 mb-6 transform transition-all duration-500 hover:scale-105 animate-fade-in">
              Este projeto nasceu da necessidade de compreender e aplicar as ferramentas de Inteligência Artificial 
              no contexto jurídico, visando otimizar processos, reduzir custos operacionais e elevar o padrão de 
              excelência na prestação de serviços jurídicos.
            </p>
            <p className="text-lg text-gray-700 transform transition-all duration-500 hover:scale-105 animate-fade-in">
              Nossa missão é capacitar profissionais do Direito a enfrentar os desafios da era digital, 
              mantendo sempre o compromisso com a ética, a qualidade e a eficiência na prestação de serviços jurídicos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-blue-50 animate-zoom-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-semibold text-blue-900 mb-2 transform transition-all duration-300 hover:scale-105">{member.name}</h3>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Footer Section */}
      <footer id="redes" ref={redesRef} className="bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-2 text-blue-900 transform transition-all duration-300 hover:scale-110 animate-float">
              <Instagram className="w-5 h-5" />
              <span className="text-sm font-medium">@ia_no_direito</span>
            </div>
            <p className="text-sm text-gray-600 text-center max-w-md transform transition-all duration-300 hover:scale-105">
              Acompanhe nossas atualizações e insights sobre IA no Direito
            </p>
            <div className="border-t border-gray-200 w-full max-w-md pt-4">
              <p className="text-xs text-gray-500 text-center transform transition-all duration-300 hover:scale-105">
                Projeto desenvolvido por alunos do 7º semestre da Escola Paulista de Direito
              </p>
              <p className="text-xs text-gray-500 text-center mt-2 transform transition-all duration-300 hover:scale-105">
                Parceria técnica: Paulo Akira - Aluno do 3º semestre de Engenharia de Software - FIAP
              </p>
              <a 
                href="https://www.linkedin.com/in/paulo-akira-okama" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-blue-900 transition-colors duration-300 mt-2 block"
              >
                LinkedIn: Paulo Akira Okama
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;