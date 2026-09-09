docker build -t revirathya/revirathya-console:latest --build-arg VITE_DEFAULT_USER_ID=31521fb2-2799-4d53-801c-61cf85427fe2 .

docker run --rm -p 5173:80 -e API_UPSTREAM=http://host.docker.internal:8080 revirathya/revirathya-console