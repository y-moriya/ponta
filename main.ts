import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.41/deno-dom-wasm.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

// function post to discord webhook
async function postToDiscordWebhook(content: string) {
  await fetch(config().DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "Ponta Watcher", content
    }),
  });
}


const url = 'http://spend.ponta.jp/Form/Product/ProductDetail.aspx?shop=0&pid=PS-003000&vid=&cat=909&swrd=';

fetch(url)
  .then(res => res.text())
  .then(body => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(body, 'text/html');
    const sold = doc!.querySelector('.soldOut');
    if (!sold) {
      postToDiscordWebhook('デジタルコードが販売開始されました！\n' + url);
    } else {
      console.log('sold out');
    }
  })
  .catch(err => console.error(err));
