# Garra Marmoraria — prévia comercial

Landing page estática, sem backend, dependências de produção ou armazenamento de respostas. Identidade conceitual; informações comerciais limitadas ao briefing. Imagens ilustrativas do Unsplash, armazenadas localmente. Texturas dos materiais são representações conceituais em CSS, sem indicar disponibilidade ou tonalidade real.

## Executar

Na raiz do checkout: `python3 -m http.server 3000 --bind 0.0.0.0`.

## Publicar na Vercel

Importe o repositório com preset Other, sem comando de build, diretório de saída `.`. Alternativamente, use `npx vercel --prod` com uma conta autenticada. `vercel.json` configura cabeçalhos de segurança. Após publicação, configure `og:url`, URL absoluta de `og:image` e canonical com o endereço final confirmado.

## Substituir fotografias

Substitua os arquivos em `assets/` e atualize textos alternativos e dimensões em `index.html`. Remova o aviso ilustrativo apenas de fotos comprovadamente pertencentes à empresa. Não apresente a prévia como site oficial sem aprovação.

## Dados

O questionário mantém respostas apenas em memória e usa `encodeURIComponent` para abrir a mensagem no WhatsApp. O visitante confirma o envio no WhatsApp. Todas as conversas usam 5565992785086.
