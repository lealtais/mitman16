import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Heart, Star } from "lucide-react";

const TheDreamSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="the-dream"
      ref={sectionRef}
      className="relative min-h-screen py-32 bg-white overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute -left-20 bottom-40 h-72 w-72 rounded-full bg-accent/5 blur-3xl"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="mb-4 inline-block text-sm uppercase tracking-[0.3em] text-accent">
            Chapter One
          </span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide">
            THE <span className="text-gradient-blue">DREAM</span>
          </h2>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left column - Story */}
          <motion.div
            style={{ opacity }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              <div className="flex-shrink-0 rounded-full bg-primary/20 p-3">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-2xl tracking-wide text-foreground">
                  MARKHAM, ONTARIO
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Nascido em 5 de maio de 1997, Mitchell Frederick Marner cresceu nas ruas 
                  de Markham, a poucos quilômetros do Scotiabank Arena. Desde os primeiros 
                  passos no gelo, ele sabia que o azul e branco era seu destino.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              <div className="flex-shrink-0 rounded-full bg-accent/20 p-3">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-display text-2xl tracking-wide text-foreground">
                  TORCEDOR DE BERÇO
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Crescer assistindo aos Maple Leafs moldou seu estilo de jogo. A paixão, 
                  a pressão, a história — Mitch absorveu tudo. Jogar pelo Toronto não era 
                  apenas um trabalho, era a realização de um sonho de infância.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              <div className="flex-shrink-0 rounded-full bg-primary/20 p-3">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-2xl tracking-wide text-foreground">
                  4ª ESCOLHA, 2015
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Selecionado na quarta posição do Draft de 2015, Marner rapidamente se 
                  estabeleceu como uma das maiores promessas da NHL. Sua visão de jogo 
                  e habilidade de passe eram incomparáveis.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Stats highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="card-elevated p-8 md:p-12">
              <div className="absolute -right-4 -top-4 rounded-full bg-accent px-4 py-2">
                <span className="font-display text-lg text-accent-foreground">#16</span>
              </div>

              <h3 className="font-display mb-8 text-3xl tracking-wide text-gradient-gold">
                TEMPORADAS COM O TORONTO
              </h3>

              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <span className="stat-number text-primary">9</span>
                  <p className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">
                    Temporadas
                  </p>
                </div>
                <div className="text-center">
                  <span className="stat-number text-foreground">650+</span>
                  <p className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">
                    Jogos
                  </p>
                </div>
                <div className="text-center">
                  <span className="stat-number text-accent">200+</span>
                  <p className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">
                    Gols
                  </p>
                </div>
                <div className="text-center">
                  <span className="stat-number text-primary">450+</span>
                  <p className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">
                    Assistências
                  </p>
                </div>
              </div>

              <div className="mt-10 border-t border-border pt-8">
                <blockquote className="italic text-muted-foreground">
                  "Vestir essa camisa significa tudo pra mim. Eu cresci sonhando com isso."
                </blockquote>
                <p className="mt-4 text-sm text-accent">— Mitch Marner, 2019</p>
              </div>
            </div>

            {/* Decorative line */}
            <div className="absolute -left-8 top-1/2 h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TheDreamSection;
