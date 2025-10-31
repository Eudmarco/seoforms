import React, { useState, useEffect, ReactNode } from 'react';
import type { FormData } from './types';
import { Section, InputGroup, CheckboxGroup, RadioGroup } from './components/FormControls';
import { BuildingIcon, TargetIcon, UsersIcon, WrenchIcon, DollarSignIcon, InfoIcon, FileTextIcon, ChatIcon, ChevronUpIcon, CheckCircleIcon } from './components/Icons';
import Modal from './components/Modal';

const initialFormData: FormData = {
  fullName: '',
  companyName: '',
  phone: '',
  email: '',
  website: '',
  niche: '',
  objectives: [],
  otherObjective: '',
  challenge: '',
  targetAudience: '',
  competitors: '',
  services: [],
  budget: '',
  deadline: '',
  foundUsBy: '',
  additionalInfo: '',
};

const OBJECTIVE_OPTIONS = [
    'Aumentar as vendas / Gerar mais leads qualificados',
    'Fortalecer o reconhecimento da minha marca (Branding)',
    'Aumentar o tráfego do meu site',
    'Melhorar o engajamento nas redes sociais',
    'Lançar um novo produto/serviço',
    'Outro',
];

const SERVICE_OPTIONS = [
    'Otimização para Buscas (SEO)',
    'Gestão de Redes Sociais',
    'Anúncios Pagos (Google Ads / Meta Ads)',
    'Criação ou Redesign de Site / Landing Page',
    'Automação com Chatbot',
    'Não tenho certeza, preciso de uma recomendação.',
];

const BUDGET_OPTIONS = [
    'Até R$ 1.000',
    'Entre R$ 1.000 e R$ 2.500',
    'Entre R$ 2.500 e R$ 5.000',
    'Acima de R$ 5.000',
    'Prefiro discutir essa questão por telefone',
];

const LegalContent: React.FC<{title: string; children: ReactNode}> = ({title, children}) => (
  <>
    <h3 className="text-lg font-bold text-gray-100 mb-2">{title}</h3>
    <div className="space-y-3 text-sm">{children}</div>
  </>
);

