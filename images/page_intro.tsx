"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const dialogos = [
  "Bem-vindo ao Movie Studio Tycoon!",
  "Meu nome é Victor.",
  "Eu vou ajudá-lo a construir o maior estúdio cinematográfico do mundo.",
  "Você poderá produzir filmes e criar franquias famosas.",
  "Mas antes de começarmos...",
  "Como você gostaria de ser chamado?",
];

const localizacoes = [
  "Hollywood",
  "São Bernardo do Campo",
  "Inglaterra",
  "Mumbai",
  "Tóquio",
];

export default function PageIntro() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  const [playerName, setPlayerName] = useState("");
  const [studioName, setStudioName] = useState("");
  const [location, setLocation] = useState("");

  const estaNaIntroducao = step >= 0 && step < dialogos.length;
  const estaNoNomeDoJogador = step === dialogos.length - 1;
  const estaNoNomeDoEstudio = step === 100;
  const estaNaLocalizacao = step === 200;

  useEffect(() => {
    if (!estaNaIntroducao) {
      return;
    }

    const textoCompleto = dialogos[step];
    let indice = 0;

    setDisplayText("");
    setTypingDone(false);

    const timer = window.setInterval(() => {
      indice += 1;
      setDisplayText(textoCompleto.slice(0, indice));

      if (indice >= textoCompleto.length) {
        window.clearInterval(timer);
        setTypingDone(true);
      }
    }, 30);

    return () => {
      window.clearInterval(timer);
    };
  }, [step, estaNaIntroducao]);

  const avancarDialogo = () => {
    if (!estaNaIntroducao) {
      return;
    }

    if (!typingDone) {
      setDisplayText(dialogos[step]);
      setTypingDone(true);
      return;
    }

    if (step < dialogos.length - 1) {
      setStep((stepAtual) => stepAtual + 1);
    }
  };

  const confirmarNome = () => {
    const nomeLimpo = playerName.trim();

    if (!nomeLimpo) {
      return;
    }

    localStorage.setItem("playerName", nomeLimpo);
    setPlayerName(nomeLimpo);
    setStep(100);
  };

  const confirmarEstudio = () => {
    const nomeLimpo = studioName.trim();

    if (!nomeLimpo) {
      return;
    }

    localStorage.setItem("studioName", nomeLimpo);
    setStudioName(nomeLimpo);
    setStep(200);
  };

  const confirmarLocal = () => {
    if (!location) {
      return;
    }

    localStorage.setItem("studioLocation", location);
    router.push("/worldmap");
  };

  useEffect(() => {
    const aoPressionarTecla = (event: KeyboardEvent) => {
      if (event.key !== "Enter") {
        return;
      }

      const elementoAtivo = document.activeElement;
      const estaEmCampo =
        elementoAtivo instanceof HTMLInputElement ||
        elementoAtivo instanceof HTMLTextAreaElement;

      if (estaEmCampo) {
        if (estaNoNomeDoJogador) {
          confirmarNome();
        } else if (estaNoNomeDoEstudio) {
          confirmarEstudio();
        }

        return;
      }

      if (estaNaIntroducao && !estaNoNomeDoJogador) {
        avancarDialogo();
      }

      if (estaNaLocalizacao && location) {
        confirmarLocal();
      }
    };

    window.addEventListener("keydown", aoPressionarTecla);

    return () => {
      window.removeEventListener("keydown", aoPressionarTecla);
    };
  }, [
    step,
    typingDone,
    playerName,
    studioName,
    location,
    estaNaIntroducao,
    estaNoNomeDoJogador,
    estaNoNomeDoEstudio,
    estaNaLocalizacao,
  ]);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Fundo */}
      <img
        src="/images/intro_background.jpg"
        alt="Cenário do estúdio"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Camada de contraste */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Personagem */}
      <img
       src="/images/mentor.png"
       alt="Victor"
       className="absolute bottom-0 left-0 z-20 h-[95vh] w-auto"
       />

      {/* Balão, posicionado depois da abertura do megafone */}
      <section
        onClick={
          estaNaIntroducao && !estaNoNomeDoJogador
            ? avancarDialogo
            : undefined
        }
        style={{
          position: "absolute",
          left: "52.5%",
          top: "19%",
          width: "min(560px, 42vw)",
          minHeight: "210px",
          zIndex: 30,
        }}
        className="
          cursor-default
          rounded-2xl
          border-4
          border-white
          bg-black/85
          p-6
          text-white
          shadow-2xl
          backdrop-blur-sm
        "
      >
        {/* Ponta alinhada à abertura do megafone */}
        <div
          style={{
            position: "absolute",
            left: "-42px",
            top: "88px",
            width: 0,
            height: 0,
            borderTop: "25px solid transparent",
            borderBottom: "25px solid transparent",
            borderRight: "42px solid white",
          }}
        />

        {/* Parte interna escura da ponta */}
        <div
          style={{
            position: "absolute",
            left: "-33px",
            top: "93px",
            width: 0,
            height: 0,
            borderTop: "20px solid transparent",
            borderBottom: "20px solid transparent",
            borderRight: "34px solid rgba(0, 0, 0, 0.85)",
          }}
        />

        <h2 className="mb-4 text-2xl font-bold text-yellow-400">
          Victor
        </h2>

        {/* Conversa inicial */}
        {estaNaIntroducao && (
          <>
            <p className="min-h-[90px] text-2xl leading-relaxed tracking-wide">
              {displayText}
              {!typingDone && (
                <span className="ml-1 inline-block animate-pulse">▌</span>
              )}
            </p>

            {typingDone && !estaNoNomeDoJogador && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  avancarDialogo();
                }}
                className="
                  mt-5
                  flex
                  w-full
                  items-center
                  justify-end
                  gap-2
                  text-sm
                  text-zinc-300
                "
              >
                Clique ou pressione Enter
                <span className="animate-bounce text-2xl text-white">▼</span>
              </button>
            )}

            {typingDone && estaNoNomeDoJogador && (
              <div className="mt-5">
                <input
                  type="text"
                  value={playerName}
                  onChange={(event) => setPlayerName(event.target.value)}
                  placeholder="Digite seu nome..."
                  autoFocus
                  className="
                    w-full
                    rounded-lg
                    border
                    border-zinc-600
                    bg-zinc-900
                    p-4
                    text-lg
                    text-white
                    outline-none
                    focus:border-green-500
                  "
                />

                <button
                  type="button"
                  onClick={confirmarNome}
                  disabled={!playerName.trim()}
                  className="
                    mt-4
                    rounded-lg
                    bg-green-600
                    px-6
                    py-3
                    font-bold
                    transition
                    hover:bg-green-700
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  Confirmar nome
                </button>
              </div>
            )}
          </>
        )}

        {/* Nome do estúdio */}
        {estaNoNomeDoEstudio && (
          <>
            <p className="mb-3 text-2xl leading-relaxed">
              Prazer em conhecê-lo,{" "}
              <span className="font-bold text-green-400">
                {playerName}
              </span>
              .
            </p>

            <p className="mb-5 text-xl">
              Qual será o nome do seu estúdio?
            </p>

            <input
              type="text"
              value={studioName}
              onChange={(event) => setStudioName(event.target.value)}
              placeholder="Nome do estúdio..."
              autoFocus
              className="
                w-full
                rounded-lg
                border
                border-zinc-600
                bg-zinc-900
                p-4
                text-lg
                text-white
                outline-none
                focus:border-green-500
              "
            />

            <button
              type="button"
              onClick={confirmarEstudio}
              disabled={!studioName.trim()}
              className="
                mt-4
                rounded-lg
                bg-green-600
                px-6
                py-3
                font-bold
                transition
                hover:bg-green-700
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              Confirmar estúdio
            </button>
          </>
        )}

        {/* Escolha da localização */}
        {estaNaLocalizacao && (
          <>
            <p className="mb-5 text-2xl leading-relaxed">
              Onde deseja fundar o primeiro estúdio?
            </p>

            <div className="grid max-h-[300px] gap-2 overflow-y-auto pr-1">
              {localizacoes.map((local) => (
                <button
                  key={local}
                  type="button"
                  onClick={() => setLocation(local)}
                  className={`
                    rounded-lg
                    border
                    px-4
                    py-3
                    text-left
                    transition
                    ${
                      location === local
                        ? "border-green-400 bg-green-600"
                        : "border-zinc-600 bg-zinc-900 hover:bg-zinc-800"
                    }
                  `}
                >
                  {local}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={confirmarLocal}
              disabled={!location}
              className="
                mt-5
                rounded-lg
                bg-green-600
                px-6
                py-3
                font-bold
                transition
                hover:bg-green-700
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              Ir para o mapa
            </button>
          </>
        )}
      </section>
    </main>
  );
}