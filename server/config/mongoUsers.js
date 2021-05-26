db.createUser(
    {
        user: "dbadmin",
        pwd: "password",
        roles:[
            {
                role: "readWrite",
                db:   "Marketplace"
            }
        ]
    }
);