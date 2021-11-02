### development execution
```shell
docker-compose up -d && docker-compose exec app bash
cd backend && make run-migrate-seed && cd ../frontend && npm start
```

and  
go to frontend http://localhost:3000  
go to backend http://localhost:8000  
