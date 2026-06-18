import Link from "next/link";

export const metadata = {
  title: "Mentions légales – Agence Mue",
};

export default function MentionsPage() {
  return (
    <main className="section-black min-h-screen px-6 md:px-20 py-24 text-mue-cream">
      <div className="max-w-3xl mx-auto space-y-10">
        <Link
          href="/"
          className="inline-block text-sm text-mue-lime hover:underline"
        >
          ← Retour à l'accueil
        </Link>

        <h1 className="font-display text-4xl md:text-5xl font-bold">
          Mentions légales
        </h1>

        <div className="space-y-8 text-sm leading-relaxed" style={{ color: "rgba(245,245,238,0.7)" }}>
          <section>
            <h2 className="font-display text-lg font-semibold text-mue-cream mb-2">Éditeur du site</h2>
            <p>
              Agence Mue<br />
              Stat-up<br />
              Siège social : 08 bis rue Jean de la Fontaine 75011 Paris<br />
              SIRET : 289966154815623415203<br />
              RCS : Paris<br />
              Directeur de la publication : Giovanni
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-mue-cream mb-2">Hébergement</h2>
            <p>
              Vercel<br />
              102 Avenue des champs elysée<br />
              02 58 92 56 24
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-mue-cream mb-2">Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu de ce site textes, images, vidéos, logos, icônes, etc. est la propriété
              exclusive de l'Agence Mue ou de ses partenaires. Toute reproduction, représentation, modification
              ou exploitation, totale ou partielle, est interdite sans autorisation écrite préalable.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-mue-cream mb-2">Protection des données personnelles</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique
              et Libertés, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition
              concernant vos données personnelles. Pour exercer ces droits, contactez-nous à l'adresse :
              contact@mue.agency.fr
            </p>
            <p className="mt-2">
              Les données collectées via le formulaire de contact sont uniquement destinées au traitement de
              votre demande et ne sont transmises à aucun tiers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-mue-cream mb-2">Cookies</h2>
            <p>
              Ce site peut utiliser des cookies à des fins de mesure d'audience et d'amélioration de
              l'expérience utilisateur. Vous pouvez configurer votre navigateur pour refuser les cookies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-mue-cream mb-2">Limitation de responsabilité</h2>
            <p>
              L'Agence Mue s'efforce de fournir des informations exactes et à jour sur ce site, mais ne
              saurait être tenue responsable des erreurs, omissions ou résultats obtenus suite à l'utilisation
              de ces informations.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
