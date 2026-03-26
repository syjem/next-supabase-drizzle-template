import { numeric, pgPolicy, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const employees = pgTable('employees', {
    id: uuid().primaryKey().defaultRandom(),
    created_at: timestamp({withTimezone: true}).defaultNow(),
    name: text(),
    employee_id: numeric().unique(),
}, () => [
    pgPolicy("Public Access", {
        as: 'permissive',
        for: "select",
        to: "public",
    })
]);

export type Employee = typeof employees.$inferSelect;
export type NewEmployee = typeof employees.$inferInsert;