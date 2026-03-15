import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const GuestLog = sqliteTable("GuestLog", {
	id: integer("id").primaryKey({
		autoIncrement: true,
	}),
	name: text("name").notNull(),
	message: text("message"),
	date: integer("date", {mode: "timestamp",})
            .notNull()
		    .$defaultFn(() => new Date()),
});