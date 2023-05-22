import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { register } from 'timeago.js';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: {
        'Sign Up': 'Sign Up',
        'Password mismatch': 'Password mismatch',
        Username: 'Username',
        DisplayName: 'Display Name',
        Password: 'Password',
        'Password Repeat': 'Password Repeat',
        Login: 'Login',
        Logout: 'Logout',
        Journeys: 'Journeys',
        Stations: 'Stations',
        'User not found!': 'User not found!',
        'Station not found!': 'Station not found!',
        Blogs: 'Blogs',
        Events: 'Events',
        'CityBike Finland': 'CityBike Finland',
        'My Profile': 'My Profile',
        Name: 'Name',
        Address: 'Address',
        City: 'City',
        Operator: 'Operator',
        Capacity: 'Capacity',
        Map: 'Map',
        Location: 'Location',
        'Add Station': 'Add Station',
        'Show All Stations': 'Show All Stations',
        'Go To Page': 'Go To Page',
        'Load Failure': 'Load Failure',
        'Next >': 'Next >',
        '< Back': '< Back',
        Departure: 'Departure',
        Return: 'Return',
        'Covered Distance': 'Covered Distance',
        Duration: 'Duration',
        Details: 'Details',
        Description: 'Description',
        'Add Event': 'Add Event',
        Users: 'Users',
        'Delete Blog': 'Delete Blog',
        'Are you sure to delete blog?': 'Are you sure to delete blog?',
        'Delete My Account': 'Delete My Account',
        'Are you sure to delete your account?':
          'Are you sure to delete your account?',
        Edit: 'Edit',
        Cancel: 'Cancel',
        Statistics: 'Statistics',
      },
    },
    fi: {
      translations: {
        'Sign Up': 'Ilmoittautua',
        'Password mismatch': 'Salasanat eivät täsmää',
        Username: 'Käyttäjätunnus',
        DisplayName: 'Kutsunimi',
        Password: 'Salasana',
        'Password Repeat': 'Salasana Toista',
        Login: 'Kirjaudu sisään',
        Logout: 'Kirjautua ulos',
        Stations: 'Asemat',
        Journeys: 'Matkat',
        'User not found!': 'Käyttäjä ei löydy!',
        'Station not found!': 'Asemaa ei löydy!',
        Blogs: 'Blogit',
        Events: 'Tapahtumat',
        'CityBike Finland': 'CityBike Suomi',
        'My Profile': 'Profiili',
        Name: 'Nimi',
        Address: 'Osoite',
        City: 'Kaupunki',
        Operator: 'Operaattori',
        Capacity: 'Kapasiteet',
        Map: 'Kartta',
        Location: 'Sijainti',
        'Add Station': 'Lisää asema',
        'Show All Stations': 'Näytä kaikki asemat',
        'Go To Page': 'Mene sivulle',
        'Load Failure': 'Latausvirhe',
        'Next >': 'Seuraava >',
        '< Back': '< Takaisin',
        Departure: 'Lähtöä',
        Return: 'Paluu',
        'Covered Distance': 'Katettu etäisyys',
        Duration: 'Kesto',
        Details: 'Yksityiskohdat',
        Description: 'Kuvaus',
        'Add Event': 'Lisää tapahtuma',
        Users: 'Käyttäjät',
        'Delete Blog': 'Poista Blogi',
        'Are you sure to delete blog?': 'Oletko varmaa, että poistat blogin?',
        'Delete My Account': 'Poista tilini',
        'Are you sure to delete your account?':
          'Oletko varmaa, että poistat tilisi?',
        Edit: 'Muokata',
        Cancel: 'Peruuta',
        Statistics: 'Tilastot',
      },
    },
  },
  fallbackLng: 'en',
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  react: {
    wait: true,
  },
});

// the local dict example is below.
export const timeagoFI = (number, index, totalSec) => {
  // number: the timeago / timein number;
  // index: the index of array below;
  // totalSec: total seconds between date to be formatted and today's date;
  return [
    ['juuri äsken', 'juuri nyt'],
    ['%s sekuntia sitten', '%s sekunnin päästä'],
    ['minuutti sitten', 'minuutin päästä'],
    ['%s minuuttia sitten', '%s minuutin päästä'],
    ['tunti sitten', 'tunnin päästä'],
    ['%s tuntia sitten', '%s tunnin päästä'],
    ['päivä sitten', 'päivän päästä'],
    ['%s päivää sitten', '%s päivän päästä'],
    ['viikko sitten', 'viikon päästä'],
    ['%s viikkoa sitten', '%s viikon päästä'],
    ['kuukausi sitten', 'kuukauden päästä'],
    ['%s kuukautta sitten', '%s kuukauden päästä'],
    ['vuosi sitten', 'vuoden päästä'],
    ['%s vuotta sitten', '%s vuoden päästä'],
  ][index];
};
// register your locale with timeago
register('fi', timeagoFI);

export default i18n;
