<script setup lang="ts">
import type { Pins, User } from '~/api/types'
import { generateCredentials, getToken, getUser, optOut } from '~/api'

defineOptions({
  name: 'IndexPage',
})

const router = useRouter()

const debloating = ref(false)

const credentials = ref<Pins>()
const user = ref<User>()

const sessionCredentials = sessionStorage.getItem('credentials')
const sessionUser = sessionStorage.getItem('user')

if (sessionCredentials)
  credentials.value = JSON.parse(sessionCredentials)

if (sessionUser)
  user.value = JSON.parse(sessionUser)

const bloat = ref([
  {
    name: 'Live TV',
    key: 'tv.plex.provider.epg',
    active: true,
    done: false,
  },
  {
    name: 'Movies & TV',
    key: 'tv.plex.provider.vod',
    active: true,
    done: false,
  },
  {
    name: 'Music',
    key: 'tv.plex.provider.music',
    active: true,
    done: false,
  },
  {
    name: 'Discover Source',
    key: 'includeDiscoverSource',
    active: true,
    done: false,
  },
  {
    name: 'Display “More Ways To Watch” Search Results',
    key: 'includeMetadataInSearch',
    active: true,
    done: false,
  },
  {
    name: 'Display Availabilities From other Streaming Services On Detail Pages',
    key: 'includeAvailabilities',
    active: true,
    done: false,
  },
])

const client = {
  appName: encodeURIComponent('Plex Debloattest'),
  clientId: encodeURIComponent('7b0252a8-a05f-46ea-ab2a-ce8d7230134d'),
  forwardUrl: encodeURIComponent('http://127.0.0.1:3333?logged-in=1'),
}

const doIt = async () => {
  bloat.value.forEach((debloat) => {
    optOut(user.value?.uuid, debloat.key, credentials.value?.authToken, client.appName, client.clientId)
  })
}

const fetchToken = async () => {
  credentials.value = await getToken(credentials.value.id, credentials.value.code, client.clientId)
  sessionStorage.setItem('credentials', JSON.stringify(credentials.value))
  user.value = await getUser(client.appName, client.clientId, credentials.value.authToken)
  sessionStorage.setItem('user', JSON.stringify(user.value))
  doIt()
}

if (credentials && !credentials.value?.authToken && !user.value?.uuid)
  fetchToken()

const debloat = async () => {
  if (credentials.value?.authToken && user.value?.uuid) {
    doIt()
    return
  }

  // if (name)
  //   router.push(`/hi/${encodeURIComponent(name)}`)

  credentials.value = await generateCredentials(client.appName, client.clientId)

  if (credentials.value.id && credentials.value.code)
    sessionStorage.setItem('credentials', JSON.stringify(credentials.value))

  window.location.href = `https://app.plex.tv/auth#?clientID=${client.clientId}&code=${credentials.value.code}`
         + `&forwardUrl=${client.forwardUrl}&context%5Bdevice%5D%5Bproduct%5D=${client.appName}`
}

const { t } = useI18n()
</script>

<template>
  <div>
    <h1 text-3xl mb-5>
      Debloat <span text-lg>for Plex</span>
    </h1>
    <p>One click opt-out of Plex provided sources like Live TV and Movies</p>

    <div>
      {{ user?.username }}
      <button
        btn m-3 text-sm
        :disabled="debloating"
        @click="debloat"
      >
        {{ t('button.go') }}
      </button>
      <div>
        <div v-for="debloat in bloat" :key="debloat.name">
          <label :for="`debloat-${debloat.name}`" class="inline-flex relative items-center cursor-pointer">
            <input :id="`debloat-${debloat.name}`" v-model="debloat.active" type="checkbox" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{{ debloat.name }} <span v-if="debloat.done">done</span></span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
