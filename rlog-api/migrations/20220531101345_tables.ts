import { Knex } from "knex";
export async function up(knex: Knex): Promise<void> {
    await knex.schema
        .createTable('users', (table) => {
            table.string('id', 100).primary().notNullable();
            table.string('name', 255).notNullable();
            table.string('emailId', 100).notNullable();
            table.string('image', 100).notNullable();
            table.timestamp('createdOn').defaultTo(knex.fn.now()).notNullable();
            table.timestamp('updatedOn').defaultTo(knex.fn.now()).notNullable();
        })
        .createTable('accounts', (table) => {
            table.string('id', 100).primary().notNullable();
            table.string('name', 255).notNullable();
            table.string('createdBy', 100).notNullable();
            table.timestamp('createdOn').defaultTo(knex.fn.now()).notNullable();
            table.timestamp('updatedOn').defaultTo(knex.fn.now()).notNullable();
            table.foreign('createdBy').references('users.id');
        })
        .createTable('accountInvites', (table) => {
            table.string('emailId', 100).notNullable();
            table.string('accountId', 100).notNullable();
            table.string('invitedBy', 100).notNullable();
            table.timestamp('createdOn').defaultTo(knex.fn.now()).notNullable();
            table.timestamp('updatedOn').defaultTo(knex.fn.now()).notNullable();
            table.foreign('accountId').references('accounts.id');
            table.foreign('invitedBy').references('users.id');
            table.primary(['emailId', 'accountId']);
        })
        .createTable('accountUsers', (table) => {
            table.string('userId', 100).notNullable();
            table.string('accountId', 100).notNullable();
            table.string('invitedBy', 100).notNullable();
            table.timestamp('createdOn').defaultTo(knex.fn.now()).notNullable();
            table.timestamp('updatedOn').defaultTo(knex.fn.now()).notNullable();
            table.foreign('invitedBy').references('users.id');
            table.foreign('accountId').references('accounts.id');
            table.primary(['userId', 'accountId']);
        })
        .createTable('applications', (table) => {
            table.string('id', 100).primary().notNullable();
            table.string('accountId', 100).notNullable();
            table.string('name', 100).notNullable();
            table.string('createdBy', 100).notNullable();
            table.timestamp('createdOn').defaultTo(knex.fn.now()).notNullable();
            table.timestamp('updatedOn').defaultTo(knex.fn.now()).notNullable();
            table.string('apikey', 100);
            table.foreign('accountId').references('accounts.id');
            table.foreign('createdBy').references('users.id');
        })
        .createTable('logs', (table) => {
            table.string('applicationId', 100).notNullable();
            table.string('accountId').notNullable();
            table.timestamp('createdOn').defaultTo(knex.fn.now()).notNullable();
            table.string('logLevel', 100).notNullable();
            table.string('source', 100);
            table.string('message', 255).notNullable();
            table.foreign('applicationId').references('applications.id');
            table.foreign('accountId').references('accounts.id');
        })
}
export async function down(knex: Knex): Promise<void> {
    await knex.schema
        .dropTable("users")
        .dropTable("accounts")
        .dropTable("accountInvites")
        .dropTable("accountUsers")
        .dropTable("applications")
        .dropTable("logs")
}

