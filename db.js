import pgPromise from "npm:pg-promise";
const pgp = pgPromise({});
const db = pgp(
    "postgres://sikor:TrackerUserPassword@localhost:5432/expense_tracker",
);

export default db;
