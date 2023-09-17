FROM denoland/deno:1.36.4

WORKDIR /app

COPY . .

CMD ["deno","run","-A","main.ts"]