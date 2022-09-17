# Server

## Getting Started

1. Create the following `.env` file in this directory:

   ```
   COHERE_API_KEY=<your-cohere-api-key>
   ```

1. Run `npm run dev` in this directory.

## Local Testing with cURL

Text source: https://ugo-ii.com/products/content

```sh
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"text":"Employee recognition boosts morale and is the core of any great company. But, employee of the month awards are too temporary. UGO II has introduced employee of the decade awards to truly give our employees the sense that their contributions are appreciated. To ensure each employee will have a decade to be recognized in, UGO II has pre-reserved decades up to the year 32000."}' \
  localhost:3001/summary
```
