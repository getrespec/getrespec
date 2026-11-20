---
language: tr
status: reviewed
---

# Writing guide: Turkish (`tr`)

Read this before writing anything for a learner whose `state.learner.language` is `tr`. It adds to AGENTS.md → "Writing in the learner's language"; it doesn't replace it. Structure: `_template.md`. The lists hold known problems, not every possible one: anything that reads like a word-for-word translation is wrong even if it isn't listed here.

## Tone
- Use "sen" unless `learner.form_of_address` says `formal`; then use "siz".
- Short, active sentences. Prefer "Modeli çağırırsın" to "Model tarafından çağrı yapılır".
- Turkish punctuation and number formats in prose: `0,7`, `8.000 token`, `%92`. In code and parameter values, keep code syntax: `temperature: 0.7`.

## Terms kept in English
Turkish developers use these in English. Keep them, add a Turkish suffix with an apostrophe (`token'ı`, `prompt'a`, `API'ye`), and explain each in one sentence the first time.

token, prompt, system prompt, context window, streaming, stream, tool use, tool, function calling, embedding, vector, RAG, eval, fine-tuning, API, endpoint, SDK, frontend, backend, deploy, cache, prompt caching, zero-shot, few-shot, agent, structured output, JSON, schema, rate limit

## Terms with a settled Turkish form
| English | Use | Notes | Source |
|---|---|---|---|
| temperature | sıcaklık (temperature) | Give both on first use, then use one consistently. | review |
| hallucination | uydurma | "Halüsinasyon" is understood; explain it once if you use it. | review |
| model | model | | review |
| request / response | istek / cevap (yanıt) | | review |
| probability | olasılık | | review |
| latency | gecikme | | review |
| cost | maliyet | | review |
| input / output | girdi / çıktı | | review |
| training | eğitim | | review |
| reasoning model | düşünen model (reasoning model) | Give both on first use. | review |

## Literal translations to avoid
| English | Wrong (literal) | Write instead | Source |
|---|---|---|---|
| toy example / toy value | oyuncak örnek, oyuncak değer | basit bir örnek; bu örnek için seçilmiş küçük bir değer; temsili değer | learner |
| continuation (of text) | devam, anlamsız bir devam | sonraki kelime; cevabın devamı; "uçtu, cümleye uymayan bir sonraki kelime" | learner |
| tail of the distribution | dağılımın kuyruğu, düşük olasılıklı kuyruk | düşük olasılıklı seçenekler; nadiren seçilen kelimeler | learner |
| under the hood | kaputun altında | arka planda; içeride | review |
| out of the box | kutudan çıktığı gibi | ek ayar yapmadan; hazır olarak | review |
| rule of thumb | başparmak kuralı | pratik kural; genel kural | review |
| ground truth | zemin gerçeği | doğru cevap; referans cevap | review |
| sanity check | akıl sağlığı kontrolü | hızlı kontrol; mantık kontrolü | review |
| happy path | mutlu yol | her şeyin yolunda gittiği durum | review |
| edge case | kenar durum | uç durum; istisnai durum | review |
| leverage | kaldıraçlamak | kullanmak; yararlanmak | review |
| surface (verb) | yüzeye çıkarmak | göstermek; ortaya çıkarmak | review |
| pipeline | boru hattı | pipeline; işlem adımları | review |
| handle (errors) | hataları ele almak | hataları yönetmek; hatayı yakalayıp ... yapmak | review |
| it's worth noting | not etmeye değer | dikkat: ...; şunu da bil: ... | review |

## Before saving, check for
- A word that only fits because of the English behind it (see "continuation" above).
- A sentence that you have to translate back into English to understand.
- The same concept written two ways in one lesson (e.g. "yanıt" and "cevap" mixed in one paragraph, or "sıcaklık" and "temperature" alternating after the first use).
