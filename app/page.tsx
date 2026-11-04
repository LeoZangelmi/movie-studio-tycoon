"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main
      className="
        relative
        flex
        min-h-screen
        flex-col
        items-center
        justify-center
        overflow-hidden
      "
    >
      {/* Fundo */}

      <img
        src="/images/background.jpg"
        alt="Movie Studio Tycoon"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Escurecimento */}

      <div className="absolute inset-0 bg-black/55" />

      {/* Conteúdo */}

      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
        "
      >
        {/* Logo */}

        <img
          src="/images/logo.png"
          alt="Movie Studio Tycoon"
          className="mb-10 w-[min(750px,85vw)] h-auto"
          draggable={false}
        />

        {/* Botões */}

        <div className="flex w-80 flex-col gap-4">
          <button
            onClick={() => router.push("/intro")}
            className="
              rounded-xl
              bg-green-600
              px-6
              py-4
              text-xl
              font-bold
              text-white
              transition
              hover:bg-green-700
            "
          >
            Novo Jogo
          </button>

          <button
            className="
              rounded-xl
              bg-zinc-800
              px-6
              py-4
              text-xl
              font-bold
              text-white
              transition
              hover:bg-zinc-700
            "
          >
            Carregar Jogo
          </button>

          <button
            className="
              rounded-xl
              bg-zinc-800
              px-6
              py-4
              text-xl
              font-bold
              text-white
              transition
              hover:bg-zinc-700
            "
          >
            Configurações
          </button>
        </div>
      </div>
    </main>
  );
}