'use client';

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto border-x border-gray-200">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
        <h1 className="text-xl font-bold text-gray-900">Paramètres</h1>
      </div>

      {/* Settings Content */}
      <div className="p-4">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Paramètres du compte</h2>
          
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-medium text-gray-900">Informations personnelles</h3>
              <p className="text-sm text-gray-500 mt-1">Mettez à jour vos informations personnelles</p>
              <button className="mt-2 px-4 py-2 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                Modifier
              </button>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-medium text-gray-900">Sécurité</h3>
              <p className="text-sm text-gray-500 mt-1">Gérez votre mot de passe et la sécurité</p>
              <button className="mt-2 px-4 py-2 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                Modifier le mot de passe
              </button>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-medium text-gray-900">Notifications</h3>
              <p className="text-sm text-gray-500 mt-1">Configurez vos préférences de notification</p>
              <button className="mt-2 px-4 py-2 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                Configurer
              </button>
            </div>

            <div>
              <h3 className="font-medium text-gray-900">Confidentialité</h3>
              <p className="text-sm text-gray-500 mt-1">Gérez vos paramètres de confidentialité</p>
              <button className="mt-2 px-4 py-2 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                Gérer
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">À propos</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>UniSocial v1.0.0</p>
            <p>Réseau social universitaire</p>
            <p>© 2024 UniSocial</p>
          </div>
        </div>
      </div>
    </div>
  );
}
