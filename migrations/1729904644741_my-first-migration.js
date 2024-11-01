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
		first_name: { type: "varchar(100)", notNull: true },
		last_name: { type: "varchar(100)", notNull: false },
		email: { type: "varchar(100)", notNull: true, unique: true },
		password: { type: "varchar(100)", notNull: true },
		created_at: {
			type: "timestamp",
			notNull: true,
			default: pgm.func("current_timestamp"),
		},
	});
	pgm.createTable("categories", {
		id: { type: "serial", primaryKey: true },
		name: { type: "varchar(100)", notNull: true, unique: true },
		created_at: {
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
		transaction_date: { type: "datetime", notNull: true },
		category_id: {
			type: "integer",
			references: '"categories"',
			onDelete: "SET NULL",
			notNull: false,
		},
		user_id: {
			type: "integer",
			references: '"users"',
			onDelete: "SET NULL",
			notNull: false,
		},
		created_at: {
			type: "timestamp",
			notNull: true,
			default: pgm.func("current_timestamp"),
		},
	});
	pgm.createTable("family", {
		id: { type: "serial", primaryKey: true },
		name: { type: "varchar(100)", notNull: true },
		transaction_id: {
			type: "integer",
			references: '"transactions"',
			onDelete: "SET NULL",
			notNull: false,
		},
		user_id: {
			type: "integer",
			references: '"users"',
			onDelete: "SET NULL",
			notNull: false,
		},
		created_at: {
			type: "timestamp",
			notNull: true,
			default: pgm.func("current_timestamp"),
		},
	});

	pgm.createIndex("transactions", ["category_id", "user_id"]);
	pgm.createIndex("family", ["transaction_id", "user_id"]);
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
