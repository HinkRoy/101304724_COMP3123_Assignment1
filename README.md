# 101304724_COMP3123_Assignment1

### How to start

Run ```npm start```

### API

| Sr. # | Method |                      Endpoint | Response Code | Description                                  |
|-------|:------:|------------------------------:|---------------|----------------------------------------------|
| 1     |  POST  |           /api/v1/user/signup | 201           | Allow user to create new account             |
| 2     |  POST  |            /api/v1/user/login | 200           | Allow user to access the system              |
| 3     |  GET   |         /api/v1/emp/employees | 200           | User can get all employee list               |
| 4     |  POST  |         /api/v1/emp/employees | 201           | User can create new employee                 |
| 5     |  GET   |   /api/v1/emp/employees/{eid} | 200           | User can get employee details by employee id |
| 6     |  PUT   |   /api/v1/emp/employees/{eid} | 200           | User can update employee details             |
| 7     | DELETE | /api/v1/emp/employees?eid=xxx | 204           | User can delete employee by employee id      |
