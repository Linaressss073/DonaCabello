"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getFaqs, sendContact, getMyths } from "@/lib/api";
import { Faq, Myth } from "@/types";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageSquare, CheckCircle, Loader2, AlertCircle, ShieldCheck, XCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Ingresa tu nombre"),
  email: z.string().email("Email inválido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});
type ContactData = z.infer<typeof contactSchema>;

export default function ComunidadPage() {
  const [sent, setSent] = useState(false);
  const [contactError, setContactError] = useState("");

  const { data: faqs, isLoading } = useQuery<Faq[]>({
    queryKey: ["faqs"],
    queryFn: getFaqs,
  });

  const { data: myths, isLoading: mythsLoading } = useQuery<Myth[]>({
    queryKey: ["myths"],
    queryFn: getMyths,
  });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactData) => {
    setContactError("");
    try {
      await sendContact(data);
      setSent(true);
      reset();
    } catch {
      setContactError("Error al enviar el mensaje. Intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-purple-50 to-white border-b border-purple-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Comunidad</h1>
            <p className="text-gray-600">Preguntas frecuentes y formulario de contacto.</p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          {/* FAQs */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Preguntas frecuentes</h2>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-b border-gray-200 py-4">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            ) : faqs && faqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <>
                {/* Static fallback FAQs */}
                <Accordion type="single" collapsible className="w-full">
                  {[
                    { q: "¿Cuánto cabello necesito para donar?", a: "El mínimo requerido es 20 cm, medidos en trenza desde el cuero cabelludo." },
                    { q: "¿Puedo donar cabello teñido?", a: "Depende del estado del cabello. Decoloraciones severas o permanentes recientes no se aceptan. Tintes naturales generalmente sí." },
                    { q: "¿Hay algún costo por donar?", a: "No. La donación es completamente gratuita. Los centros aliados ofrecen el servicio de corte sin costo." },
                    { q: "¿A dónde va el cabello donado?", a: "El cabello es procesado y utilizado para fabricar pelucas que se entregan gratuitamente a pacientes oncológicos." },
                    { q: "¿Puedo donar si tengo canas?", a: "Si las canas no superan el 25% del total del cabello, sí se acepta la donación." },
                  ].map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger>{faq.q}</AccordionTrigger>
                      <AccordionContent>{faq.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </>
            )}
          </section>

          {/* Mitos y realidades */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Mitos y realidades</h2>
            {mythsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-xl border border-gray-200 p-4">
                    <Skeleton className="h-4 w-2/3 mb-2" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                ))}
              </div>
            ) : myths && myths.length > 0 ? (
              <div className="space-y-4">
                {myths.map((item) => (
                  <div key={item.id} className="rounded-xl border border-gray-200 overflow-hidden">
                    <div className="flex items-start gap-3 bg-red-50 border-b border-red-100 px-4 py-3">
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
                      <p className="text-sm font-medium text-red-800">{item.myth}</p>
                    </div>
                    <div className="flex items-start gap-3 bg-green-50 px-4 py-3">
                      <ShieldCheck className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-green-800">{item.reality}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  { myth: "El cabello teñido no sirve para donar.", reality: "Los tintes suaves sí se aceptan; solo se rechazan decoloraciones severas o permanentes recientes." },
                  { myth: "Solo se puede donar cabello largo (más de 40 cm).", reality: "El mínimo es 20 cm medidos en trenza, suficiente para fabricar pelucas parciales." },
                  { myth: "El cabello con canas no sirve.", reality: "Se acepta si las canas no superan el 25% del total del cabello donado." },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl border border-gray-200 overflow-hidden">
                    <div className="flex items-start gap-3 bg-red-50 border-b border-red-100 px-4 py-3">
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
                      <p className="text-sm font-medium text-red-800">{item.myth}</p>
                    </div>
                    <div className="flex items-start gap-3 bg-green-50 px-4 py-3">
                      <ShieldCheck className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-green-800">{item.reality}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Contact */}
          <section id="contacto" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-rose-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Escríbenos</h2>
            </div>

            {sent ? (
              <div className="flex flex-col items-center text-center py-10 bg-green-50 rounded-2xl border border-green-200">
                <CheckCircle className="h-12 w-12 text-green-500 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">¡Mensaje enviado!</h3>
                <p className="text-gray-600 mb-4">Recibimos tu mensaje. Nos pondremos en contacto contigo pronto.</p>
                <Button variant="outline" size="sm" onClick={() => setSent(false)}>Enviar otro mensaje</Button>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                {contactError && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <AlertCircle className="h-4 w-4 shrink-0" /> {contactError}
                  </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Nombre</Label>
                      <Input id="name" placeholder="Tu nombre" {...register("name")} />
                      {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input id="email" type="email" placeholder="tu@email.com" {...register("email")} />
                      {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea id="message" placeholder="¿En qué podemos ayudarte?" rows={5} {...register("message")} />
                    {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Enviar mensaje
                  </Button>
                </form>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
