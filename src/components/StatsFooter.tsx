import { motion } from "framer-motion";
import { useState } from "react";
import { Book, GraduationCap, BarChart3, ExternalLink } from "lucide-react";

const MapleLeafIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="currentColor"
  >
    <path d="M50 0 L52 20 L70 10 L60 28 L80 25 L65 40 L90 45 L68 52 L85 70 L58 60 L60 85 L50 70 L40 85 L42 60 L15 70 L32 52 L10 45 L35 40 L20 25 L40 28 L30 10 L48 20 Z" />
  </svg>
);

const rankingData = [
  { rank: 1, name: "Mats Sundin", points: 987, years: "1994-2008", highlighted: false },
  { rank: 2, name: "Darryl Sittler", points: 916, years: "1970-1982", highlighted: false },
  { rank: 3, name: "Borje Salming", points: 768, years: "1973-1989", highlighted: false },
  { rank: 4, name: "Dave Keon", points: 758, years: "1960-1975", highlighted: false },
  { rank: 5, name: "Ron Ellis", points: 640, years: "1963-1981", highlighted: false },
  { rank: 6, name: "Auston Matthews", points: 634, years: "2016-2025", highlighted: false },
  { rank: 7, name: "Mitch Marner", points: 652, years: "2016-2025", highlighted: true },
  { rank: 8, name: "George Armstrong", points: 613, years: "1949-1971", highlighted: false },
  { rank: 9, name: "Frank Mahovlich", points: 597, years: "1956-1968", highlighted: false },
  { rank: 10, name: "John Tavares", points: 422, years: "2018-2025", highlighted: false },
];

const ecosystemLinks = [
  {
    icon: Book,
    title: "The Blue & White History",
    description: "Explore mais de 100 anos de história da franquia mais icônica do hóquei canadense.",
    url: "https://www.nhl.com/mapleleafs/team/history",
    color: "primary",
  },
  {
    icon: GraduationCap,
    title: "Hockey 101",
    description: "Aprenda as regras, fundamentos e estratégias do esporte mais rápido do mundo.",
    url: "https://www.nhl.com/fans/learn-to-play",
    color: "accent",
  },
  {
    icon: BarChart3,
    title: "Game Analyzer",
    description: "Análise tática com dados do NHL Edge — velocidade, distância e métricas de jogadas.",
    url: "https://www.nhl.com/stats/",
    color: "primary",
  },
];

const StatsFooter = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const sortedData = [...rankingData].sort((a, b) => b.points - a.points);

  return (
    <footer className="relative py-24 bg-background overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="container mx-auto px-4">
        {/* Maple Leaf Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="inline-block relative">
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <MapleLeafIcon className="h-48 w-48 md:h-56 md:w-56 text-primary/20 blur-3xl" />
            </div>
            <MapleLeafIcon className="h-32 w-32 md:h-40 md:w-40 maple-leaf-icon animate-float relative z-10" />
          </div>
          <h2 className="mt-8 font-display text-4xl md:text-6xl tracking-wide">
            TORONTO <span className="text-gradient-blue">MAPLE LEAFS</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Uma franquia lendária com mais de 100 anos de história. 
            Onde Mitch Marner escreveu seu nome entre os maiores.
          </p>
        </motion.div>

        {/* Ranking Table */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8 text-center">
            <span className="text-sm uppercase tracking-[0.3em] text-accent">All-Time Leaders</span>
            <h3 className="font-display text-3xl md:text-4xl mt-2">
              RANKING DE <span className="text-gradient-gold">PONTUADORES</span>
            </h3>
          </div>

          <div className="card-elevated overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-secondary/30 border-b border-border text-sm uppercase tracking-wider text-muted-foreground">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-5">Jogador</div>
              <div className="col-span-3 text-center">Pontos</div>
              <div className="col-span-3 text-right hidden md:block">Anos</div>
            </div>

            {/* Table Rows */}
            {sortedData.map((player, index) => (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`ranking-row grid grid-cols-12 gap-4 p-4 border-b border-border/50 cursor-pointer ${
                  player.highlighted ? "highlighted" : ""
                } ${hoveredRow === index ? "bg-secondary/30" : ""}`}
              >
                <div className="col-span-1 text-center">
                  <span
                    className={`font-display text-xl ${
                      player.highlighted ? "text-accent" : "text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </span>
                </div>
                <div className="col-span-5 flex items-center gap-3">
                  {player.highlighted && (
                    <div className="h-2 w-2 rounded-full bg-accent glow-gold" />
                  )}
                  <span
                    className={`font-semibold ${
                      player.highlighted ? "text-foreground" : ""
                    }`}
                  >
                    {player.name}
                  </span>
                  {player.highlighted && (
                    <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                </div>
                <div className="col-span-3 text-center">
                  <span
                    className={`font-display text-2xl ${
                      player.highlighted ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {player.points}
                  </span>
                </div>
                <div className="col-span-3 text-right hidden md:block text-muted-foreground text-sm">
                  {player.years}
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            * Estatísticas atualizadas até a temporada 2024-25
          </p>
        </motion.div>

        {/* Ecosystem Icons Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-24 max-w-5xl mx-auto"
        >
          <div className="mb-12 text-center">
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Explore More</span>
            <h3 className="font-display text-3xl md:text-4xl mt-2">
              PAINEL DE <span className="text-gradient-blue">CONTROLE</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ecosystemLinks.map((link, index) => (
              <motion.a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative p-8 rounded-xl bg-card border border-border transition-all duration-500 ${
                  hoveredCard === index 
                    ? link.color === "accent" 
                      ? "border-accent/50 glow-gold" 
                      : "border-primary/50 glow-blue"
                    : ""
                }`}
              >
                {/* Icon */}
                <div className={`mb-6 inline-flex p-4 rounded-xl transition-all duration-300 ${
                  link.color === "accent" 
                    ? "bg-accent/10 text-accent group-hover:bg-accent/20" 
                    : "bg-primary/10 text-primary group-hover:bg-primary/20"
                }`}>
                  <link.icon className="h-8 w-8" />
                </div>

                {/* Content */}
                <h4 className="font-display text-xl md:text-2xl mb-3 flex items-center gap-2">
                  {link.title}
                  <ExternalLink className={`h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                    link.color === "accent" ? "text-accent" : "text-primary"
                  }`} />
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {link.description}
                </p>

                {/* Hover effect line */}
                <div className={`absolute bottom-0 left-0 h-1 rounded-b-xl transition-all duration-500 ${
                  link.color === "accent" ? "bg-accent" : "bg-primary"
                } ${hoveredCard === index ? "w-full" : "w-0"}`} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Footer bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 pt-8 border-t border-border text-center"
        >
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Toronto Maple Leafs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-accent" />
              <span className="text-sm text-muted-foreground">Vegas Golden Knights</span>
            </div>
          </div>

          <p className="text-muted-foreground text-sm">
            Uma homenagem a Mitch Marner — Do sonho de infância em Markham às luzes de Vegas.
          </p>
          <p className="mt-4 text-xs text-muted-foreground/60">
            © 2025 • Criado com 💙 para os fãs de hóquei
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default StatsFooter;
