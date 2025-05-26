"use client";

import MainLayout from "@/components/layout/MainLayout";

export default function AdminDashboard() {
  return (
    <MainLayout>
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Painel Administrativo</h1>
          <p>Bem-vindo ao painel administrativo. Selecione uma opção no menu lateral para gerenciar o conteúdo do site.</p>
          {/* Aqui será adicionado o menu lateral e o conteúdo dinâmico */}
        </div>
      </section>
    </MainLayout>
  );
}