const legalContentData = {
  terms: {
    title: "Termos de Uso",
    content: (
      <div className="prose prose-invert prose-sm max-w-none">
        <p>Bem-vindo ao nosso formulário de análise. Ao utilizá-lo, você concorda com estes Termos de Uso. Leia-os com atenção.</p>
        <LegalContent title="1. Finalidade do Serviço">
          <p>Este formulário foi criado para coletar informações essenciais sobre seu projeto, permitindo que nossa equipe <strong>(ESGR)</strong> elabore uma análise e proposta comercial precisa e personalizada. O preenchimento é voluntário.</p>
        </LegalContent>
        <LegalContent title="2. Suas Responsabilidades">
          <p>Ao preencher o formulário, você concorda em fornecer informações verdadeiras, precisas e completas. A qualidade e a exatidão da nossa análise dependem diretamente da veracidade dos dados que você nos fornece.</p>
        </LegalContent>
        <LegalContent title="3. Propriedade Intelectual">
          <p>Todo o conteúdo deste site, incluindo o design, textos, ícones e a estrutura do formulário, é propriedade intelectual da ESGR. O documento PDF gerado é para seu uso e para compartilhamento conosco, mas o modelo e o layout do mesmo são de nossa propriedade.</p>
        </LegalContent>
        <LegalContent title="4. Limitação de Responsabilidade">
          <p>Utilizamos tecnologia segura para proteger seus dados, mas não nos responsabilizamos por falhas de segurança fora do nosso controle (como vulnerabilidades no seu dispositivo ou na rede). Nosso serviço é fornecido "como está", sem garantias de qualquer tipo.</p>
        </LegalContent>
      </div>
    )
  },
  privacy: {
    title: "Política de Privacidade",
    content: (
       <div className="prose prose-invert prose-sm max-w-none">
        <p>Sua privacidade é nossa prioridade. Esta política explica de forma transparente como coletamos, usamos e protegemos os dados que você nos confia através deste formulário, em total conformidade com a Lei Geral de Proteção de Dados (LGPD).</p>
        <LegalContent title="1. Quais dados coletamos?">
          <p>Coletamos exclusivamente as informações que você insere voluntariamente nos campos do formulário. Isso inclui dados de contato (nome, e-mail, telefone) e informações comerciais sobre seu projeto (empresa, objetivos, orçamento, etc.).</p>
        </LegalContent>
        <LegalContent title="2. Para que usamos seus dados?">
          <p>Utilizamos seus dados com uma única e específica finalidade: <strong>elaborar uma análise de marketing digital detalhada e uma proposta comercial personalizada</strong> para o seu negócio, além de viabilizar nosso contato para discutir o projeto.</p>
        </LegalContent>
        <LegalContent title="3. Com quem compartilhamos seus dados?">
          <p>Suas informações são estritamente confidenciais. Elas são compartilhadas apenas com a equipe interna da ESGR envolvida no processo de análise e proposta. <strong>Nós não vendemos, alugamos ou compartilhamos seus dados com terceiros.</strong></p>
        </LegalContent>
        <LegalContent title="4. Segurança e Armazenamento">
          <p>A análise em PDF é gerada e baixada diretamente no seu dispositivo. O envio via WhatsApp é uma ação iniciada por você, utilizando a criptografia e a segurança da própria plataforma de mensagens.</p>
        </LegalContent>
        <LegalContent title="5. Seus Direitos">
          <p>A qualquer momento, você pode solicitar o acesso, a correção ou a exclusão dos seus dados de nossos registros. Para mais detalhes, consulte nosso Termo LGPD ou entre em contato.</p>
        </LegalContent>
      </div>
    )
  },
  cookies: {
    title: "Política de Cookies",
    content: (
      <div className="prose prose-invert prose-sm max-w-none">
        <p>Para garantir a transparência, explicamos abaixo como utilizamos cookies nesta página.</p>
        <LegalContent title="1. O que são Cookies?">
          <p>Cookies são pequenos arquivos de texto que os sites armazenam no seu dispositivo (computador, celular) para melhorar sua experiência de navegação, lembrando de ações e preferências.</p>
        </LegalContent>
        <LegalContent title="2. Como Usamos os Cookies?">
          <p>Esta página utiliza apenas <strong>cookies estritamente necessários (essenciais)</strong>. Eles são fundamentais para o funcionamento técnico do site, garantindo que o formulário funcione corretamente e que sua navegação seja segura.</p>
          <p><strong>Nós não utilizamos cookies de publicidade, rastreamento ou de terceiros que compartilhem seus dados.</strong> Sua privacidade é integralmente respeitada.</p>
        </LegalContent>
         <LegalContent title="3. Como Gerenciar Cookies?">
          <p>Como usamos apenas cookies essenciais, não há uma opção para desativá-los sem comprometer o funcionamento da página. No entanto, você pode controlar ou excluir cookies através das configurações do seu navegador de internet (Google Chrome, Firefox, etc.).</p>
        </LegalContent>
      </div>
    )
  },
  lgpd: {
    title: "Termo LGPD",
    content: (
       <div className="prose prose-invert prose-sm max-w-none">
        <p>A <strong>ESGR Desenvolvimento de Sistemas & Marketing Digital</strong> leva a sério a proteção dos seus dados e está totalmente em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).</p>
        <LegalContent title="1. Controlador dos Dados">
          <p>A ESGR, inscrita no CNPJ 35.489.200/0001-34, é a empresa controladora responsável pelo tratamento dos dados pessoais coletados através deste formulário.</p>
        </LegalContent>
        <LegalContent title="2. Finalidade do Tratamento de Dados">
          <p>O tratamento dos seus dados tem a finalidade exclusiva de: (a) elaborar a análise de marketing solicitada, (b) gerar a proposta comercial correspondente e (c) permitir o contato da nossa equipe para discutir o projeto.</p>
        </LegalContent>
        <LegalContent title="3. Seus Direitos como Titular dos Dados">
          <p>De acordo com a LGPD, você possui plenos direitos sobre seus dados. A qualquer momento, você pode solicitar:</p>
            <ul className="list-disc pl-5">
              <li><strong>Acesso:</strong> Saber quais dados seus nós possuímos.</li>
              <li><strong>Correção:</strong> Corrigir dados incompletos, inexatos ou desatualizados.</li>
              <li><strong>Eliminação:</strong> Solicitar a exclusão definitiva dos seus dados de nossas bases.</li>
              <li><strong>Revogação do Consentimento:</strong> Retirar seu consentimento para o uso dos dados.</li>
            </ul>
        </LegalContent>
        <LegalContent title="4. Canal de Atendimento ao Titular">
            <p>Para exercer seus direitos, esclarecer dúvidas ou fazer qualquer solicitação referente à proteção dos seus dados, por favor, entre em contato conosco pelo e-mail: <strong>contato@esgrmkt.com.br</strong></p>
        </LegalContent>
      </div>
    )
  },
}

