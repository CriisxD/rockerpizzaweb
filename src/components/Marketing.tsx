import { Flame, Clock, Star, MapPin, Phone } from 'lucide-react';

export const Marketing = () => {
  return (
    <>
      {/* Why Us Section */}
      <section className="py-12 px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-heading">
            ¿POR QUÉ PREFERIR <span className="text-brand-red">ROCKER</span> <span className="text-brand-yellow">PIZZA</span>?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <FeatureCard 
            icon={<Flame size={32} className="text-brand-red" />}
            title="Sabor Auténtico"
            desc="Recetas originales y masa artesanal que te harán vibrar."
          />
          <FeatureCard 
            icon={<Clock size={32} className="text-brand-red" />}
            title="Siempre a Tiempo"
            desc="Nos comprometemos con tiempos de entrega reales y rápidos."
          />
          <FeatureCard 
            icon={<Star size={32} className="text-brand-red" />}
            title="Calidad Premium"
            desc="Ingredientes frescos y seleccionados. La calidad se nota en cada pizza."
          />
        </div>
      </section>

      {/* Location Map Section */}
      <section className="py-12 px-4 mb-12">
        <div className="text-center mb-8">
            <h2 className="text-2xl font-heading">¿DÓNDE ESTAMOS?</h2>
        </div>
        <div className="bg-brand-card border border-white/10 rounded-2xl overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row">
            <div className="h-64 md:h-auto md:w-1/2 bg-neutral-800">
                <iframe 
                    src="https://maps.google.com/maps?q=Alfonso+Carrasco+141%2C+Los+Angeles%2C+Chile&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                ></iframe>
            </div>
            <div className="p-8 md:w-1/2 flex flex-col justify-center gap-6">
                <div className="flex gap-4">
                    <MapPin className="text-brand-red shrink-0" />
                    <div>
                        <h4 className="font-bold text-lg text-white">Retiro o Delivery</h4>
                        <p className="text-gray-400">Alfonso Carrasco 141,<br/>Los Ángeles, Chile</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Clock className="text-brand-yellow shrink-0" />
                    <div>
                        <h4 className="font-bold text-lg text-white">Horarios</h4>
                        <p className="text-gray-400">Lun - Dom: 12:00 - 23:00</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Phone className="text-brand-red shrink-0" />
                    <div>
                        <h4 className="font-bold text-lg text-white">Contacto</h4>
                        <p className="text-gray-400">+56 9 8970 5094</p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="bg-brand-card p-6 rounded-2xl border border-white/5 shadow-lg">
    <div className="mb-4 drop-shadow-[0_0_15px_rgba(217,37,37,0.3)]">{icon}</div>
    <h3 className="font-heading text-xl mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);
