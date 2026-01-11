import { motion } from "framer-motion";
import duoImage from "@/assets/duo.webp";
import { Zap, Target, Users } from "lucide-react";

const DynamicDuoSection = () => {
  const stats = [
    { label: "Gols Juntos", value: "500+", icon: Target },
    { label: "Assistências Combinadas", value: "750+", icon: Zap },
    { label: "Temporadas como Dupla", value: "8", icon: Users },
  ];

  return (
    <section className="relative min-h-screen py-32 bg-navy-deep overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url(${duoImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
      </div>

      {/* Gradient accent */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-primary to-transparent" />
      <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-accent to-transparent" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="mb-4 inline-block text-sm uppercase tracking-[0.3em] text-accent">
            Parceria Lendária
          </span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide">
            THE <span className="text-gradient-gold">DYNAMIC</span> DUO
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-muted-foreground text-lg">
            Marner & Matthews. Uma combinação que redefiniu o ataque do Toronto Maple Leafs 
            e aterrorizou goleiros por toda a NHL.
          </p>
        </motion.div>

        {/* Duo Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
        >
          <div className="text-center">
            <span className="font-display text-6xl md:text-8xl lg:text-9xl text-gradient-blue">
              16
            </span>
            <p className="mt-2 font-display text-2xl md:text-3xl tracking-wider text-foreground">
              MARNER
            </p>
            <p className="text-sm uppercase tracking-wider text-muted-foreground mt-1">
              Right Wing
            </p>
          </div>

          <div className="relative">
            <div className="h-24 w-px md:h-px md:w-24 bg-gradient-to-b md:bg-gradient-to-r from-primary via-accent to-primary" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="h-4 w-4 rounded-full bg-accent glow-gold" />
            </div>
          </div>

          <div className="text-center">
            <span className="font-display text-6xl md:text-8xl lg:text-9xl text-gradient-gold">
              34
            </span>
            <p className="mt-2 font-display text-2xl md:text-3xl tracking-wider text-foreground">
              MATTHEWS
            </p>
            <p className="text-sm uppercase tracking-wider text-muted-foreground mt-1">
              Center
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card-elevated p-8 text-center group hover:border-primary/30 border border-transparent transition-all duration-300"
            >
              <div className="mx-auto mb-4 w-fit rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <span className="font-display text-5xl md:text-6xl text-foreground">
                {stat.value}
              </span>
              <p className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Chemistry description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="card-elevated p-8 md:p-12 border-l-4 border-accent">
            <h3 className="font-display text-3xl md:text-4xl tracking-wide mb-6">
              A <span className="text-accent">QUÍMICA</span> PERFEITA
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Desde que foram reunidos no ataque do Toronto, Marner e Matthews desenvolveram 
                uma conexão telepática no gelo. O estilo de jogo complementar — a visão de 
                passe de Marner e o instinto artilheiro de Matthews — criou uma das duplas 
                mais perigosas da NHL moderna.
              </p>
              <p>
                Matthews, o sniper implacável, encontrava os espaços; Marner, o maestro criativo, 
                entregava o puck com precisão cirúrgica. Juntos, eles lideraram o Toronto em 
                incontáveis comebacks e noites memoráveis no Scotiabank Arena.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-secondary/30">
                <span className="font-display text-2xl text-primary">6x</span>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  All-Star juntos
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-secondary/30">
                <span className="font-display text-2xl text-accent">300+</span>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  Jogos lado a lado
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-secondary/30">
                <span className="font-display text-2xl text-primary">100+</span>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  Conexões para gol
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-secondary/30">
                <span className="font-display text-2xl text-accent">#1</span>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  Dupla da franquia
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DynamicDuoSection;
