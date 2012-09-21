-- Group [Group]
create table "public"."group" (
   "oid"  int4  not null,
   "groupname"  varchar(255),
  primary key ("oid")
);


-- Module [Module]
create table "public"."module" (
   "oid"  int4  not null,
   "moduleid"  varchar(255),
   "modulename"  varchar(255),
  primary key ("oid")
);


-- User [User]
create table "public"."user" (
   "oid"  int4  not null,
   "username"  varchar(255),
   "password"  varchar(255),
   "email"  varchar(255),
  primary key ("oid")
);


-- Profile [ent1]
create table "public"."profile" (
   "oid"  int4  not null,
   "name"  varchar(255),
   "beep"  varchar(255),
   "vibration"  varchar(255),
   "notification"  varchar(255),
   "number"  varchar(255),
   "timeout"  varchar(255),
   "beep_times"  varchar(255),
  primary key ("oid")
);