type ModalType = keyof typeof legalContentData;

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [legalModalContent, setLegalModalContent] = useState<{ title: string; content: ReactNode } | null>(null);
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setIsLoaded(true);
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 700);
      }, 500);
    }
  }, []);
  
  const openLegalModal = (type: ModalType) => {
    setLegalModalContent(legalContentData[type]);
  };

  const closeLegalModal = () => {
    setLegalModalContent(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    const currentValues = formData[name as keyof FormData] as string[];
    
    if (checked) {
      setFormData((prev) => ({ ...prev, [name]: [...currentValues, value] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: currentValues.filter((item) => item !== value) }));
    }
  };

  const handleConfirmSubmit = () => {
    setIsGenerating(true);
    try {
      // @ts-ignore
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });
      const pageHeight = doc.internal.pageSize.height;
      const pageWidth = doc.internal.pageSize.width;
      const margin = 20;
      let y = margin;

      const addText = (text: string, options: { fontSize?: number; fontStyle?: 'normal' | 'bold'; isTitle?: boolean; isSubtitle?: boolean; spacing?: number, x?: number, isWrapped?: boolean } = {}) => {
        const { fontSize = 10, fontStyle = 'normal', isTitle = false, isSubtitle = false, spacing = 5, x = margin, isWrapped = true } = options;
        
        if (y > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }

        doc.setFontSize(fontSize);
        doc.setFont('helvetica', fontStyle);
        if (isTitle) doc.setTextColor(29, 78, 216);
        else if (isSubtitle) doc.setTextColor(51, 65, 85);
        else doc.setTextColor(71, 85, 105);

        const lines = isWrapped ? doc.splitTextToSize(text, pageWidth - margin * 2) : [text];
        doc.text(lines, x, y);
        y += (lines.length * (fontSize / 2.8)) + spacing;
      };

      addText('Briefing de Análise - Marketing Digital', { fontSize: 22, fontStyle: 'bold', isTitle: true, spacing: 15 });
      addText(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, { fontSize: 9, spacing: 10 });
      addText('1. Informações da Empresa e Contato', { fontSize: 16, fontStyle: 'bold', isSubtitle: true, spacing: 8 });
      addText(`Nome / Razão Social: ${formData.fullName || 'N/A'}`);
      addText(`Empresa / Marca: ${formData.companyName || 'N/A'}`);
      addText(`Telefone (WhatsApp): ${formData.phone || 'N/A'}`);
      addText(`E-mail: ${formData.email || 'N/A'}`);
      addText(`Website / Redes Sociais: ${formData.website || 'N/A'}`);
      addText(`Setor / Nicho de Mercado: ${formData.niche || 'N/A'}`, { spacing: 10 });
      addText('2. Objetivos do Projeto', { fontSize: 16, fontStyle: 'bold', isSubtitle: true, spacing: 8 });
      addText(`Principal Objetivo: ${formData.objectives.filter(o => o !== 'Outro').join(', ') || 'N/A'}`);
      if(formData.objectives.includes('Outro')) addText(`Outro Objetivo: ${formData.otherObjective || 'N/A'}`);
      addText(`Maior desafio de marketing: ${formData.challenge || 'N/A'}`, { spacing: 10 });
      addText('3. Público-Alvo e Concorrência', { fontSize: 16, fontStyle: 'bold', isSubtitle: true, spacing: 8 });
      addText(`Cliente Ideal (Público-Alvo): ${formData.targetAudience || 'N/A'}`);
      addText(`Principais Concorrentes: ${formData.competitors || 'N/A'}`, { spacing: 10 });
      addText('4. Serviços de Interesse', { fontSize: 16, fontStyle: 'bold', isSubtitle: true, spacing: 8 });
      addText(formData.services.join('\n') || 'N/A', { spacing: 10 });
      addText('5. Orçamento e Prazos', { fontSize: 16, fontStyle: 'bold', isSubtitle: true, spacing: 8 });
      addText(`Faixa de Investimento Mensal: ${formData.budget || 'N/A'}`);
      addText(`Prazo ou Data de Início: ${formData.deadline || 'N/A'}`, { spacing: 10 });
      addText('6. Informações Adicionais', { fontSize: 16, fontStyle: 'bold', isSubtitle: true, spacing: 8 });
      addText(`Como nos encontrou: ${formData.foundUsBy || 'N/A'}`);
      addText(`Informações Adicionais: ${formData.additionalInfo || 'N/A'}`);
      doc.save(`briefing_${formData.companyName.replace(/\s+/g, '_') || 'cliente'}.pdf`);

      const phoneNumber = '5519988901665';
      let message = `*📄 Briefing de Análise - Marketing Digital 📄*\n\n`;
      message += `*1. Informações da Empresa e Contato*\n`;
      message += `*- Nome / Razão Social:* ${formData.fullName || 'N/A'}\n`;
      message += `*- Empresa / Marca:* ${formData.companyName || 'N/A'}\n`;
      message += `*- Telefone (WhatsApp):* ${formData.phone || 'N/A'}\n`;
      message += `*- E-mail:* ${formData.email || 'N/A'}\n`;
      message += `*- Website / Redes Sociais:* ${formData.website || 'N/A'}\n`;
      message += `*- Setor / Nicho de Mercado:* ${formData.niche || 'N/A'}\n\n`;
      message += `*2. Objetivos do Projeto*\n`;
      message += `*- Principal Objetivo:* ${formData.objectives.filter(o => o !== 'Outro').join(', ') || 'N/A'}\n`;
      if (formData.objectives.includes('Outro')) {
          message += `*- Outro Objetivo:* ${formData.otherObjective || 'N/A'}\n`;
      }
      message += `*- Maior desafio de marketing:* ${formData.challenge || 'N/A'}\n\n`;
      message += `*3. Público-Alvo e Concorrência*\n`;
      message += `*- Cliente Ideal (Público-Alvo):* ${formData.targetAudience || 'N/A'}\n`;
      message += `*- Principais Concorrentes:* ${formData.competitors || 'N/A'}\n\n`;
      message += `*4. Serviços de Interesse*\n`;
      message += `${formData.services.join('\n') || 'N/A'}\n\n`;
      message += `*5. Orçamento e Prazos*\n`;
      message += `*- Faixa de Investimento Mensal:* ${formData.budget || 'N/A'}\n`;
      message += `*- Prazo ou Data de Início:* ${formData.deadline || 'N/A'}\n\n`;
      message += `*6. Informações Adicionais*\n`;
      message += `*- Como nos encontrou:* ${formData.foundUsBy || 'N/A'}\n`;
      message += `*- Informações Adicionais:* ${formData.additionalInfo || 'N/A'}\n`;
      
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, '_blank');
      
      setIsConsentModalOpen(false);
      setIsSubmitted(true);
      // setFormData(initialFormData); // Clear form after submission
    } catch (error) {
        console.error("Erro ao gerar PDF ou redirecionar para o WhatsApp:", error);
        alert("Ocorreu um erro ao processar sua solicitação. Verifique o console para mais detalhes.");
    } finally {
        setIsGenerating(false);
    }
  };

  const handleDisagree = () => {
    setFormData(initialFormData);
    setIsConsentModalOpen(false);
  }

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const whatsappHelpMessage = "Olá! Tenho uma dúvida sobre o preenchimento do formulário de análise e gostaria de ajuda.";
  const whatsappHelpUrl = `https://wa.me/5519988901665?text=${encodeURIComponent(whatsappHelpMessage)}`;


  return (
    <div 
      className={`min-h-screen text-gray-300 font-sans antialiased transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundImage: "url('https://kjunynajewbtxqojxbok.supabase.co/storage/v1/object/public/ESGR/esgr_background.avif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <header className="text-center mb-12">
          <img 
            src="https://kjunynajewbtxqojxbok.supabase.co/storage/v1/object/public/ESGR/logo_esgr.png" 
            alt="ESGR Logo" 
            className="mx-auto h-16 w-auto mb-6"
          />
          <h1 className="text-4xl md:text-5xl font-poppins font-extrabold text-cyan-400 tracking-tight">Formulário de Análise</h1>
          <p className="mt-4 text-lg text-gray-400">Preencha as informações abaixo para gerarmos uma proposta inicial para seu projeto.</p>
        </header>

        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl shadow-purple-500/10 border border-purple-500/20 p-8 md:p-12 min-h-[500px]">
          {!isSubmitted ? (
            <>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-12">
                <Section title="Informações da Empresa e Contato" icon={<BuildingIcon />}>
                    <InputGroup label="Nome Completo / Razão Social" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Seu nome completo ou da empresa" required />
                    <InputGroup label="Nome da Empresa / Marca" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Como sua marca é conhecida" required />
                    <InputGroup label="Telefone com DDD (WhatsApp)" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="(XX) XXXXX-XXXX" type="tel" required />
                    <InputGroup label="E-mail para Contato" name="email" value={formData.email} onChange={handleInputChange} placeholder="seu.email@exemplo.com" type="email" required />
                    <InputGroup label="Website Atual e/ou @ das Redes Sociais" name="website" value={formData.website} onChange={handleInputChange} placeholder="www.seusite.com.br ou @seuperfil" required />
                    <InputGroup label="Qual o seu setor/nicho de mercado?" name="niche" value={formData.niche} onChange={handleInputChange} placeholder="Ex: Varejo de moda, tecnologia B2B, etc." />
                </Section>

                <Section title="Objetivos do Projeto" icon={<TargetIcon />}>
                    <CheckboxGroup label="Qual é o principal objetivo que você deseja alcançar com nossos serviços?" name="objectives" options={OBJECTIVE_OPTIONS} selectedOptions={formData.objectives} onChange={handleCheckboxChange} />
                    {formData.objectives.includes('Outro') && (
                        <InputGroup label="Especifique o outro objetivo" name="otherObjective" value={formData.otherObjective} onChange={handleInputChange} placeholder="Descreva seu objetivo específico" />
                    )}
                    <InputGroup label="Qual é o maior desafio de marketing que sua empresa enfrenta hoje?" name="challenge" value={formData.challenge} onChange={handleInputChange} type="textarea" placeholder="Descreva a dor ou dificuldade que você quer resolver." />
                </Section>
                
                <Section title="Público-Alvo e Concorrência" icon={<UsersIcon />}>
                    <InputGroup label="Descreva brevemente seu cliente ideal (público-alvo)." name="targetAudience" value={formData.targetAudience} onChange={handleInputChange} type="textarea" placeholder="Ex: Idade, gênero, localização, interesses, profissão" />
                    <InputGroup label="Quem são seus 2 ou 3 principais concorrentes?" name="competitors" value={formData.competitors} onChange={handleInputChange} type="textarea" placeholder="Liste os sites ou @ das redes sociais deles" />
                </Section>

                <Section title="Serviços de Interesse" icon={<WrenchIcon />}>
                    <CheckboxGroup label="Quais dos nossos serviços mais lhe interessam?" name="services" options={SERVICE_OPTIONS} selectedOptions={formData.services} onChange={handleCheckboxChange} />
                </Section>
                
                <Section title="Orçamento e Prazos" icon={<DollarSignIcon />}>
                    <RadioGroup label="Qual é a faixa de investimento mensal que você planeja destinar ao marketing digital?" name="budget" options={BUDGET_OPTIONS} selectedValue={formData.budget} onChange={handleInputChange} />
                    <InputGroup label="Existe um prazo final ou data específica para o início do projeto?" name="deadline" value={formData.deadline} onChange={handleInputChange} placeholder="Ex: Lançamento em 3 meses" />
                </Section>
                
                <Section title="Informações Adicionais" icon={<InfoIcon />}>
                    <InputGroup label="Como você nos encontrou?" name="foundUsBy" value={formData.foundUsBy} onChange={handleInputChange} placeholder="Ex: Google, Indicação, Instagram" />
                    <InputGroup label="Há mais alguma informação que você gostaria de compartilhar sobre o projeto?" name="additionalInfo" value={formData.additionalInfo} onChange={handleInputChange} type="textarea" placeholder="Qualquer detalhe adicional é bem-vindo." />
                </Section>
              </form>
              <div className="mt-12 flex justify-end">
                  <button
                      onClick={() => setIsConsentModalOpen(true)}
                      className="inline-flex items-center justify-center px-8 py-4 font-bold text-black bg-lime-400 rounded-lg shadow-lg shadow-lime-400/20 hover:bg-lime-500 focus:outline-none focus:ring-4 focus:ring-lime-400/50 transition-all duration-300 ease-in-out"
                  >
                      <FileTextIcon />
                      Enviar Formulário
                  </button>
              </div>
            </>
          ) : (
             <div className="flex flex-col items-center justify-center h-full text-center py-10">
                <CheckCircleIcon />
                <h2 className="text-3xl font-poppins font-bold text-lime-400 mt-6">Formulário Enviado!</h2>
                <p className="mt-3 max-w-md text-gray-300">
                    Sua análise será baixada em PDF no seu dispositivo. Por favor, envie o arquivo gerado através da conversa que foi aberta no seu WhatsApp.
                </p>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="font-bold font-poppins text-white text-lg">ESGR Desenvolvimento de Sistemas & Marketing Digital</h3>
            <p className="mt-2 text-sm">Rua Francisco Bodini, 114 - Nova Jaguariúna, Jaguariúna - SP</p>
            <p className="text-sm">CNPJ 35.489.200/0001-34</p>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-sm">
                <button onClick={() => openLegalModal('terms')} className="hover:text-cyan-400 transition-colors">Termos de Uso</button>
                <button onClick={() => openLegalModal('privacy')} className="hover:text-cyan-400 transition-colors">Política de Privacidade</button>
                <button onClick={() => openLegalModal('cookies')} className="hover:text-cyan-400 transition-colors">Política de Cookies</button>
                <button onClick={() => openLegalModal('lgpd')} className="hover:text-cyan-400 transition-colors">Termo LGPD</button>
            </nav>
            <p className="mt-6 text-xs text-gray-500">&copy; 2025 ESGR. Todos os direitos reservados.</p>
        </div>
      </footer>
      
      <div className="fixed bottom-6 right-6 flex flex-col items-center space-y-3 z-50">
        <div className="relative">
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
          <a href={whatsappHelpUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="relative w-16 h-16 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110">
              <ChatIcon />
          </a>
        </div>
        <button onClick={scrollTop} aria-label="Scroll to top" className={`w-16 h-16 flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <ChevronUpIcon />
        </button>
      </div>
      
      <Modal isOpen={!!legalModalContent} onClose={closeLegalModal} title={legalModalContent?.title || ''}>
        {legalModalContent?.content}
      </Modal>

      <Modal isOpen={isConsentModalOpen} onClose={() => setIsConsentModalOpen(false)} title="Termo de Consentimento LGPD">
        <div className="space-y-4">
            <p>Ao clicar em "Concordo e Enviar", você consente com o uso dos dados fornecidos neste formulário para a elaboração de uma análise e proposta comercial, em conformidade com a Lei Geral de Proteção de Dados (LGPD).</p>
            <p>Seus dados serão enviados via WhatsApp para nosso time comercial para darmos continuidade ao seu atendimento.</p>
        </div>
        <div className="flex justify-end gap-4 mt-8">
            <button onClick={handleDisagree} className="px-6 py-2 font-bold text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                Não Concordo
            </button>
            <button
                onClick={handleConfirmSubmit}
                disabled={isGenerating}
                className="inline-flex items-center justify-center px-6 py-2 font-bold text-black bg-lime-400 rounded-lg shadow-lg shadow-lime-400/20 hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-400/50 transition-all duration-300 ease-in-out disabled:bg-lime-400/50 disabled:cursor-not-allowed"
            >
                 {isGenerating ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                    </>
                  ) : 'Concordo e Enviar'}
            </button>
        </div>
      </Modal>
    </div>
  );
};

export default App;
