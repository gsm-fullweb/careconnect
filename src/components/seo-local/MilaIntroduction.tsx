import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface MilaIntroductionProps {
  whatsappLink: string;
}

const MilaIntroduction: React.FC<MilaIntroductionProps> = ({ whatsappLink }) => {
  return (
    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-none shadow-lg h-full">
      <CardContent className="p-8 md:p-12 text-center flex flex-col items-center justify-center h-full">
        <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <MessageCircle className="w-10 h-10 text-green-700" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Conheça a Mila</h3>
        <p className="text-gray-700 mb-8 leading-relaxed">
          A Mila é a nossa assistente virtual no WhatsApp. Você não precisa baixar nenhum aplicativo novo ou aprender a usar um sistema complexo. É só mandar uma mensagem para ela contando o que você precisa, e ela cuidará do resto de forma muito rápida e intuitiva.
        </p>
        <Button
          asChild
          className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-6 rounded-xl text-lg shadow-md"
        >
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            Conversar com a Mila
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default MilaIntroduction;
