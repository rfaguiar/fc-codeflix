
```shell
docker-compose up --build && docker-compose exec app bash
cd encoder
go run main.go
go test ./...
```


