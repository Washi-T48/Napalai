-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION pg_database_owner;

COMMENT ON SCHEMA public IS 'standard public schema';

-- DROP SEQUENCE camera_id_seq;

CREATE SEQUENCE camera_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE event_id_seq;

CREATE SEQUENCE event_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE forgotten_id_seq;

CREATE SEQUENCE forgotten_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE log_id_seq;

CREATE SEQUENCE log_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE user_id_seq;

CREATE SEQUENCE user_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE violence_id_seq;

CREATE SEQUENCE violence_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE zone_id_seq;

CREATE SEQUENCE zone_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;-- public."user" definition

-- Drop table

-- DROP TABLE "user";

CREATE TABLE "user" (
	id varchar DEFAULT nextval('forgotten_id_seq'::regclass) NOT NULL,
	created timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	username varchar NOT NULL,
	fullname varchar NULL,
	"password" varchar NULL,
	CONSTRAINT user_pk PRIMARY KEY (id),
	CONSTRAINT user_unique UNIQUE (username)
);


-- public."zone" definition

-- Drop table

-- DROP TABLE "zone";

CREATE TABLE "zone" (
	id varchar DEFAULT nextval('zone_id_seq'::regclass) NOT NULL,
	created timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	"name" varchar NOT NULL,
	"location" varchar NULL,
	CONSTRAINT zone_pk PRIMARY KEY (id),
	CONSTRAINT zone_unique UNIQUE (name)
);


-- public.camera definition

-- Drop table

-- DROP TABLE camera;

CREATE TABLE camera (
	id varchar DEFAULT nextval('camera_id_seq'::regclass) NOT NULL,
	created timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	zone_id varchar NULL,
	"name" varchar NOT NULL,
	"location" varchar NULL,
	onvif_ip varchar NULL,
	onvif_port varchar NULL,
	onvif_path varchar DEFAULT '/onvif/device_service'::character varying NULL, -- Device Service URL Path
	onvif_username varchar NULL,
	onvif_password varchar NULL,
	rtsp_url varchar NULL,
	rtsp_username varchar NULL,
	rtsp_password varchar NULL,
	CONSTRAINT camera_pk PRIMARY KEY (id),
	CONSTRAINT camera_unique UNIQUE (name),
	CONSTRAINT camera_zone_fk FOREIGN KEY (zone_id) REFERENCES "zone"(id)
);

-- Column comments

COMMENT ON COLUMN public.camera.onvif_path IS 'Device Service URL Path';


-- public."event" definition

-- Drop table

-- DROP TABLE "event";

CREATE TABLE "event" (
	id varchar DEFAULT nextval('event_id_seq'::regclass) NOT NULL,
	created timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	camera_id varchar NOT NULL,
	"type" varchar NULL,
	"position" jsonb NULL, -- Position of an Event on Video Frame
	first_detected timestamptz NULL,
	last_seen timestamptz NULL,
	warning_triggered timestamptz NULL,
	CONSTRAINT event_pk PRIMARY KEY (id),
	CONSTRAINT event_camera_fk FOREIGN KEY (camera_id) REFERENCES camera(id)
);

-- Column comments

COMMENT ON COLUMN public."event"."position" IS 'Position of an Event on Video Frame';


-- public.forgotten definition

-- Drop table

-- DROP TABLE forgotten;

CREATE TABLE forgotten (
	id varchar DEFAULT nextval('forgotten_id_seq'::regclass) NOT NULL,
	created timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	event_id varchar NULL,
	description jsonb NULL,
	item_type varchar NULL,
	status varchar NULL,
	CONSTRAINT forgotten_event_fk FOREIGN KEY (event_id) REFERENCES "event"(id)
);


-- public.log definition

-- Drop table

-- DROP TABLE log;

CREATE TABLE log (
	id varchar DEFAULT nextval('log_id_seq'::regclass) NOT NULL,
	created varchar DEFAULT CURRENT_TIMESTAMP NULL,
	user_id varchar NULL,
	description jsonb NULL,
	CONSTRAINT log_pk PRIMARY KEY (id),
	CONSTRAINT log_user_fk FOREIGN KEY (user_id) REFERENCES "user"(id)
);


-- public.violence definition

-- Drop table

-- DROP TABLE violence;

CREATE TABLE violence (
	id varchar DEFAULT nextval('violence_id_seq'::regclass) NOT NULL,
	created timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	event_id varchar NULL,
	description jsonb NULL,
	violence_type varchar NULL,
	CONSTRAINT violence_event_fk FOREIGN KEY (event_id) REFERENCES "event"(id)
);