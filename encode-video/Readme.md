
```shell
docker-compose up --build && docker-compose exec app bash
cd encoder
go run main.go
go test ./...
```

criar função init com validação por default

criar metodo Validate co mretorno de error
validar Struct caso estiver erro retornar caos contrato retornar nil

validçaão de atributos
valid:"uui"
notnull
notnull
"-"
"-"
...

criar metodo prepare privado 
ID com uuid.NewV4
createAt time.Now
UpdateAt ...

criar func NewJob com atributos output, status, video referencia e retornar refacencia Job ou error
criar Job com output, statis e video recebidos
executar prepare

executar validate
caso tiver erro retorno job nil e erro

returnar referencia job e nil


criar job_test.go com domain_test

criar TestNewJob 
criar variavel video
gerar ID com uuid, file "path CreateAt time.Now"
criar job com NewJob passando output, status e video

require.NotNill com job
require.Nill com err

