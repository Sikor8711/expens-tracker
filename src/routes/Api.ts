import { Router } from "npm:express@5.0.1";
import pgPromise from "npm:pg-promise";
const PQ = pgPromise.ParameterizedQuery;
import db from "../../db.ts";

const router = Router();

// const findUser = new PQ({
//     text: "SELECT * FROM users WHERE email = $1",
//     values: ["sikor87@hotmail.com"],
// });
//
// async function getOne() {
//     try {
//         const user = await db.one(findUser);
//         return user;
//     } catch (error) {
//         console.error(error);
//     }
// }
// console.log(await getOne());
// const o = await getOne();

router.get("/api", (req, res) => {
    res.send("hej hej");
});

router.get("/api/test", (req, res) => {
    res.send("hej");
});
export default router;
