import mysql from "mysql2/promise";

export async function query ({query, values = []}) {

     const dbCon = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password:  process.env.MYSQL_PASSWORD
     })

     try {
        const [result] = await dbCon.execute(query, values);
        dbCon.end();
        return result;
    } catch(err) {
        throw Error(err.message);
        return {err}
    }


}
