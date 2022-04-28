--
-- PostgreSQL database dump
--

-- Dumped from database version 13.6 (Debian 13.6-1.pgdg110+1)
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: qualkey
--

CREATE TYPE public."Role" AS ENUM (
    'SUPER_ADMIN',
    'ADMIN',
    'INSTITUTION_REPRESENTATIVE',
    'STUDENT'
);


ALTER TYPE public."Role" OWNER TO qualkey;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO qualkey;

--
-- Name: users; Type: TABLE; Schema: public; Owner: qualkey
--

CREATE TABLE public.users (
    uuid text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "firstName" text,
    "lastName" text
);


ALTER TABLE public.users OWNER TO qualkey;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: qualkey
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('4b425046-2386-4116-8618-7c3b9b605d7e', '75d5da9a79d298d97e025d0e270f59e8cec26569da5a5959bf55988f13a837f0', '2022-04-27 21:27:52.781552+00', '20220427134050_init', NULL, NULL, '2022-04-27 21:27:52.769912+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('c694e44f-e28c-4a3b-b6bb-545dcb94d1f3', '75d5da9a79d298d97e025d0e270f59e8cec26569da5a5959bf55988f13a837f0', '2022-04-27 13:48:56.073734+00', '20220427134050_init', NULL, NULL, '2022-04-27 13:48:56.052726+00', 1);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: qualkey
--

INSERT INTO public.users (uuid, email, password, role, "createdAt", "updatedAt", "firstName", "lastName") VALUES ('bf4fe6f3-f5a1-4794-aced-4deb4ba8c67a', 'student@student.com', '$2a$10$szluigxiqw0EjjrAULtU.OrQH9ar/aTkZttoaqwvnS0u39tcVuxG.', 'STUDENT', '2022-04-28 10:35:09.983', '2022-04-28 10:35:09.983', 'Student', 'Student');
INSERT INTO public.users (uuid, email, password, role, "createdAt", "updatedAt", "firstName", "lastName") VALUES ('00e5daba-fd08-4146-af73-deb67e6dd2ea', 'admin@admin.com', '$2a$10$6X/3no1.v5A3ygHPMGF7a.FKaOa2TkekqsWIq9ADRBOOm8Y1CcrgW', 'SUPER_ADMIN', '2022-04-27 22:10:57', '2022-04-27 22:11:34', 'Admin', 'Admin');
INSERT INTO public.users (uuid, email, password, role, "createdAt", "updatedAt", "firstName", "lastName") VALUES ('4728859d-622b-4ec0-8f60-75caa0d17c13', 'institution@institution.com', '$2a$10$vz2liRFu3Ho7rLdEInKO5./ZjUsynDfhLTuaIRqdNLh0ewCfILZKG', 'INSTITUTION_REPRESENTATIVE', '2022-04-28 10:36:50.567', '2022-04-28 10:36:50.567', 'Institution', 'Institution');


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: qualkey
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uuid);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: qualkey
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- PostgreSQL database dump complete
--

