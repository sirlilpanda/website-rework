CREATE TABLE `GuestLog` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`message` text,
	`date` integer NOT NULL
);
