import { setGlobalDispatcher, ProxyAgent } from 'undici';
setGlobalDispatcher(new ProxyAgent(process.env.HTTPS_PROXY));
for (const url of ['https://registry.npmjs.org/', 'https://api.github.com/', 'https://dyxkbbojlyppizsgjjxx.supabase.co/auth/v1/health']) {
  try { const r = await fetch(url); console.log(r.status, url); }
  catch (e) { console.log('ERRO', url, '|', e.cause?.message || e.message); }
}
