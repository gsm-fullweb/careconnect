import { readFileSync } from "node:fs";
import { argv, env, exit } from "node:process";
import { createClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = "https://dyxkbbojlyppizsgjjxx.supabase.co";

const args = argv.slice(2);
const file = args[0];

if (!file) {
  console.error("Uso: node --env-file=.env.local scripts/upload-image.mjs <caminho_da_imagem.png>");
  exit(1);
}

const supabaseUrl = env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceKey) {
  console.error("Falta a SUPABASE_SERVICE_ROLE_KEY no ambiente.");
  exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false },
});

let fileBuffer;
try {
  fileBuffer = readFileSync(file);
} catch (e) {
  console.error(`Não consegui ler o arquivo: ${file}\n${e.message}`);
  exit(1);
}

const fileName = file.split(/[\\/]/).pop();
const fileExt = fileName.split('.').pop();
const uniqueFileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
const filePath = uniqueFileName;

console.log(`Subindo arquivo: ${fileName} para ${filePath}...`);

const { data, error } = await supabase.storage
  .from('images')
  .upload(filePath, fileBuffer, {
    contentType: `image/${fileExt === 'png' ? 'png' : 'jpeg'}`,
    duplex: 'half'
  });

if (error) {
  console.error("Erro no upload:", error.message);
  exit(1);
}

const { data: urlData } = supabase.storage
  .from('images')
  .getPublicUrl(filePath);

console.log("✓ Upload concluído com sucesso!");
console.log("URL Pública:", urlData.publicUrl);
