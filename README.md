# Next DMS

Next DMS is Document Management System built for educational purposes. We built the site using Next.js, Vanilla JS, React Quill, Mysql2 and Tailwind. For remote database we used a MySQL Community Server (GPL) v. 5.7.24 where documents/posts, categories, users/authors and favorites are stored.

## Install MySQL Server or use an existing one.

1. Create database and user.
2. Import Next_DMS.sql in the database.
3. Add atleast one admin user and passsword with authorId 1 in the table authors, for admin and test purposes.


## Installation

Navigate to the directory you want the project directory in:
```bash
cd /path/to/project/directory
```

Clone Next-DMS:
```bash
git clone https://github.com/Frontend-YH/Next-DMS.git
```
Install the necessary dependencies:
```bash
cd Next-DMS
npm install
```
Create .env.local file in your project directory root with your database login credentials:
```

MYSQL_HOST=<yourserver.net>
MYSQL_PORT=3306
MYSQL_DATABASE=<yourDatabaseName>
MYSQL_USER=<yourDatabaseUserName>
MYSQL_PASSWORD=<YourDatabasePassword>
```

Start the dev server
```bash
npm run dev
```

Visit the site:
```bash
http://localhost:3000/
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

##Sidenotes

## License

[MIT](https://choosealicense.com/licenses/mit/)