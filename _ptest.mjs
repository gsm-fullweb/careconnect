import { setGlobalDispatcher, ProxyAgent } from 'undici';
const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
console.log('proxy =', proxy);
setGlobalDispatcher(new ProxyAgent(proxy));
const url = (process.env.SUPABASE_URL || 'https://dyxkbbojlyppizsgjjxx.supabase.co') + '/auth/v1/health';
try {
  const r = await fetch(url, { headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY || '' } });
  console.log('HTTP status:', r.status);
  console.log('body:', (await r.text()).slice(0,200));
} catch (e) { console.log('ERRO:', e.message, '| cause:', e.cause?.message || ''); }
