"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="relative h-screen overflow-hidden">

      {/* Fundo */}

      <img
        src="/images/background.jpg"
        alt="Background"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      />

      {/* Escurecedor */}

      <div className="absolute inset-0 bg-black/50" />

      {/* Conteúdo */}

      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
          justify-center
          h-full
          text-white
        "
      >
        <h1 className="text-7xl font-bold mb-10">
          MOVIE STUDIO TYCOON
        </h1>

        <div className="flex flex-col gap-4 w-80">

          <button
            onClick={() => router.push("/intro")}
            className="
              bg-green-600
              hover:bg-green-700
              p-4
              rounded-xl
              text-xl
              font-bold
            "
          >
            Novo Jogo
          </button>

          <button
            className="
              bg-zinc-800
              hover:bg-zinc-700
              p-4
              rounded-xl
              text-xl
            "
          >
            Carregar Progresso
          </button>

        </div>
      </div>

    </main>
  );
}