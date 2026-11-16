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
        "Meu Estúdio",

      studioLocation:
        localStorage.getItem("studioLocation") ||
        "Sem localização",
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
      {/* MAPA-MÚNDI */}

      <img
        src="/images/world_map.jpg"
        alt="Mapa-múndi"
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

      {/* SOMBRA DE INTEGRAÇÃO ENTRE MAPA E HUD */}

      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          left: 0,
          height: "clamp(190px, 26vw, 350px)",
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.52) 0%, rgba(0, 0, 0, 0.18) 45%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      {/* HUD SOBREPOSTA AO MAPA */}

      <section
        style={{
          position: "fixed",
          right: 0,
          bottom: 0,
          left: 0,
          width: "100vw",
          height: "clamp(190px, 23vw, 280px)",
          overflow: "visible",
          pointerEvents: "none",
          zIndex: 50,
        }}
      >
        {/*
          Todo o conteúdo está dentro deste canvas.
          Alterar HUD_OFFSET_BOTTOM move arte, números
          e botões ao mesmo tempo.
        */}

        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: "-48px",
            left: 0,
            width: "100%",
            height: "calc(100% + 30px)",
            overflow: "visible",
          }}
        >
          {/* ARTE DA HUD */}

          <img
            src="/images/hud/hud_base.png"
            alt="Interface principal"
            draggable={false}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "fill",
              objectPosition: "center bottom",
              filter:
                "drop-shadow(0 -8px 14px rgba(0, 0, 0, 0.58))",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />

          {/* NÍVEL */}

          <HudValue
            left="13.45%"
            top="66.5%"
            width="5.4%"
            title="Nível"
            value={gameData.level}
          />

          {/* FAMA */}

          <HudValue
            left="20.65%"
            top="66.5%"
            width="4.4%"
            title="Fama"
            value={gameData.fame}
          />

          {/* DINHEIRO */}

          <HudValue
            left="27.2%"
            top="72.5%"
            width="10.2%"
            title="Dinheiro"
            value={formatMoney(gameData.money)}
            compact
          />

          {/* TECNOLOGIA */}

          <HudValue
            left="36.25%"
            top="67.5%"
            width="5.3%"
            title="Tecnologia"
            value={gameData.technology}
          />

          {/* PRESTÍGIO */}

          <HudValue
            left="44.35%"
            top="67.5%"
            width="5.3%"
            title="Prestígio"
            value={gameData.prestige}
          />

          {/* LOCALIZAÇÃO E ESTÚDIO */}

          <div
            title={`${gameData.studioLocation} - ${gameData.studioName}`}
            style={{
              position: "absolute",
              left: "56.4%",
              top: "69.8%",
              width: "14.5%",
              transform: "translate(-50%, -50%)",
              overflow: "hidden",
              color: "#ffe1a0",
              fontFamily: "Georgia, 'Times New Roman', serif",
              textAlign: "center",
              textShadow:
                "0 2px 1px #000, 0 0 4px #000, 0 0 8px rgba(0, 0, 0, 0.95)",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                overflow: "hidden",
                fontSize: "clamp(9px, 0.92vw, 17px)",
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
                marginTop: "5px",
                overflow: "hidden",
                color: "#d8af6d",
                fontSize: "clamp(7px, 0.62vw, 11px)",
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
            left="68.3%"
            top="66.5%"
            width="5.8%"
            title="Ano"
            value={gameData.year}
          />

         {/* MAPA */}

<HudButton
  imageSrc="/images/hud/button_map.png"
  left="58.2%"
  top="45%"
  width="6.4%"
  height="42%"
  active
  onClick={() => router.push("/worldmap")}
/>

{/* ESTÚDIOS */}

<HudButton
  imageSrc="/images/hud/button_studio.png"
  left="64.4%"
  top="45%"
  width="6.4%"
  height="42%"
  onClick={() => router.push("/studio")}
/>

{/* EVENTOS */}

<HudButton
  imageSrc="/images/hud/button_events.png"
  left="70.6%"
  top="45%"
  width="6.4%"
  height="42%"
  onClick={() => router.push("/events")}
/>

{/* MISSÕES */}

<HudButton
  imageSrc="/images/hud/button_missions.png"
  left="76.8%"
  top="45%"
  width="6.4%"
  height="42%"
  onClick={() => router.push("/missions")}
/>

{/* OPÇÕES */}

<HudButton
  imageSrc="/images/hud/button_settings.png"
  left="83%"
  top="45%"
  width="6.4%"
  height="42%"
  onClick={() => router.push("/settings")}
/>

        </div>
      </section>
    </main>
  );
}
