import { Stem } from "./Botanical";
import { PaperScrap, SceneButton, Stamp, Tape } from "./Paper";

const paragraphs = [
  "Oiiee, eu nem sei bem por onde começar...",
  "Você é uma garota surreal, muito incrível, e eu sou muito feliz por ter te conhecido. Me sinto muito feliz do seu lado, e todos os momentos que a gente tem passado juntos têm me feito o garoto mais feliz do mundo.",
  "Eu lembro de te observar de longe e ficar meio com ciúmes quando via outros garotos ao seu redor. Lembro também de quando percebia que, por alguma razão, você me olhava... e eu voltava a ser uma criança boba por dentro. E quando a gente finalmente se conheceu, foi incrível. No outro dia eu contei todo empolgado sobre você pra minha mãe.",
  "Desde então, eu tenho descoberto uma garota com a alma mais bonita do mundo.",
  "E, sinceramente, você é uma garota muito bonita. Eu amo seus olhos. Eles parecem tão profundos, me lembram café... são de um castanho escuro lindo, mas ainda dá pra ver sua pupila um pouquinho mais escura no centro. E eles brilham tanto que às vezes parecem estrelas. Acho que foi por esses olhinhos que eu me apaixonei.",
  "Eu amo sua boca, que é tão fofinha e delicada, e acho que o piercing deixou ela ainda mais linda. Amo seu nariz também, mesmo sem saber explicar exatamente o porquê... eu simplesmente acho seu nariz muitooo fofo.",
  "Seu cabelo é lindo. Eu adoro as ondulações, amo sua franja e adoro o cheiro dele. Na verdade, eu amo seu cheiro inteiro. Gosto muito de te abraçar e sentir aquele cheirinho levemente doce que você tem. Não sei explicar, mas quando estou abraçado com você e sinto seu cheiro, parece que tudo fica mais calmo. Eu me sinto leve.",
  "Eu amo beijar seu rosto e sua testa. Toda vez que te beijo, eu sinto o quanto você é fofa e delicada. E quando eu vejo seu sorriso depois... eu simplesmente me perco completamente em você.",
  "Mas o mais bonito é que, quanto mais eu te conheço, mais percebo que você é muito mais do que tudo isso.",
  "Você é uma garota simples, sensível com as pequenas coisas, que repara em detalhes que ninguém percebe. É meiga, divertida e engraçada, mas também é uma garota muitoooooooooo forte. Você passou por coisas bem paia na vida e sofreu muito com isso, mas mesmo assim continua amando muito as pessoas que estão ao seu redor.",
  "E uma das coisas que mais amo em você é justamente isso: ver os seus olhinhos brilharem quando você fala sobre algo ou alguém que você gosta muito. É como se desse pra enxergar o tamanho do seu coração só olhando pra você.",
  "Foi por esses olhinhos que eu me apaixonei.",
  "E como eu me apaixonei, pô. ❤️",
  "Eu só queria te dizer que EU TE AMO MUITO e que quero poder te amar todos os dias da minha vida. Quero poder ser seu namorado, seu melhor amigo e seu companheiro pra tudo nessa vida.",
  "Quero estar do seu lado nos dias bons, nos dias ruins, nas coisas pequenas e nas coisas enormes. Quero conhecer cada versão sua, acompanhar seus sonhos, comemorar suas conquistas e ser aquele lugar onde você sempre possa se sentir segura e amada.",
  "Você é a minha princesa, a minha doidinha do centro e a pessoa que eu escolhi.",
  "Você é o meu maior orgulho porque, pela primeira vez, sem eu precisar ouvir um \"eu te amo\", eu realmente me sinto amado. Pela primeira vez, sinto que alguém olha pra mim como pessoa e não só como um garoto bonito.",
  "Com você eu não sinto que preciso ser alguma coisa além de mim mesmo. E acho que é isso que torna tudo tão especial.",
  "Eu sinto que você é a pessoa que eu sempre sonhei em encontrar na vida... e, mesmo assim, você é muito mais do que eu poderia ter sonhado.",
  "Eu te amo, Letícia.",
  "E, graças a você, minha vida tem cor outra vez. ❤️",
];

/** Momento 2 — carta em papel pautado, fita e carimbo. */
export function Letter({ onNext }: { onNext: () => void }) {
  return (
    <div className="relative w-full max-w-[40rem] px-3 sm:px-6">
      <PaperScrap rotate={-8} tone="lavender" className="absolute -left-1 top-10 h-24 w-16 opacity-80 sm:left-2" />
      <PaperScrap rotate={6} tone="kraft" className="absolute -right-2 bottom-16 h-20 w-14 opacity-70" />

      <PaperScrap rotate={-1.4} lined torn={false} className="relative px-5 py-10 sm:px-12 sm:py-14" style={{ animation: "rise 1100ms cubic-bezier(.22,1,.36,1) both" }}>
        <Tape className="-left-3 -top-2" rotate={-16} width={120} />
        <Tape className="-right-4 -top-1" rotate={11} width={96} tone="cream" />
        <Tape className="bottom-6 left-4" rotate={-7} width={72} tone="wine" />
        <Stamp className="right-3 top-4 sm:right-6" rotate={9} />

        <div className="pointer-events-none absolute -left-4 top-8 w-14 sm:w-20" aria-hidden>
          <Stem delay={400} height={140} rotate={-18} bloomColor="var(--violet-2)" />
        </div>
        <div className="pointer-events-none absolute -right-3 bottom-8 w-12 sm:w-16" aria-hidden>
          <Stem delay={700} height={120} rotate={16} flip bloomColor="var(--wine)" />
        </div>

        <p className="relative text-center text-[10px] uppercase tracking-[0.42em] sm:text-[11px]" style={{ color: "color-mix(in oklab, var(--wine) 70%, transparent)", fontFamily: "var(--font-stamp)" }}>
          Uma carta para minha princesa
        </p>

        <div className="relative mt-7 space-y-5 sm:mt-9 sm:space-y-6">
          {paragraphs.map((paragraph, i) => (
            <p key={paragraph} className="ink text-left text-[clamp(1.02rem,3.5vw,1.28rem)] leading-relaxed sm:leading-[1.8]" style={{ animation: `rise 800ms cubic-bezier(.22,1,.36,1) ${300 + Math.min(i, 7) * 130}ms both` }}>
              {paragraph === "Eu só queria te dizer que EU TE AMO MUITO e que quero poder te amar todos os dias da minha vida. Quero poder ser seu namorado, seu melhor amigo e seu companheiro pra tudo nessa vida."
                ? <><strong>Eu só queria te dizer que EU TE AMO MUITO</strong> e que quero poder te amar todos os dias da minha vida. Quero poder ser seu namorado, seu melhor amigo e seu companheiro pra tudo nessa vida.</>
                : paragraph === "E, graças a você, minha vida tem cor outra vez. ❤️"
                  ? <>E, graças a você, <strong>minha vida tem cor outra vez.</strong> ❤️</>
                  : paragraph}
            </p>
          ))}
        </div>

        <p className="relative mt-8 text-center text-[1.25rem]" style={{ fontFamily: "var(--font-hand)", color: "var(--violet-4)" }}>
          com todo o meu carinho e amor, <br /> seu futuro namorado, Isaac.
        </p>
        <div className="flex justify-center">
          <SceneButton onClick={onNext} delay={900} invert>continuar</SceneButton>
        </div>
      </PaperScrap>
    </div>
  );
}
