"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import { useScreenSize } from "../hooks/useScreenSize";

const dialogos = [
  "Bem-vindo ao Movie Studio Tycoon!",
  "Meu nome é Victor.",
  "Eu vou ajudá-lo a construir o maior estúdio cinematográfico do mundo.",
  "Você poderá produzir filmes e criar franquias famosas.",
  "Mas antes de começarmos...",
  "Qual é seu nome?",
];

const localizacoes = [
  "Hollywood",
  "Brasil",
  "Inglaterra",
  "Mumbai",
  "Tóquio",
];

export default function PageIntro() {
  const router = useRouter();

  const { width } = useScreenSize();

  const isMobile = width <= 768;

  const isTablet =
    width >= 768 && width < 1280;

  const [step, setStep] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  const [playerName, setPlayerName] = useState("");
  const [studioName, setStudioName] = useState("");
  const [location, setLocation] = useState("");

  const estaNaIntroducao =
    step >= 0 && step < dialogos.length;

  const estaNoNomeDoJogador =
    step === dialogos.length - 1;

  const estaNoNomeDoEstudio = step === 100;
  const estaNaLocalizacao = step === 200;

  const avancarDialogo = useCallback(() => {
    if (!estaNaIntroducao || !typingDone) {
      return;
    }

    if (step < dialogos.length - 1) {
      setTypingDone(false);
      setStep((stepAtual) => stepAtual + 1);
    }
  }, [estaNaIntroducao, step, typingDone]);

  const confirmarNome = useCallback(() => {
    const nomeLimpo = playerName.trim();

    if (!nomeLimpo) {
      return;
    }

    localStorage.setItem("playerName", nomeLimpo);

    setPlayerName(nomeLimpo);
    setStep(100);
  }, [playerName]);

  const confirmarEstudio = useCallback(() => {
    const nomeLimpo = studioName.trim();

    if (!nomeLimpo) {
      return;
    }

    localStorage.setItem("studioName", nomeLimpo);

    setStudioName(nomeLimpo);
    setStep(200);
  }, [studioName]);

  const confirmarLocal = useCallback(() => {
    if (!location) {
      return;
    }

    localStorage.setItem("studioLocation", location);

    localStorage.setItem("level", "1");
    localStorage.setItem("fame", "0");
    localStorage.setItem("money", "100000");
    localStorage.setItem("technology", "0");
    localStorage.setItem("prestige", "0");
    localStorage.setItem("year", "1980");

    router.push("/worldmap");
  }, [location, router]);

  useEffect(() => {
    const aoPressionarTecla = (
      event: KeyboardEvent
    ) => {
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
          return;
        }

        if (estaNoNomeDoEstudio) {
          confirmarEstudio();
        }

        return;
      }

      if (
        estaNaIntroducao &&
        !estaNoNomeDoJogador &&
        typingDone
      ) {
        avancarDialogo();
        return;
      }

      if (estaNaLocalizacao && location) {
        confirmarLocal();
      }
    };

    window.addEventListener(
      "keydown",
      aoPressionarTecla
    );

    return () => {
      window.removeEventListener(
        "keydown",
        aoPressionarTecla
      );
    };
  }, [
    avancarDialogo,
    confirmarEstudio,
    confirmarLocal,
    confirmarNome,
    estaNaIntroducao,
    estaNaLocalizacao,
    estaNoNomeDoEstudio,
    estaNoNomeDoJogador,
    location,
    typingDone,
  ]);

  return (
    <main
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#000000",
      }}
    >
      {/* CENÁRIO */}

      <img
        src="/images/intro_background.jpg"
        alt="Cenário do estúdio"
        draggable={false}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* CONTRASTE */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.08)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* VICTOR */}

<div
  style={{
    position: "absolute",

    left: isMobile
      ? "-15vw"
      : isTablet
      ? "-10vw"
      : "-6vw",

    bottom: 0,

    width: isMobile
      ? "92vw"
      : isTablet
      ? "72vw"
      : "62vw",

    height: "100vh",

    overflow: "hidden",

    pointerEvents: "none",

    zIndex: 20,
  }}
