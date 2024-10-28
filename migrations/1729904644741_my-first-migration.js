/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
	// Categories table (each category can relate to many transactions)
	pgm.createTable("users", {
		id: { type: "serial", primaryKey: true },
		firstName: { type: "varchar(100)", notNull: true },
		lastName: { type: "varchar(100)", notNull: false },
		email: { type: "varchar(100)", notNull: true, unique: true },
		password: { type: "varchar(100)", notNull: true },
		createdAt: {
			type: "timestamp",
			notNull: true,
			default: pgm.func("current_timestamp"),
		},
	});
	pgm.createTable("categories", {
		id: { type: "serial", primaryKey: true },
		name: { type: "varchar(100)", notNull: true, unique: true },
		createdAt: {
			type: "timestamp",
			notNull: true,
			default: pgm.func("current_timestamp"),
		},
	});

	// Transactions table (each transaction belongs to one category)
	pgm.createTable("transactions", {
		id: { type: "serial", primaryKey: true },
		name: { type: "varchar(100)", notNull: true },
		amount: { type: "numeric", notNull: true },
		categoryId: {
			type: "integer",
			references: '"categories"',
			onDelete: "SET NULL",
			notNull: false,
		},
		userId: {
			type: "integer",
			references: '"users"',
			onDelete: "CASCADE",
			notNull: false,
		},
		createdAt: {
			type: "timestamp",
			notNull: true,
			default: pgm.func("current_timestamp"),
		},
	});

	pgm.createIndex("transactions", ["categoryId", "userId"]);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
	pgm.dropTable("categories", { cascade: false });
	pgm.dropTable("transactions", { cascade: false });
};
