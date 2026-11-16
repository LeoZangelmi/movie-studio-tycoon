"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HudButton from "../components/HudButton";

type GameData = {
  level: number;
  fame: number;
  money: number;
  technology: number;
  prestige: number;
  year: number;
  studioName: string;
  studioLocation: string;
};

const DEFAULT_GAME_DATA: GameData = {
  level: 1,
  fame: 0,
  money: 100000,
  technology: 0,
  prestige: 0,
  year: 1980,
  studioName: "Meu Estúdio",
  studioLocation: "Sem localização",
};

export default function PageWorldMap() {
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);

  const [gameData, setGameData] =
    useState<GameData>(DEFAULT_GAME_DATA);

  useEffect(() => {
    const readNumber = (
      key: string,
      fallback: number
    ): number => {
      const savedValue = localStorage.getItem(key);

      if (savedValue === null) {
        return fallback;
      }

      const parsedValue = Number(savedValue);

      return Number.isFinite(parsedValue)
        ? parsedValue
        : fallback;
    };

    setGameData({
      level: readNumber("level", 1),
      fame: readNumber("fame", 0),
      money: readNumber("money", 100000),
      technology: readNumber("technology", 0),
      prestige: readNumber("prestige", 0),
      year: readNumber("year", 1980),

      studioName:
        localStorage.getItem("studioName") ||
        DEFAULT_GAME_DATA.studioName,

      studioLocation:
        localStorage.getItem("studioLocation") ||
        DEFAULT_GAME_DATA.studioLocation,
    });

    setLoaded(true);
  }, []);

  const formatMoney = (value: number): string => {
    return `US$ ${value.toLocaleString("pt-BR")}`;
  };

  if (!loaded) {
    return (
      <main
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#020617",
        }}
      />
    );
  }

  return (
    <main
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#020617",
      }}
    >
      {/*
        CANVAS PRINCIPAL

        A imagem hud_base.png possui 1536 × 1024,
        portanto sua proporção original é 3:2.

        O canvas é ampliado até preencher a largura
        e fica ancorado no rodapé. Em telas 16:9,
        uma pequena parte superior é cortada, mas
        mapa e HUD não são achatados.
      */}

      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 0,

          width: "100vw",
          aspectRatio: "3 / 2",

          transform: "translateX(-50%)",

          overflow: "visible",

          zIndex: 1,
        }}
      >
        {/* MAPA E HUD BASE */}

        <img
          src="/images/hud/hud_base.png"
          alt="Mapa-múndi e interface principal"
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,

            display: "block",

            width: "100%",
            height: "100%",

            objectFit: "contain",
            objectPosition: "center bottom",

            userSelect: "none",
            pointerEvents: "none",

            zIndex: 1,
          }}
        />

        {/* NÍVEL */}

        <HudValue
          left="12.8%"
          top="84.7%"
          width="5%"
          title="Nível"
          value={gameData.level}
        />

        {/* FAMA */}

        <HudValue
          left="19.7%"
          top="84.7%"
          width="5%"
          title="Fama"
          value={gameData.fame}
        />

        {/* DINHEIRO */}

        <HudValue
          left="26.8%"
          top="85.2%"
          width="9%"
          title="Dinheiro"
          value={formatMoney(gameData.money)}
          compact
        />

        {/* TECNOLOGIA */}

        <HudValue
          left="35.6%"
          top="84.7%"
          width="5%"
          title="Tecnologia"
          value={gameData.technology}
        />

        {/* PRESTÍGIO */}

        <HudValue
          left="43.9%"
          top="84.7%"
          width="5%"
          title="Prestígio"
          value={gameData.prestige}
        />

        {/* LOCALIZAÇÃO E ESTÚDIO */}

        <div
          title={`${gameData.studioLocation} - ${gameData.studioName}`}
          style={{
            position: "absolute",

            left: "55.6%",
            top: "84.6%",
            width: "14.5%",

            transform: "translate(-50%, -50%)",

            overflow: "hidden",

            color: "#ffe1a0",

            fontFamily:
              "Georgia, 'Times New Roman', serif",

            textAlign: "center",

            textShadow:
              "0 2px 1px #000, 0 0 4px #000, 0 0 8px rgba(0, 0, 0, 0.95)",

            pointerEvents: "none",

            zIndex: 10,
          }}
        >
          <div
            style={{
              overflow: "hidden",

              fontSize:
                "clamp(9px, 0.92vw, 17px)",

              fontWeight: 900,
              lineHeight: 1,

              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {gameData.studioLocation}
          </div>

          <div
            style={{
              marginTop: "4px",

              overflow: "hidden",

              color: "#d8af6d",

              fontSize:
                "clamp(7px, 0.62vw, 11px)",

              fontWeight: 700,
              lineHeight: 1,

              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {gameData.studioName}
          </div>
        </div>

        {/* ANO */}

        <HudValue
          left="67.4%"
          top="84.7%"
          width="5.8%"
          title="Ano"
          value={gameData.year}
        />

        {/* BOTÃO MAPA */}

        <HudButton
          label="Mapa"
          imageSrc="/images/hud/button_map.png"
          left="71.9%"
          top="79.3%"
          width="5.45%"
          height="12.8%"
          active
          onClick={() => router.push("/worldmap")}
        />

        {/* BOTÃO ESTÚDIOS */}

        <HudButton
          label="Estúdios"
          imageSrc="/images/hud/button_studio.png"
          left="77.45%"
          top="79.3%"
          width="5.45%"
          height="12.8%"
          onClick={() => router.push("/studio")}
        />

        {/* BOTÃO EVENTOS */}

        <HudButton
          label="Eventos"
          imageSrc="/images/hud/button_events.png"
          left="83%"
          top="79.3%"
          width="5.45%"
          height="12.8%"
          onClick={() => router.push("/events")}
        />

        {/* BOTÃO MISSÕES */}

        <HudButton
          label="Missões"
          imageSrc="/images/hud/button_missions.png"
          left="88.55%"
          top="79.3%"
          width="5.45%"
          height="12.8%"
          onClick={() => router.push("/missions")}
        />

        {/* BOTÃO OPÇÕES */}

        <HudButton
          label="Opções"
          imageSrc="/images/hud/button_settings.png"
          left="94.1%"
          top="79.3%"
          width="5.45%"
          height="12.8%"
          onClick={() => router.push("/settings")}
        />
      </div>
    </main>
  );
}

type HudValueProps = {
  left: string;
  top: string;
  width: string;
  title: string;
  value: string | number;
  compact?: boolean;
};

function HudValue({
  left,
  top,
  width,
  title,
  value,
  compact = false,
}: HudValueProps) {
  return (
    <div
      title={`${title}: ${value}`}
      style={{
        position: "absolute",

        left,
        top,
        width,

        transform: "translate(-50%, -50%)",

        overflow: "hidden",

        color: "#ffe1a0",

        fontFamily:
          "Georgia, 'Times New Roman', serif",

        fontSize: compact
          ? "clamp(8px, 0.84vw, 16px)"
          : "clamp(10px, 1vw, 20px)",

        fontWeight: 900,
        lineHeight: 1,

        textAlign: "center",
        textOverflow: "ellipsis",

        textShadow:
          "0 2px 1px #000, 0 0 4px #000, 0 0 8px rgba(0, 0, 0, 0.95)",

        whiteSpace: "nowrap",

        pointerEvents: "none",

        zIndex: 10,
      }}
    >
      {value}
    </div>
  );
}