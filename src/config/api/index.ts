import fetch from './fetch'
import mutate from './mutate'

const api = {
  ...fetch,
  ...mutate,
}

// The client-record query contract in one place — shared by AppRouter's
// suspense read and BrandTheme's non-suspense read so the key + fetcher can't
// drift between them.
export const clientQuery = (apiKey?: string | null) => ({
  queryKey: ['client', apiKey] as const,
  queryFn: () => api.getClient(),
})

export default api
