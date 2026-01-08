import { useState, useEffect } from 'react';
import { getDogRecommendations, getRandomDogImages } from './services/api';
import { questions } from './data/questions';
import { Linkedin, Instagram } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState<'welcome' | 'quiz' | 'results'>('welcome'); 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bgImages, setBgImages] = useState<string[]>([]);
  const [currentImg, setCurrentImg] = useState(0);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    getRandomDogImages().then(setBgImages);
  }, []);

  // Timer do carrossel corrigido para garantir a troca [cite: 2026-01-08]
  useEffect(() => {
    if (bgImages.length === 0) return;
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % bgImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [bgImages]);

  const handleReset = () => {
    setCurrentQuestion(0);
    setStep('welcome');
    setRecommendations([]);
  };

  const handleOptionClick = (questionId: string, value: string) => {
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) setCurrentQuestion(currentQuestion + 1);
      else handleFinalSubmit();
    }, 300);
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    setStep('results');
    try {
      const data = await getDogRecommendations({});
      setRecommendations(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white relative overflow-hidden font-sans text-black">
      
      <nav className="relative z-50 h-20 flex items-center px-20 w-full">
        <div className="text-2xl font-black tracking-tighter uppercase italic cursor-pointer" onClick={handleReset}>
          Cão<span className="text-cao-medium font-normal not-italic opacity-30">Ideal</span>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center px-20 relative z-10">
        <div className="flex flex-row gap-32 w-full max-w-[1400px] mx-auto items-center justify-center translate-x-10">
          
          <div className="flex flex-col justify-center items-start space-y-10 w-full max-w-lg">
            {step === 'welcome' && (
              <div className="animate-in fade-in slide-in-from-left-10 duration-700 space-y-8">
                <h1 className="text-7xl md:text-[85px] font-black leading-[0.85] uppercase tracking-tighter">
                  Seu Match<br/><span className="text-cao-medium italic">Canino.</span>
                </h1>
                <p className="text-xl font-medium text-black/50 max-w-md">A inteligência que conecta você ao seu novo melhor amigo.</p>
                <button onClick={() => setStep('quiz')} className="px-16 py-6 bg-black text-white rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl hover:scale-105 transition-all">
                  Iniciar Teste
                </button>
              </div>
            )}

            {step === 'quiz' && (
              <div className="w-full flex flex-col items-center text-center space-y-8 animate-in zoom-in-95">
                <h2 className="text-3xl font-black uppercase tracking-tighter leading-tight">
                  {questions[currentQuestion].title}<br/>
                  <span className="text-cao-medium italic">{questions[currentQuestion].subtitle}</span>
                </h2>
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  {questions[currentQuestion].options.map(option => (
                    <button key={option.value} onClick={() => handleOptionClick('', '')} className="py-4 px-6 border border-black/10 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'results' && (
              <div className="w-full space-y-6 animate-in fade-in">
                <h2 className="text-5xl font-black uppercase italic tracking-tighter">Seu Top 3</h2>
                <div className="space-y-4 w-full">
                  {recommendations.slice(0, 3).map((dog, i) => (
                    <div key={i} className="flex items-center gap-6 p-6 border border-black/5 rounded-[2.5rem] bg-gray-50/50">
                      <img src={dog.image} className="w-20 h-20 rounded-3xl object-cover shadow-lg" alt="" />
                      <div>
                        <h3 className="font-black text-lg uppercase">#{i+1} {dog.name}</h3>
                        <p className="text-[10px] font-bold opacity-40 uppercase italic leading-tight">"{dog.description}"</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={handleReset} className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-all">Reiniciar</button>
              </div>
            )}
          </div>

          <div className="hidden lg:block shrink-0">
             <div className="relative w-[550px] h-[650px] rounded-[6rem] overflow-hidden border-[15px] border-white shadow-2xl bg-gray-50">
                {bgImages.map((img, index) => (
                  <img key={index} src={img} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImg ? 'opacity-100' : 'opacity-0'}`} alt="" />
                ))}
             </div>
          </div>
        </div>
      </main>

      {/* RODAPÉ MINIMALISTA: Texto pequeno à esquerda e ícones vazados [cite: 2026-01-08] */}
      <footer className="h-24 flex items-center px-20 w-full border-t border-black/5">
        <div className="flex-grow">
           <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-black/30">
             Desenvolvido por Vinícius Fardin em 2026
           </p>
        </div>
        <div className="flex gap-6 items-center">
          <a href="https://www.linkedin.com/in/vinicius-fardin-de-figueiredo-7864a7173/" className="text-black transition-transform active:scale-90"><Linkedin size={20} strokeWidth={2} /></a>
          <a href="https://www.instagram.com/viniciusfardinf/" className="text-black transition-transform active:scale-90"><Instagram size={20} strokeWidth={2} /></a>
        </div>
      </footer>
    </div>
  );
}