>
  <img
    src="/images/mentor.png"
    alt="Victor"
    draggable={false}
    style={{
      position: "absolute",

      left: 0,

      bottom: isMobile
        ? "-50vh"
        : isTablet
        ? "-56vh"
        : "-58vh",

      height: isMobile
        ? "140vh"
        : isTablet
        ? "155vh"
        : "170vh",

      width: "auto",

      maxWidth: "none",

      objectFit: "contain",
      objectPosition: "left bottom",

      pointerEvents: "none",

      userSelect: "none",

      filter:
        "drop-shadow(12px 9px 16px rgba(0,0,0,0.5))",
    }}
  />
</div>


      {/* BALÃO DE DIÁLOGO */}

      <section
        onClick={
          estaNaIntroducao &&
          !estaNoNomeDoJogador &&
          typingDone
            ? avancarDialogo
            : undefined
        }
        style={{
  position: "absolute",

  left: isMobile
    ? "5%"
    : "52.5%",

  top: isMobile
    ? "55%"
    : "19%",

  width: isMobile
    ? "90vw"
    : "min(560px, 42vw)",

  minWidth: isMobile
    ? "90vw"
    : "360px",

  minHeight: "210px",

  zIndex: 30,
}}
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
        {/* PONTA EXTERNA */}

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

        {/* PONTA INTERNA */}

        <div
          style={{
            position: "absolute",
            left: "-33px",
            top: "93px",
            width: 0,
            height: 0,
            borderTop: "20px solid transparent",
            borderBottom: "20px solid transparent",
            borderRight:
              "34px solid rgba(0, 0, 0, 0.85)",
          }}
        />

        <h2 className="mb-4 text-2xl font-bold text-yellow-400">
          Victor
        </h2>

        {/* CONVERSA INICIAL */}

        {estaNaIntroducao && (
          <>
            <TypewriterText
              key={`dialogo-${step}`}
              text={dialogos[step]}
              speed={30}
              onComplete={() => {
                setTypingDone(true);
              }}
            />

            {typingDone &&
              !estaNoNomeDoJogador && (
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

                  <span className="animate-bounce text-2xl text-white">
                    ▼
                  </span>
                </button>
              )}

            {typingDone &&
              estaNoNomeDoJogador && (
                <div className="mt-5">
                  <input
                    type="text"
                    value={playerName}
                    onChange={(event) =>
                      setPlayerName(event.target.value)
                    }
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

        {/* NOME DO ESTÚDIO */}

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
              onChange={(event) =>
                setStudioName(event.target.value)
              }
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

        {/* LOCALIZAÇÃO */}

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

type TypewriterTextProps = {
  text: string;
  speed?: number;
  onComplete: () => void;
};

function TypewriterText({
  text,
  speed = 30,
  onComplete,
}: TypewriterTextProps) {
  const [visibleCharacters, setVisibleCharacters] =
    useState(0);

  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    completedRef.current = false;

    const timer = window.setInterval(() => {
      setVisibleCharacters((currentValue) => {
        const nextValue = Math.min(
          currentValue + 1,
          text.length
        );

        if (
          nextValue === text.length &&
          !completedRef.current
        ) {
          completedRef.current = true;

          window.clearInterval(timer);

          window.setTimeout(() => {
            onCompleteRef.current();
          }, 0);
        }

        return nextValue;
      });
    }, speed);

    return () => {
      window.clearInterval(timer);
    };
  }, [speed, text]);

  const visibleText = text.slice(
    0,
    visibleCharacters
  );

  const isTyping =
    visibleCharacters < text.length;

  return (
    <p className="min-h-[90px] text-2xl leading-relaxed tracking-wide">
      {visibleText}

      {isTyping && (
        <span className="ml-1 inline-block animate-pulse">
          ▌
        </span>
      )}
    </p>
  );
}