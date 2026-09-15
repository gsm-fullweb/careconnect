import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type FormData = {
  testimonial: string;
  rating: number;
};

export default function TestimonialForm() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { toast } = useToast();

  const onSubmit = async (data: FormData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      const { error } = await supabase
        .from('testimonials')
        .insert({
          user_id: user.id,
          text: data.testimonial,
          rating: data.rating,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Depoimento enviado",
        description: "Seu depoimento foi enviado com sucesso e está em análise.",
      });

      reset();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar seu depoimento. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="testimonial" className="block text-sm font-medium mb-1">
          Seu depoimento
        </label>
        <Textarea
          id="testimonial"
          {...register("testimonial", { required: true })}
          placeholder="Conte sua experiência com nossos cuidadores..."
          className="min-h-[120px]"
        />
      </div>

      <div>
        <label htmlFor="rating" className="block text-sm font-medium mb-1">
          Avaliação (1-5)
        </label>
        <select
          id="rating"
          {...register("rating", { required: true, valueAsNumber: true })}
          className="w-full p-2 border rounded-md"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit">Enviar Depoimento</Button>
    </form>
  );
}