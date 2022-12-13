export interface Pins {
  id: number
  code: string
  product: string
  trusted: boolean
  qr: string
  clientIdentifier: string
  location: Location
  expiresIn: number
  createdAt: Date
  expiresAt: Date
  authToken: string
  newRegistration: null
}

export interface Location {
  code: string
  european_union_member: boolean
  continent_code: string
  country: string
  city: string
  time_zone: string
  postal_code: string
  in_privacy_restricted_country: boolean
  subdivisions: string
  coordinates: string
}

export interface User {
  id: number
  uuid: string
  username: string
  title: string
  email: string
  friendlyName: string
  locale: string
  confirmed: boolean
  joinedAt: number
  emailOnlyAuth: boolean
  hasPassword: boolean
  protected: boolean
  thumb: string
  authToken: string
  mailingListStatus: string
  mailingListActive: boolean
  scrobbleTypes: string
  country: string
  subscription: Subscription
  subscriptionDescription: string
  restricted: boolean
  anonymous: null
  home: boolean
  guest: boolean
  homeSize: number
  homeAdmin: boolean
  maxHomeSize: number
  rememberExpiresAt: number
  profile: Profile
  entitlements: string[]
  roles: string[]
  services: Service[]
  adsConsent: null
  adsConsentSetAt: null
  adsConsentReminderAt: null
  experimentalFeatures: boolean
  twoFactorEnabled: boolean
  backupCodesCreated: boolean
}

export interface Profile {
  autoSelectAudio: boolean
  defaultAudioLanguage: string
  defaultSubtitleLanguage: string
  autoSelectSubtitle: number
  defaultSubtitleAccessibility: number
  defaultSubtitleForced: number
}

export interface Service {
  identifier: string
  endpoint: string
  token: null | string
  secret: null | string
  status: Status
}

export enum Status {
  Online = 'online',
}

export interface Subscription {
  active: boolean
  subscribedAt: Date
  status: string
  paymentService: string
  plan: string
  features: string[]
}
